- [Overview](Widgets#overview)
- [HelloWorld - Using widgets in drmobile-integration](Widgets#helloworld---using-widgets-in-drmobile-integration)
- [Disqus example (with placeholder)](Widgets#disqus-example-with-placeholder)
- [Slideshow/gallery built-in widget](Widgets#slideshowgallery-built-in-widget)

## Requirements

Before reading this you should have a firm understanding of [containers](Container) and [figures](Figure).

## Overview

A widget is a function used to enrich the contents of a container, i.e Twitter feed, video player, slideshow etc. There are a couple of widgets which is a part of ALF and can be viewed directly in LayoutPreview, but you'll most likely want to make your own widgets for placeholders defined in figures. The widget targets the placeholders used when desking an article in LayoutPreview. Hence the containers (or their underlying elements) have attributes used by the widget.

LayoutPreview doesn't really care what the content is in a figure as long as its usage (i.e data-map) is defined in the template. With that in mind, you may put a complete markup for a video inside a figure, but that way you'll lose the flexibility of widgets.

## HelloWorld - Using widgets in drmobile-integration

Widgets used to alter or enrich contents, are sent down as an argument to the Page object in the [renderPage function](https://github.com/aptoma/drmobile-integration/blob/master/index.html#L178). The widgets can be either an object with functions, or an array of widget objects, each with their own run() function. For both cases in the following examples, add ``widgets: widgets,`` to the javascript in index.html:

```javascript
renderPage: function (el, pageNum) {
	var $el = $(el), page;

	page = new Alf.layout.Page({
		layer: this.pageLayer,
		widgets: widgets,
		assetsBaseUrl: assetsBaseUrl
	});
<snip>
```

### Widgets as functions in an object
Define a widget object with widget functionality in functions:
```javascript
widgets = {
	'img': function (done) {
		// Replace all images with a header
		this.container.lockSize();
		this.container.$el.empty().append('<h1>Hello world</h1>');
		done();
	},
	'.placeholder': function (done) {
		// Do something with elements with placeholder class
		done();
	}
}
```
### Widgets as objects
For easy maintainability, we recommend putting each widget in their own file, e.g **widgets/helloworld.js**:
```javascript
define('widgets/helloworld', ['alf'], function(Alf){
    "use strict";
    var $ = Alf.dom;

    return {
        selector: 'img',

        run: function(done){
            var container = this.container;
            container.$el.empty();
            container.$el.append('<h1>Hello world</h1>');
            done();
        }
    };
});
```
We then push our widget (and any other widgets) to the array:
```javascript
helloWorld = require('widgets/helloworld');
anotherWidget = require('widgets/anotherone');

var widgets = [];
widgets.push(helloWorldWidget);
widgets.push(anotherWidget);
```

## Disqus example (with placeholder)

First we define the figure to be used in the template. 
```html
<figure>
	<div class="alf-widget lp-widget-disqus" shortname="your_shortname" data-query="123456"
		data-map="16x9-large 16x9-large-media-only 16x9-small 16x9-small-media-only" ></div>
</figure>
```

Here we have created an empty placeholder with no functionality whatsoever. The `data-query` is used by the widget to get the relevant discussion from Disqus, and `shortname` is the unique indentifier of your site. The `alf-widget` class creates a turqoise box with the text "Widget" as a placeholder, but you can style it however you like with other classes if you prefer. You don't have to use the `alf-widget` class, but you'll get a quick start when creating new widgets until you create your own styles.

An example widget function using the figure above by targeting the `lp-widget-disqus` class, would be something like this:

```javascript
widgets = {
	'.lp-widget-disqus': function (done) {
		container = this.container;

		// Get variables used in Disqus javascript
		var disqus_shortname = this.$el.attr('shortname');
		var disqus_identifier = this.$el.attr('data-query');

		// Create Disqus container
		var disqus_container = document.createElement('div');
		disqus_container.id = 'disqus_thread';

		// Create script element and add i to the container
		var disqus_script = document.createElement('script'); 
		disqus_script.type = 'text/javascript'; disqus_script.async = true;
		disqus_script.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
		disqus_container.appendChild(disqus_script);

		// Clear the placeholder and replace with Disqus container
		container.$el.empty().append(disqus_container);
		done();
	}
};
```

You can add it as an object instead with a run-function if you like as shown in [the HelloWorld example](Widgets#widgets-as-objects)

## Slideshow/gallery built-in widget

The slideshow widget is a built-in widget in ALF, and will work in LayoutPreview without the use of a placeholder. The widget targets containers with the alf-slideshow class, and will use the underlying children as content in the slideshow. In the template, you need to have an alf-container (or alf-container-inline) mapped to the figure, as well as an an alf-container-fullscreen.

Example template with a title and a slideshow:
```xml
<div data-map="article" class="alf-template iphone iphone-portrait" data-name="Gallery template with title"
        data-media="(max-width: 1023px) and (min-height: 300px)">
    <div class="alf-container" data-map="title"></div>
    <div class="alf-container" data-map="4x3-small"></div>
    <div class="alf-container-fullscreen" data-map="4x3-small"></div>
</div>
```

Simple article source:
```xml
<article>
	<figure>
		<header data-map="title">This is a slideshow</header>
	</figure>
	<figure>
		<div class="alf-slideshow" data-map="4x3-small">
			<img width="460" height="345" data-src="http://yourdomain.com/firstimage_small.jpg" />
			<img width="460" height="345" data-src="http://yourdomain.com/secondimage_small.jpg" />
		</div>
	</figure>
</article>
```
You may have captions etc as well for the images as long as they are structured in each their own element directly under the one with the alf-slideshow class.

Simple article with image and captions:
```xml
<article>
	<figure>
		<header data-map="title">This is a slideshow</header>
	</figure>
	<figure>
		<div class="alf-slideshow" data-map="4x3-small">
			<div>
				<img width="460" height="345" data-src="http://yourdomain.com/firstimage_small.jpg" />
				<div class="caption">This is a caption for the first image</div>
			</div>
			<div>
				<img width="460" height="345" data-src="http://yourdomain.com/secondimage_small.jpg" />
				<div class="caption">This is a caption for the second image</div>
			</div>
		</div>
	</figure>
</article>
```