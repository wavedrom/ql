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

A = 0x0723
B = 0xFF05

| format | base | signed | A      | A3  | A2  | A1 | B                | B3  | B2  | B1  |
|-|-|-|-|-|-|-|-|-|
| 'b  | 2       |  | 11100100011  | …11 | …1  | … | 1111111100000101  | …11 | …1  | … |
| 'o  | 8       |  | 3443         | …43 | …3  | … | 177405            | …05 | …5  | … |
| 'd  | 10      |  | 1827         | …27 | …7  | … | 65285             | …85 | …5  | … |
| 'h  | 16      |  | 723          | …23 | …3  | … | ff05              | …05 | …5  | … |
| 'a  | analog  |  |              |     |     |   |                   |     |     |   |
| 'sb | 2       |v | 11100100011  | +…1 | +…  | + | -11111011         | -…1 | -…  | - |
| 'so | 8       |v | 3443         | +…3 | +…  | + | -373              | -…2 | -…  | - |
| 'sd | 10      |v | 1827         | +…7 | +…  | + | -251              | -…1 | -…  | - |
| 'sh | 16      |v | 723          | +…3 | +…  | + | -fb               | -…b | -…  | - |
| 'sa | analog  |v |              |     |     |   |                   |     |     |   |

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
