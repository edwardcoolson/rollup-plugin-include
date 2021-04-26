# rollup-plugin-include

Rollup plugin to include a file such a javascript or HTML into a source file in the right place. The contents of included file can optionally be assigned to a variable.

## Installation

npm rollup-plugin-include --save-dev

## Usage

Let's say, you want some functionality in the production version of your app to work different from the development version. Then you patch it for production by including `production.js` into your `app.js` as follows:  
`production.js:`
```javascript
add = function (a, b)
{
  return a + b + 10;
}

multiply = function(a, b)
{
  return a * b * 10;
}  
```
`app.js:`
```javascript
let add = function(a, b)
{
  return a + b;
}

let multiply = function(a, b)
{
  return a * b;
}  
...
// @include(path/to/production.js)
...
let sum = add(15, 20); // expected: 35 in development, 45 in production
let product = multiply(15, 20); // expected: 300 in development, 3000 in production
...
```
## The @include directive

It just does what its name assumes -- includes the contents of a file specified by its path. The directive requires a single line comment `//` and may be written at any position on the line after it. The content is inserted in place of `@include(...)`, other characters on the line go to the output as is except the comment `//` and immediate following spaces, if any, that are removed.  
  
Path to included file should be specified without any quotes -- parentheses are enough. Path is always _**relative**_ to the including file.

The `@include` directive is not recursive i.e. if it occurs in an included file it will be ignored.

## Patching a variable

As characters on the line with `@include` are preserved (except `//` and immediate following spaces), we can use `@include(...)` in any valid expression on the line. For example, we may patch a variable for production like this:  
`component.tpl`
```html
<div>
  <span>
    My component
  </span>
</div>
```
`component.js`
```javascript
...
let tpl = 'src/components/component.tpl';
// tpl = `@include(component.tpl)`;
...
```
Notice using backticks for `@include` -- it's normal to put multiline text inside them. Also notice how paths are defined: on the first line it is assumed relative to the app root, while on the second line it is relative to the `component.js`. Both `component.tpl` and `component.js` are assumed in the same `src/components/` directory.

## Rollup config example

```javascript
import include from 'rollup-plugin-include';

export default {
  input: '../main.js',
  plugins: [
    include({ include: '../comp/*.js' }),
    ...
  ],
  output: {
    file: '../main.min.js',
    format: 'iife'
  }
}

```

## Options

### include

Type: `array` or `string`  
Default: `undefined` (all files are included)

A single file pattern, or an array of file patterns to include when importing html files. For more details see [rollup-pluginutils](https://github.com/rollup/rollup-pluginutils#createfilter).

### exclude

Type: `array` or `string`  
Default: `undefined` (no files are excluded)

A single file pattern, or an array of file patterns to exclude when importing html files. For more details see [rollup-pluginutils](https://github.com/rollup/rollup-pluginutils#createfilter).

## License

MIT