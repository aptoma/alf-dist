ALF is bundled with a grid system that can be used to create a wide variety of grids.
The markup used to build a grid is a little different from traditional grids (e.g. bootstrap, 960gs), but it enables you to build complex grids with a lot less (flatter) markup.

There are several reasons for this:
 * Reduce the amount of markup required
 * Reduce footprint of the render tree to improve performance
 * Uses absolute positioning to minimize the effect of reflows

PS: We recommend listening to [this track](http://open.spotify.com/track/5z9v299A7qXXSk2VY0sUu0) while reading the rest of this tutorial.

## The markup

Note: all class names in use by ALF are prefixed with **alf-**

We'll start by creating a simple 2-column grid.

[Preview](http://aptoma.github.com/drmobile-integration/grids.html#cols2-simple)
```html
<div class="alf-grid alf-cols-2">
    <div class="alf-col-1 alf-flex"></div>
    <div class="alf-col-2 alf-flex"></div>
</div>
```

This introduces a lot of reserved class names. We'll go through them step by step.

####alf-grid####
It's a grid. Nothing more, nothing less. Only used on the parent element.

####alf-cols-2####
This grid has 2 columns. You can use any number of columns: `alf-cols-3`, `alf-cols-4`, etc.

Only used on the parent element.

####alf-col-1 & alf-col-2####
These elements are in the first and second columns.
<br/>You can put an element in any column: `alf-col-1`, `alf-col-2`, `alf-col-3`, etc.

####alf-flex####
This tells the column to expand to fill the available height. It's inspired by the `flex` property in the [CSS specification](https://developer.mozilla.org/en-US/docs/CSS/flex).

###Spanning columns###

[Preview](http://aptoma.github.com/drmobile-integration/grids.html#cols2-colspan2-top)
```html
<div class="alf-grid alf-cols-2">
    <div class="alf-col-1 alf-colspan-2"></div>
    <div class="alf-col-1 alf-flex"></div>
    <div class="alf-col-2 alf-flex"></div>
</div>
```

####alf-colspan-2####
This will make the column span across 2 columns.
<br/>You can span any column across any number of columns: `alf-colspan-2`, `alf-colspan-3`, `alf-colspan-4`, etc.

###Build it column by column###
The markup should have the same order as the columns. A more advanced grid with 5 columns and several colspans could look like this:

[Preview](http://aptoma.github.com/drmobile-integration/grids.html#cols5)
```html
<div class="alf-grid alf-cols-5">
    <!-- Start with column 1 -->
    <div class="alf-col-1 alf-colspan-5">Start at column 1 and span across all 5 columns</div>
    <div class="alf-col-1 alf-flex">Start at column 1 and fill the available height (alf-flex)</div>

    <!-- Column 1 done. Column 2 next. -->
    <div class="alf-col-2 alf-colspan-2">Start at column 2 and span across 2 columns</div>
    <div class="alf-col-2 alf-flex">Start at column 2 and fill the remaining height</div>

    <!-- Column 2 done. Column 3 next. -->
    <div class="alf-col-3 alf-flex">Start at column 3 and fill the remaining height</div>

    <!-- Column 3 done. Column 4 next. -->
    <div class="alf-col-4 alf-flex">Start at column 4 and fill the remaining height</div>

    <!-- Column 4 done. Column 5 next. -->
    <div class="alf-col-5 alf-flex">Start at column 5 and fill the remaining height</div>
</div>
```

You can see many more [examples of grids here](http://aptoma.github.com/drmobile-integration/grids.html)

[Continue reading about building templates](templates/getting-started)