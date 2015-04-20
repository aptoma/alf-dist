>See also ``[alf-is-non-splittable](templates/features/alf-is-non-splittable)``.

Block content other than ``<p>``, ``<ul>`` and ``<ol>`` flowing in an ``alf-region`` are non-splittable by default. This means that the block element will not be displayed unless there's room for the entire content in a single region. If you want to allow content to be split over several regions, you may set the ``alf-is-splittable`` class on the element(s) in question.

## Examples

The content in the first ``<div>`` will flow in an ``alf-region``, and the second ``<div>`` will be moved in its entirety to the next available region if the current region hasn't got enough room for it.
```html
<div>
   This is a really, really, really, really long text and will fill out most of a region.
</div>
<div>
   This text is also super long, so there's not room for all of it in the same region as the previous div.
</div>
```
***
The content in the first ``<div>`` will flow in an ``alf-region``, and the content overflowing the current region from the second ``<div>`` will be moved to the next available region.
```html
<div>
   This is a really, really, really, really long text and will fill out most of a region.
</div>
<div class="alf-is-splittable">
   This text is also super long, so there's not room for all of it in the same region as the previous div.
</div>
```