## Requirements

Before reading this you should read the docs about [blocks](block) and [figures](figure), as well as [how to create your first template](templates/first-templates).

## Overview

As opposed to grid templates, vertical templates will show the content in a single column with a vertical scroll. They are mainly used on smaller screens without much room for multiple columns, but may also be used on larger screens.

The template uses `alf-region-flexible` in addition to `alf-region`, and `alf-container-inline` instead of `alf-container`.

A combination of both grid templates and vertical templates in the same article is possible, albeit highly discouraged.

The [article comes preformatted and structured](Article import format) in **[blocks](block)** and **[figures](figure)**.

When building a template you create:
 * [Region](region) (with `alf-region-flexible`) to target the [blocks](block)
 * Inline [container](container) (`alf-container-inline`) to target the [figures](figure)

## The markup

```html
<div data-map="article" class="alf-template">
    <div class="alf-container" data-map="title"></div>
    <div class="alf-region alf-region-flexible">
		<div class="alf-container-inline" data-map="16x9-small 4x3-small"></div>
	</div>
</div>
```