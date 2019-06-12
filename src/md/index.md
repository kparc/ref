## Verbs

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

### Assign `:` **assign**

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
f: {{x*x} reusedtempdata}
```

### Flip `+` **flip**

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

### Up `<` **up**

```q
 < "abracadabra"
0 3 5 7 10 1 8 4 6 2 9
 s@<s: "abracadabra"
"aaaaabbcdrr"
```

### Group `=` **group**

With a list, get back the indices at which each unique element appears:

```q
 ="abracadabra"
a|0 3 5 7 10
b|1 8
c|,4
d|,6
r|2 9
```

### Enumerate `!` **enum**

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

### Key `!` **key**

```q
 ! {a:1;b:2}
`a`b
```

### Except `^` **except**

```q
 (!4)^1
0 2 3
 (!4)^1 3
0 2
 "abracadabra" ^ "bc"
"araadara"
```

### Sort `^` **asc**

```q
 :: l: rand 4
0.5594068 0.1751217 0.3652149 0.5086234
 ^l
0.1751217 0.3652149 0.5086234 0.5594068
```

### Take `#` **take**

```q
 3#"abracadabra"
"abr"
```

Given a filter function (returning `1`s and `0`s only):

```q
 (2 mod)#!9
1 3 5 7
```

### Drop `_` **drop**

```q
 4_"abracadabra"
"cadabra"
```

### Floor `_` **floor**

```q
 _ 1.23 -1.23 0
1 -2 0
```

### Find `?` **find**

```q
 2 3 1 4 0 ? 3
1
 2 3 1 4 0 ? 3 1 0
1 2 4
```

### Distinct `?` **unique**

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

## Adverbs

There should be no spaces between an adverb and the expression on its left-hand side ([source](https://groups.google.com/d/msg/shaktidb/FRNnOgPgZWA/so4euXj7AAAJ)).

(This is how the `/` adverb is distinguished from ` /`, ie the start of a comment.)

Adverbs can be called in similar ways to verbs:

```q
 +/ 1 2 3
6
 /[+] 1 2 3
6
 (/ (+)) 1 2 3
6
```

### Each `'` **each**

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

### Over `/` **over**

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

### Scan `\` **scan**

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

### Each prior `':` **eachprior**

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

### Each right `/:` **eachright**

Compare to each:

```q
 "ab" ,' "cd"
ac
bd
 "ab" ,/: "cd"
abc
abd
```

### Each left `\:` **eachleft**

```q
 "ab" ,\: "cd"
acd
bcd
```

### Join `/:` **join**

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

### Split `\:` **split**

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

### Scalar from vector (sv) `/:` **sv**

Mnemonic tip: read 'sv' in k evaluation order, ie right to left.

Convert a vector of numbers from a specified base into base 10:

```q
 2/: 1 0 1 0
10
```

You can also turn a vector in (year, month, day) form into a k date:

```q
 `/: 2019 5 4
2019-05-04
```

### Vector from scalar (vs) `\:` **vs**

Mnemonic tip: read 'vs' in k evaluation order, ie right to left.

Convert a number from base 10 into a specified base:

```q
 10\: 1000
1 0 0 0
 2\: 10
1 0 1 0
```

You can also turn a k date into a (year, month, day) vector:

```q
 `\: .z.d
2019 5 4
```

## Nouns

### Floats

All of `1.0`, `.5`, `1f` are valid float literals.

### Lists

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

### Functions

Functions can call themselves by using their own name in their definition. Naive example:

```q
factorial: {$[x<2;1;x*factorial[x-1]]}
 factorial 4
24
```

A function with implicit `xyz` args can be distinguished from a dict by ensuring the body does not start with an assignment:

```q
 @{a:1;a*x}
value error: a
 @{;a:1;a*x}   / in scripts, can also be a newline instead of a semicolon
`1
```

### Expressions

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

## Utilities **util**

### `in` **/in(?= within)/**

```q
 `c`d in `a`b`c
1 0

 "abcz" in "abracadabra"
1 1 1 0

 2 10 in !9
1 0
```

### `within` **within**

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

### Frequency histogram

Counts of each item in the list.

```q
 freq "alibaba"
a|3
b|2
i|1
l|1
```

### `find` **find**

```q
 "abracadabra" find "bra"
1 3
8 3
```

### Sort ascending `asc` **[f]asc**

```q
 asc "abracadabra"
"aaaaabbcdrr"
```

### Sort descending `dsc` **[f]dsc**

```q
 dsc "abracadabra"
"rrdcbbaaaaa"
```

## Math **math**

### Absolute value `abs` **abs**

```q
 abs 1.23
1.23
 abs -1.23
1.23
```

### Permutations `prm` **prm**

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

### Natural logarithm (`log:`) and logarithm (`log`) **[n]log**

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

### Exponential (`exp:`) and power (`exp`) **[n]exp**

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

### Random `[n]rand` **[n]rand**

```q
 rand 3
0.7502717 0.8107001 0.8145892
 3 rand 10
7 3 9
```

### `mod` **mod**

```q
 2 mod !10
0 1 0 1 0 1 0 1 0 1
 2 3 4 mod 3
1 0 3
```

## Aggregations

### Median `med` **med**

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

## Tables and KSQL

### Tables **tabl**

A table is a list of dicts where each dict has the same keys in the same order.

A table can also be considered as a flipped dict of lists, where each list is of equal length.

```q
t: ({a:1;b:2};{a:3;b:4})   / Row-wise
u: +`a`b !    (1 3;2 4)    / Col-wise (flipped dict)
v:  `a`b ! /: (1 2;3 4)    / Row-wise, but de-duplicate headers using eachright

/ The tables match:
t~u
t~v

/ Break row-wise over multiple lines:
w: ({a:1;b:2}
    {a:3;b:4})

t~w

/ Break row-wise (condensed row format) over multiple lines:
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

### KSQL

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

## Commands

Access any shell command by putting a `\` in front of it:

```q
 \seq 3
1
2
3
```

### List files `\lf` **\lf file**

```q
 \lf
afile.txt
yet another file
```

### List character counts `\lc` **\lc char**

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

### List line counts `\ll` **\ll line**

```q
 \ll
afile.txt       |1
yet another file|3
```

### Help `\h` **\h help**

The official help included in the k binary. It's the navigation to this site!

### Changelog `\l` **\l log**

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

## IO and IPC

### Read/write line `0:` **read/write line**

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

### Read/write bytes `1:` **read/write byte**

```q
 "testfile" 1: 0x0123456789abcdef
 1: "testfile"
0x0123456789abcdef
```

You can verify `1:` works with raw bytes using an external tool:

```q
$ hexdump -C testfile
00000000  01 23 45 67 89 ab cd ef                           |.#Eg....|
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

### Read/write data `2:` **read/write data**

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

### Inter-process communication `3:` and `4:` **conn/set**

Start a k process running with port 1234 (that's `k -p 1234`).

Then in another k process, set up a connection to the first k process, send it commands, and get responses:

```q
2019-04-18 15:45:55 2core 1gb avx2 © shakti l2.0 test
 conn: 3: 1234
 conn 4: "life: 42"
 conn 4: "life"
42
```

## 3+ arguments

### Select `#[t;c;b[;a]]` **select**

Get all rows of `t` where `c` is true.

```q
 t: +`a`b!(1 2 3;4 5 6)
 #[t; :a>1]
a b
- -
2 5
3 6

 / But since there are just two arguments, we can use # as an infix verb:

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

### Update `_[t;c;b[;a]]` **update**

Via [Arthur](https://groups.google.com/d/msg/shaktidb/77qVfIc5ecU/eSRy8izkAQAJ):

```q
 t:+`b!2 3
 _[t;();`b! :b+1]
b
-
3
4
```

### Splice `?[x;i;f[;y]]` **splice**

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

### Amend `@[x;i;f[;y]]` **amend**

Replace the element at `i` in `x` with `y`.

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

### Cond `$[c;t;f]` **cond**

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

## Boolean checks **bool**

### `` `ascii `` **`ascii**

Are all characters in the string in the [ASCII set](https://en.wikipedia.org/wiki/ASCII#Character_set)?

```q
 `ascii @ "123"
1
 `ascii @ "∞"
0
```

## Datetimes **datetime**

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
 `Mon`Tue`Wed`Thu`Fri`Sat`Sun @ 7 mod 2024-01-01
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

### Current date `.z.d` **.z.D**

```q
.z.d / 2019-04-02
```

### Current time `.z.t` **.z.t**

Greenwich Mean Time.

```q
.z.t / 11:18:14.857
```

## Converters

### One-way conversions **1way**

Convert to with `` `x@data `` or `` `x data ``, where `` `x `` is the relevant name.

#### Parse `` `p `` **`p**

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

#### Matrix display `` `m `` **/\`m(?=\`)/**

```q
d: 1 2 3
d
1 2 3
`m d
1
2
3
```

### Two-way conversions **2way**

Convert to with `` `x@data `` or `` `x data ``, where `` `x `` is the relevant name.

Convert from with `` `x?serialdata ``.

#### Binary `` ` ``  **/\`(?=\`j)/**

```q
 ` "a"
0x0161
 ` `a
0x0f6100
 ` 10
0x070a000000
```

#### JSON `` `j `` **`j**

```q
 `j ({a:1;b:2};{a:"x";b:`z})
"[{\"a\":1,\"b\":2},{\"a\":\"x\",\"b\":\"z\"}]"
```

#### KSON `` `k `` **`k**

```q
 `k 2*!3
"0 2 4"
 `k ({a:1;b:2};{a:"x";b:`z})
"+{a:(1;\"x\");b:(2;`z)}"
```

## FAQ

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

### `.z.x`

In the REPL, contains an empty list by default:

```q
(base) chris@chris-VirtualBox:~/sheet$ k
2019-04-28 15:03:42 2core 1gb avx2 © shakti l2.0 test
 .z.x
()
```

But in a file, it lists the filename and any args after it. If `testarg.k` comprises the line `.z.x`:

```q
(base) chris@chris-VirtualBox:~/sheet$ k testarg.k not.a.real.file
2019-04-28 15:03:42 2core 1gb avx2 © shakti l2.0 test
testarg.k
not.a.real.file
```

Therefore, `.z.x` can be used to pass arguments to a k script.

Also, note those arguments won't appear if we load `testarg.k` in another k process:

```q
(base) chris@chris-VirtualBox:~/sheet$ k
2019-04-28 15:03:42 2core 1gb avx2 © shakti l2.0 test
\l testarg.k
()
```

So you can also use `.z.x` to identify whether a script was run in its own right, or merely `\l`-ed into another k process.

### Secrets!

In addition to `` `b64 ``, there's `` `b58 ``, [used](https://groups.google.com/d/msg/shaktidb/0yq21rHOacU/1wdeAGHFAAAJ) in the `` `bad `` implementation:

```q
 `b58 "helloworld"
"6sBRWyteSSzHrs"
```

## shakti-python

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

## Communities

- [shakti google group](https://groups.google.com/forum/#!forum/shaktidb) (official - for 'how to' queries)
- [the k tree](https://chat.stackexchange.com/rooms/90748/the-k-tree)
  write access: email `".@acegiklmnort"@7 13 12 4 4 0 10 5 10 1 5 9 2 6 8 0 3 11 9`
- [r/apljk](https://www.reddit.com/r/apljk/)


