ALF - Aptoma Layout Framework (distribution version)
====================================================

## Installation

ALF can be installed with [Bower](http://bower.io/) or [npm](https://www.npmjs.org/). We highly recommend using NPM instead of Bower, as most bundlers work better with NPM.

    npm install alf
    bower install alf

## Which bundle?

There are 2:
 * `alf.js` - **Default**. Defaults to depending on jQuery ([browser support](https://jquery.com/browser-support/)), but also works with Zepto (([browser support](http://zeptojs.com/#browsers)). You may switch to Zepto in your bundler config (see below).
 * `alf-deps.js` - Bundled with Zepto. All-in-one bundle with all dependencides included. Can also be included in your own app-bundle using a module bundler, but that's only recommended if your app is centered mainly around ALF. Consider using `alf.js` if you have overlapping dependencies.

**ALF is using the [UMD](https://github.com/umdjs/umd) pattern**. This means that it will look for dependencies and register itself in the system it finds first of the following:
 * CommonJS2
 * AMD
 * CommonJS
 * Window

## Webpack tips

We recommend using [NPM](https://www.npmjs.com/), but if you have to use [Bower](http://bower.io/), there's some [more info at the webpack site](http://webpack.github.io/docs/usage-with-bower.html) about how you configure it.

**Example config using Webpack with NPM**

```javascript
module.exports = {
    entry: {
        'my-bundle': "./my-app.js",
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        libraryTarget: 'var',
        library: 'MyApp'
    },
    resolve: {
        root: [
            // Use this to make Webpack always prefer locally installed modules instead of the ones inside ALF. This will prevent including dependencies twice in your bundle (like lodash)
            path.resolve(__dirname, 'node_modules'),
        ],
        alias: {
            // This is recommended, as it will prevent submodules from using underscore when lodash is available. Will reduce the file size.
            underscore: 'lodash',
            // Use to replace with zepto when using ALF without dependencies
            jquery: 'npm-zepto'
        }
    }
};
```



![Alf!](http://www.alftv.com/images/alfyoutube1.jpg)
