{{
    const sign = { "+": 1, "-": -1 };

    function diceMultiplier(dice, m) {
        switch (dice.type) {
            case "dice":
                return {
                    ...dice,
                    multiplier: m * (dice.multiplier ?? 1),
                }
            case "repeat":
                return {
                    ...dice,
                    dice: diceMultiplier(dice.dice, m),
                }
            case "group":
                return {
                    ...dice,
                    dice: dice.dice.map(d => diceMultiplier(d, m)),
                }
        }
    }

    function diceOffset(dice, o) {
        switch (dice.type) {
            case "dice":
                return {
                    ...dice,
                    offset: o + (dice.offset ?? 0),
                }
            case "repeat":
                return {
                    ...dice,
                    dice: diceOffset(dice.dice, o),
                }
            case "group":
                return {
                    ...dice,
                    dice: dice.dice.map(d => diceOffset(d, o)),
                }
        }
    }

    function diceTimes(dice, t) {
        switch (dice.type) {
            case "dice":
                return {
                    ...dice,
                    times: t * (dice.times ?? 1),
                };
            case "repeat":
                return {
                    ...dice,
                    dice: diceTimes(dice.dice, t),
                }
            case "group":
                return {
                    ...dice,
                    dice: dice.dice.map(d => diceTimes(d, t)),
                }
        }
    }

    function diceRepeat(dice, times) {
        return {
            type: "repeat",
            times,
            dice,
        }
    }

    function diceGroup(head, tail) {
        if (tail.length) return {
            type: "group",
            dice: [head].concat(tail),
        }
        return head;
    }

    function dice(sides) {
        return {
            type: "dice",
            sides,
        }
    }
}}

dice_expr =
    ws @dice_group ws

dice_group "dice group"=
    head:dice_repeat tail:(comma @dice_repeat)* { return diceGroup(head, tail) } /
    head:dice_repeat tail:(and @dice_repeat)* { return diceGroup(head, tail) }

dice_repeat "dice repeat"=
    n:uint repeat dice:dice_ntimes { return diceRepeat(dice, n) } /
    dice_ntimes

dice_ntimes "dice n times"=
    n:uint ws d:dice_offset { return diceTimes(d, n) } /
    dice_offset

dice_offset "dice offset"=
	d:dice_multiplier s:sign o:uint { return diceOffset(d, sign[s] * o) } /
    dice_multiplier

dice_multiplier "dice multiplier"=
    d:dice_n times m:uint { return diceMultiplier(d, m) } /
    dice_n

dice_n "dice"=
    [dD] n:uint { return dice(n) } /
    [dD] "%" { return dice(100) } /
    [dD] ls:list_n { return dice(ls) } /
    "(" @dice_group ")"

list_n "list of numbers"=
    "[" ws head:int tail:(comma @int)* ws "]" { return [head].concat(tail) }


times "times opearator"= ws @[Xx*] ws
sign "sign"= ws @[+-] ws
repeat "repeat"= ws @[#] ws
comma "group seperator"= ws @"," ws
and "group seperator"= ws @"&" ws
int "integers"= [+-]? [0-9]+ { return +text() }
uint "unsigned integers"= [0-9]+ { return +text() }
ws "whitespace"= [ \t\n\r]*
