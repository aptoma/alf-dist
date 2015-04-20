data-select
===========

Data select can be used to select specific elements of a figure, ie. to extract
only the image element. The matching is using CSS selectors. Zepto is used under
the hood, so any selector that Zepto understands should work.

For the following examples, we'll assume this article content:

```html
<article>
  <figure>
    <span data-map="section">Featured</span>
  </figure>
  <figure>
    <div class="media-element" data-map="4x3-large">
      <img src="foo.png"/>
      <img src="foo-hires.png"/>
      <div class="caption">My caption</div>
    </div>
  </figure>
</article>
```

### Select only the image element

If you only want to render the image element, select `img`.

```html
// Template
<div class="alf-container" data-map="*-large" data-select="img"></div>

// Output
<div class="alf-container" data-map="*-large" data-select="img">
  <img src="foo.png"/>
  <img src="foo-hires.png"/>
</div>
```

If you only want the first element, select `img:first`.

```html
// Template
<div class="alf-container" data-map="*-large" data-select="img:first"></div>

// Output
<div class="alf-container" data-map="*-large" data-select="img:first">
  <img src="foo.png"/>
</div>
```

If your content source contains multiple images and you want more control over
the selected image, we recommend adding classes or data attributes, and use
those for selecting.

### Select multiple elements

You can put multiple elements with selects inside your container:

```html
// Template
<div class="alf-container" data-map="*-large">
  <caption data-select=".caption"></caption>
  <div data-select="img:first"></div>
</div>

// Output
<div class="alf-container" data-map="*-large">
  <caption data-select=".caption">
    <div class="caption">My caption</div>
  </caption>
  <div data-select="img:first">
    <img src="foo.png"/>
  </div>
</div>
```
