### 2.6.1 - 2016-09-07
* FIXED: Issue with old version of lodash

### 2.6 - 2016-08-24
* NEW: Support `data-match` to require a figure to contain specific content

### 2.5 - 2016-06-30
* IMPROVED: Legacy browser support (IE9+)
* CHANGED: Sets overflow hidden on body when entering fullscreen to prevent scrollbars from interfering
* CHANGED: No longer requires an image to fully load before entering fullscreen
* NEW: Support using HTML from an element instead of an object when decompiling a layout

### 2.4.2/2.4.3 - 2016-06-28
* FIXED: Issue with fullscreen when decompiling a layout

### 2.4.0 - 2016-05-12
* NEW: Support setting a prefered figure element on a container

### 2.3.2 - 2016-04-05
* FIXED: Issue with unloading a container multiple times (for compile)

### 2.3.1 - 2016-04-04
* FIXED: Issue with containers not always selecting the first element, when it should

### 2.2.0 - 2016-02-22
* NEW: `<figure>` will be treated as a regular block element if no `data-map` is present

### 2.1.2 - 2016-02-16
* FIXED: Issue with `loadComplete` event when using `data-type` image

### 2.1.1 - 2016-02-12
* FIXED: Issue with restoring content when the figure element had no inner HTML

### 2.1.0 - 2016-02-10
* NEW: Support converting to background-images using `data-type="image"`

### 2.0.0 - 2015-08-26
 * NEW: Use ES6 modules internally.
 * NEW: UMD bundles (see installation docs for more information).
 * CHANGED: `require('alf')` can no longer be used without using a module loader (RequireJS, Webpack, Browserify or similar).

### 1.5.4 - 2015-07-02
 * NEW: Add support for `data-select-inner` to use innerHTML instead of outerHTML on the matching node. It otherwise behaves just like `data-select`

### 1.5.3 - 2015-07-01
 * NEW: Add alf-block-is-first class name on the first block in the layout

### 1.5.2 - 2015-04-20
  * IMPROVED: Documentation for containers and figures

### 1.5.1 - 2015-04-09
 * FIXED: Bug causing fullscreen to fire unintentionally in some cases

### 1.5 - 2015-04-09
 * NEW: Use the `data-ref` attribute in containers to use the same content multiple places in the same template. Can be combined with `data-select` to create more advanced layouts.

### 1.4 - 2015-04-08
 * NEW: Use the `data-select` attribute in containers to select only parts of the content from a figure element

### 1.3.5 - 2015-03-25
 * FIXED: Issues with touch events when using jQuery instead of Zepto

### 1.3.4
 * FIXED: Stop using ./ when loading local dependencies with requirejs

### 1.3.3
 * FIXED: Issue with uglifying when.js library

### 1.3.2
 * FIXED: SizeDetector not always reattaching to the resize event

### 1.3.1
 * ADDED: Distribution to separate public repository

### 1.3
 * ADDED: Size detection. Responsive layout will now detect it's own width and add appropriate class names based on it

### 1.2.2
 * IMPROVED: Browser support for fullscreen mode

### 1.2.1
 * NEW: Slideshows will now add navigational UI-elements on non-touch screens

### 1.2
 * NEW: Add alf-block-is-last class name on the last block in the layout
 * CHANGED: Forcing margins to stick to the line-height is now only done inside grids
 * CHANGED: ALF will now respect the top margin of elements and no longer set it to 0

### 1.1.1
 * NEW: Support wildcards in data-map in containers

### 1.0.10/1.1.0
 * NEW: Support CSS revisioning

### 1.0.9
 * NEW: Update to latest version of Backbone
 * NEW: Build a no-deps version with (almost) no dependencies (still includes Zepto)

### 1.0.8
 * FIXED: Fix issue with overflow when there was room for 1 more line

### 1.0.7
 * IMPROVED: Improvements to line-height detection

### 1.0.6
 * IMPROVED: Improvements to image size handling in responsive templates

### 1.0.5
 * FIXED: Inline-containers sometimes got lost

### 1.0.4
 * FIXED: Old blocks could sometimes reappear in empty regions

### 1.0.2
 * FIXED: Fix issue with regions not always being completely aligned and filled
