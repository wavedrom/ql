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

```
clock
reset
data
```

## Hierarchy navigation

Change current location in the hierarchy with the path string:

```js
/testbetch/top/u_cpu0
clk
pc
addr
../u_cpu1
clk
pc
addr
```

## Grouping

Foldable group can be created with parentheses.

```
(foo
bar
baz)
```

## Value format string syntax

Grammar for

```
signal_string ::= signal_name ["'" format_spec]
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
| %b  | 2       |  | 11100100011  | …11 | …1  | … | 1111111100000101  | …11 | …1  | … |
| %o  | 8       |  | 3443         | …43 | …3  | … | 177405            | …05 | …5  | … |
| %d  | 10      |  | 1827         | …27 | …7  | … | 65285             | …85 | …5  | … |
| %h  | 16      |  | 723          | 723 | …3  | … | ff05              | …05 | …5  | … |
| %a  | analog  |  |              |     |     |   |                   |     |     |   |
| %sb | 2       |v | 11100100011  | …11 | +   | + | -11111011         | -…1 | -   | - |
| %so | 8       |v | 3443         | …43 | +   | + | -373              | -…2 | -   | - |
| %sd | 10      |v | 1827         | …27 | +   | + | -251              | -…1 | -   | - |
| %sh | 16      |v | 723          | 723 | +   | + | -fb               | -fb | -   | - |
| %sa | analog  |v |              |     |     |   |                   |     |     |   |

```js
data%sd
addr%h
wen%b
```

### digit-separating underscores
