data-ref
========

Data ref can be used to create links between two different elements, ie. to
split the rendering across different containers.

Let's assume the following article content:

```html
<article>
  <figure>
    <div data-map="4x3-large">
      <img src="foo.png"/>
      <span class="caption">Foo image</span>
    </div>
  </figure>
  <figure>
    <div data-map="4x3-large">
      <img src="bar.png"/>
      <span class="caption">Bar image</span>
    </div>
  </figure>
</article>
```

### Decouple images and captions

Create one container with the images, and another container with the captions:

```html
// Template
<div class="alf-template" data-name="Image Collage">
  <div class="image-grid">
    <div class="alf-container" data-map="*-large" data-ref="1" data-select="img"></div>
    <div class="alf-container" data-map="*-large" data-ref="2" data-select="img"></div>
  </div>
  <div class="image-captions">
    <div class="alf-container" data-ref="1" data-select=".caption"></div>
    <div class="alf-container" data-ref="2" data-select=".caption"></div>
  </div>
</div>

// Output
<div class="alf-template" data-name="Image Collage">
  <div class="image-grid">
      <div class="alf-container" data-map="*-large" data-ref="1" data-select="img"><img src="foo.gif"></div>
      <div class="alf-container" data-map="*-large" data-ref="2" data-select="img"><img src="bar.gif"></div>
  </div>
  <div class="image-captions">
      <div class="alf-container" data-ref="1" data-select=".caption"><span class="caption">Foo image</span></div>
      <div class="alf-container" data-ref="2" data-select=".caption"><span class="caption">Bar image</span></div>
  </div>
</div>
```
