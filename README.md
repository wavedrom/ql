# WaveQL

Waveform Query Language

# Rules

* one text line -> one wave
* it is just a signal name by default


```
clock
reset
data
```

Hierarchy navigation

Change current location in the hierarchy with the path string:

```
/testbetch/top/cpu0
clk
pc
addr
../cpu1
clk
pc
addr
```
