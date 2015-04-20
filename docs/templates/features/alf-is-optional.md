All containers defined in a template needs to have a corresponding figure in the source article for it to be made available when desking an article. By adding the ``alf-is-optional`` class to the container, the figure is made optional. An ``alf-container-inline`` is optional by default, so it's only necessary to specify on ``alf-container``.

## Examples

Template that requires both a ``title`` and a ``4x3-large`` figure to be present in the source article.
```xml
<div data-map="article" class="alf-template" data-name="Test 1" data-media="(min-width: 1024px) and (min-height: 748px)">
    <div class="alf-container" data-map="title"></div>
    <div class="alf-container" data-map="4x3-large"></div>
</div>
```
***
Template that requires a ``title`` figure, and _may_ have a ``4x3-large`` figure.
```xml
<div data-map="article" class="alf-template" data-name="Test 2" data-media="(min-width: 1024px) and (min-height: 748px)">
    <div class="alf-container" data-map="title"></div>
    <div class="alf-container alf-is-optional" data-map="4x3-large"></div>
</div>
```
***
Template that requires a ``title`` figure, and _may_ have an ``excerpt`` figure and one or more ``4x3-large`` figures. All ``4x3-large`` figures are displayed wherever they appear in the original text since they are displayed as inline figures in an ``alf-region``:
```xml
<div data-map="article" class="alf-template" data-name="Test 3" data-media="(min-width: 1024px) and (min-height: 748px)">
    <div class="alf-container" data-map="title"></div>
    <div class="alf-container alf-is-optional" data-map="excerpt">
    <div class="alf-region alf-flex">
        <div class="alf-container-inline" data-map="4x3-large"></div>
    </div>
</div>
```