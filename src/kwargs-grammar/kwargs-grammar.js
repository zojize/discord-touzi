// Generated by Peggy 1.2.0.
//
// https://peggyjs.org/

function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}

peg$subclass(peg$SyntaxError, Error);

function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) { return str; }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var loc = this.location.source + ":" + s.line + ":" + s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", s.line.toString().length);
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      str += "\n --> " + loc + "\n"
          + filler + " |\n"
          + s.line + " | " + line + "\n"
          + filler + " | " + peg$padEnd("", s.column - 1)
          + peg$padEnd("", last - s.column, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};

  var peg$FAILED = {};
  var peg$source = options.grammarSource;

  var peg$startRuleFunctions = { expr: peg$parseexpr };
  var peg$startRuleFunction = peg$parseexpr;

  var peg$c0 = "=";
  var peg$c1 = "false";
  var peg$c2 = "null";
  var peg$c3 = "true";
  var peg$c4 = "[";
  var peg$c5 = "{";
  var peg$c6 = "(";
  var peg$c7 = ")";
  var peg$c8 = "]";
  var peg$c9 = "}";
  var peg$c10 = ":";
  var peg$c11 = ",";
  var peg$c12 = ".";
  var peg$c13 = "-";
  var peg$c14 = "+";
  var peg$c15 = "0";
  var peg$c16 = "\"";
  var peg$c17 = "\\";
  var peg$c18 = "/";
  var peg$c19 = "b";
  var peg$c20 = "f";
  var peg$c21 = "n";
  var peg$c22 = "r";
  var peg$c23 = "t";
  var peg$c24 = "u";

  var peg$r0 = /^[a-zA-Z\-_$#]/;
  var peg$r1 = /^[ \t\n\r]/;
  var peg$r2 = /^[1-9]/;
  var peg$r3 = /^[eE]/;
  var peg$r4 = /^[^\0-\x1F"\\]/;
  var peg$r5 = /^[0-9]/;
  var peg$r6 = /^[0-9a-f]/i;

  var peg$e0 = peg$otherExpectation("identifier");
  var peg$e1 = peg$classExpectation([["a", "z"], ["A", "Z"], "-", "_", "$", "#"], false, false);
  var peg$e2 = peg$otherExpectation("assignment operator");
  var peg$e3 = peg$literalExpectation("=", false);
  var peg$e4 = peg$otherExpectation("whitespace");
  var peg$e5 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false);
  var peg$e6 = peg$literalExpectation("false", false);
  var peg$e7 = peg$literalExpectation("null", false);
  var peg$e8 = peg$literalExpectation("true", false);
  var peg$e9 = peg$literalExpectation("[", false);
  var peg$e10 = peg$literalExpectation("{", false);
  var peg$e11 = peg$literalExpectation("(", false);
  var peg$e12 = peg$literalExpectation(")", false);
  var peg$e13 = peg$literalExpectation("]", false);
  var peg$e14 = peg$literalExpectation("}", false);
  var peg$e15 = peg$literalExpectation(":", false);
  var peg$e16 = peg$literalExpectation(",", false);
  var peg$e17 = peg$otherExpectation("number");
  var peg$e18 = peg$literalExpectation(".", false);
  var peg$e19 = peg$classExpectation([["1", "9"]], false, false);
  var peg$e20 = peg$classExpectation(["e", "E"], false, false);
  var peg$e21 = peg$literalExpectation("-", false);
  var peg$e22 = peg$literalExpectation("+", false);
  var peg$e23 = peg$literalExpectation("0", false);
  var peg$e24 = peg$otherExpectation("string");
  var peg$e25 = peg$literalExpectation("\"", false);
  var peg$e26 = peg$literalExpectation("\\", false);
  var peg$e27 = peg$literalExpectation("/", false);
  var peg$e28 = peg$literalExpectation("b", false);
  var peg$e29 = peg$literalExpectation("f", false);
  var peg$e30 = peg$literalExpectation("n", false);
  var peg$e31 = peg$literalExpectation("r", false);
  var peg$e32 = peg$literalExpectation("t", false);
  var peg$e33 = peg$literalExpectation("u", false);
  var peg$e34 = peg$classExpectation([["\0", "\x1F"], "\"", "\\"], true, false);
  var peg$e35 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e36 = peg$classExpectation([["0", "9"], ["a", "f"]], false, true);

  var peg$f0 = function(head, tail) {
  		return tail.reduce((a, b) => Object.assign({}, a, b), head)
  	};
  var peg$f1 = function() { return {} };
  var peg$f2 = function(k, v) { return { [k]: v } };
  var peg$f3 = function(key) { return { [key]: true } };
  var peg$f4 = function() { return false; };
  var peg$f5 = function() { return null;  };
  var peg$f6 = function() { return true;  };
  var peg$f7 = function(head, tail) {
          var result = {};

          [head].concat(tail).forEach(function(element) {
            result[element.name] = element.value;
          });

          return result;
        };
  var peg$f8 = function(members) { return members ?? {}; };
  var peg$f9 = function(name, value) {
        return { name: name, value: value };
      };
  var peg$f10 = function(head, tail) { return [head].concat(tail); };
  var peg$f11 = function(values) { return values ?? []; };
  var peg$f12 = function() { return parseFloat(text()); };
  var peg$f13 = function(chars) { return chars.join(""); };
  var peg$f14 = function() { return "\b"; };
  var peg$f15 = function() { return "\f"; };
  var peg$f16 = function() { return "\n"; };
  var peg$f17 = function() { return "\r"; };
  var peg$f18 = function() { return "\t"; };
  var peg$f19 = function(digits) {
            return String.fromCharCode(parseInt(digits, 16));
          };
  var peg$f20 = function(sequence) { return sequence; };

  var peg$currPos = 0;
  var peg$savedPos = 0;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = 0;
  var peg$maxFailExpected = [];
  var peg$silentFails = 0;

  var peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);

    return {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseexpr() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsebegin_paren();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsekwargs();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseend_paren();
        if (s3 !== peg$FAILED) {
          s0 = s2;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parsews();
      s2 = peg$parsekwargs();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsews();
        s0 = s2;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parsekwargs() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parsekv_pair();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$currPos;
      s4 = peg$parsevalue_separator();
      if (s4 !== peg$FAILED) {
        s5 = peg$parsekv_pair();
        if (s5 !== peg$FAILED) {
          s3 = s5;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      } else {
        peg$currPos = s3;
        s3 = peg$FAILED;
      }
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$currPos;
        s4 = peg$parsevalue_separator();
        if (s4 !== peg$FAILED) {
          s5 = peg$parsekv_pair();
          if (s5 !== peg$FAILED) {
            s3 = s5;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
      }
      peg$savedPos = s0;
      s0 = peg$f0(s1, s2);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parsews();
      peg$savedPos = s0;
      s1 = peg$f1();
      s0 = s1;
    }

    return s0;
  }

  function peg$parsekv_pair() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parseid();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsews();
      s3 = peg$parseas();
      if (s3 !== peg$FAILED) {
        s4 = peg$parsews();
        s5 = peg$parsevalue();
        if (s5 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f2(s1, s5);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseid();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$f3(s1);
      }
      s0 = s1;
    }

    return s0;
  }

  function peg$parseid() {
    var s0, s1, s2;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = [];
    if (peg$r0.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e1); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$r0.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e1); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      s0 = input.substring(s0, peg$currPos);
    } else {
      s0 = s1;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e0); }
    }

    return s0;
  }

  function peg$parseas() {
    var s0, s1;

    peg$silentFails++;
    if (input.charCodeAt(peg$currPos) === 61) {
      s0 = peg$c0;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e3); }
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e2); }
    }

    return s0;
  }

  function peg$parsews() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    if (peg$r1.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e5); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      if (peg$r1.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e5); }
      }
    }
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) { peg$fail(peg$e4); }

    return s0;
  }

  function peg$parsevalue() {
    var s0;

    s0 = peg$parsefalse();
    if (s0 === peg$FAILED) {
      s0 = peg$parsenull();
      if (s0 === peg$FAILED) {
        s0 = peg$parsetrue();
        if (s0 === peg$FAILED) {
          s0 = peg$parseobject();
          if (s0 === peg$FAILED) {
            s0 = peg$parsearray();
            if (s0 === peg$FAILED) {
              s0 = peg$parsenumber();
              if (s0 === peg$FAILED) {
                s0 = peg$parsestring();
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parsefalse() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 5) === peg$c1) {
      s1 = peg$c1;
      peg$currPos += 5;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e6); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f4();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsenull() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c2) {
      s1 = peg$c2;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e7); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f5();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsetrue() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 4) === peg$c3) {
      s1 = peg$c3;
      peg$currPos += 4;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e8); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f6();
    }
    s0 = s1;

    return s0;
  }

  function peg$parsebegin_array() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsews();
    if (input.charCodeAt(peg$currPos) === 91) {
      s2 = peg$c4;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e9); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsews();
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebegin_object() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsews();
    if (input.charCodeAt(peg$currPos) === 123) {
      s2 = peg$c5;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e10); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsews();
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsebegin_paren() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsews();
    if (input.charCodeAt(peg$currPos) === 40) {
      s2 = peg$c6;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e11); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsews();
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseend_paren() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsews();
    if (input.charCodeAt(peg$currPos) === 41) {
      s2 = peg$c7;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e12); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsews();
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseend_array() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsews();
    if (input.charCodeAt(peg$currPos) === 93) {
      s2 = peg$c8;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e13); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsews();
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseend_object() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsews();
    if (input.charCodeAt(peg$currPos) === 125) {
      s2 = peg$c9;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e14); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsews();
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsename_separator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsews();
    if (input.charCodeAt(peg$currPos) === 58) {
      s2 = peg$c10;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e15); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsews();
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsevalue_separator() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsews();
    if (input.charCodeAt(peg$currPos) === 44) {
      s2 = peg$c11;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e16); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parsews();
      s1 = [s1, s2, s3];
      s0 = s1;
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseobject() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parsebegin_object();
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parsemember();
      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$currPos;
        s6 = peg$parsevalue_separator();
        if (s6 !== peg$FAILED) {
          s7 = peg$parsemember();
          if (s7 !== peg$FAILED) {
            s5 = s7;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        } else {
          peg$currPos = s5;
          s5 = peg$FAILED;
        }
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$currPos;
          s6 = peg$parsevalue_separator();
          if (s6 !== peg$FAILED) {
            s7 = peg$parsemember();
            if (s7 !== peg$FAILED) {
              s5 = s7;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        }
        peg$savedPos = s2;
        s2 = peg$f7(s3, s4);
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = peg$parseend_object();
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f8(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsemember() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsestring();
    if (s1 !== peg$FAILED) {
      s2 = peg$parsename_separator();
      if (s2 !== peg$FAILED) {
        s3 = peg$parsevalue();
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f9(s1, s3);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsearray() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parsebegin_array();
    if (s1 !== peg$FAILED) {
      s2 = peg$currPos;
      s3 = peg$parsevalue();
      if (s3 !== peg$FAILED) {
        s4 = [];
        s5 = peg$currPos;
        s6 = peg$parsevalue_separator();
        if (s6 !== peg$FAILED) {
          s7 = peg$parsevalue();
          if (s7 !== peg$FAILED) {
            s5 = s7;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        } else {
          peg$currPos = s5;
          s5 = peg$FAILED;
        }
        while (s5 !== peg$FAILED) {
          s4.push(s5);
          s5 = peg$currPos;
          s6 = peg$parsevalue_separator();
          if (s6 !== peg$FAILED) {
            s7 = peg$parsevalue();
            if (s7 !== peg$FAILED) {
              s5 = s7;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        }
        peg$savedPos = s2;
        s2 = peg$f10(s3, s4);
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = peg$parseend_array();
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f11(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsenumber() {
    var s0, s1, s2, s3, s4;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parseminus();
    if (s1 === peg$FAILED) {
      s1 = null;
    }
    s2 = peg$parseint();
    if (s2 !== peg$FAILED) {
      s3 = peg$parsefrac();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = peg$parseexp();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      peg$savedPos = s0;
      s0 = peg$f12();
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e17); }
    }

    return s0;
  }

  function peg$parsedecimal_point() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 46) {
      s0 = peg$c12;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e18); }
    }

    return s0;
  }

  function peg$parsedigit1_9() {
    var s0;

    if (peg$r2.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e19); }
    }

    return s0;
  }

  function peg$parsee() {
    var s0;

    if (peg$r3.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e20); }
    }

    return s0;
  }

  function peg$parseexp() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parsee();
    if (s1 !== peg$FAILED) {
      s2 = peg$parseminus();
      if (s2 === peg$FAILED) {
        s2 = peg$parseplus();
      }
      if (s2 === peg$FAILED) {
        s2 = null;
      }
      s3 = [];
      s4 = peg$parseDIGIT();
      if (s4 !== peg$FAILED) {
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          s4 = peg$parseDIGIT();
        }
      } else {
        s3 = peg$FAILED;
      }
      if (s3 !== peg$FAILED) {
        s1 = [s1, s2, s3];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsefrac() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parsedecimal_point();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseDIGIT();
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseDIGIT();
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseint() {
    var s0, s1, s2, s3;

    s0 = peg$parsezero();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parsedigit1_9();
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parseDIGIT();
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          s3 = peg$parseDIGIT();
        }
        s1 = [s1, s2];
        s0 = s1;
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseminus() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 45) {
      s0 = peg$c13;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e21); }
    }

    return s0;
  }

  function peg$parseplus() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 43) {
      s0 = peg$c14;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e22); }
    }

    return s0;
  }

  function peg$parsezero() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 48) {
      s0 = peg$c15;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e23); }
    }

    return s0;
  }

  function peg$parsestring() {
    var s0, s1, s2, s3;

    peg$silentFails++;
    s0 = peg$currPos;
    s1 = peg$parsequotation_mark();
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parsechar();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parsechar();
      }
      s3 = peg$parsequotation_mark();
      if (s3 !== peg$FAILED) {
        peg$savedPos = s0;
        s0 = peg$f13(s2);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }
    peg$silentFails--;
    if (s0 === peg$FAILED) {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e24); }
    }

    return s0;
  }

  function peg$parsechar() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;

    s0 = peg$parseunescaped();
    if (s0 === peg$FAILED) {
      s0 = peg$currPos;
      s1 = peg$parseescape();
      if (s1 !== peg$FAILED) {
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c16;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e25); }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s2 = peg$c17;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e26); }
          }
          if (s2 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s2 = peg$c18;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$e27); }
            }
            if (s2 === peg$FAILED) {
              s2 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 98) {
                s3 = peg$c19;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$e28); }
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s2;
                s3 = peg$f14();
              }
              s2 = s3;
              if (s2 === peg$FAILED) {
                s2 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 102) {
                  s3 = peg$c20;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$e29); }
                }
                if (s3 !== peg$FAILED) {
                  peg$savedPos = s2;
                  s3 = peg$f15();
                }
                s2 = s3;
                if (s2 === peg$FAILED) {
                  s2 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 110) {
                    s3 = peg$c21;
                    peg$currPos++;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$e30); }
                  }
                  if (s3 !== peg$FAILED) {
                    peg$savedPos = s2;
                    s3 = peg$f16();
                  }
                  s2 = s3;
                  if (s2 === peg$FAILED) {
                    s2 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 114) {
                      s3 = peg$c22;
                      peg$currPos++;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$e31); }
                    }
                    if (s3 !== peg$FAILED) {
                      peg$savedPos = s2;
                      s3 = peg$f17();
                    }
                    s2 = s3;
                    if (s2 === peg$FAILED) {
                      s2 = peg$currPos;
                      if (input.charCodeAt(peg$currPos) === 116) {
                        s3 = peg$c23;
                        peg$currPos++;
                      } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$e32); }
                      }
                      if (s3 !== peg$FAILED) {
                        peg$savedPos = s2;
                        s3 = peg$f18();
                      }
                      s2 = s3;
                      if (s2 === peg$FAILED) {
                        s2 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 117) {
                          s3 = peg$c24;
                          peg$currPos++;
                        } else {
                          s3 = peg$FAILED;
                          if (peg$silentFails === 0) { peg$fail(peg$e33); }
                        }
                        if (s3 !== peg$FAILED) {
                          s4 = peg$currPos;
                          s5 = peg$currPos;
                          s6 = peg$parseHEXDIG();
                          if (s6 !== peg$FAILED) {
                            s7 = peg$parseHEXDIG();
                            if (s7 !== peg$FAILED) {
                              s8 = peg$parseHEXDIG();
                              if (s8 !== peg$FAILED) {
                                s9 = peg$parseHEXDIG();
                                if (s9 !== peg$FAILED) {
                                  s6 = [s6, s7, s8, s9];
                                  s5 = s6;
                                } else {
                                  peg$currPos = s5;
                                  s5 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s5;
                                s5 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s5;
                              s5 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s5;
                            s5 = peg$FAILED;
                          }
                          if (s5 !== peg$FAILED) {
                            s4 = input.substring(s4, peg$currPos);
                          } else {
                            s4 = s5;
                          }
                          if (s4 !== peg$FAILED) {
                            peg$savedPos = s2;
                            s2 = peg$f19(s4);
                          } else {
                            peg$currPos = s2;
                            s2 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s2;
                          s2 = peg$FAILED;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s2 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f20(s2);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    }

    return s0;
  }

  function peg$parseescape() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 92) {
      s0 = peg$c17;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e26); }
    }

    return s0;
  }

  function peg$parsequotation_mark() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 34) {
      s0 = peg$c16;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e25); }
    }

    return s0;
  }

  function peg$parseunescaped() {
    var s0;

    if (peg$r4.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e34); }
    }

    return s0;
  }

  function peg$parseDIGIT() {
    var s0;

    if (peg$r5.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e35); }
    }

    return s0;
  }

  function peg$parseHEXDIG() {
    var s0;

    if (peg$r6.test(input.charAt(peg$currPos))) {
      s0 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e36); }
    }

    return s0;
  }

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

export {
  peg$SyntaxError as SyntaxError,
  peg$parse as parse
};
