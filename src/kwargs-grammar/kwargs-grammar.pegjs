expr =
	begin_paren @kwargs end_paren /
	ws @kwargs ws

kwargs =
	head:kv_pair tail:(value_separator @kv_pair)* {
		return tail.reduce((a, b) => Object.assign({}, a, b), head)
	} /
	ws { return {} }

kv_pair =
    k:id ws as ws v:value { return { [k]: v } } /
	key:id { return { [key]: true } }

id "identifier" = $[a-zA-Z-_$#]+

as "assignment operator" = "="

ws "whitespace" = [ \t\n\r]*



value
  = false
  / null
  / true
  / object
  / array
  / number
  / string

false = "false" { return false; }
null  = "null"  { return null;  }
true  = "true"  { return true;  }

begin_array     = ws "[" ws
begin_object    = ws "{" ws
begin_paren     = ws "(" ws
end_paren       = ws ")" ws
end_array       = ws "]" ws
end_object      = ws "}" ws
name_separator  = ws ":" ws
value_separator = ws "," ws


object
  = begin_object
    members:(
      head:member
      tail:(value_separator @member)*
      {
        var result = {};

        [head].concat(tail).forEach(function(element) {
          result[element.name] = element.value;
        });

        return result;
      }
    )?
    end_object
    { return members ?? {}; }

member
  = name:string name_separator value:value {
      return { name: name, value: value };
    }

array
  = begin_array
    values:(
      head:value
      tail:(value_separator @value)*
      { return [head].concat(tail); }
    )?
    end_array
    { return values ?? []; }

// ----- 6. Numbers -----

number "number"
  = minus? int frac? exp? { return parseFloat(text()); }

decimal_point
  = "."

digit1_9
  = [1-9]

e
  = [eE]

exp
  = e (minus / plus)? DIGIT+

frac
  = decimal_point DIGIT+

int
  = zero / (digit1_9 DIGIT*)

minus
  = "-"

plus
  = "+"

zero
  = "0"

// ----- 7. Strings -----

string "string"
  = quotation_mark chars:char* quotation_mark { return chars.join(""); }

char
  = unescaped
  / escape
    sequence:(
        '"'
      / "\\"
      / "/"
      / "b" { return "\b"; }
      / "f" { return "\f"; }
      / "n" { return "\n"; }
      / "r" { return "\r"; }
      / "t" { return "\t"; }
      / "u" digits:$(HEXDIG HEXDIG HEXDIG HEXDIG) {
          return String.fromCharCode(parseInt(digits, 16));
        }
    )
    { return sequence; }

escape
  = "\\"

quotation_mark
  = '"'

unescaped
  = [^\0-\x1F\x22\x5C]

// ----- Core ABNF Rules -----

// See RFC 4234, Appendix B (http://tools.ietf.org/html/rfc4234).
DIGIT  = [0-9]
HEXDIG = [0-9a-f]i
