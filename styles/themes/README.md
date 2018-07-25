Making Windows Classic Themes
=============================

Theme files define the colour scheme of the theme and are written as a
list of [CSS variables][] set on the `:root` element. The names of the
variables are the same as the [element names in the standard `.theme`
file][control-panel-colors].

[CSS variables]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables
[control-panel-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/bb773190%28v=vs.85%29.aspx#colors

## Example

A standard theme file looks like this:

    /* Name:   Windows Standard
     * Author: Microsoft
     */

    :root {
      --ActiveBorder:   rgb(212,208,200);
      --ActiveTitle:    rgb( 10, 36,106);
      --AppWorkspace:   rgb(128,128,128);
      --Background:     rgb( 58,110,165);
      --ButtonAlternateFace:   rgb(192,192,192);
      --ButtonDkShadow: rgb( 64, 64, 64);
      --ButtonFace:     rgb(212,208,200);
      --ButtonHilight:  rgb(255,255,255);
      --ButtonLight:    rgb(212,208,200);
      --ButtonShadow:   rgb(128,128,128);
      --ButtonText:     rgb(  0,  0,  0);
      --GradientActiveTitle:   rgb(166,202,240);
      --GradientInactiveTitle: rgb(192,192,192);
      --GrayText:       rgb(128,128,128);
      --Hilight:        rgb( 10, 36,106);
      --HilightText:    rgb(255,255,255);
      --HotTrackingColor:      rgb(  0,  0,128);
      --InactiveBorder: rgb(212,208,200);
      --InactiveTitle:  rgb(128,128,128);
      --InactiveTitleText:     rgb(212,208,200);
      --InfoText:       rgb(  0,  0,  0);
      --InfoWindow:     rgb(255,255,225);
      --Menu:           rgb(212,208,200);
      --MenuBar:        rgb(192,192,192);
      --MenuHilight:    rgb(  0,  0,128);
      --MenuText:       rgb(  0,  0,  0);
      --Scrollbar:      rgb(212,208,200);
      --TitleText:      rgb(255,255,255);
      --Window:         rgb(255,255,255);
      --WindowFrame:    rgb(  0,  0,  0);
      --WindowText:     rgb(  0,  0,  0);
    }


It is best to stick with RGB decimal notation as doing so makes it easier
to convert the Sass file to a Microsoft `.theme` file and vice versa,
but any valid CSS colour syntax is acceptable.


## Converting Microsoft `.theme` files to Theme Designer files

A Microsoft `.theme` file will have a section called `[Control Panel\Colors]`
that looks something like this:

    ActiveTitle=10 36 106
    Background=58 110 165
    Hilight=10 36 106
    HilightText=255 255 255
    TitleText=255 255 255
    Window=255 255 255
    WindowText=0 0 0
    Scrollbar=212 208 200
    InactiveTitle=128 128 128
    Menu=212 208 200
    WindowFrame=0 0 0
    MenuText=0 0 0
    ActiveBorder=212 208 200
    InactiveBorder=212 208 200
    AppWorkspace=128 128 128
    ButtonFace=212 208 200
    ButtonShadow=128 128 128
    GrayText=128 128 128
    ButtonText=0 0 0
    InactiveTitleText=212 208 200
    ButtonHilight=255 255 255
    ButtonDkShadow=64 64 64
    ButtonLight=212 208 200
    InfoText=0 0 0
    InfoWindow=255 255 225
    GradientActiveTitle=166 202 240
    GradientInactiveTitle=192 192 192
    ButtonAlternateFace=192 192 192
    HotTrackingColor=0 0 128
    MenuHilight=0 0 128
    MenuBar=192 192 192

The text before the `=` is the variable name and the numbers after are
RGB decimal values for that colour.

To change the section into the required CSS format, add `--` before each item name, change the `=` to a `:`, wrap the RGB triplet in `rgb()`, and separate the elements of the triplet with `,`.

Lastly, enclose the result in a CSS declaration block, with `:root` as the selector:

    :root {
      --ActiveBorder:   rgb(212,208,200);
      --ActiveTitle:    rgb( 10, 36,106);
      --AppWorkspace:   rgb(128,128,128);
      --Background:     rgb( 58,110,165);
      --ButtonAlternateFace:   rgb(192,192,192);
      /* ... */
    }

There is a script called `ini-to-css.sed` that will do the conversion for you:

    sed -nf ini-to-css.sed example.theme > example.css
