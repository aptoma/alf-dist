## Description

A **figure** is a way to group variations of the same element. E.g. the same image, but in large, medium and small sizes. Only **one** of these are ever in use at the same time.

All elements inside a `figure` needs to be **mapped** by using the `data-map` attribute, so a **[container](Container)** can target it. You can give it multiple names by separating them with a **space**.

## Examples

Typical examples of figures are <strong>images</strong>, <strong>videos</strong>, <strong>twitter searches</strong> etc.

A title.

```html
<figure>
    <header data-map="title">
         <h1>Title of the article</h1>
    </header>
</figure>
```

An image with variations (large and small) of the same element.

```html
<figure>
    <div data-map="4x3-large">
        <img width="1024" height="768" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
    </div>
    <div data-map="4x3-small">
        <img width="460" height="345" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
    </div>
</figure>
```

All `<img>` tags should use `data-src` and optionally `data-src-2x` instead of using `src`.
This is to prevent accidentally loading images that are not in use. ALF will also detect the **device pixel ratio** and pick the appropriate image (retina or not).
They also need **width/height** attributes to ensure the calculations in the resulting layout will be correct.

Other than the `<img>` tag, the markup inside each of these elements is entirely up to you. E.g. you could add a div containing the image caption.

```html
<figure>
    <!-- ... -->
    <div data-map="4x3-small">
        <img width="460" height="345" data-src="http://url/to/image.jpg" data-src-2x="http://url/to/image@2x.jpg" />
        <div class="caption">Image caption</div>
    </div>
    <!-- ... -->
</figure>
```

## Best practices for mapping images

You are free to give images the mapping you want, but we recommend including some indicator about the orientation/cropping of the image and the size.
A good way of doing this is using `{orientation}-{size}`.

Examples:
 * `4x3-large`, `4x3-small`
 * `16x9-large`, `16x9-small`
 * `1x1-large`, `1x1-small`
 * `portrait-large`, `portrait-small` (for images that don't fit a common cropping)
 * `landscape-large`, `landscape-small` (for images that don't fit a common cropping)

By doing this it will be a lot easier to design templates (especially column-based), since they now can target images with different orientations.
