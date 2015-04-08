## Description

Regions are elements used in [templates](Building templates) to contain [blocks](Block).

## Examples

Lets say that the article we're importing contains the following [blocks](Blocks):

```html
<article>
    <p>I am a block</p>
    <blockquote>I am a block as well</blockquote>
</article>
```

A template with regions will look something like this:

```html
<div class="alf-template">
    <div class="alf-region"></div>
</div>
```

The resulting markup on the page will be:

```html
<div class="alf-template">
    <div class="alf-region">
        <p>I am a block</p>
        <blockquote>I am a block as well</blockquote>
    </div>
</div>
```

In this case all the elements fit inside a single region, which doesn't cause it to flow into the next one.
<br/>In the real world a single region is usually not enough, which would cause ALF to overflow the last block into the next region - either on the same page or to the first region on the next page if there's no space left on the current page.
