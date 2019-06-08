## Verbs {Verb}

Force the monadic case by applying a `:` suffix.

Force the dyadic case by putting the verb in parentheses:

```q
 @1
`i
 (@)1
1@
```

Monadic and dyadic versions of a character are **different verbs** - it's not just a case of how many arguments they are called with.

For example, with a bracket call with one argument, the monadic verb will work fine, while the dyadic verb will project:

```q
 @:["abc"]
`C
 @["abc"]
"abc"@
```

For dyadic verbs, `x` is on the left and `y` is on the right:

```q
 1,2
1 2
 ,[1;2]
1 2
```

Project over the first argument by omitting it entirely:

```q
 @[;1] "abc"
"b"
```

Triadic versions of a verb are the same as the dyadic version (except for [`cond`](#cond)):

```q
 (?) . ("abcb"; "b")
1
 (?) . ("abcb"; 1; "d")
"adbcb"
```

### Assign `:` {assign}

Where an assignment is used in a function, consider rewriting code like this ([source](https://groups.google.com/d/msg/shaktidb/zejmh3vxdAg/6uCxAA2aAwAJ)):

```q
f: {a: reusedtempdata; a*a}
```

As this:

```q
f: {a*a:reusedtempdata}
```

Or this:

```q
f: { {x*x} reusedtempdata }
```

You can assign a value to a list index, or a dictionary key:

```q
 a:!3
 a[1]:4
 a
0 4 2

 d:{a:1;b:2}
 d[`a`c]:3 4
 d
a|3
b|2
c|4
```

You can combine assignment with other verbs:

```q
 a:1
 a+:1
 a
2

 l:()
 l,:1 2 3
 l
1 2 3

 l[0],:0
 l
1 0
2
3
```

Assign doesn't appear to be callable with square brackets; in fact the parse tree suggests it has an unconventional evaluation order:

```q
 `p "I[0]:4"
::
(`I;0)
4
```

Under normal bracket precedence, you'd lose info about where to assign to before the assign verb is invoked, because `` (`I;0) `` would resolve to the first element of `I`.

### Add `+` {add}

```q
 {a:1}+{a:2}
{a:3}
 {a:1}+{b:2}
a|1
b|2

 "a"+`c$25
"z"
```

### Flip `+:` {flip}

```q
  ("#";"##")
"#"
"##"

 +("#";"##")
##
##

 +("##";"###")
##
##
 #

 *++("##";"###")
"## "

 +(!1;!2)
0 0
Ø 1
```

### First `*:` {first}

First of an empty list is null of the type of the list:

```q
 *0#,1
Ø
```

### Divide by `%` {divideby}

```q
 1 % 2
0.5
```

### Min/and `&` {min-and}

Used as 'min':

```q
 2 & 1
1
 2 & 1 3
1 2
 1 3 & 2
1 2
 1 3 & 2 0
1 0
```

### Where `&:` {where}

Generate an ascending list of numbers, where the number of times number *i* appears is equal to the number at position *i* of the input list.

```q
 &1 0 2 1
^0 2 2 3
```

### Up `<:` {up}

```q
 < "abracadabra"
0 3 5 7 10 1 8 4 6 2 9
 s@<s: "abracadabra"
"aaaaabbcdrr"
```

### Equal `=` {equal}

```q
 1=1f
1
```

### Group `=:` {group}

With a list, get back the indices at which each unique element appears:

```q
 ="abracadabra"
a|0 3 5 7 10
b|1 8
c|,4
d|,6
r|2 9
```

### Match `~` {match}

Test whether data is identical. Can handle nested structures.

```q
 (1;"c";(;{a:2}))~(1;"c";(;{a:2}))
1
```

With one value different in the nested structure:

```q
 (1;"c";(;{a:2}))~(1;"c";(;{a:1}))
0
```

Unlike [equal `=`](#equal), match compares types:

```q
 1~1f
0
```

### Not `~:` {not}

```q
 ~3
0
 ~~3
1
```

### Enumerate `!:` {enum}

```q
 !3
0 1 2
 !2 3
0 0 0 1 1 1
0 1 2 0 1 2
```

With a negative integer argument, generate an identity matrix:

```q
 !-3
1 0 0
0 1 0
0 0 1
```

Given a dict, get its keys:

```q
 ! {a:1;b:2}
`a`b
```

### Catentate `,` {catenate}

Joins two atoms. Prepends/appends an atom to a list. Merges lists.

```q
 1,2
1 2
 1 2,3
1 2 3
 1,2 3
1 2 3
 1 2,3 4
1 2 3 4
```

If you want to make a list nested in the output, enlist it first:

```q
 1,,2 3
1
2 3
```

Catenate merges dicts (where keys collide, right overrides left):

```q
 {a:1;b:2},{a:3;c:4}
a|3
b|2
c|4
```

Tables are lists of dicts, so:

```q
 t:+{a:,1}
 u:+{a:,2}
 t,u
a
-
1
2
```

### Key `!` {key}

Generate a dictionary from lists of keys and values:

```q
 `k @ `a`b!1 2
"{a:1;b:2}"
```

### Except `^` {except}

```q
 (!4)^1
0 2 3
 (!4)^1 3
0 2
 "abracadabra" ^ "bc"
"araadara"
```

### Sort ascending `^:` {sort-asc}

```q
 :: l: rand 4
0.5594068 0.1751217 0.3652149 0.5086234
 ^l
0.1751217 0.3652149 0.5086234 0.5594068
```

### Take `#` {take}

```q
 3#"abracadabra"
"abr"
```

Given a filter function ('uniform boolean', ie returns a list of booleans same length as the input list):

```q
 (2 mod)#!9
1 3 5 7

 (>':)#3 1 4
3 4

 ({x~|x}')#("racecar";"nope";"bob")
racecar
bob
```

Taking zero elements of a list generates an empty list of the type of the first element of the list (or if the list is empty, the type of the list):

```q
 0#(1;`a)
!0
 0#!0
!0
```

### Drop `_` {drop}

```q
 4_"abracadabra"
"cadabra"
```

### Floor `_:` {floor}

```q
 _ 1.23 -1.23 0
1 -2 0
```

### Find `?` {find}

```q
 2 3 1 4 0 ? 3
1
 2 3 1 4 0 ? 3 1 0
1 2 4
```

`i?` is draw (with replacement), `-i?` is deal (without replacement):

```q
 ^ 9 ? 9
^1 3 5 5 6 6 7 7 8
 ^ -9 ? 9
^?0 1 2 3 4 5 6 7 8

 10 ? 9
1 0 1 7 3 6 2 2 5 0
 -10 ? 9
-10 ? 9
    ^
length error
```

You can also draw or deal from a list:

```q
 3 ? "abcd"
"daa"
 -3 ? "abcd"
"acb"
```

### Unique `?:` {unique}

```q
 ? "abracadabra"
"abrcd"
 ? ("hi"; 1 2 3; `a`b; 0; "hi"; `a`b; 1 2; 0)
"hi"
1 2 3
`a`b
0
1 2
```

### Index `@` {index}

With an atom, applies that atom to the left function:

```q
 (1+) @ 2
3
```

With a list, applies each element of that list to the function ('shallow' application, ie doesn't go beyond `x` of `xyz`):

```q
 (1+) @ 2 4 7
3 5 8
```

### Apply `.` {apply}

```q
 {z,x,y} . `a`b`c
`c`a`b
```

Apply can also be used to 'drill' into a data structure in a similar way to bracket indexing. For example:

```q
 :: m: 3 3 # !9
0 1 2
3 4 5
6 7 8

 / Atom at x position
 m[1]
3 4 5
 m . 1
3 4 5

 / List in x position
 / Notice [] effectively enlists a single arg
 m[1 2]
3 4 5
6 7 8
 m . ,1 2
3 4 5
6 7 8

 / Atoms at x and y positions
 m[1; 2]
5
 m . 1 2
5
```

### Value `.:` {value}

```q
 . "1+2"
3

 d:1
 . "d+:1"
 d
2

 . {a:1;b:2}
1 2

 . :x+y
(+;`x;`y)
":x+y"

 . {x+y+a:1}
(+;`x;(+;`y;(::;`a;1)))
"{x+y+a:1}"
`
`x`y
,`a
```

### Cast `$` (with a non-string) {cast}

```q
 "YMD"$0
2024Y
2024-01M
2024-01-01

 (`Y`M`D$0)~"YMD"$0
1

 `c $ 65+!3
"ABC"
```

However, casting chars to ints/floats/etc is more like a parse than a cast:

```q
 `i$"123"
123
 `i$"ABC"
Ø
```

If you want ASCII numbers of characters:

```q
 0+"ABC"
65 66 67
 0f+"ABC"
65 66 67f
```

### Pad `$` (with string) {pad}

Pads with spaces on right-hand side, or truncates from right:

```q
 4$"abc"
"abc "
 2$"abc"
"ab"
```

### String `$:` {string}

```q
 $1
,"1"

 $`name
"name"

 ${a:1 2;b:3}
a|(,"1";,"2")
b|,"3"

 :: s:$+`a`b!(1 2;3 4)
a b
- -
1 3
2 4

 s[0][`a]
,"1"
```

## Adverbs {Adverb}

There should be no spaces between an adverb and the expression on its left-hand side ([source](https://groups.google.com/d/msg/shaktidb/FRNnOgPgZWA/so4euXj7AAAJ)).

(This is how the `/` adverb is distinguished from ` /`, ie the start of a comment.)

Adverbs can be called in similar ways to verbs:

```q
 +/ 1 2 3
6
 /[+] 1 2 3
6
 (/ (+)) 1 2 3
6
```

### Each `'` {each}

Make a function apply to each element of its input lists, rather than the list itself.

```q
 "~" , "abc"
"~abc"
 "~" ,' "abc"
~a
~b
~c
```

'Each' will apply to pairings of its input lists:

```q
 "ab" ,' "cd"
ac
bd

 {x,y,z}'["ab";"cd";"ef"]
ace
bdf
```

### Over `/` {over}

n f/x

```q
 3 {x+1}/10
13
```

p f/x

```q
 {4>#x} {x,"k"}/"o"
"okkk"
```

### Scan `\` {scan}

n f\x

```q
 3 {x+1}\10
10 11 12 13
```

p f\x

```q
 {4>#x} {x,"k"}\"o"
"o"
"ok"
"okk"
"okkk"
```

### Each prior `':` {each-prior}

The null chosen for the first pairing is of the type of the first member of the list.

```q
 {y,x}': !3
Ø 0
0 1
1 2
 {y,x}': 1.0 2.1 4.7
ø 1
1 2.1
2.1 4.7
 {y,x}': ("a";1;`ok)
" a"
("a";1)
(1;`ok)
```

`':` can also provide a 'sliding window' of size `x` over `y`:

```q
 3': !5
0 1 2
1 2 3
2 3 4
```

### Each right `/:` {each-right}

Compare to each:

```q
 "ab" ,' "cd"
ac
bd
 "ab" ,/: "cd"
abc
abd
```

### Each left `\:` {each-left}

```q
 "ab" ,\: "cd"
acd
bcd
```

### Join `/:` {join}

The following work with **lists of strings**.

Prepend the separator to `/:`, [without a space in between](https://groups.google.com/d/msg/shaktidb/FRNnOgPgZWA/so4euXj7AAAJ).

```q
 "-"/: ("la";"li";"lu";"le";"lo")
"la-li-lu-le-lo"
```

With empty symbol as 'separator', appends a newline to each string and joins. (This is also known as 'sS' or 'string from String', with capitalisation following the k7 convention of lower for atom, upper for list of atoms of same type).

```q
 `/: ("ab";"cd")
"ab\ncd\n"
```

With three characters instead of just a separator, prepends/appends the first and last:

```q
 "(;)"/: (,:' "abcd")
"(a;b;c;d)"
```

That means 'join' can't be used for multi-character separators, but you can always do this ([source](https://groups.google.com/d/msg/shaktidb/ttIdJiWx9xI/hiTjuX7_BAAJ)):

```q
 {y,x,z}[", "]/$`ab`cd`ef
"ab, cd, ef"
```

### Split `\:` {split}

Prepend the separator to `\:`, [without a space in between](https://groups.google.com/d/msg/shaktidb/FRNnOgPgZWA/so4euXj7AAAJ).

```q
 "-"\: "la-li-lu-le-lo"
la
li
lu
le
lo
```

With empty symbol as 'separator', splits on newlines, including (if present) at the end of the last word. (This is also known as 'Ss' or 'String from string'.)

```q
 `\: "ab\ncd\n"
ab
cd
 `\: "ab\ncd"
ab
cd
```

### Scalar from vector (sv) `/:` {sv}

Mnemonic tip: read 'sv' in k evaluation order, ie right to left.

Convert a vector of numbers from a specified base into base 10:

```q
 2/: 1 0 1 0
10
```

Zero is represented as an empty integer list `!0`, not `0`:

```q
 10/: !0
0
 10/: 0
{ {z+y*x} / [0;x;y] }
     ^
class error
```

You can also turn a vector in (year, month, day) form into a k date:

```q
 `/: 2019 5 4
2019-05-04
```

### Vector from scalar (vs) `\:` {vs}

Mnemonic tip: read 'vs' in k evaluation order, ie right to left.

Convert a number from base 10 into a specified base:

```q
 10\: 1000
1 0 0 0
 2\: 10
1 0 1 0
```

Conversion of zero into a base may be surprising (empty list), but is consistent:

```q
 10\: 0
!0
```

You can also turn a k date into a (year, month, day) vector:

```q
 `\: .z.d
2019 5 4
```

## Nouns {Noun}

### Floats {float}

All of `1.0`, `.5`, `1.`, `1f` are valid float literals.

```q
 Ø=ø
1
 Ø~ø
0
```

### Lists {list}

`` (2;3.4;`c) `` (or any list of atoms, functions etc) can also be written `` 2,3.4,`c ``:

```q
 (2;3.4;`c)~2,3.4,`c
1
```

But it breaks down when you include nested lists such as strings:

```q
 2,"hi",`c
2
"h"
"i"
`c
```

### Dictionaries {dict}

Dicts are ordered:

```q
 |{a:1;b:2}
b|2
a|1
```

Recover the keys and values using `!:` and `.:`:

```q
 !{a:1;b:2}
`a`b
 .{a:1;b:2}
1 2
```

### Functions {func}

Functions can call themselves by using their own name in their definition. Naive example:

```q
factorial: {$[x<2;1;x*factorial[x-1]]}
 factorial 4
24
```

A function with implicit `xyz` args can be distinguished from a dict by ensuring the body does not start with an assignment (eg start with `;` or, in scripts, a newline):

```q
 @{a:1;a*x}
value error: a
 @{;a:1;a*x}
`1
```

### Expressions {expr}

Exprs can be executed on tables, eg:

```q
 t: +`a`b!(1 2 3;4 5 6)
 t :a>1
0 1 1
 t@&t :a>1
a b
- -
2 5
3 6
```

Some expr functionality is NYI. For more info, see [this forum post](https://groups.google.com/d/msg/shaktidb/5N6VjsOBjoA/GjFgeP4yDAAJ).

## Utilities {util}

### `in` {in}

```q
 `c`d in `a`b`c
1 0

 "abcz" in "abracadabra"
1 1 1 0

 2 10 in !9
1 0
```

### `within` {within}

```q
 `p within `A`z
1
 `p within `A`Z
0
```

Includes lower bound, excludes upper bound:

```q
 1 within 1 2
1
 2 within 1 2
0
 1 2 3 within 1 2 3
0 1 0
```

### `like` {like}

```q
 "abc" like "*b?"
1
 "abcd" like "*b?"
0

 (,"1") like "[0-3]"
1
 (,"4") like "[0-3]"
0
```

### Frequency histogram `freq` {freq}

Counts of each item in the list.

```q
 freq "alibaba"
a|3
b|2
i|1
l|1
```

### `find` {find}

```q
 "abracadabra" find "bra"
1 3
8 3
```

### Sort ascending `[f]asc` {[f]asc}

```q
 asc "abracadabra"
"aaaaabbcdrr"
```

### Sort descending `[f]dsc` {[f]dsc}

```q
 dsc "abracadabra"
"rrdcbbaaaaa"
```

### Key `[f]key` {[f]key}

Turn a table into a keyed table:

```q
 `a`c key ({a:1;b:2;c:3};{a:4;b:5;c:6})
a c|b
- -|-
1 3|2
4 6|5
```

## Math {math}

### Absolute value `abs` {abs}

```q
 abs 1.23
1.23
 abs -1.23
1.23
```

### Permutations `prm` {prm}

Generates permutation indices.

```q
 prm 3
0 1 2
1 0 2
1 2 0
0 2 1
2 0 1
2 1 0
```

### Combinations {cmb}

```q
 2 cmb 3
0 1
0 2
1 2
```

### Natural logarithm (`log:`) and logarithm (`log`) {[n]log}

Monadic: natural logarithm, ie the power you'd need to raise *e* by to get `x`.

```q
 log 2
0.6931472
 log (exp 1)
1f
 (exp 1) exp (log 2)
2f
```

Dyadic: logarithm, ie the number you'd need to raise the left number to to get the right number.

```q
 2 log 2
1f
 2 log 4
2f
```

### Exponential (`exp:`) and power (`exp`) {[n]exp}

Monadic: *e* to the power of `x`.

```q
 exp 1
2.718282
 exp 2
7.389056
 (exp 1) exp 2
7.389056
```

Dyadic: left to the power of right.

```q
 2 exp 4
16f
 2 exp -1
0.5
```

### Random `[n]rand` {[n]rand}

Uniform distribution `rand i` or `i rand i`:

```q
 rand 3
0.7502717 0.8107001 0.8145892
 3 rand 10
7 3 9
```

Normal distribution `rand -i`:

```q
 `m @ rand -5
1.207587
0.5333917
0.3390071
-0.2990315
0.8556685
```

### `mod` {mod}

```q
 2 mod !10
0 1 0 1 0 1 0 1 0 1
 2 3 4 mod 3
1 0 3
```

## Aggregations {aggr}

### Median `med` {med}

The value in the middle if the data was sorted.

If the count of the data is even, return the value on the right of the middle.

```q
 med !3
1
 med !4
2
 med 2 3 1
2
```

## Tables and KSQL {tables-ksql}

### Tables {table}

A table is a list of dicts where each dict has the same keys in the same order.

A table can also be considered as a flipped dict of lists, where each list is of equal length.

```q
t: ({a:1;b:2};{a:3;b:4})
u: +`a`b !    (1 3;2 4)
v:  `a`b ! /: (1 2;3 4)

/ The tables match:
t~u
t~v

/ Break row-wise over multiple lines:
w: ({a:1;b:2}
    {a:3;b:4})

t~w

/ Break row-wise (condensed row format)
/ over multiple lines:
x: `a`b!/:(1 2
           3 4)

t~x
```

You can access rows or columns of the table by indexing using the row number or column key:

```q
t[1]    / {a:3;b:4}
t[`b]    / 2 4
t[1;`a]  / 3
```

Key tables are dictionaries where the rows of one table map to the rows of another table.

```q
k: ({a:1;c:3}
    {a:4;c:6})
v: ({b:2};{b:5})
kt: k!v
kt   / (+{a:1 4;c:3 6})!+{b:2 5}
@kt  / `a
```

You can also use `key` to set the key columns after creation:

```q
 t: ({a:1;b:2;c:3};{a:4;b:5;c:6})
 tk: `a`c key t
 tk~kt  / 1
```

Access rows of the value table by indexing into the keytable:

```q
kt[{a:4;c:6}]  / {b:5}
```

### KSQL {ksql}

```q
 t: ({a:1;b:2};{a:3;b:4})
 update b:a*2 from t
a b
- -
1 2
3 6
```

Note t is not updated in-place:

```q
 t
a b
- -
1 2
3 4
```

Use `by` to group rows or aggregations:

```q
 :: t: ({a:1;b:2;c:3};{a:2;b:3;c:4};{a:1;b:4;c:5})
a b c
- - -
1 2 3
2 3 4
1 4 5

 select by a from t
a|
-|--------------------
1|+{a:1 1;b:2 4;c:3 5}
2|,{a:2;b:3;c:4}

 select sum b by a from t
a|b
-|-
1|6
2|3
```

## Commands {commands}

Access any shell command by putting a `\` in front of it:

```q
 \seq 3
1
2
3
```

### List files `\lf` {lf}

```q
 \lf
afile.txt
yet another file
```

### List character counts `\lc` {lc}

```q
 \lc
afile.txt       |29
yet another file|50
```

You can't assign the result of `\lc` directly (ie `a: \lc` doesn't work). But you *can* capture its output and see that it is in fact a dictionary:

```q
 {(x;@x)} @ . "\\lc"
("afile.txt";"yet another file")!29 50j
`a
```

### List line counts `\ll` {ll}

```q
 \ll
afile.txt       |1
yet another file|3
```

### Help `\h` {h}

The official help included in the k binary. It's the navigation to this site!

### Changelog `\l` {l}

As at 2019-05-17:

```q
20190524
FIX
,/,(:)

20190522
?2 3 5
^2 3 5
FIX
\ll
\lc

20190517
FIX
left join(missing) (+`a`b!(2 3 4;4 5 6)),(+`a!2 4)!+`b!7 8

20190508
+("**";"***") /flip pad
(0>)+/0 1 -1 -1 0 1 1 1 / early exit

20190506
recursion
r:{[a;b;f;g;x]$[x~a;b;f[x]r[a;b;f;g]g x]}
r[1;1;*;-1+]4
1 1(*;-1+)/4
(3;,2)({y,1_&&/x#'!:'y};1+_sqrt)/100

NUC
^x /sort
=x /sortkey
PRF
n^
!n
*|:  /composition
,/+: /composition

20190504
`aes?`aes@"kei" /encrypt&xdecrypt 4GB per second
freq"alibababa" /frequency histogram 1Billion per second

20190503
FIX
select #n by b from +`b!2 2 3 4

20190501
v:2 3
@[`v;0;7]
PRF
n^i <x ?x x?y

20190430
x^y rank sensitive
f#d domain error if f missing

20190428
"Ds"$.z.S        / date,second
1970Y+`t$1.56e12 / unix epoch

20190427
3000000000 (goes to j)
`f$Ø
12h
`p?`p"{a:1;b:2 3}"

20190426
u:1970Y;T:.z.T;t:T-u;u+t
\gr "write " k.txt

20190425
\t  calibrate
`j? whitespace

20190421
`D$"20190320"
NUC
`/:`\:.z.d
FIX
"\n"

20190420
`j?`j .z.T
`j?"123"
{ v:1};{"v":1}
K:key k:key`k1     / public private
K key k key"hi"    / verify sign
4 7 mod x
FIX
`a#t

20190418
{a:2}   instead of [a:2]
mod/div instead of n! -n!  7 mod .z.d
[n]rand instead of n?
"math*"#."\\h"
\gr math k.txt (200 times faster than \grep math k.txt)

20190415
\h help
\l changelog
!-n identity matrix
. x eval
`/: sS(string from String)
`\: Ss(String from string)
`ascii`utf8`print ".."
FIX
-':2 3.4
.z.T-.z.T
sum !3
```

## IO and IPC {io-ipc}

### Read/write line `0:` {io-line}

Given the following in `test.csv`:

```q
1,ABC,1.23
3,DEF,4567.89
```

We can read it in as lists of type `inf` respectively and separator `,`:

```q
 ("inf";",")0:"test.csv"
1 3
`ABC`DEF
1.23 4567.89
```

The filename can be given as `` `test.csv `` instead of `"test.csv"` (one char shorter!).

We can also write lists of strings to a file (verify output using a text editor):

```q
 "test.txt" 0: ("hello";"world")
```

And that includes saving tables to CSV, if we first convert the table to a list of strings:

```q
 "test.csv" 0: `csv @ +{a:1 2; b:3 4}
```

You can also use `0:` to deserialise in-memory lists of strings with a common separator. [Arthur's example](https://groups.google.com/d/msg/shaktidb/vE4ffjndxik/rYF6K78oBQAJ):

```q
  ("ii";"|")0:("2|3";"3|4";"4|5")
2 3 4
3 4 5
```

Keep in mind it's reading the data into columns, not rows. The first row of the console output is the first item in a list of columns.

### Read/write bytes `1:` {io-bytes}

```q
 "testfile" 1: 0x0123456789abcdef
 1: "testfile"
0x0123456789abcdef
```

You can verify `1:` works with raw bytes using an external tool:

```q
$ hexdump -C testfile
00000000  01 23 45 67 89 ab cd ef
00000008
```

And to break down what's happening in the 'prompt' example from the official tutorial, ie:

```q
 name: 1: ("" 1: "What is your name? ")
What is your name? Me
 name
"Me"
```

- Read from stdin: `1: ""` or `` 1: ` ``
- Write to stdout: `"" 1: "string"` or `` ` 1: "string" ``
- `x 1: y` returns `x` ([source](https://groups.google.com/d/msg/shaktidb/DmV2eoSEGHU/eEEOKfjCBQAJ))

On the last point: if just writing to stdout, make sure to put a semicolon at the end to suppress outputting the characters on the left of `1:` to the REPL.

### Read/write data `2:` {io-data}

```q
 "testfile" 2: (1 2 3 4)
 2: "testfile"
1 2 3 4
```

You can see what `testfile` looks like in bytes with `1:`:

```q
 1: "testfile"
0x000000070400000001000000020000000300000004000000
```

### Inter-process communication `3:` and `4:` {conn}

Start a k process running with port 1234 (that's `k -p 1234`).

Then in another k process, set up a connection to the first k process, send it commands, and get responses:

```q
2019-04-18 15:45:55 2core 1gb avx2 © shakti l2.0 test
 conn: 3: 1234
 conn 4: "life: 42"
 conn 4: "life"
42
```

## 3+ arguments {3args}

### Select `#[t;c;b[;a]]` {select}

Get all rows of `t` where `c` is true.

```q
 t: +`a`b!(1 2 3;4 5 6)
 #[t; :a>1]
a b
- -
2 5
3 6

 / But since there are just two arguments,
 / we can use # as an infix verb:

 t # :a>1
a b
- -
2 5
3 6

 t # :(a>1)&(b<6)
,{a:2;b:5}
 t # :(a>1)&(b<5)
+{a:!0;b:!0}
```

### Update `_[t;c;b[;a]]` {update}

Via [Arthur](https://groups.google.com/d/msg/shaktidb/77qVfIc5ecU/eSRy8izkAQAJ):

```q
 t:+`b!2 3
 _[t;();`b! :b+1]
b
-
3
4
```

### Splice `?[x;i;f[;y]]` {splice}

Insert `y` into `x` at index `i`.

If an element was at that index before, move it right.

```q
 ?[!3;2;`abc]
0
1
`abc
2
 ?[!3;2;"abc"]
0
1
"a"
"b"
"c"
2

```

### Amend `@[x;i;f[;y]]` {amend}

Apply function f to the elements at each `i` of `x` (with argument `y`, if f is dyadic).

```q
 @[!3; 0 2; 1+]
1 1 3
 @[!3; 0 2; +; 2 7]
2 1 9
```

To do the update in-place, use the data's name symbol instead of the name directly (`` `name `` vs `name`).

```q
v:!3
 @[v;1;7]
0 7 2
 v
!3   / original assignment unchanged
 @[`v;1;7]
`v
 v
0 7 2
```

### Dmend `.[x;i;f[;y]]` {dmend}

Think of dmend as 'deep' or 'drill' amend - it's similar to amend in the same way that dyadic `.` and `@` are similar.

`i` is a list that governs which slices of `x` to apply `f` to.

Apply function to all elements:

```q
 .[!3; (); +; 1]
1 2 3
```

Apply `f` to slices 0 and 2 on the first 'depth' level down:

```q
 .[!3; ,0 2; 7]
7 1 7
```

Apply to rows or specific elements of a matrix:

```q
 :: m: 3 3 # !9
0 1 2
3 4 5
6 7 8

 / Row 1:

 .[m; ,1; 1+]
0 1 2
4 5 6
6 7 8

 / Row 1, element 2:

 .[m; 1 2; 1+]
0 1 2
3 4 6
6 7 8

 / Row 0, elements 1 and 2:

 .[m; (0; 1 2); 1+]
 0 2 3
 3 4 5
 6 7 8

 / In each of rows 1 and 2, elements 1 and 2:

 .[m; (1 2; 1 2); 1+]
 0 1 2
 3 5 6
 6 8 9

 / In all rows, elements 1 and 2:

 .[m; (; 1 2); 1+]
0 2 3
3 5 6
6 8 9
```

### Cond `$[c;t;f]` {cond}

If the true expression is returned, the false expression never executes (and vice versa):

```q
 a:1;b:1
 $[1;a+:1;b+:1]; (a;b)
2 1
 $[0;a+:1;b+:1]; (a;b)
2 2
```

[Unlike other triadics](#Verb), triadic `$` is not the same as dyadic `$`:

```q
 ($) . (`n; "a")
`a
 ($) . (1; "a"; "b")
($) . (1; "a"; "b")
    ^
nyi error
```

Simulate a vector cond:

```q
 {$[x;y;z]}'[1 0 1; "abc"; "def"]
"aec"
```

Or (modified version of [Arthur's](https://groups.google.com/d/msg/shaktidb/6JLpGPE-bfM/mlAzxcrgAQAJ) - no `$` needed!):

```q
 {(+(z;y))@'x}[1 0 1;"abc";"def"]
"aec"
```

## Boolean checks {bool}

### `` `ascii `` {ascii}

Are all characters in the string in the [ASCII set](https://en.wikipedia.org/wiki/ASCII#Character_set)?

```q
 `ascii @ "123"
1
 `ascii @ "∞"
0
```

## Datetimes {datetime}

A datetime looks like this:

```q
 .z.T
2019-05-04T13:13:12.313
```

Datetime literals are [designed](https://groups.google.com/forum/#!topic/shaktidb/184DnAJrwKU) to match [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.

Dates start from `2024-01-01`:

```q
 `D $ 0
2024-01-01
```

'0' is Monday. Get the day of the week with `7 mod`.

```q
 d:`Mon`Tue`Wed`Thu`Fri`Sat`Sun
 d @ 7 mod 2024-01-01
`Mon
```

You can also use duration literals (requires short-form code), and do date arithmetic:

```q
 .z.d
2019-05-04
 .z.d + 2m
2019-07-04
```

Datetime and duration names:

| Long-form duration | Short-form duration | Datetime |
| ------------------ | ------------------- | -------- |
| \`year             | \`y                 | \`Y      |
| \`month            | \`m                 | \`M      |
| \`date             | \`d                 | \`D      |
| \`hour             | \`h                 | \`H      |
| \`minute           | \`r                 | \`R      |
| \`second           | \`s                 | \`S      |
| \`millisecond      | \`t                 | \`T      |
| \`microsecond      | \`u                 | \`U      |
| \`nanosecond       | \`v                 | \`V      |

Convert to/from/between datetimes and durations using `$`. It takes a name or string (short version only):

```q
 `year $ .z.t
2019y
 `y  $ 2019
2019y
 "y" $ 2019
2019y
```

Convert between dates and year, month date digits using [`` `/: ``](#sv) and [`` `\: ``](#vs).

### Current date `.z.d` {.z.d}

```q
.z.d / 2019-04-02
```

### Current time `.z.t` {.z.t}

Greenwich Mean Time.

```q
.z.t / 11:18:14.857
```

## Converters {converters}

### One-way conversions {1way}

Convert to with `` `x@data `` or `` `x data `` or `` `x[data] ``, where `` `x `` is the relevant name.

#### Parse `` `p `` {parse}

```q
 `p @ "5*!3"
*
5
(!:;3)
```

A parse tree can be executed with `.`:

```q
 . `p @ "5*!3"
0 5 10
```

Although parse trees can be converted into strings with `` `p ? ``, it is not a lossless conversion.

The parser enlists names (and lists of names) to indicate they should not be evaluated.

Examples:

```q
 e: "1;.1;`n;\"c\";1 2;1. 2.;`n`o;\"chars\";"
 e,:":;v;1+2;+/1 2;{x+2y};a:1;:a+2b; /comment;\\h"

 {{string: x; parsetree: `p x; type: @ `p x}}' ";"\: e
string    parsetree   type
--------- ----------- ----
1         1           i
.1        0.1         f
`n        ,`n         N
"c"       "c"         c
1 2       1 2         I
1. 2.     1 2f        F
`n`o      ,`n`o
"chars"   "chars"     C
:         :           2
v         `v          n
1+2       (+;1;2)
+/1 2     ((/;+);1 2)
{x+2y}    {x+2y}      1
a:1       (::;`a;1)
:a+2b     :a+2b       0
 /comment             1
\h        (\;`h)
```

#### Matrix display `` `m `` {matrix}

```q
d: 1 2 3
d
1 2 3
`m d
1
2
3
```

### Two-way conversions {2way}

Convert to with `` `x@data `` or `` `x data ``, where `` `x `` is the relevant name.

Convert from with `` `x?serialdata ``.

#### Binary `` ` `` {binary}

```q
 ` "a"
0x0161
 ` `a
0x0f6100
 ` 10
0x070a000000
```

#### JSON `` `j `` {json}

```q
 `j ({a:1;b:2};{a:"x";b:`z})
"[{\"a\":1,\"b\":2},{\"a\":\"x\",\"b\":\"z\"}]"
```

#### KSON `` `k `` {kson}

```q
 `k 2*!3
"0 2 4"
 `k ({a:1;b:2};{a:"x";b:`z})
"+{a:(1;\"x\");b:(2;`z)}"
```

#### `` `csv `` {csv}

```q
 `csv ? ("a,b";"1,2";"3,4")
a b
- -
1 2
3 4
```

## FAQ {FAQ}

#### How can I test if something is an atom, or a list?

```q
isatom:{x~*x}
```

#### How do I see the output of an assignment expression?

Use the identity function, `::`:

```q
 a:1+2  / no output
 :: a:1+2
3
 @(::)
`1
```

#### How do I make an empty typed list?

For characters, it's just `""`:

```q
 #""
0
 @""
`C
```

For integers and floats, use `!`:

```q
 @!0
`I
 #!0
0
 @!.0
`F
 #!.0
0
```

For other types, take 0 elements of an atom of that type (may be a better way?). For example, for names:

```q
 @0#`
`N
 #0#`
0
```

## `.z` namespace

### `.z.x` {.z.x}

In the REPL, contains an empty list by default:

```q
(base) chris@chris-VirtualBox:~$ k
2019-04-28 15:03:42 2core 1gb avx2 © shakti l2.0 test
 .z.x
()
```

But in a file, it lists the filename and any args after it. If `testarg.k` comprises the line `.z.x`:

```q
(base) chris@chris-VirtualBox:~$ k testarg.k not.a.real.file
2019-04-28 15:03:42 2core 1gb avx2 © shakti l2.0 test
testarg.k
not.a.real.file
```

Therefore, `.z.x` can be used to pass arguments to a k script.

Also, note those arguments won't appear if we load `testarg.k` in another k process:

```q
(base) chris@chris-VirtualBox:~$ k
2019-04-28 15:03:42 2core 1gb avx2 © shakti l2.0 test
 \l testarg.k
()
```

So you can also use `.z.x` to identify whether a script was run in its own right, or merely `\l`-ed into another k process.

### Secrets! {secrets}

In addition to `` `b64 ``, there's `` `b58 ``, [used](https://groups.google.com/d/msg/shaktidb/0yq21rHOacU/1wdeAGHFAAAJ) in the `` `bad `` implementation:

```q
 `b58 "helloworld"
"6sBRWyteSSzHrs"
```

## shakti-python {shakti-python}

### Install

One way to install shakti-python is to use [Miniconda](https://conda.io/projects/conda/en/latest/user-guide/install/index.html).

To install Miniconda under Ubuntu 18.04:

- Download the Miniconda installer for Python 3, 64-bit ([direct link](https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh))
- In a terminal in your download directory, run:
`bash Miniconda3-latest-Linux-x86_64.sh`

Once Miniconda is installed, open a new terminal and run:
`conda install -c shaktidb shakti-python`.

Then to get to shakti-python, at the prompt, run `python`
(or if you chose to not update your .bashrc, `~/miniconda3/bin/python`).

Type `help('shakti')` at the Python prompt to view the package help.

### Examples

```q
(base) chris@chris-VirtualBox:~$ python
Python 3.7.1 (default, Dec 14 2018, 19:28:38)
[GCC 7.3.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
>>> import shakti
>>>
>>> # Execute k commands:
... a = shakti.k("!3")
>>> a
k('!3')
>>>
>>> a.  # press tab twice for auto-completion (have truncated output)
a.append(    a.cat(       a.distinct(  a.eq(        a.first(     a.group( ...
a.apply(     a.clear(     a.dsc(       a.eval(      a.flip(      a.iasc(  ...
a.asc(       a.count(     a.enlist(    a.extend(    a.floor(     a.idesc( ...
>>>
>>> # shakti functions and object methods can take Python objects directly:
... a.cat((1, 2, 3))
k('0 1 2 1 2 3')
>>> b = a.cat((1, 2, 3)).where
>>> b
k('1 2 2 3 4 4 5 5 5')
>>> sum(b)
k('31')
>>>
>>> # User-facing module API:
... shakti.__all__
['q', 'k', 'o', 'flip', 'neg', 'sqrt', 'enum', 'parse', 'where', 'reverse',
'count', 'first', 'last', 'sum', 'min', 'max', 'avg', 'var', 'iasc', 'idesc',
'group', 'not_', 'enlist', 'null', 'floor', 'string', 'distinct', 'type_',
'eval_', 'apply', 'at', 'rand', 'find', 'cast', 'take', 'shape', 'match',
'cat', 'drop', 'cut', 'log', 'exp', 'sin', 'cos', 'first', 'last', 'error',
'Ø', 'ø', 'inf', 'show']
>>>
>>> # Convert Python objects to k:
... shakti.o(range(10))
k('!10')
>>> # o is equivalent to k's identity function:
... shakti.o == shakti.k('::')
True
>>>
>>> # Add globals to k:
... shakti.q.a = [1,2,3]
>>> shakti.k("a*2")
k('2 4 6')
>>> shakti.q.a * 2
k('2 4 6')
>>>
>>> # REPL: shakti.k_repl(), or just...
... /
 +/ 1 2 3
6
 \\
>>>
```

shakti-python also lets you do some things that k doesn't:

- [Delete globals](https://groups.google.com/d/msg/shaktidb/etsXDI9J4o4/HmefTXyBAwAJ) (at your peril!)
- [Catch errors](https://groups.google.com/d/msg/shaktidb/lQ3XSvFPDhw/DOlmmFgHDAAJ)

## Communities {communities}

- [shakti google group](https://groups.google.com/forum/#!forum/shaktidb) (official - for 'how to' queries)
- [the k tree](https://chat.stackexchange.com/rooms/90748/the-k-tree)
  write access: email `".@acegiklmnort"@7 13 12 4 4 0 10 5 10 1 5 9 2 6 8 0 3 11 9`
- [r/apljk](https://www.reddit.com/r/apljk/)