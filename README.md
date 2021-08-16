# WaveQL

Waveform Query Language

## Ground rules

* one text line -> one wave
* it is just a signal name by default


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

## Value format

`<signal name>'<sign><base>`

A = 0x01234567
B = 0xFF000005

| format | base | signed | A | A2 | A1 | B | B2 | B1 |
|-|-|-|-|-|-|-|-|-|
| 'b  | 2       |  | 1001000110100010101100111  | …1  | … | 11111111000000000000000000000101  | | |
| 'o  | 8       |  | 110642547                  | …7  | … | | | |
| 'd  | 10      |  | 19088743                   | …3  | … | | | |
| 'h  | 16      |  | 1234567                    | …7  | … | | | |
| 'a  | analog  |  |                            |     |   | | | |
| 'sb | 2       |v | 1001000110100010101100111  | +…  | + | | | |
| 'so | 8       |v | 110642547                  | +…  | + | | | |
| 'sd | 10      |v | 19088743                   | +…  | + | | | |
| 'sh | 16      |v | 1234567                    | +…  | + | | | |
| 'sa | analog  |v |                            |     |   | | | |

```js
data'sd
addr'h
wen'b
```
## Grouping

Foldable group can be created with parentheses.

```
(foo
bar
baz)
```
