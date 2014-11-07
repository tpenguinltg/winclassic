Making Windows Classic Themes
=============================

Theme files define the colour scheme of the theme and are written in
[SASS][]. Theme files must be into CSS to be used
in the Theme Designer. Refer to the [SASS documentation][sass-using]
for compilation instructions.

[sass]:     http://sass-lang.com/
[sass-using]: http://sass-lang.com/documentation/file.SASS_REFERENCE.html#using_sass

Include `_theme-template.scss` in the same directory as your theme file.
This file defines the skeleton styles of the theme and should not be
modified.

## Example

A standard theme file looks like this:

    /* Name:   Windows Standard
     * Author: Microsoft
     */

    $ActiveBorder:   rgb(212,208,200);
    $ActiveTitle:    rgb( 10, 36,106);
    $AppWorkspace:   rgb(128,128,128);
    $Background:     rgb( 58,110,165);
    $ButtonAlternateFace:   rgb(192,192,192);
    $ButtonDkShadow: rgb( 64, 64, 64);
    $ButtonFace:     rgb(212,208,200);
    $ButtonHilight:  rgb(255,255,255);
    $ButtonLight:    rgb(212,208,200);
    $ButtonShadow:   rgb(128,128,128);
    $ButtonText:     rgb(  0,  0,  0);
    $GradientActiveTitle:   rgb(166,202,240);
    $GradientInactiveTitle: rgb(192,192,192);
    $GrayText:       rgb(128,128,128);
    $Hilight:        rgb( 10, 36,106);
    $HilightText:    rgb(255,255,255);
    $HotTrackingColor:      rgb(  0,  0,128);
    $InactiveBorder: rgb(212,208,200);
    $InactiveTitle:  rgb(128,128,128);
    $InactiveTitleText:     rgb(212,208,200);
    $InfoText:       rgb(  0,  0,  0);
    $InfoWindow:     rgb(255,255,225);
    $Menu:           rgb(212,208,200);
    $MenuBar:        rgb(192,192,192);
    $MenuHilight:    rgb(  0,  0,128);
    $MenuText:       rgb(  0,  0,  0);
    $Scrollbar:      rgb(212,208,200);
    $TitleText:      rgb(255,255,255);
    $Window:         rgb(255,255,255);
    $WindowFrame:    rgb(  0,  0,  0);
    $WindowText:     rgb(  0,  0,  0);

    @import "theme-template";


It is best to stick with RGB decimal notation as doing so makes it easier
to convert the SASS file to a Microsoft `.theme` file and vice versa,
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

The easiest way to convert it to SASS is with a regex search-and-replace.

In Vim, this is a simple substitute command:

    :s/\(\a*\)\s*=\s*\(\d\{1,3})\s+\(\d\{1,3})\s+\(\d\{1,3})/$\1: rgb(\2,\3,\4);

Most importantly, add the following line to the end to import the skeleton:

    @import "theme-template";
