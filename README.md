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

Preview
-------

```
                            X               X                                                       X                                                                       XX                          X
 X  X               XX             X X      X                                XXX                                 XX  XXX                                  X  X               X                          X        XX
XXX X     XX       X X X  X X  XX  XX       XXX  XXXX XXXXX X   X XXXX      X    XXXXX X  X         X X  X  X X  X X X        XXXXX        XX  XXXX      XXX X     XX        X   XXXX XXXX  X X       XXX XXXXX X X
 X  XXX  XXXX       XX X  X X X    X        X  X X  X X   X X   X X  X      XXX  X   X  XX          X X  X X X X XX  XXX      X   X X   X XXXX X  X       X  XXX  XXXX       X  X   X   X    X       X  X X   X  XX
 X  X  X X           X X  X X X    XX       X  X X    X   X X X X X  X      X    X   X  XX       X  X X  X X   X X     X      X   X  X X  X    X          X  X  X X          X  X   X  X    X        X  X X   X   X
 X  X  X  XX         X XXXX X  XX  X X      XXX  X    XXXXX  X X  X  X      X    XXXXX X  X       XX  XXXX X   X X   XXX      XXXXX   X    XX  X          X  X  X  XX       XXX  XXXX XXXX X          XXX XXXXX XXX
 
XXXXX X   X XXXX       XXX  X   X XXXXX  XXXX X X       XXXXX  XXX   XXX  X      X  X    X      XXXX  XXX  X  X         X X   X X      X   XX  XXX       XXX  X   X XXXX  XXX       XXXXX X   X XXXX      X     XXX  XXXX X   X      XXXX   XXX   XXX
  X   X   X X         X   X X   X   X   X     XX        X   X X   X X   X X      X  XX   X      X    X   X X  X         X X   X XX    XX  X  X X        X   X X   X X    X   X        X   X   X X         X    X   X    X  X X       X   X X   X X
  X   XXXXX XXXX      X   X X   X   X   X     X         XXXX  X   X X   X X  XX  X  X X  X      XXXX X   X  XX          X X   X X X  X X  X  X X        X   X X   X XXXX X   X        X   XXXXX XXXX      X    XXXXX   X    X        X   X X   X X
  X   X   X X         X   X X   X   X   X     XX        X   X XXXX  X   X X X  X X  X  X X      X    X   X  XX          X X   X X  XX  X  XXX   XX      X   X X   X X    XXXX         X   X   X X         X    X   X  X     X        X   X X   X X XX
  X   X   X X         X  XX X   X   X   X     X X       X   X X  X  X   X XX    XX  X   XX      X    X   X X  X      X  X X   X X      X  X      X      X   X  X X  X    X  X         X   X   X X         X    X   X X      X        X   X X   X X  X
  X   X   X XXXX       XXXX  XXX  XXXXX  XXXX X  X      XXXXX X   X  XXX  X      X  X    X      X     XXX  X  X       XX   XXX  X      X  X    XXX       XXX    X   XXXX X   X        X   X   X XXXX       XXX X   X XXXX   X        XXXX   XXX   XXX

                                                   X                           X                                                                                                     X                                                                                                                                XXX                                                X
   X                                               X                           X                                                                                                     X                                                                                                X                                 X                                                X
   X    X                           XXXX                       X   X           X                                                          XXXXXX                                                            XXXX   XXXXX                                                              X    X                            X                                                X              XXXX
   X    X                          X   X           X           X  X            X                                                         X                                           X                      X   X  X                                                                  X    X                            X                         X     X                X             X   X
XXXXXXX X         XXXXX            X   X  X     X  X   XXXXX   X X             XXXXXX   XXXXXX   XXXXXXXXX  X       X   XXXXX            X        XXXXXXXXX  X     X                 X  X     X   XXX XXX   X   X  X               XXXXXXXXX              XXXXX   XXXXXX           XXXXXXX X         XXXXX              X     XXXXXXXX  XXXXXXX    X   X            XXXXXX  XXXXXXXXX  X   X
   X    X        X     X           X   X  X     X  X  X        XX              X     X  X     X  X       X  X       X  X     X           X        X       X   X   X                  X  X     X  X   X   X  X   X  X               X       X  X       X  X     X  X     X             X    X        X     X             X    X       X       X      X X            X     X  X       X  X   X
   X    XXXXXX   XXXXXXX            XXXX  X     X  X  X        X               X     X  X     X  X       X  X       X  X     X           XXXXXX   X       X    X X                   X  X     X  X   X   X  XXXX   XXXXX           X       X  X       X  XXXXXXX  X     X             X    XXXXXX   XXXXXXX             X    X       X      X        X             X     X  X       X   XXXX
   X    X     X  X                     X  X     X  X  X        XX              X     X  X        X       X  X   X   X  X     X           X        X       X     X                    X  X     X  X   X   X  X          X           X       X   X     X   X        X                   X    X     X  X                   X    X       X     X        X              X     X  X       X      X
   X    X     X  X                     X  X     X  X  X        X X             X     X  X        X       X  X   X   X  X     X           X        X       X    X X             X     X  X     X  X       X  X          X           X       X    X   X    X        X                   X    X     X  X                   X    X       X    X        X               X     X  X       X      X
   X    X     X  X                     X  X     X  X  X        X  X            X     X  X        X       X  X   X   X  X     X           X        X       X   X   X            X     X  X     X  X       X  X          X           X       X     X X     X        X                   X    X     X  X                   X    X       X   X        X                X     X  X       X      X
   X    X     X   XXXXX                X   XXXXX   X   XXXXX   X   X           XXXXXX   X        XXXXXXXXX   XXX XXX   X     X           X        XXXXXXXXX  X     X            XXXXX    XXXXX   X       X  X      XXXXX           XXXXXXXXX      X       XXXXX   X                   X    X     X   XXXXX            XXXXX   XXXXXXXX  XXXXXXX  X                  XXXXXX  XXXXXXXXX  XXXXX

                                                                                                                                                                                                                                                                                                                                                                                                              X         X
 XXXXXXXXX  X       X  XXXXXXXX           XXXXXXX   X       X  XXXXXXXXX   XXXXXXXXX X   X             XXXXXXXXX   XXXXXXX    XXXXXXX   X               X  X         X           XXXXXXXX  XXXXXXX   X     X                 X  X       X  X               X   XXXXX   XXXXX            XXXXXXX   X       X  XXXXXXXX  XXXXXXX            XXXXXXXXX  X       X  XXXXXXXX          X         XXXXXXX   XXXXXXX  X       X           XXXXXXXX    XXXXXXX    XXXXXX
     X      X       X  X                 X       X  X       X      X      X          X  X              X       X  X       X  X       X  X               X  XX        X           X        X       X  X     X                 X  X       X  XX             XX  X     X  X               X       X  X       X  X        X       X               X      X       X  X                 X        X       X        X   X     X            X       X  X       X  X
     X      X       X  X                 X       X  X       X      X      X          X X               X       X  X       X  X       X  X       X       X  X X       X           X        X       X  X     X                 X  X       X  X X           X X  X     X  X               X       X  X       X  X        X       X               X      X       X  X                 X        X       X        X    X   X             X       X  X       X  X
     X      X       X  X                 X       X  X       X      X      X          XX                X       X  X       X  X       X  X      X X      X  X  X      X           X        X       X   X   X                  X  X       X  X  X         X  X  X     X  X               X       X  X       X  X        X       X               X      X       X  X                 X        X       X       X      X X              X       X  X       X  X
     X      XXXXXXXXX  XXXXXXXX          X       X  X       X      X      X          X                 XXXXXXXX   X       X  X       X  X     X   X     X  X   X     X           XXXXXXXX X       X    X X                   X  X       X  X   X       X   X  X     X  X               X       X  X       X  XXXXXXXX X       X               X      XXXXXXXXX  XXXXXXXX          X        XXXXXXXXX      X        X               X       X  X       X  X
     X      X       X  X                 X       X  X       X      X      X          XX                X       X  X       X  X       X  X    X     X    X  X    X    X           X        X       X     X                    X  X       X  X    X     X    X  X     X   XXXX           X       X  X       X  X        X       X               X      X       X  X                 X        X       X     X         X               X       X  X       X  X
     X      X       X  X                 X       X  X       X      X      X          X X               X       X  XXXXXXXX   X       X  X   X       X   X  X     X   X           X        X       X    X X                   X  X       X  X     X   X     X  XXXXXX       X           X       X  X       X  X        XXXXXXXX                X      X       X  X                 X        X       X    X          X               X       X  X       X  X  XXXX
     X      X       X  X                 X       X  X       X      X      X          X  X              X       X  X    X     X       X  X  X         X  X  X      X  X           X        X       X   X   X                  X  X       X  X      X X      X  X            X           X       X   X     X   X        X    X                  X      X       X  X                 X        X       X   X           X               X       X  X       X  X     X
     X      X       X  X                 X     X X  X       X      X      X          X   X             X       X  X     X    X       X  X X           X X  X       X X           X        X       X  X     X           X     X  X       X  X       X       X  X            X           X       X    X   X    X        X     X                 X      X       X  X                 X        X       X  X            X               X       X  X       X  X     X
     X      X       X  X                 X      XX  X       X      X      X          X    X            X       X  X      X   X       X  XX             XX  X        XX           X        X       X  X     X           X     X  X       X  X               X  X            X           X       X     X X     X        X      X                X      X       X  X                 X        X       X  X            X               X       X  X       X  X     X
     X      X       X  XXXXXXXX           XXXXXXXX   XXXXXXX   XXXXXXXXX   XXXXXXXXX X     X           XXXXXXXXX  X       X   XXXXXXX   X               X  X         X           X         XXXXXXX   X     X            XXXXX    XXXXXXX   X               X  X        XXXXX            XXXXXXX       X      XXXXXXXX X       X               X      X       X  XXXXXXXX           XXXXXXX X       X  XXXXXXX      X               XXXXXXXX    XXXXXXX    XXXXXX
                                                  X
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