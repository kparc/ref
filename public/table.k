t: ([a:1;b:2];[a:3;b:4])   / Row-wise
u: +`a`b !    (1 3;2 4)    / Col-wise ('+' at front for +able)
v:  `a`b ! /: (1 2;3 4)    / Row-wise, but de-duplicate headers

t~u
t~v

/ Break row-wise over multiple lines:
w: ([a:1;b:2]
    [a:3;b:4])

t~w

/ Break col-wise over multiple lines:
x: `a`b!/:(1 2
           3 4)

t~x