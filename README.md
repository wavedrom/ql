# WaveQL

Waveform Query Language

# Ground rules

* one text line -> one wave
* it is just a signal name by default


```
clock
reset
data
```

# Hierarchy navigation

Change current location in the hierarchy with the path string:

```
/testbetch/top/u_cpu0
clk
pc
addr
../u_cpu1
clk
pc
addr
```

# Grouping

Foldable group can be created Lisp stype

```
(foo
bar
baz)
```
