[![NPM version](https://img.shields.io/npm/v/waveql.svg)](https://www.npmjs.org/package/waveql)
[![Linux](https://github.com/wavedrom/ql/actions/workflows/linux.yml/badge.svg)](https://github.com/wavedrom/ql/actions/workflows/linux.yml)
[![MacOS](https://github.com/wavedrom/ql/actions/workflows/macos.yml/badge.svg)](https://github.com/wavedrom/ql/actions/workflows/macos.yml)
[![Windows](https://github.com/wavedrom/ql/actions/workflows/windows.yml/badge.svg)](https://github.com/wavedrom/ql/actions/workflows/windows.yml)
[![Coverage Status](https://coveralls.io/repos/github/wavedrom/ql/badge.svg?branch=trunk)](https://coveralls.io/github/wavedrom/ql?branch=trunk)

Waveform Query Language

## Syntax

One text line -> one wave
Space separated tokens, one of:

* signal name select (when available in VCD)
* instance name to enter (when available in VCD)
* hierarchical naigation operator (`.`, `..`, `...`, `/`)
* Format `%...`
* Cursor `@...`
* Label `:...`
* Pattern `{...}`
* Function `(...)`
* anything else is considered as comment

## Signal name select

First, each space separated token is matched against signal names at the current level of hierarchy. If there is a match then the signal is added to the wave.

## Instance name to enter

Second, each space separated token is matched against instance names at the current level of hierarchy. If there is a match then the hierarchy is changed to the instance.

## Hierarchical naigation operators

* `.` - stay at the current level
* `..` - change to the parent level
* `...` - change to the grandparent level
* `/` - go to the root level

## Format `%...`

Text label of multibit values can be formated using **format specifier** of following form:

```
%<specifier>[element width]
```

Regular expression for format specifier:

```regex
/^%((s?[bodh]\d*)|[c]|([fega](32|64)))$/
```

| specifier |description |
|-|-|
| b, o, d, h | Unsigned ( binary, octal, decimal, hexadecimal ) integer |
| sb, so, sd, sh | Signed ( binary, octal, decimal, hexadecimal ) integer |
| f, e, g, a | Floating point number in ( Fixed point, Exponent, General, Hexadecimal ) notation |
| c | Character format |

### element width

* element width is optional
* If not specified then total wire width is used
* If total wire width is longer then element width,
the label will represented as vector of labels.
* The label may be shortened to fit the space available in waveform.

## Cursor `@...`

```regex
/^@(?<value>\d+)(?<mult>[munpf]*s)(\.(?<style>\w+))?$/
```

* `value` - unsigned iteger time value
* `mult` - time unit multiplier (optional)
  * `m` - milli
  * `u` - micro
  * `n` - nano
  * `p` - pico
  * `f` - femto
* `style` - cursor style (color, shape, etc.) (optional)  

## Label `:...`

```js
/:(?<name>\S+)/
```

Where: `name` is a label name that can be used in futire patterns or functions.

## Pattern `{...}`

```js
/\{(?<body>[^}]+)\}/
```

Where: `body` is a comma separated list of `values`.

value is one of:
* `key:value` pair where:
  * `key` is a `role` name of pattern
  * `value` is a previously defined `label` or parameter
* `value` is a name of `role` when matching `label` name

Example of pattern:

* `{clock,valid}` - valid swoosh
* `{clock,valid,ready}` - valid (yellow), valid& ready (green) swoosh
* `{clock,valid,ready,up:3}` - valid/ready swooshes 3 wave lanes upwards

## Function `(<FN> ...<args> ... )`

```js
/\((?<name>\w+)(?<args>[^)]+)\)/
```

Where: `name` is a function name and `args` is a comma separated list of arguments.

Example of function:

### `DIZ`

```
(DIZ REGEX
  ... empty lines for function output
)
```
