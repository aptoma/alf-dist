## Description

Containers are elements used in [templates](Building templates) to contain [figures](Figure).

## Examples

Lets say that the article we're importing contains the following [[figure]]:

```html
<figure>
     <h1 data-map="title">Title of the article</h1>
</figure>
```

The [[figure]] can then be targeted in a template by a container like this:

```html
<div class="alf-container" data-map="title"></div>
```

The resulting markup on the page will be:

```html
<div class="alf-container" data-map="title">
    <h1 data-map="title">Title of the article</h1>
</div>
```
