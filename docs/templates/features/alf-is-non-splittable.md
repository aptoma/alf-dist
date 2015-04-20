>See also ``[[alf-is-splittable|Alf-is-splittable]]``.

Block content of the types ``<p>``, ``<ul>`` and ``<ol>`` flowing in an ``alf-region`` are splittable by default. This means that the content will be split over to the next region whenever the current region is filled to its limit, even if there's not a natural break in the content. If you want to force content not to be split over several regions, you may set the ``alf-is-non-splittable`` class on the element(s) in question.

>This feature should be used with caution! If there's no room in any ``alf-region`` in any of the available templates for the entire content specified as ``alf-is-non-splittable``, no further content will be displayed in any regions.

## Examples

This content will flow in an ``alf-region``, and the second paragraph will be split to the next ``alf-region``.
```html
<p>
   This is a really, really, really, really long text and will fill out most of a region.
</p>
<p>
   This paragraph is also super long, so there's not room for all of it in the same region as the previous paragraph.
</p>
```
***
This content will flow in an ``alf-region``, but the second paragraph will be moved in its entirety to the next region if the current region hasn't got enough room for it.
```html
<p>
   This is a really, really, really, really long text and will fill out most of a region.
</p>
<p class="alf-is-non-splittable">
   This paragraph is also super long, so there's not room for all of it in the same region as the previous paragraph.
</p>
```