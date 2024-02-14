## comments

```cpp
// comment
# comment
; comment   WAL
/*
 multi line
*/
```

## Expressions

```ebnf
signal_name ::= IDENT;
primary_expr ::= LITERAL;
               | IDENT
               | `(` expr `)`;

expr ::= primary_expr
       | expr `[` INT `]`
       | expr `[` INT `:` INT `]`
       | expr `&` expr;

```



```
// foo is 128 bit wide
foo.trunc(64)
foo[63:0]

// foo is 16 bit wide
foo.zext(32)
foo[31:0] // shouldn't be able to slice beyond bounds
32'(foo) // annoying to parse
{16'b0, foo} // don't want the user to do maths

foo.sext(32)
$signed(foo)[31:0] // bad because interseting op is accidental implicit cast
32's(foo) // annoying to parse, totally obscure, hates life
{{16{foo[15]}, foo}} // are you kidding me?

// foo is 32 bit
foo.digital(hex)
foo.analog().hex()
```

```
32'h42 & data
42.bin() & 1337.oct()

```


```
display(valid);
display(ready);

display(addr);
```

```
valid
ready

addr
```

```
fn foo() {
  display(valid);
  display(ready);
  bar();
}

fn bar() {
  space();
  display(addr);
}

foo(


)
```

```
fn foo() -> (signal, signal) {
  return valid, signal;
}

foo(
)
```

```
fn foo() -> (signal, signal, comment, signal) {
  return valid, ready.color(pink), "", addr;
}

fn foo() -> Wave {
  return display(valid).color(pink).size(299).hex();
}

fn foo(valid, ready) -> Wave {
  let wave: Wave = display(valid);
  wave.addColorOverlay(orange, valid & !ready);
  wave.addColorOverlay(green, valid & ready);
  return wave;
}
```

### bare signal names

```
clock
reset
data
```

### brackets

```
[ ] -- slice / bit-select
( ) -- expressions grouping (from C)
{ } -- concat
" " -- string
' ' -- string , radix/format qualifier 16'hbeaf
/ / -- RegEx, // comments, /* */
< >
| |
```

### simple expressions

```
valid & ! ready // Verilogish
(valid & ! ready) // Verilogish
(& valid (! ready)) // WAL
:(& valid (! ready)) // WAL
[& valid [! ready]] // TCL

valid&!ready // Verilog
valid&(!ready) // Verilog
valid ready ! & // ??? FORTH
```

### non-unary/binaty

```
foo NOR bar // no-go such operator
NOR(foo, bar) // Verilog
(NOR foo bar) // WAL
```


### slicing / bit-select postfix

```
data[7]
addr[7:0]
(data & mask)[31:0] // 64 & 64 -> 32
```

```wal
(slice data 7)
(slice data 7 0)
(slice (& data mask) 31 0)
```

### Width rules (Verilog-ish)

```
data & mask # 64 bit, 32 bit -> 64 bit
```

### Concatenation

```
cat(foo, bar)  // easy to parse, obvious
(cat foo bar) # WAL
{foo, bar}
```

```
foo
{bar, bugu}
// ----
foo {bar, bugu}  // signal foo, signal {...}
foo {bar, bugu}  // cd into foo, dig up {...}
```

```
foo
(bar)
// ----
foo (bar) // signal, signal
foo (bar) // cd ...
```

```
foo
/bar
---
foo /bar // foo divided by bar
foo /bar // cd foo
```

```
fn dump_info(valid, ready) {
  valid?;
  ready?;
  (valid & ready)?"fire";
  (valid & !ready)?"stall";
}
```

```
dump_info(axi_valid, axi_ready) | valid waveform
                                | ready waveform
                                | fire waveform
                                | stall waveform

(dump_info arg1 arg2



)

(dump_info arg1 arg2)
```

```
foo?; bar?; baz?; | waveform here
                  | waveform here
                  | waveform here
```

```
foo               | waveform here
bar               | waveform here
baz               | waveform here
```


### urary / binary

```
foo & ~bar
```

### manage width?

1) implicit cast?

```
data & mask
```

2) explicit cast

```
data[31:0] & mask // 32bit output
```

3)

```
(data & mask)[31:0] // 64 & 64 -> 32
```


## statements



## Hierarchy navigation

Change current location in the hierarchy with the path string:

idea: / ? tb ( ) ? tb { } ?

```js
testbetch { top {
u_cpu0 {
clk
pc
addr
}
u_cpu1 {
clk
pc
addr
}
```

## Grouping

Foldable group can be created with parenthesis.

Noname group

```
( bar
baz )
```

Named group

```
(foo
  bar
  baz )
```

## Parser generator options

* https://github.com/Chevrotain/chevrotain
* https://github.com/jneen/parsimmon
* https://github.com/harc/ohm

## Terms

A [Concatenative programming language](https://en.wikipedia.org/wiki/Concatenative_programming_language) is a point-free computer programming language in which all expressions denote functions, and the juxtaposition of expressions denotes function composition.[1] Concatenative programming replaces function application, which is common in other programming styles, with function composition as the default way to build subroutines.

[Tacit programming](https://en.wikipedia.org/wiki/Tacit_programming) also called *point-free style*, is a programming paradigm in which function definitions do not identify the arguments (or "points") on which they operate. Instead the definitions merely compose other functions, among which are combinators that manipulate the arguments.

[Interactive development](https://concatenative.org/wiki/view/Interactive%20development) is where your language environment has access to the running program, and vice versa. This leads to shorter turn-around times and a more experimental coding style where new ideas and algorithms can be tested with little effort.

[Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation) (RPN), also known as reverse Łukasiewicz notation, Polish postfix notation or simply postfix notation, is a mathematical notation in which operators follow their operands, in contrast to Polish notation (PN), in which operators precede their operands. It does not need any parentheses as long as each operator has a fixed number of operands. The description "Polish" refers to the nationality of logician Jan Łukasiewicz,[1][2] who invented Polish notation in 1924.

* concise

WaveQL is a functional stack-based concatenative programming language. Or maybe it's just a fancy signal list.
