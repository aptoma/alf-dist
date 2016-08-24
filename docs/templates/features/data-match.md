data-match
===========

Data match can be used on a container to require the figure to contain a matching element in it's content. The matching is using CSS selectors.

For the following examples, we'll assume this article content:

```html
<article>
  <figure>
    <div data-map="4x3-large"><img src="foo.png"/></div>
    <div data-map="4x3-large"><video src="video.mp4"></div>
  </figure>
</article>
```

### Require that the figure contains the image

```html
// Template
<div class="alf-container image-container" data-map="*-large" data-match="img"></div>

// Output
<div class="alf-container image-container" data-map="*-large" data-match="img">
  <div data-map="4x3-large"><img src="foo.png"/></div>
</div>
```

### Require that the figure contains the video

```html
// Template
<div class="alf-container image-container" data-map="*-large" data-match="video"></div>

// Output
<div class="alf-container image-container" data-map="*-large" data-match="video">
  <video src="video.mp4">
</div>
```
