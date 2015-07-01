## Containers

Containers are elements used in [templates](Building templates) to contain [figures](figure).

## Basic Example

Lets say that the article we're importing contains the following [figure](figure):

```html
<figure>
     <h1 data-map="title">Title of the article</h1>
</figure>
```

The [figure](figure) can then be targeted in a template by a container like this:

```html
<div class="alf-container" data-map="title"></div>
```

The resulting markup on the page will be:

```html
<div class="alf-container" data-map="title">
    <h1 data-map="title">Title of the article</h1>
</div>
```

## Mapping images

When creating layouts with images, you will often need to work with a variety of image sizes and formats. As shown in the section on [figures](figures), we recommend mapping images using `{format}-{size}`.

Let's assume the following article:

```html
<figure>
    <div data-map="landscape-large">
        <img width="600" height="400" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
    </div>
</figure>
<figure>
    <div data-map="4x3-large">
        <img width="1024" height="768" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
    </div>
</figure>
<figure>
    <div data-map="portrait-large">
        <img width="400" height="600" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
    </div>
</figure>
```

If you simply want to match any large image, you can use `*-large`:

```html
// Template
<div class="alf-container" data-map="*-large"></div>

// Output
<div class="alf-container" data-map="*-large">
	<div data-map="landscape-large">
        <img width="1024" height="768" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
    </div>
</div>
```

This will match the first image we find, that has any value followed by `-large`. If you want a little more control, but still allow for a wider match, you can provide multiple values:

```html
// Template
<div class="alf-container" data-map="4x3-large landscape-large *-large"></div>

// Output
<div class="alf-container" data-map="4x3-large landscape-large *-large">
	<div data-map="4x3-large">
        <img width="1024" height="768" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
    </div>
</div>
```

Here, the `4x3-large` image is picked, as it's first value in `data-map`. On the next page, the `landscape-large` would be picked, and finally, `portrait-large`.
