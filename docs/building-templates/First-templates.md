## Requirements

Before reading this you should read the docs about [building grids](Building grids), and you should know what [blocks](Block) and [figures](Figure) are.

Note that a template does not **have** to be a grid. E.g. a template with a large background image and an absolute positioned title above it, is not a grid. The example below illustrates this. The template on the left is not a grid, while the one on the right is.

![Grid or not to grid](gfx/gridnogrid.jpg)

## Overview

The [article comes preformatted and structured](Article import format) in **[blocks](Block)** and **[figures](Figure)**.

When building a template you create:
 * [Containers](Container) to target the [figures](Figure)
 * [Regions](Region) to target the [blocks](Block)

ALF will detect what template that matches best for each page, based on the content of the article.

## The markup

[Preview this grid](http://aptoma.github.com/drmobile.integration/grids.html#cols2-colspan2-top)
```html
<div data-map="article" class="alf-template alf-grid alf-cols-2">
    <div class="alf-col-1 alf-colspan-2 alf-container" data-map="title"></div>
    <div class="alf-col-1 alf-flex alf-region"></div>
    <div class="alf-col-2 alf-flex alf-region"></div>
</div>
```

Say we're applying the above template to an article with this content:

```html
<article>
    <figure>
        <h1 data-map="title">Title of the article</h1>
    </figure>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
</article>
```

ALF will find the matching [containers](Container) and [figures](Figure) first, then it'll flow the [blocks](Block) through the [regions](Region) untill they're all filled, or we run out of content.

The result will look something like this:

```html
<div data-map="article" class="alf-template alf-grid alf-cols-2">
    <div class="alf-col-1 alf-colspan-2 alf-container" data-map="title">
        <h1 data-map="title">Title of the article</h1>
    </div>
    <div class="alf-col-1 alf-flex alf-region">
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
    </div>
    <div class="alf-col-2 alf-flex alf-region">
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
    </div>
</div>
```


###Example with an image###

The template:

```html
<div data-map="article" class="alf-template alf-grid alf-cols-2">
    <div class="alf-col-1 alf-colspan-2 alf-container" data-map="title"></div>
    <div class="alf-col-1 alf-flex alf-region"></div>
    <div class="alf-col-2 alf-flex alf-container" data-map="4x3-small"></div>
</div>
```

The article content:

```html
<article>
    <figure>
        <h1 data-map="title">Title of the article</h1>
    </figure>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
    <figure>
        <img data-map="4x3-large" width="1024" height="768" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
        <img data-map="4x3-small" width="460" height="345" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
    </figure>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
    <p>A paragraph with lots of text</p>
</article>
```

The result:

```html
<div data-map="article" class="alf-template alf-grid alf-cols-2">
    <div class="alf-col-1 alf-colspan-2 alf-container" data-map="title">
        <h1 data-map="title">Title of the article</h1>
    </div>
    <div class="alf-col-1 alf-flex alf-region">
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
    </div>
    <div class="alf-col-2 alf-flex alf-region">
        <p>A paragraph with lots of text</p>
        <p>A paragraph with lots of text</p>
    </div>
    <div class="alf-col-2 alf-flex alf-container" data-map="4x3-small">
        <img data-map="4x3-small" width="460" height="345" src="http://url/to/image.jpg" />
    </div>
</div>
```

As you can see, the `4x3-large` version of the image is ignored since the template only targets `4x3-small`.
