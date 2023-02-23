[![NPM version](https://img.shields.io/npm/v/waveql.svg)](https://www.npmjs.org/package/waveql)
[![Linux](https://github.com/wavedrom/ql/actions/workflows/linux.yml/badge.svg)](https://github.com/wavedrom/ql/actions/workflows/linux.yml)
[![MacOS](https://github.com/wavedrom/ql/actions/workflows/macos.yml/badge.svg)](https://github.com/wavedrom/ql/actions/workflows/macos.yml)
[![Windows](https://github.com/wavedrom/ql/actions/workflows/windows.yml/badge.svg)](https://github.com/wavedrom/ql/actions/workflows/windows.yml)
[![Coverage Status](https://coveralls.io/repos/github/wavedrom/ql/badge.svg?branch=trunk)](https://coveralls.io/github/wavedrom/ql?branch=trunk)

Waveform Query Language

## Ground rules

* one text line -> one wave
* it is just a signal name by default
* indentation space ignored


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

## Value format string syntax

Grammar for

```
signal_string ::= signal_name WHITESPACE ["'" format_spec]
format_spec   ::= [sign] base
sign          ::= "s" | "u"
base          ::= "b" | "o" | "d" | "h"
```

base

### sign

```
"+" indicates that a sign should be used for both positive as well as negative numbers.
"-" indicates that a sign should be used only for negative numbers.
```

### alignment

```
"<" Forces the field to be left-aligned within the available space.
">" Forces the field to be right-aligned within the available space.
"^" Forces the field to be centered within the available space.
```


```
b   base 2
B   base 2, leading zeros

o   base 8
O   base 8, leading zeros

d   base 10

h   base 16, lower-case letters a-f
H   base 16, lower-case letters A-F

A   analog
S   ASCII string
```

### zero / sign extension

A = 0x0723; B = 0xFF05

| format | base | signed | A      | A3  | A2  | A1 | B                | B3  | B2  | B1  |
|-|-|-|-|-|-|-|-|-|-|-|
| 'b  | 2       |  | 11100100011  | …11 | …1  | … | 1111111100000101  | …11 | …1  | … |
| 'o  | 8       |  | 3443         | …43 | …3  | … | 177405            | …05 | …5  | … |
| 'd  | 10      |  | 1827         | …27 | …7  | … | 65285             | …85 | …5  | … |
| 'h  | 16      |  | 723          | 723 | …3  | … | ff05              | …05 | …5  | … |
| 'a  | analog  |  |              |     |     |   |                   |     |     |   |
| 'sb | 2       |v | 11100100011  | …11 | +   | + | -11111011         | -…1 | -   | - |
| 'so | 8       |v | 3443         | …43 | +   | + | -373              | -…2 | -   | - |
| 'sd | 10      |v | 1827         | …27 | +   | + | -251              | -…1 | -   | - |
| 'sh | 16      |v | 723          | 723 | +   | + | -fb               | -fb | -   | - |
| 'sa | analog  |v |              |     |     |   |                   |     |     |   |

```js
data 'sd
addr 'h
wen 'b
```

### digit-separating underscores


## Parser generator options

* https://github.com/Chevrotain/chevrotain
* https://github.com/jneen/parsimmon
* https://github.com/harc/ohm
