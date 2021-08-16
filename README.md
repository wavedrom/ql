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


| base | unsigned | signed |
|-|-|-|
| bin    | 'b | 'sb |
| oct    | 'o | 'so |
| dec    | 'd | 'sd |
| hex    | 'h | 'sh |
| analog | 'a | 'sa |

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
