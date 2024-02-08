## Value format string syntax

Multibit values can have formated value labels.

Grammar for

```
label_format ::= ["%" format_spec]
format_spec  ::= [sign] base
sign         ::= "s" | "u"
base         ::= "b" | "o" | "d" | "h"
```

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

### base

```
b   base 2
B   base 2, leading zeros

o   base 8
O   base 8, leading zeros

d   base 10

h   base 16, lower-case letters a-f
H   base 16, lower-case letters A-F

c   ASCII char string
```

### zero / sign extension

A = 0x0723; B = 0xFF05

| format | base | signed | A      | A3  | A2  | A1 | B                | B3  | B2  | B1  |
|-|-|-|-|-|-|-|-|-|-|-|
| %b  | 2       |  | 11100100011  | …11 | …1  | … | 1111111100000101  | …11 | …1  | … |
| %o  | 8       |  | 3443         | …43 | …3  | … | 177405            | …05 | …5  | … |
| %d  | 10      |  | 1827         | …27 | …7  | … | 65285             | …85 | …5  | … |
| %h  | 16      |  | 723          | 723 | …3  | … | ff05              | …05 | …5  | … |
| %sb | 2       |v | 11100100011  | …11 | +   | + | -11111011         | -…1 | -   | - |
| %so | 8       |v | 3443         | …43 | +   | + | -373              | -…2 | -   | - |
| %sd | 10      |v | 1827         | …27 | +   | + | -251              | -…1 | -   | - |
| %sh | 16      |v | 723          | 723 | +   | + | -fb               | -fb | -   | - |

### other

* decode floating point numbers
* decode vectors of numbers


### Floating point

* https://en.wikipedia.org/wiki/Floating-point_arithmetic
* https://en.wikipedia.org/wiki/IEEE_754
* https://en.wikipedia.org/wiki/Bfloat16_floating-point_format
* https://en.wikipedia.org/wiki/Minifloat
* https://github.com/hlslibs/ac_types/blob/master/pdfdocs/ac_datatypes_ref.pdf

Fortran

* https://web.math.utk.edu/~vasili/refs/Fortran/AiS-f77/fortran7.10.html

* print floating point numbers in specific form
 -

```
.toPrecision
.toExponential
.toFixed
```

### Fixed point
* specify fixed point number format
* specific


* https://en.wikipedia.org/wiki/Q_(number_format)
* https://www.ti.com/lit/ug/spru565b/spru565b.pdf

```
Qf
Qm.f
```

### Complex

### Vectors

### Libs

https://github.com/adamwdraper/Numeral-js

### References

* https://en.wikipedia.org/wiki/Printf

