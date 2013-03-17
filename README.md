vector-figlet
===============

Prints an ascii-art bitmap of whatever text you enter. The characters scale to arbitrary size without the brush strokes becoming thicker.

Usage nodes
-----------

Include the figlet library:

```html
<script src="figlet.js"></script>
```

And any font files that you want to use:

```html
<script src="fonts/standard.js"></script>
```

Now you can use it:

```javascript
var fig = new Figlet(2, "standard");
var result = fig.render("Hello");
```

Making your own fonts
---------------------

Here are the symbols you can use in your own fonts:

- `-` horizontal line
- `~` horizontal line (On larger fonts, it's one pixel shorter than `-` on each side)
- `<` horizontal line (only the left half)
- `>` horizontal line (only the right half)
- `|` vertical line
- `!` vertical line (On larger fonts, it's one pixel shorter than | on each end)
- `'` vertical line (only the top half)
- `,` vertical line (only the bottom half)
- `/` diagonal line, positive slope
- `1` diagonal line, positive slope (only the bottom-left half)
- `9` diagonal line, positive slope (only the upper-right half)
- `\\` diagonal line, negative slope
- `7` diagonal line, negative slope (only the top-left half)
- `3` diagonal line, negative slope (only the bottom-right half)
- `@` square
- `O` square (On larger fonts, it's two pixels shorter on each side)
- `+` a single pixel, independent of font size

You can place any of these modifiers before any symbol to get the listed effect:

- `^` shift the next symbol up (useful for superimposing symbols)
- `M` shift the next symbol up by a single pixel, independent of font size
- `v` shift the next symbol down (useful for superimposing symbols)
- `W` shift the next synbol down by a single pixel, independent of font size
- `$(4)` only draw the next symbol if the font size is 4 or less. Otherwise draw a space (if the next symbol IS a space, then collapse that space).
- `%(10)` only draw the next symbol if the font size is more than 10. Otherwise draw a space (if the next symbol IS a space, then collapse that space).