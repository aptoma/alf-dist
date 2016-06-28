(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("jquery"), require("backbone"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "jquery", "backbone"], factory);
	else if(typeof exports === 'object')
		exports["ALF"] = factory(require("lodash"), require("jquery"), require("backbone"));
	else
		root["ALF"] = factory(root["_"], root["$"], root["Backbone"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_9__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _hub = __webpack_require__(8);

	var _hub2 = _interopRequireDefault(_hub);

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _backbone = __webpack_require__(9);

	var _transition = __webpack_require__(14);

	var _transition2 = _interopRequireDefault(_transition);

	var _layer = __webpack_require__(20);

	var _layer2 = _interopRequireDefault(_layer);

	var _layout = __webpack_require__(26);

	var _layout2 = _interopRequireDefault(_layout);

	var _serialize = __webpack_require__(56);

	var _serialize2 = _interopRequireDefault(_serialize);

	var _compile = __webpack_require__(59);

	var _compile2 = _interopRequireDefault(_compile);

	var _nav = __webpack_require__(60);

	var _nav2 = _interopRequireDefault(_nav);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    dom: _dom2.default,
	    _: _lodash2.default,
	    hub: _hub2.default,
	    Base: _Base2.default,
	    View: _BaseView2.default,
	    Events: _backbone.Events,
	    transition: _transition2.default,
	    layer: _layer2.default,
	    layout: _layout2.default,
	    serialize: _serialize2.default,
	    compile: _compile2.default,
	    nav: _nav2.default,
	    util: _util2.default
	}; /**
	    * Alf - Aptoma Layout Framework
	    *
	    * @copyright 2012-2015 Aptoma AS aptoma.com
	    * @author Peter Rudolfsen <peter@aptoma.com>
	    */

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	__webpack_require__(3);

	__webpack_require__(6);

	__webpack_require__(7);

	var _domlib = __webpack_require__(4);

	var _domlib2 = _interopRequireDefault(_domlib);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _domlib2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _domlib = __webpack_require__(4);

	var _domlib2 = _interopRequireDefault(_domlib);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var touch = {};
	var touchTimeout, longTapTimeout;

	function parentIfText(node) {
	    return 'tagName' in node ? node : node.parentNode;
	}

	function swipeDirection(x1, x2, y1, y2) {
	    var xDelta = Math.abs(x1 - x2);
	    var yDelta = Math.abs(y1 - y2);

	    return xDelta >= yDelta ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
	}

	var timedEvents = {
	    longTap: {
	        delay: 750
	    },
	    active: {
	        delay: 0
	    }
	};

	function cancelTimedEvent(event) {
	    event = timedEvents[event];
	    if (event.timeout) {
	        clearTimeout(event.timeout);
	    }
	    event.timeout = null;
	}

	// Shortcut methods for the timed events
	function longTap() {
	    timedEvents.longTap.timeout = null;

	    if (touch.last) {
	        touch.el.trigger('longTap');
	        touch = {};
	    }
	}

	function active() {
	    timedEvents.active.timeout = null;
	    if (touch.last) {
	        touch.el.trigger('active');
	    }
	}

	function cancelLongTap() {
	    cancelTimedEvent('longTap');
	}

	function cancelActive() {
	    cancelTimedEvent('active');
	}

	if (typeof window !== 'undefined') {
	    (0, _domlib2.default)(document).ready(load);
	}

	function load() {
	    var now, delta, touchXDelta, touchYDelta, point;
	    var touching = false;
	    var hasTouch = 'ontouchstart' in window;
	    var startEv = 'touchstart';
	    var moveEv = 'touchmove';
	    var endEv = 'touchend';

	    if (!hasTouch) {
	        startEv = 'mousedown';
	        moveEv = 'mousemove';
	        endEv = 'mouseup';
	    }

	    (0, _domlib2.default)(document.body).bind(startEv, function (e) {
	        e = e.originalEvent || e;
	        touching = true;
	        point = hasTouch ? e.touches[0] : e;
	        now = Date.now();
	        delta = now - (touch.last || now);
	        touch.el = (0, _domlib2.default)(parentIfText(point.target));
	        touchTimeout && clearTimeout(touchTimeout);

	        touch.x1 = point.pageX;
	        touch.y1 = point.pageY;
	        touch.x2 = point.pageX;
	        touch.y2 = point.pageY;

	        if (delta > 0 && delta <= 250) {
	            touch.isDoubleTap = true;
	        }

	        touch.last = now;
	        timedEvents.longTap.timeout = setTimeout(longTap, timedEvents.longTap.delay);
	        timedEvents.active.timeout = setTimeout(active, timedEvents.active.delay);
	    }).bind(moveEv, function (e) {
	        if (!touching) {
	            return;
	        }

	        e = e.originalEvent || e;
	        cancelActive();
	        cancelLongTap();
	        point = hasTouch ? e.touches[0] : e;
	        touch.x2 = point.pageX;
	        touch.y2 = point.pageY;

	        if (document.webkitPointerLockElement) {
	            touching = false;
	        }
	    }).bind(endEv, function (e) {
	        if (!touching) {
	            return;
	        }

	        touching = false;
	        cancelLongTap();
	        cancelActive();

	        touchXDelta = Math.abs(touch.x1 - touch.x2);
	        touchYDelta = Math.abs(touch.y1 - touch.y2);

	        // double tap (tapped twice within 250ms)
	        if (touch.isDoubleTap) {
	            touch.el.trigger('doubleTap', touch.el);
	            touch = {};

	            // swipe
	        } else if (touchXDelta > 30 || touchYDelta > 30) {
	                touch.el.trigger('swipe') && touch.el.trigger('swipe' + swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2));
	                touch = {};

	                // normal tap
	            } else if ('last' in touch && touchXDelta < 7 && touchYDelta < 7) {
	                    touch.el.trigger('tap');

	                    touchTimeout = setTimeout(function () {
	                        touchTimeout = null;
	                        touch.el.trigger('singleTap');
	                        touch = {};
	                    }, 250);
	                }
	    }).bind('touchcancel', function () {
	        if (touchTimeout) {
	            clearTimeout(touchTimeout);
	        }

	        if (longTapTimeout) {
	            clearTimeout(longTapTimeout);
	        }

	        longTapTimeout = touchTimeout = null;
	        touch = {};
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * MODERN is injected by the module builder.
	 * ES6/Babel doesn't like using conditionals around imports, so we have to use require here
	 */
	var $ = __webpack_require__(5);

	module.exports = $;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _domlib = __webpack_require__(4);

	var _domlib2 = _interopRequireDefault(_domlib);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (typeof window !== 'undefined') {
	    _domlib2.default.fn.outerHeight = getOuterHeight;
	    _domlib2.default.fn.marginHeight = getMarginHeight;
	    _domlib2.default.fn.margin = getMargin;
	    _domlib2.default.fn.padding = getPadding;
	    _domlib2.default.fn.metrics = getMetrics;
	}

	function getOuterHeight() {
	    var el = this[0];
	    var marginHeight = getMarginHeight.call(this);

	    return el.offsetHeight + marginHeight;
	}

	function getMarginHeight() {
	    var margin = getMargin.call(this);

	    return margin.top + margin.bottom;
	}

	function getMargin() {
	    var el = this[0];
	    var styles = window.getComputedStyle(el, null);
	    var margin;

	    margin = {
	        top: intProp(styles, 'margin-top'),
	        right: intProp(styles, 'margin-right'),
	        bottom: intProp(styles, 'margin-bottom'),
	        left: intProp(styles, 'margin-left')
	    };

	    margin.height = margin.top + margin.bottom;
	    margin.width = margin.left + margin.right;

	    return margin;
	}

	function getPadding() {
	    var el = this[0];
	    var styles = window.getComputedStyle(el, null);

	    return {
	        top: intProp(styles, 'padding-top'),
	        right: intProp(styles, 'padding-right'),
	        bottom: intProp(styles, 'padding-bottom'),
	        left: intProp(styles, 'padding-left')
	    };
	}

	function getMetrics() {
	    var el = this[0];
	    var rect = el.getBoundingClientRect();
	    var margin = getMargin.call(this);
	    var padding = getPadding.call(this);

	    return {
	        height: el.clientHeight,
	        width: el.clientWidth,
	        top: rect.top,
	        right: rect.right,
	        bottom: rect.bottom,
	        left: rect.left,
	        outerHeight: rect.height + margin.height,
	        outerWidth: rect.width + margin.width,
	        marginTop: margin.top,
	        marginRight: margin.right,
	        marginBottom: margin.bottom,
	        marginLeft: margin.left,
	        marginHeight: margin.height,
	        marginWidth: margin.width,
	        paddingTop: padding.top,
	        paddingRight: padding.right,
	        paddingBottom: padding.bottom,
	        paddingLeft: padding.left,
	        lineHeight: parseInt(_domlib2.default.fn.css.call(this, 'line-height'), 10)
	    };
	}

	function intProp(styles, value) {
	    return parseInt(styles.getPropertyValue(value), 10);
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _domlib = __webpack_require__(4);

	var _domlib2 = _interopRequireDefault(_domlib);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (typeof window !== 'undefined') {
	    _domlib2.default.fn.textFit = textFit;
	} /*!
	   * textFit.js
	   *
	   * Copyright 2011, Peter Rudolfsen
	   */

	function textFit(compression) {
	    return this.each(function () {
	        var $this = (0, _domlib2.default)(this),
	            compression = compression || 1,
	            $span = (0, _domlib2.default)('<span style="display:inline-block;margin:0;padding:0;"></span>').html($this.text()),
	            fontSize = parseInt(window.getComputedStyle(this).getPropertyValue('font-size'), 10),
	            thisWidth = $this.width(),
	            spanWidth = 0;

	        // This can happen if the element targeted to be resized is hidden (display: none), or not in the document
	        if (thisWidth === 0) {
	            return;
	        }

	        $this.empty().append($span);
	        spanWidth = $span.width();

	        if (spanWidth >= thisWidth) {
	            fontSize = 8;
	            $this.css('font-size', fontSize + 'px');
	            spanWidth = $span.width();
	        }

	        while (spanWidth < thisWidth) {
	            fontSize += 1;
	            $this.css('font-size', fontSize + 'px');

	            spanWidth = $span.width();
	            thisWidth = $this.width();
	        }

	        if (spanWidth >= thisWidth) {
	            fontSize -= 1;
	        }

	        $this.css('font-size', fontSize / compression + 'px');
	    });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _backbone = __webpack_require__(9);

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _lodash2.default.extend({}, _backbone2.default.Events);

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _backbone = __webpack_require__(9);

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Base object for all non-backbone objects
	 *
	 * Has the extend function to set up the prototype chain
	 */
	var Base = function Base() {
	    this.initialize.apply(this, arguments);
	};

	Base.prototype = {
	    initialize: function initialize() {}
	};

	Base.extend = _backbone2.default.Model.extend;

	exports.default = Base;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _backbone = __webpack_require__(9);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _md = __webpack_require__(13);

	var _md2 = _interopRequireDefault(_md);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _backbone2.default.View.extend({
	    startX: 0,
	    startY: 0,
	    startScale: 1,
	    rotation: 0,

	    getSignature: function getSignature() {
	        if (!this.signature) {
	            this.lockSignature();
	        }

	        return this.signature;
	    },

	    lockSignature: function lockSignature() {
	        this.signature = (0, _md2.default)(this.el.outerHTML);
	        this.innerSignature = (0, _md2.default)(this.el.innerHTML);
	    },

	    matchesSignature: function matchesSignature(signature) {
	        return signature === this.signature;
	    },

	    matchesInnerSignature: function matchesInnerSignature(signature) {
	        return signature === this.innerSignature;
	    },

	    matchesAnySignature: function matchesAnySignature(signature) {
	        return this.matchesSignature(signature) || this.matchesInnerSignature(signature);
	    },

	    disable: function disable() {
	        this.isDisabled = true;
	        this.$el.addClass(_classnames2.default.IS_DISABLED);
	    },

	    enable: function enable() {
	        this.isDisabled = false;
	        this.$el.removeClass(_classnames2.default.IS_DISABLED);
	    },

	    isInDOM: function isInDOM() {
	        return this.el.parentNode !== null;
	    },

	    startTransform: function startTransform(event) {
	        event.preventDefault();
	        event.stopPropagation();

	        this.startX = event.pageX;
	        this.startY = event.pageY;
	        this.startScale = event.scale;
	        this.startRotation = event.rotation;
	        event.currentTarget.classList.add('alf-is-moving');
	    },

	    transformEventTarget: function transformEventTarget(event) {
	        this.transformElByEvent(event.currentTarget, event);
	    },

	    transformEl: function transformEl(event) {
	        this.transformElByEvent(this.el, event);
	    },

	    transformElByEvent: function transformElByEvent(el, event) {
	        event.preventDefault();
	        event.stopPropagation();
	        event = event.originalEvent || event;

	        var x = event.pageX - this.startX;
	        var y = event.pageY - this.startY;
	        var scale = event.scale;
	        var rotation = event.rotation - this.startRotation;

	        this.doTransform(el, { x: x, y: y, scale: scale, rotation: rotation });
	    },

	    doTransform: function doTransform(el, params) {
	        var transform = '';

	        // Using z = 1px to put it on top of the lowest lvl elements
	        transform += 'translate3d(' + params.x + 'px, ' + params.y + 'px, 1px)';
	        if (params.rotation) {
	            transform += 'rotate(' + params.rotation + 'deg) ';
	        }
	        transform += 'scale(' + params.scale + ') ';

	        el.style.webkitTransition = 'none';
	        el.style.webkitTransform = transform;
	    },

	    enableScrolling: function enableScrolling(directions) {
	        directions = directions || {
	            x: true,
	            y: true
	        };

	        var classes = [];
	        directions.x && classes.push('alf-is-scrollable-x');
	        directions.y && classes.push('alf-is-scrollable-y');

	        this.$el.addClass(classes.join(' '));
	    },

	    preventDefault: function preventDefault(event) {
	        event.preventDefault();
	    }
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	/**
	 * Class names in use by alf
	 */
	exports.default = {
	    ALLOW_MULTIPLE: 'alf-allow-multiple',
	    ALLOW_OVERFLOW: 'alf-allow-overflow',
	    ASSET_STYLESHEET: 'alf-asset-stylesheet',
	    BREAK_BEFORE: 'alf-break-before',
	    BTN_GROUP: 'alf-btn-group',
	    CONTAINER: 'alf-container',
	    CONTAINER_FULLSCREEN: 'alf-container-fullscreen',
	    CONTAINER_INLINE: 'alf-container-inline',
	    CONTAINER_IS_UNLOADED: 'alf-container-is-unloaded',
	    CONTROLS_OFF: 'alf-controls-off',
	    FULLSCREEN_CONTENT: 'alf-fullscreen-content',
	    FULLSCREEN_EXIT: 'alf-fullscreen-exit',
	    FULLSCREEN_TOOLBAR: 'alf-fullscreen-toolbar',
	    MULTI_CHOICE: 'alf-multiple-choices',
	    IMAGE: 'alf-image',
	    IS_BREAKABLE: 'alf-is-breakable',
	    IS_DISABLED: 'alf-is-disabled',
	    IS_DRAGGABLE: 'alf-is-draggable',
	    IS_DRAGGABLE_X: 'alf-is-draggable-x',
	    IS_DRAGGABLE_Y: 'alf-is-draggable-y',
	    IS_EDITABLE: 'alf-is-editable',
	    IS_HIDDEN: 'alf-is-hidden',
	    IS_FIRST_BLOCK: 'alf-block-is-first',
	    IS_LAST_BLOCK: 'alf-block-is-last',
	    IS_NON_BREAKABLE: 'alf-is-non-breakable',
	    IS_NON_REARRANGEABLE: 'alf-is-non-rearrangeable',
	    IS_NON_SPLITTABLE: 'alf-is-non-splittable',
	    IS_OPTIONAL: 'alf-is-optional',
	    IS_PLAYING: 'alf-is-playing',
	    IS_REARRANGEABLE: 'alf-is-rearrangeable',
	    IS_REMOVABLE: 'alf-is-removable',
	    IS_REMOVED: 'alf-is-removed',
	    IS_RESPONSIVE: 'alf-is-responsive',
	    IS_RESIZABLE: 'alf-is-resizable',
	    IS_SPLITTABLE: 'alf-is-splittable',
	    IS_VISIBLE: 'alf-is-visible',
	    NO_SCORE: 'alf-no-score',
	    PAGENUM_X: function PAGENUM_X(x) {
	        return 'alf-pagenum-' + x;
	    },
	    PAGENUM_TOTAL_X: function PAGENUM_TOTAL_X(x) {
	        return 'alf-pagenum-total-' + x;
	    },
	    REVISION: function REVISION(revision) {
	        return 'alf-rev-' + revision;
	    },
	    REGION: 'alf-region',
	    REGION_FLEXIBLE: 'alf-region-flexible',
	    SIZE_DETECTOR: 'alf-size-detector',
	    STICK_TO_NEXT: 'alf-stick-to-next',
	    STRETCH_TO_FIT: 'alf-stretch-to-fit',
	    SUPPORTS_FULLSCREEN: 'alf-supports-fullscreen',
	    WIDGET: 'alf-widget'
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function md5cycle(x, k) {
	    var a = x[0],
	        b = x[1],
	        c = x[2],
	        d = x[3];

	    a = ff(a, b, c, d, k[0], 7, -680876936);
	    d = ff(d, a, b, c, k[1], 12, -389564586);
	    c = ff(c, d, a, b, k[2], 17, 606105819);
	    b = ff(b, c, d, a, k[3], 22, -1044525330);
	    a = ff(a, b, c, d, k[4], 7, -176418897);
	    d = ff(d, a, b, c, k[5], 12, 1200080426);
	    c = ff(c, d, a, b, k[6], 17, -1473231341);
	    b = ff(b, c, d, a, k[7], 22, -45705983);
	    a = ff(a, b, c, d, k[8], 7, 1770035416);
	    d = ff(d, a, b, c, k[9], 12, -1958414417);
	    c = ff(c, d, a, b, k[10], 17, -42063);
	    b = ff(b, c, d, a, k[11], 22, -1990404162);
	    a = ff(a, b, c, d, k[12], 7, 1804603682);
	    d = ff(d, a, b, c, k[13], 12, -40341101);
	    c = ff(c, d, a, b, k[14], 17, -1502002290);
	    b = ff(b, c, d, a, k[15], 22, 1236535329);

	    a = gg(a, b, c, d, k[1], 5, -165796510);
	    d = gg(d, a, b, c, k[6], 9, -1069501632);
	    c = gg(c, d, a, b, k[11], 14, 643717713);
	    b = gg(b, c, d, a, k[0], 20, -373897302);
	    a = gg(a, b, c, d, k[5], 5, -701558691);
	    d = gg(d, a, b, c, k[10], 9, 38016083);
	    c = gg(c, d, a, b, k[15], 14, -660478335);
	    b = gg(b, c, d, a, k[4], 20, -405537848);
	    a = gg(a, b, c, d, k[9], 5, 568446438);
	    d = gg(d, a, b, c, k[14], 9, -1019803690);
	    c = gg(c, d, a, b, k[3], 14, -187363961);
	    b = gg(b, c, d, a, k[8], 20, 1163531501);
	    a = gg(a, b, c, d, k[13], 5, -1444681467);
	    d = gg(d, a, b, c, k[2], 9, -51403784);
	    c = gg(c, d, a, b, k[7], 14, 1735328473);
	    b = gg(b, c, d, a, k[12], 20, -1926607734);

	    a = hh(a, b, c, d, k[5], 4, -378558);
	    d = hh(d, a, b, c, k[8], 11, -2022574463);
	    c = hh(c, d, a, b, k[11], 16, 1839030562);
	    b = hh(b, c, d, a, k[14], 23, -35309556);
	    a = hh(a, b, c, d, k[1], 4, -1530992060);
	    d = hh(d, a, b, c, k[4], 11, 1272893353);
	    c = hh(c, d, a, b, k[7], 16, -155497632);
	    b = hh(b, c, d, a, k[10], 23, -1094730640);
	    a = hh(a, b, c, d, k[13], 4, 681279174);
	    d = hh(d, a, b, c, k[0], 11, -358537222);
	    c = hh(c, d, a, b, k[3], 16, -722521979);
	    b = hh(b, c, d, a, k[6], 23, 76029189);
	    a = hh(a, b, c, d, k[9], 4, -640364487);
	    d = hh(d, a, b, c, k[12], 11, -421815835);
	    c = hh(c, d, a, b, k[15], 16, 530742520);
	    b = hh(b, c, d, a, k[2], 23, -995338651);

	    a = ii(a, b, c, d, k[0], 6, -198630844);
	    d = ii(d, a, b, c, k[7], 10, 1126891415);
	    c = ii(c, d, a, b, k[14], 15, -1416354905);
	    b = ii(b, c, d, a, k[5], 21, -57434055);
	    a = ii(a, b, c, d, k[12], 6, 1700485571);
	    d = ii(d, a, b, c, k[3], 10, -1894986606);
	    c = ii(c, d, a, b, k[10], 15, -1051523);
	    b = ii(b, c, d, a, k[1], 21, -2054922799);
	    a = ii(a, b, c, d, k[8], 6, 1873313359);
	    d = ii(d, a, b, c, k[15], 10, -30611744);
	    c = ii(c, d, a, b, k[6], 15, -1560198380);
	    b = ii(b, c, d, a, k[13], 21, 1309151649);
	    a = ii(a, b, c, d, k[4], 6, -145523070);
	    d = ii(d, a, b, c, k[11], 10, -1120210379);
	    c = ii(c, d, a, b, k[2], 15, 718787259);
	    b = ii(b, c, d, a, k[9], 21, -343485551);

	    x[0] = add32(a, x[0]);
	    x[1] = add32(b, x[1]);
	    x[2] = add32(c, x[2]);
	    x[3] = add32(d, x[3]);
	}

	function cmn(q, a, b, x, s, t) {
	    a = add32(add32(a, q), add32(x, t));
	    return add32(a << s | a >>> 32 - s, b);
	}

	function ff(a, b, c, d, x, s, t) {
	    return cmn(b & c | ~b & d, a, b, x, s, t);
	}

	function gg(a, b, c, d, x, s, t) {
	    return cmn(b & d | c & ~d, a, b, x, s, t);
	}

	function hh(a, b, c, d, x, s, t) {
	    return cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function ii(a, b, c, d, x, s, t) {
	    return cmn(c ^ (b | ~d), a, b, x, s, t);
	}

	function md51(s) {
	    var n = s.length,
	        state = [1732584193, -271733879, -1732584194, 271733878],
	        i;
	    for (i = 64; i <= s.length; i += 64) {
	        md5cycle(state, md5blk(s.substring(i - 64, i)));
	    }
	    s = s.substring(i - 64);
	    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	    for (i = 0; i < s.length; i++) {
	        tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
	    }tail[i >> 2] |= 0x80 << (i % 4 << 3);
	    if (i > 55) {
	        md5cycle(state, tail);
	        for (i = 0; i < 16; i++) {
	            tail[i] = 0;
	        }
	    }
	    tail[14] = n * 8;
	    md5cycle(state, tail);
	    return state;
	}

	/* there needs to be support for Unicode here,
	 * unless we pretend that we can redefine the MD-5
	 * algorithm for multi-byte characters (perhaps
	 * by adding every four 16-bit characters and
	 * shortening the sum to 32 bits). Otherwise
	 * I suggest performing MD-5 as if every character
	 * was two bytes--e.g., 0040 0025 = @%--but then
	 * how will an ordinary MD-5 sum be matched?
	 * There is no way to standardize text to something
	 * like UTF-8 before transformation; speed cost is
	 * utterly prohibitive. The JavaScript standard
	 * itself needs to look at this: it should start
	 * providing access to strings as preformed UTF-8
	 * 8-bit unsigned value arrays.
	 */
	function md5blk(s) {
	    /* I figured global was faster.   */
	    var md5blks = [],
	        i; /* Andy King said do it this way. */
	    for (i = 0; i < 64; i += 4) {
	        md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
	    }
	    return md5blks;
	}

	var hex_chr = '0123456789abcdef'.split('');

	function rhex(n) {
	    var s = '',
	        j = 0;
	    for (; j < 4; j++) {
	        s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];
	    }return s;
	}

	function hex(x) {
	    for (var i = 0; i < x.length; i++) {
	        x[i] = rhex(x[i]);
	    }return x.join('');
	}

	function md5(s) {
	    return hex(md51(s));
	}

	/* this function is much faster,
	so if possible we use it. Some IEs
	are the only ones I know of that
	need the idiotic second function,
	generated by an if clause.  */

	function add32(a, b) {
	    return a + b & 0xFFFFFFFF;
	}

	exports.default = md5;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Dispatcher = __webpack_require__(15);

	var _Dispatcher2 = _interopRequireDefault(_Dispatcher);

	var _Appear = __webpack_require__(16);

	var _Appear2 = _interopRequireDefault(_Appear);

	var _Clip = __webpack_require__(17);

	var _Clip2 = _interopRequireDefault(_Clip);

	var _Fade = __webpack_require__(18);

	var _Fade2 = _interopRequireDefault(_Fade);

	var _Scale = __webpack_require__(19);

	var _Scale2 = _interopRequireDefault(_Scale);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    Dispatcher: _Dispatcher2.default,
	    Appear: _Appear2.default,
	    Clip: _Clip2.default,
	    Fade: _Fade2.default,
	    Scale: _Scale2.default
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	var _backbone = __webpack_require__(9);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var m = Math;

	var Dispatcher = _Base2.default.extend();

	_lodash2.default.extend(Dispatcher.prototype, _backbone2.default.Events, {

	    initialize: function initialize(options) {
	        options = this.options = _lodash2.default.extend({}, options || {});

	        _lodash2.default.bindAll(this, 'stopRunning');

	        this.isReset = false;
	        this._isRunning = false;
	        this._isReversible = false;

	        options.target && this.setTarget(options.target);
	        options.to && this.setTo(options.to);
	    },

	    setTarget: function setTarget(target) {
	        this.target = _lodash2.default.defaults(target, {
	            el: null,
	            width: null,
	            height: null,
	            top: null,
	            left: null
	        });

	        this.calcMetrics();
	    },

	    setTargetEl: function setTargetEl(el) {
	        this.setTarget({ el: el });
	    },

	    setTo: function setTo(to) {
	        this.to = _lodash2.default.defaults(to, {
	            el: null,
	            width: null,
	            height: null
	        });
	    },

	    isRunning: function isRunning() {
	        return this._isRunning;
	    },

	    stopRunning: function stopRunning() {
	        this._isRunning = false;
	    },

	    /**
	     * Calculate metrics
	     *
	     * Calculate the most common metrics needed to perform transitions on it
	     *
	     * @return {void}
	     */
	    calcMetrics: function calcMetrics() {
	        var target, to;

	        target = this.target;
	        to = this.to;

	        target = _lodash2.default.extend(target, target.el.getBoundingClientRect());

	        // Cannot use getBoundingClientRect here, as it's affected by the scale prop
	        to = _lodash2.default.extend(to, {
	            width: to.el.clientWidth,
	            height: to.el.clientHeight
	        });

	        to.scaleX = target.width / to.width;
	        to.scaleY = target.height / to.height;
	        to.scale = m.max(to.scaleX, to.scaleY);

	        target.scaleX = to.width / target.width;
	        target.scaleY = to.height / target.height;
	        target.scale = m.min(target.scaleX, target.scaleY);

	        this.offsetX = m.round(target.left + (target.width - to.width) / 2);
	        this.offsetY = m.round(target.top + (target.height - to.height) / 2);

	        // mask = visible area based on what we're transitioning from
	        to.maskHeight = m.round(target.height / to.scale);
	        to.maskWidth = m.round(target.width / to.scale);

	        to.clipHeight = to.height - to.maskHeight;
	        to.clipWidth = to.width - to.maskWidth;
	    },

	    /**
	     * Reset the element and make it ready for the animation to come
	     *
	     * @param {Function} callback called when element is ready for animation
	     * @return {void}
	     */
	    reset: function reset() {
	        var to = this.to;
	        var props = this.options.effect.animateFromProps.call(this);

	        to.el.style.webkitTransitionDuration = '0ms';
	        to.el.style.mozTransitionDuration = '0ms';
	        to.el.style.msTransitionDuration = '0ms';
	        to.el.style.oTransitionDuration = '0ms';
	        to.el.style.transitionDuration = '0ms';

	        for (var key in props) {
	            // Skip all transition properties, these are only used for reverse
	            if (key.toLowerCase().indexOf('transition') !== -1) {
	                continue;
	            }
	            to.el.style[key] = props[key];
	        }
	    },

	    /**
	     * Run the transition
	     *
	     * @param {Function} callback [description]
	     * @return {void}
	     */
	    run: function run(callback) {
	        // jshint maxstatements:23
	        if (this._isRunning) {
	            return false;
	        }

	        this._isRunning = true;
	        this._isReversible = true;

	        var that = this;
	        var target = this.target;
	        var to = this.to;
	        var done = function done() {
	            that._animate(callback);
	        };

	        if (!this.options.upscaleTarget || !target || !target.el) {
	            this.trigger('willAppear', this, done);

	            return;
	        }

	        target.el.classList.add('alf-is-moving');

	        /**
	         * This is a good candidate to be extendable with custom transitions,
	         * like the to-transition
	         */
	        var transform = '';

	        // Horizontally centered
	        var translateX = to.width / 2 - target.width / 2 - target.left;

	        // Vertically centered
	        var translateY = to.height / 2 - target.height / 2 - target.top;

	        // Using z = 1px to make it it's above other elements
	        transform += 'translate3d(' + translateX + 'px, ' + translateY + 'px, 1px) ';
	        transform += 'scale(' + target.scale + ') ';

	        (0, _dom2.default)(target.el).one('webkitTransitionEnd', _lodash2.default.bind(this._onScaleEnd, this, callback));
	        (0, _dom2.default)(target.el).one('transitionend', _lodash2.default.bind(this._onScaleEnd, this, callback));

	        target.el.style['webkitTransition'] = '-webkit-transform ease-out 300ms';
	        target.el.style['transition'] = 'transform ease-out 300ms';
	        target.el.style['webkitTransform'] = transform;
	        target.el.style['transform'] = transform;
	    },

	    /**
	     * Reverse the transition back to the element it started from
	     *
	     * @param {Function} callback called when the transition ends
	     * @return {void}
	     */
	    reverse: function reverse(callback) {
	        var effect = this.options.effect;

	        if (this._isRunning || !this._isReversible) {
	            return false;
	        }
	        this._isRunning = true;

	        var to = this.to;
	        var props = (effect.reverseProps || effect.animateFromProps).call(this);

	        (0, _dom2.default)(to.el).one('webkitTransitionEnd', _lodash2.default.bind(this._onReverseEnd, this, callback));
	        (0, _dom2.default)(to.el).one('transitionend', _lodash2.default.bind(this._onReverseEnd, this, callback));

	        for (var key in props) {
	            to.el.style[key] = props[key];
	        }
	    },

	    /**
	     * Reverse to another element than the original
	     *
	     * @param {Function} callback called when the transition ends
	     * @return {void}
	     */
	    reverseTo: function reverseTo(el, callback) {
	        this.to = { el: el };
	        this.calcMetrics();
	        this.reverse(callback);
	    },

	    _animate: function _animate(callback) {
	        var to = this.to;
	        var props = this.options.effect.animateToProps.call(this);

	        this.reset();

	        this.trigger('ready', this);

	        (0, _dom2.default)(to.el).one('webkitTransitionEnd', _lodash2.default.bind(this._onAnimateEnd, this, callback));
	        (0, _dom2.default)(to.el).one('transitionend', _lodash2.default.bind(this._onAnimateEnd, this, callback));

	        _lodash2.default.each(props, function (value, key) {
	            to.el.style[key] = value;
	        });
	    },

	    /**
	     * On animate end
	     *
	     * Triggers when the _animate function is 100% complete
	     * Calls the optionally supplied callback and cleans up
	     *
	     * @param {Function} callback optional function
	     * @return {void}
	     */
	    _onAnimateEnd: function _onAnimateEnd(callback) {
	        var targetStyle;

	        if (this.to && this.to.el) {
	            this.to.el.style.removeProperty('-webkit-transition');
	            this.to.el.style.removeProperty('transition');
	        }

	        if (this.target && this.target.el) {
	            targetStyle = this.target.el.style;
	            targetStyle.removeProperty('-webkit-transform');
	            targetStyle.removeProperty('-webkit-transition');
	            targetStyle.removeProperty('transform');
	            targetStyle.removeProperty('transition');

	            (0, _dom2.default)(this.target.el).removeClass('alf-is-moving');
	        }

	        callback && callback.call(this, this);
	        this.trigger('didAppear', this);

	        setTimeout(this.stopRunning, 100);
	    },

	    _onReverseEnd: function _onReverseEnd(callback) {
	        this._isReversible = false;
	        this.to.el.style.webkitTransition = 'none';
	        this.to.el.style.webkitTransform = 'none';
	        this.to.el.style.mozTransition = 'none';
	        this.to.el.style.mozTransform = 'none';
	        this.to.el.style.msTransition = 'none';
	        this.to.el.style.msTransform = 'none';
	        this.to.el.style.oTransition = 'none';
	        this.to.el.style.oTransform = 'none';
	        this.to.el.style.transition = 'none';
	        this.to.el.style.transform = 'none';

	        callback && callback.call(this, this);
	        this.trigger('didDisappear', this);

	        // When tapping extremely fast, resetting _isRunning without a delay
	        // could cause double reverse events, which would put the user in limbo
	        setTimeout(this.stopRunning, 100);
	    },

	    _onScaleEnd: function _onScaleEnd(callback) {
	        var that = this;
	        var done = function done() {
	            that._animate(callback);
	        };

	        this.trigger('willAppear', this, done);
	    }

	});

	exports.default = Dispatcher;

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var Appear = {
	    reverseProps: function reverseProps() {
	        return {
	            webkitTransition: '-webkit-transform ease-out 300ms',
	            webkitTransform: 'translate3d(-1500px, -1500px, 0) scale(0.4)'
	        };
	    },
	    animateFromProps: function animateFromProps() {
	        var transform = '';

	        transform += 'scaleX(0.8) scaleY(0.8) ';

	        return {
	            webkitTransition: '-webkit-transform ease-out 300ms, opacity ease-out 300ms',
	            webkitTransform: transform,
	            opacity: 0
	        };
	    },
	    animateToProps: function animateToProps() {
	        return {
	            webkitTransition: '-webkit-transform ease-out 300ms, opacity ease-out 300ms',
	            webkitTransform: 'translate3d(0, 0, 0) scaleX(1) scaleY(1)',
	            opacity: 1
	        };
	    }
	};

	exports.default = Appear;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var m = Math;

	exports.default = {
	    animateFromProps: function animateFromProps() {
	        // Add support for top and bottom clipping as well?
	        var transform = '';
	        var to = this.to;
	        var clipTop = m.round(this.clipHeight / 2);
	        var clipBottom = to.height - clipTop;
	        var clipLeft = m.round(this.clipWidth / 2);
	        var clipRight = to.width - clipLeft;

	        transform += 'translate3d(' + this.offsetX + 'px, ' + this.offsetY + 'px, 0px) ';
	        transform += 'scale(' + this.to.scale + ') ';

	        return {
	            webkitTransition: '-webkit-transform ease-out 300ms, clip ease-out 300ms',
	            webkitTransform: transform,
	            clip: 'rect(' + clipTop + 'px, ' + clipRight + 'px, ' + clipBottom + 'px, ' + clipLeft + 'px) '
	        };
	    },
	    animateToProps: function animateToProps() {
	        var to = this.to;

	        return {
	            webkitTransition: '-webkit-transform ease-out 300ms, clip ease-out 300ms',
	            webkitTransform: 'translate3d(0, 0, 0) scaleX(1) scaleY(1)',
	            clip: 'rect(0px, ' + to.width + 'px, ' + to.height + 'px, 0px)'
	        };
	    }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var Fade = {

	    animateFromProps: function animateFromProps() {
	        return {
	            webkitTransition: 'opacity ease-out 300ms',
	            mozTransition: 'opacity ease-out 300ms',
	            msTransition: 'opacity ease-out 300ms',
	            oTransition: 'opacity ease-out 300ms',
	            transition: 'opacity ease-out 300ms',
	            opacity: 0
	        };
	    },

	    animateToProps: function animateToProps() {
	        return {
	            webkitTransition: 'opacity ease-out 300ms',
	            mozTransition: 'opacity ease-out 300ms',
	            msTransition: 'opacity ease-out 300ms',
	            oTransition: 'opacity ease-out 300ms',
	            transition: 'opacity ease-out 300ms',
	            opacity: 1
	        };
	    }

	};

	exports.default = Fade;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var Scale = {

	    animateFromProps: function animateFromProps() {
	        var transform = '';

	        transform += 'translate3d(' + this.offsetX + 'px, ' + this.offsetY + 'px, 0px) ';
	        transform += 'scaleX(' + this.scaleX + ') scaleY(' + this.scaleY + ') ';

	        return {
	            webkitTransition: '-webkit-transform ease-out 300ms, opacity ease-out 200ms',
	            webkitTransform: transform,
	            opacity: 0
	        };
	    },

	    animateToProps: function animateToProps() {
	        return {
	            webkitTransition: '-webkit-transform ease-out 300ms, opacity ease-out 200ms',
	            webkitTransform: 'translate3d(0, 0, 0) scaleX(1) scaleY(1)',
	            opacity: 1
	        };
	    }

	};

	exports.default = Scale;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Manager = __webpack_require__(21);

	var _Manager2 = _interopRequireDefault(_Manager);

	var _View = __webpack_require__(22);

	var _View2 = _interopRequireDefault(_View);

	var _Page = __webpack_require__(23);

	var _Page2 = _interopRequireDefault(_Page);

	var _Fullscreen = __webpack_require__(24);

	var _Fullscreen2 = _interopRequireDefault(_Fullscreen);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    Manager: _Manager2.default,
	    View: _View2.default,
	    Page: _Page2.default,
	    Fullscreen: _Fullscreen2.default
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Base2.default.extend({

	    initialize: function initialize() {
	        this.layers = [];
	        this.length = 0;
	    },

	    /**
	     * Add a layer view to the stack
	     *
	     * @param {LayerView} layerView
	     * @return {LayerManager} self
	     */
	    add: function add(layerView) {
	        this.layers.push(layerView);
	        this.length = this.layers.length;

	        return this;
	    },

	    /**
	     * Remove a specific layer view from the stack
	     *
	     * @param {LayerView} layerView
	     * @return {LayerManager} self
	     */
	    remove: function remove(layerView) {
	        var layers = this.layers;
	        layers.splice(layers.indexOf(layerView), 1);
	        this.length = this.layers.length;

	        return this;
	    },

	    /**
	     * Get a layer view by it's index/position
	     *
	     * @param {Number} the index/position
	     * @return {LayerView}
	     */
	    at: function at(index) {
	        return this.layers[index];
	    },

	    /**
	     * Get the position of a layer view
	     *
	     * @param {LayerView} layerView
	     * @return {Number} the position
	     */
	    getPos: function getPos(layerView) {
	        return this.layers.indexOf(layerView);
	    },

	    /**
	     * Get the layer above the input layerView
	     *
	     * @param {LayerView} layerView the layer to search from
	     * @return {LayerView} the layer positioned above
	     */
	    getLayerAbove: function getLayerAbove(layerView) {
	        return this.at(this.getPos(layerView) + 1);
	    },

	    /**
	     * Get the layer below the input layerView
	     *
	     * @param {LayerView} layerView the layer to search from
	     * @return {LayerView} the layer positioned below
	     */
	    getLayerBelow: function getLayerBelow(layerView) {
	        return this.at(this.getPos(layerView) - 1);
	    }

	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _transition = __webpack_require__(14);

	var _transition2 = _interopRequireDefault(_transition);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * The base for all layers
	 *
	 * @type {LayerView}
	 */
	var LayerView = _BaseView2.default.extend();

	_lodash2.default.extend(LayerView.prototype, {
	    /**
	     * Initialize layer view
	     *
	     * @param {Array} options
	     * @return {void}
	     */

	    initialize: function initialize(options) {
	        if (options && options.manager) {
	            this.manager = options.manager;
	            this.manager.add(this);
	        }
	    },
	    tearDown: function tearDown() {
	        this.stopListening();
	    },
	    show: function show() {
	        this.$el.removeClass(_classnames2.default.IS_HIDDEN);

	        return this;
	    },
	    hide: function hide() {
	        this.$el.addClass(_classnames2.default.IS_HIDDEN);

	        return this;
	    },
	    above: function above() {
	        return this.manager.getLayerAbove(this);
	    },
	    below: function below() {
	        return this.manager.getLayerBelow(this);
	    },
	    minimize: function minimize() {
	        var that = this;
	        var layerBelow = this.below();

	        layerBelow.show();
	        layerBelow.transition.reverse(function __minimizeCb() {
	            that.hide();
	        });

	        return this;
	    },

	    /**
	     * Transition to a layer
	     *
	     * @param {layout.Layer} layer [description]
	     * @param {Object} effect [description]
	     * @param {HTMLElement} target optional
	     * @return {transition.Dispatcher}
	     */
	    transitionTo: function transitionTo(layer, effect, target) {
	        return this._createTransition({
	            layer: layer,
	            target: target,
	            effect: effect,
	            upscaleTarget: false
	        });
	    },

	    /**
	     * Transition to a layer with upscaling of the target
	     *
	     * @param {layout.Layer} layer [description]
	     * @param {Object} effect [description]
	     * @param {HTMLElement} target optional
	     * @return {transition.Dispatcher}
	     */
	    scaleTo: function scaleTo(layer, effect, target) {
	        return this._createTransition({
	            layer: layer,
	            target: target,
	            effect: effect,
	            upscaleTarget: true
	        });
	    },
	    transitionToLayerAbove: function transitionToLayerAbove(effect, target) {
	        return this.transitionTo(this.above(), effect, target);
	    },
	    transitionToLayerBelow: function transitionToLayerBelow(target, effect) {
	        return this.transitionTo(this.below(), effect, target);
	    },
	    _createTransition: function _createTransition(options) {
	        options.to = {
	            el: options.layer.el
	        };
	        var trans = new _transition2.default.Dispatcher(options);

	        this.listenTo(trans, 'didDisappear', function __didDisappearCb(transition) {
	            options.layer.$el.addClass(_classnames2.default.IS_HIDDEN);
	        });

	        this.listenTo(trans, 'ready', function __readyCb() {
	            options.layer.$el.removeClass(_classnames2.default.IS_HIDDEN);
	        });

	        return trans;
	    }
	});

	/**
	 * Aliases
	 */

	var proto = LayerView.prototype;

	proto.getLayerBelow = proto.below;
	proto.getLayerAbove = proto.above;

	exports.default = LayerView;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _View = __webpack_require__(22);

	var _View2 = _interopRequireDefault(_View);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Page layer
	 *
	 * The layer all pages rendered through the
	 * layout system should be rendered on to
	 *
	 */
	var Page = _View2.default.extend();

	_lodash2.default.extend(Page.prototype, {
	    render: function render() {
	        return this;
	    }
	});

	exports.default = Page;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _View = __webpack_require__(22);

	var _View2 = _interopRequireDefault(_View);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	var _hub = __webpack_require__(8);

	var _hub2 = _interopRequireDefault(_hub);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Fullscreen layer
	 *
	 * The layer all fullscreen elements is displayed in
	 *
	 */
	var Fullscreen = _View2.default.extend();

	_lodash2.default.extend(Fullscreen.prototype, {

	    fullscreenEvents: {
	        touch: {
	            'touchstart': '_onTouchStart',
	            'singleTap': 'toggleControls',
	            'tap .alf-fullscreen-exit': 'exitFullscreen',
	            'doubleTap': 'exitFullscreen',
	            'touchend': 'preventDefault'
	        },
	        pointer: {
	            'mouseover': 'showControls',
	            'mouseout': 'hideControls',
	            'click .alf-fullscreen-exit': 'exitFullscreen',
	            'dblclick': 'exitFullscreen'
	        }
	        // 'gesturestart': '_onGestureStart',
	        // 'gesturechange': '_onGestureChange',
	        // 'gestureend': '_onGestureEnd'
	    },

	    initialize: function initialize(options) {
	        options = this.options = _lodash2.default.extend({}, options || {});

	        _lodash2.default.bindAll(this, '_onScroll');

	        Fullscreen.__super__.initialize.apply(this, _lodash2.default.toArray(arguments));

	        this.position = this.$el.css('position');
	        this.listenTo(_hub2.default, 'fullscreenWillAppear', this._fullscreenWillAppear);

	        /**
	         * Should the layer be automatically resized to the window size?
	         * If this is set to false, it'll respect the width and height it initially has
	         * Default is true
	         */
	        options.resizeToWindow = options.resizeToWindow === undefined ? true : options.resizeToWindow;

	        this.delegateEvents(_util2.default.touchScreen ? this.fullscreenEvents.touch : this.fullscreenEvents.pointer);
	    },

	    tearDown: function tearDown() {
	        this.stopListening();
	        this.$el.empty();
	    },

	    render: function render() {
	        return this;
	    },

	    /**
	     * Render the fullscreen layer
	     *
	     * This is called every time a container goes into fullscreen
	     * It clears the old content and inserts everything each time
	     * to remove any possible "pollution" from old fullscreen content
	     *
	     * @param {HTMLElement} el the container fullscreen element
	     * @return {Fullscreen} self
	     */
	    renderFullscreenContainer: function renderFullscreenContainer(container) {
	        var fragment, $btnGroup;

	        var regexp = new RegExp('\\s?' + _classnames2.default.REVISION('') + '[^\\s]*');

	        this.el.className = this.el.className.replace(regexp, '');

	        $btnGroup = (0, _dom2.default)('<div>').addClass(_classnames2.default.BTN_GROUP);
	        $btnGroup.append((0, _dom2.default)('<button>').addClass(_classnames2.default.FULLSCREEN_EXIT));

	        // TODO: move toolbar to its own object?
	        this.$toolbar = (0, _dom2.default)('<div>').addClass(_classnames2.default.FULLSCREEN_TOOLBAR);
	        this.$toolbar.append($btnGroup);

	        this.$content = (0, _dom2.default)('<div>').addClass(_classnames2.default.FULLSCREEN_CONTENT);
	        this.$content.append(container.el);

	        fragment = document.createDocumentFragment();
	        fragment.appendChild(this.$toolbar[0]);
	        fragment.appendChild(this.$content[0]);

	        this.$el.empty().removeClass(_classnames2.default.CONTROLS_OFF).addClass(_classnames2.default.REVISION(container.options.revision)).append(fragment);

	        if (!this.options.resizeToWindow && !this.metrics) {
	            this._calculateMetrics();
	        }

	        return this;
	    },

	    toggleControls: function toggleControls() {
	        this.$el.toggleClass(_classnames2.default.CONTROLS_OFF);
	    },

	    showControls: function showControls() {
	        this.$el.removeClass(_classnames2.default.CONTROLS_OFF);
	    },

	    hideControls: function hideControls() {
	        this.$el.addClass(_classnames2.default.CONTROLS_OFF);
	    },

	    exitFullscreen: function exitFullscreen(event) {
	        if (event) {
	            event.stopPropagation();
	            event.preventDefault();
	        }

	        var below = this.below();
	        if (this.gestureStarted || below.transition.isRunning()) {
	            return false;
	        }

	        (0, _dom2.default)(window).off('mousewheel', this._onMouseWheelScroll).off('scroll touchmove touchend', this._onScroll);

	        below.transition.reverse();

	        _hub2.default.trigger('fullscreenWillDisappear');
	    },

	    _calculateMetrics: function _calculateMetrics() {
	        this._windowHeight = window.innerHeight;
	        this._windowWidth = window.innerWidth;
	        this.metrics = this.$el.metrics();
	    },

	    _onTouchStart: function _onTouchStart(event) {
	        var $target = (0, _dom2.default)(event.target);
	        var overflow;

	        overflow = $target.css('overflow');
	        if (overflow === 'scroll' || overflow === 'auto') {
	            return;
	        }

	        event.preventDefault();
	    },

	    _onGestureStart: function _onGestureStart(event) {
	        if (this.gestureStarted || this.below().transition.isRunning()) {
	            return false;
	        }
	        this.gestureStarted = true;
	        this.startTransform(event);
	    },

	    _onGestureChange: function _onGestureChange(event) {
	        if (this.below().transition.isRunning()) {
	            return false;
	        }
	        this.transformEventTarget(event);
	    },

	    _onGestureEnd: function _onGestureEnd(event) {
	        var below = this.below();
	        if (below.transition.isRunning()) {
	            return false;
	        }

	        below.transition.reverse();
	        this.gestureStarted = false;
	    },

	    _fullscreenWillAppear: function _fullscreenWillAppear(container) {
	        var styles;

	        styles = {};
	        if (this.options.resizeToWindow) {
	            styles.width = window.innerWidth + 'px';
	            styles.height = window.innerHeight + 'px';
	        }

	        if (this.position !== 'fixed') {
	            this.x = window.pageXOffset;
	            this.y = window.pageYOffset;

	            var transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';

	            styles[_util2.default.prefixStyle('transform')] = transform;
	            styles.transform = transform;
	        }

	        this.$el.css(styles);

	        (0, _dom2.default)(window).on('mousewheel', this._onMouseWheelScroll).on('scroll touchmove touchend', this._onScroll);
	    },

	    _onMouseWheelScroll: function _onMouseWheelScroll(event) {
	        event.preventDefault();
	    },

	    _onScroll: function _onScroll(event) {
	        if (this.position === 'fixed' || this.y === window.pageYOffset && this.x === window.pageXOffset) {
	            return;
	        }

	        this.y = window.pageYOffset;
	        this.x = window.pageXOffset;

	        var transform = 'translate(' + this.x + 'px, ' + this.y + 'px)';
	        var css = { transform: transform };

	        css[_util2.default.prefixStyle('transform')] = transform;

	        this.$el.css(css);
	    }

	});

	exports.default = Fullscreen;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hasWindow = typeof window !== 'undefined';

	var util = {
	    touchScreen: hasWindow && 'ontouchstart' in window,

	    getRandomInt: function getRandomInt(min, max) {
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    },

	    getVendorPrefix: _lodash2.default.memoize(function (style) {
	        var prefixes = ['', 'webkit', 'moz', 'ms'];

	        style = util.camelize(style);
	        return _lodash2.default.find(prefixes, function (vendor) {
	            return document.body.style[vendor + style] !== undefined;
	        });
	    }),

	    prefixStyle: function prefixStyle(style, camelCase) {
	        var prefix = util.getVendorPrefix(style);

	        return camelCase ? prefix + util.camelize(style) : '-' + prefix + '-' + style;
	    },
	    camelize: function camelize(string) {
	        return string.charAt(0).toUpperCase() + string.slice(1);
	    },

	    matchMedia: typeof window !== 'undefined' && window.matchMedia && _lodash2.default.bind(window.matchMedia, window)

	};

	/**
	 * Utility functions for DOM operations
	 * @type {Object}
	 */
	util.dom = {
	    getFieldMap: function getFieldMap(el) {
	        var map = el.getAttribute('data-map');

	        return map ? map.split(' ') : [];
	    },
	    getMediaQuery: function getMediaQuery(el) {
	        return el.getAttribute('data-media');
	    }
	};

	if (hasWindow && !window.console) {
	    window.console = {};
	}

	if (hasWindow && !window.console.log) {
	    _lodash2.default.each(['log', 'warning', 'error', 'info'], function (fn) {
	        window.console[fn] = function () {
	            return {};
	        };
	    });
	}

	function logger(level) {
	    return function () {
	        console[level].apply(console, [].slice.call(arguments));
	    };
	}

	/**
	 * Console logging
	 * @type {Object}
	 */
	util.console = {
	    log: logger('log'),
	    warn: logger('warn'),
	    error: logger('error'),
	    info: logger('info'),
	    debug: logger('debug'),
	    groupCollapsed: logger('groupCollapsed'),
	    group: logger('group'),
	    groupEnd: logger('groupEnd')
	};

	exports.default = util;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Article = __webpack_require__(27);

	var _Article2 = _interopRequireDefault(_Article);

	var _Page = __webpack_require__(35);

	var _Page2 = _interopRequireDefault(_Page);

	var _Template = __webpack_require__(52);

	var _Template2 = _interopRequireDefault(_Template);

	var _TemplateManager = __webpack_require__(51);

	var _TemplateManager2 = _interopRequireDefault(_TemplateManager);

	var _Content = __webpack_require__(55);

	var _Content2 = _interopRequireDefault(_Content);

	var _Format = __webpack_require__(36);

	var _Format2 = _interopRequireDefault(_Format);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    Article: _Article2.default,
	    Page: _Page2.default,
	    Template: _Template2.default,
	    TemplateManager: _TemplateManager2.default,
	    Content: _Content2.default,
	    Format: _Format2.default
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Objects needed to do layout
	 */

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _Widgetable = __webpack_require__(28);

	var _Widgetable2 = _interopRequireDefault(_Widgetable);

	var _LayoutElement = __webpack_require__(33);

	var _LayoutElement2 = _interopRequireDefault(_LayoutElement);

	var _Article = __webpack_require__(34);

	var _Article2 = _interopRequireDefault(_Article);

	var _Format = __webpack_require__(36);

	var _Format2 = _interopRequireDefault(_Format);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _TemplateManager = __webpack_require__(51);

	var _TemplateManager2 = _interopRequireDefault(_TemplateManager);

	var _Page = __webpack_require__(35);

	var _Page2 = _interopRequireDefault(_Page);

	var _Content = __webpack_require__(55);

	var _Content2 = _interopRequireDefault(_Content);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Article = _BaseView2.default.extend();

	_lodash2.default.extend(Article.prototype, _LayoutElement2.default, _Widgetable2.default, {
	    /**
	     * Article matches content with templates and handles page rendering.
	     *
	     * @param {Object} options
	     * @param {Content} options.content
	     * @param {Template[]} options.templates
	     * @param {Page} options.layer
	     * @param {Fullscreen} [options.fullscreenLayer]
	     * @param {Object} [options.metrics]
	     */

	    initialize: function initialize(options) {
	        options = this.options = _lodash2.default.extend({
	            revision: 'no-rev'
	        }, options || {});

	        _lodash2.default.bindAll(this, 'render');

	        // Defaults
	        this.templates = null;
	        this.overrideTemplates = {};
	        this.layer = options.layer || null;
	        this.fullscreenLayer = options.fullscreenLayer || this.layer && this.layer.above() || null;
	        this.pages = {};
	        this.numberOfPages = 0;
	        this.format = options.format || null;

	        this.defaultMetrics(options.metrics);
	        options.content && this.setContent(options.content);
	        this.setupWidgets(options);

	        options.templates && this.setTemplates(options.templates);
	    },
	    tearDown: function tearDown() {
	        _lodash2.default.invoke(this.pages, 'tearDown');
	    },
	    render: function render() {
	        return this;
	    },
	    discard: function discard() {
	        _lodash2.default.invoke(this.pages, 'tearDown');
	        this.pages = {};
	        this.overrideTemplates = {};
	        this.numberOfPages = 0;
	    },

	    /**
	     * Compile the page
	     *
	     * @return {string}
	     */
	    compile: function compile() {
	        var compiler = new _Article2.default(this);

	        return compiler.compile();
	    },
	    decompile: function decompile(stringOrObject) {
	        var compiler = new _Article2.default(this);

	        compiler.decompile(stringOrObject);

	        return this;
	    },
	    setTemplates: function setTemplates(templates) {
	        var existingTemplates = this.templates || [];

	        templates = _TemplateManager2.default.getEligibleTemplatesForArticle(this, templates);

	        if (!existingTemplates || !existingTemplates.length) {
	            this.templates = templates;
	            return;
	        }

	        this.templates = _lodash2.default.map(templates, function (template) {
	            var matchingTemplate = _lodash2.default.find(existingTemplates, function (existingTemplate) {
	                return existingTemplate.name === template.name;
	            });

	            if (matchingTemplate) {
	                matchingTemplate.setElement(template.el);
	                this._reloadPagesUsingTemplate(matchingTemplate);
	            }

	            return matchingTemplate || template;
	        }, this);
	    },
	    _reloadPagesUsingTemplate: function _reloadPagesUsingTemplate(template) {
	        _lodash2.default.each(this.pages, function (page) {
	            if (page.template === template) {
	                page.template = null;
	                page.setTemplateIfUsable(template);
	            }
	        });
	    },
	    setTemplateForPageNum: function setTemplateForPageNum(template, pageNum) {
	        this.overrideTemplates[pageNum] = template;
	        if (this.pages[pageNum]) {
	            this.pages[pageNum].hasOverrideTemplate = true;
	        }
	    },
	    revert: function revert(pageNum) {
	        for (var i in this.pages) {
	            if (i < pageNum || !this.pages[i]) {
	                continue;
	            }

	            this.pages[i].revert();
	        }
	    },
	    reflow: function reflow(pageNum) {
	        _lodash2.default.each(['prepareToReflow', 'reflow'], function (fn) {
	            for (var i in this.pages) {
	                if (i < pageNum || !this.pages[i]) {
	                    continue;
	                }

	                this.pages[i][fn]();
	            }
	        }, this);
	    },

	    /**
	     * Render the article onto a page
	     *
	     * Should this be the other way around?
	     * Should the article render the page, or the page render the article?
	     * If we are to support multiple articles per page, this needs to be refactored
	     *
	     * @param {HTMLElement} el the element to hold the page
	     * @param {number|Page} pageOrPageNum the page number or page object
	     * @return {Article} returns itself for chaining
	     */
	    renderPage: function renderPage(el, pageOrPageNum) {
	        var page, overrideTemplate;

	        this._calcContentMetrics(el);

	        page = _lodash2.default.isObject(pageOrPageNum) ? pageOrPageNum : this._getOrCreatePageForPageNum(pageOrPageNum);
	        overrideTemplate = this.overrideTemplates[page.pageNum];

	        page.prepareToRender();
	        el.innerHTML = '';
	        (0, _dom2.default)(el).append(page.el);
	        page.render();

	        page.hasOverrideTemplate = !!(overrideTemplate && overrideTemplate === page.template);

	        return page;
	    },

	    /**
	     * Render all pages
	     *
	     * @param {HTMLElement} el the element it should render into
	     * @param {number} pageNum optional pageNumber to start rendering at
	     * @return {Article} itself
	     */
	    renderPages: function renderPages(el, pageNum) {
	        var page;

	        pageNum = pageNum || 0;

	        this._calcContentMetrics(el);

	        while (!this.content.isEmpty()) {
	            page = this._doRenderPage(el, pageNum);
	            if (!page) {
	                break;
	            }

	            this.pages[pageNum] = page;
	            pageNum += 1;
	        }

	        this.numberOfPages = this.getNumberOfPagesInUse();

	        _lodash2.default.invoke(this.pages, 'allPagesDidRender', this.numberOfPages);

	        return this;
	    },
	    getNumberOfPagesInUse: function getNumberOfPagesInUse() {
	        var pageNum = 0;

	        for (var i in this.pages) {
	            if (this.pages[i].pageTemplate.didRetainElements()) {
	                pageNum += 1;
	            } else {
	                this.pages[i].tearDown();
	                delete this.pages[i];
	            }
	        }

	        return pageNum;
	    },

	    /**
	     * Set the Content object
	     *
	     * @param {Content} content
	     */
	    setContent: function setContent(content) {
	        if (content instanceof _Content2.default) {
	            this.content = content;
	        } else if (_lodash2.default.isPlainObject(content)) {
	            this.content = new _Content2.default(content);
	        } else {
	            throw new Error('Unsupported data in setContent: ' + (typeof content === 'undefined' ? 'undefined' : _typeof(content)));
	        }
	    },
	    findContainerInElement: function findContainerInElement(element) {
	        var container, $el;

	        $el = (0, _dom2.default)(element);
	        $el = $el.is('.' + _classnames2.default.CONTAINER) ? $el : $el.find('.' + _classnames2.default.CONTAINER);

	        if (!$el.length) {
	            return false;
	        }

	        _lodash2.default.each(this.pages, function (page) {
	            container = _lodash2.default.find(page.pageTemplate.containers, function (c) {
	                return c.el === $el[0];
	            });

	            if (container) {
	                return false;
	            }
	        });

	        return container;
	    },

	    /**
	     * Get page for a specific page num
	     *
	     * @param {number} pageNum
	     * @return {Page}
	     */
	    _getOrCreatePageForPageNum: function _getOrCreatePageForPageNum(pageNum) {
	        var page = this.pages[pageNum];
	        var overrideTemplate = this.overrideTemplates[pageNum];

	        if (!page) {
	            page = this.createPage(pageNum);
	        }

	        if (page.rendered) {
	            return page;
	        }

	        page.scoredTemplates = _TemplateManager2.default.getScoredTemplatesForPage(page, this.templates.slice(0));
	        page.templates = _lodash2.default.pluck(page.scoredTemplates, 'template');

	        if (overrideTemplate && page.setTemplateIfUsable(overrideTemplate) || page.setupBestTemplate()) {
	            return page;
	        } else {
	            return false;
	        }
	    },
	    createPage: function createPage(pageNum) {
	        var m = this.metrics;

	        return new _Page2.default({
	            className: this.content.className,
	            content: this.content,
	            layer: this.layer,
	            fullscreenLayer: this.fullscreenLayer,
	            widgets: this.widgets,
	            fullscreenWidgets: this.fullscreenWidgets,
	            pageNum: pageNum,
	            format: this.format,
	            revision: this.options.revision,
	            metrics: {
	                height: m.height,
	                width: m.width,
	                lineHeight: m.lineHeight
	            }
	        });
	    },

	    /**
	     * Try to render a page for a certain pageNum
	     *
	     * @param {HTMLElement} el
	     * @param {number} pageNum
	     * @return {boolean} true on success, false on failure
	     * @private
	     */
	    _doRenderPage: function _doRenderPage(el, pageNum) {
	        var attempts = 0;
	        var page;

	        while (true) {
	            page = this._getOrCreatePageForPageNum(pageNum);

	            if (!page) {
	                return false;
	            }

	            this.renderPage(el, page);

	            if (page.pageTemplate.didRetainElements()) {
	                return page;
	            }

	            // If we get here, there're issues
	            _util2.default.console.warn('Page ' + pageNum + ' did not retain any elements on attempt ' + attempts, 'left:', this.content.elementsLeft);

	            attempts += 1;
	            if (attempts > 1 || !this.overrideTemplates[pageNum]) {
	                _util2.default.console.warn('stopped trying after ' + attempts + ' attempts');
	                return false;
	            }

	            // Reset the overridden template so we can let alf chose the best one
	            this.overrideTemplates[pageNum] = null;
	        }
	    },

	    /**
	     * Get sample template
	     *
	     * Find the best suited template for precalculating metrics
	     *
	     * @return {Template}
	     */
	    _getSampleTemplate: function _getSampleTemplate() {
	        // @todo fix this. This is just waiting to blow up.
	        var numRegions = 0;

	        return _lodash2.default.find(this.templates, function __sampleTemplateCb(template) {
	            return template.regions && template.regions.length > numRegions;
	        });
	    },

	    /**
	     * Calculate content metrics
	     *
	     * @todo move parts of this to Content?
	     * @param {HTMLelement} el
	     * @return {void}
	     */
	    _calcContentMetrics: function _calcContentMetrics(el) {
	        if (this.hasCalculatedMetrics) {
	            return;
	        }

	        this.setMetrics((0, _dom2.default)(el).metrics());

	        // If a format object exists, allow it to override width and height
	        if (this.format && this.format instanceof _Format2.default) {
	            this.metrics.height = this.format.get('height');
	            this.metrics.width = this.format.get('width');
	        }

	        // Try finding a template that can be used as a sample for calculating metrics
	        var sampleTemplate = this._getSampleTemplate();
	        var regions;

	        if (!sampleTemplate) {
	            _util2.default.console.warn('No sample template found. Failed to precalculate metrics for ', this);
	            return;
	        }

	        // Make sure not to pollute the original template
	        sampleTemplate = _TemplateManager2.default.getPageTemplateFromTemplate(sampleTemplate);
	        regions = sampleTemplate.regions;

	        // display: none disables all metrics calculation, so we just hide it from view
	        sampleTemplate.$el.css('visibility', 'hidden');
	        sampleTemplate.$el.addClass(_classnames2.default.REVISION(this.options.revision));

	        // I don't like the extra repaint this causes
	        // Ideally, the sampleTemplate is inserted AFTER the blocks are in place

	        el.appendChild(sampleTemplate.el);
	        this._calcBlockMetrics(regions[0].el);
	        el.removeChild(sampleTemplate.el);
	        regions[0].$el.empty();

	        this.hasCalculatedMetrics = true;
	    },

	    /**
	     * Calculate metrics with a page template
	     *
	     * Stuff all the content inside a page template to calculate all metrics in a big batch.
	     *
	     * @param {HTMLElement} regionEl the region to use
	     * @return {void}
	     * @private
	     */
	    _calcBlockMetrics: function _calcBlockMetrics(regionEl) {
	        var blocks = this.content.getBlocks();
	        var fragment = document.createDocumentFragment();

	        _lodash2.default.each(blocks, function __blockAppendCb(block) {
	            fragment.appendChild(block.render().el);
	        });

	        regionEl.appendChild(fragment);

	        // Calculate metrics for all blocks in 1 big batch. This is to maximize performance
	        _lodash2.default.each(blocks, function __blockCalcCb(block) {
	            block.calculateMetrics();
	        });
	    }
	});

	exports.default = Article;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _WidgetList = __webpack_require__(29);

	var _WidgetList2 = _interopRequireDefault(_WidgetList);

	var _inline = __webpack_require__(30);

	var _inline2 = _interopRequireDefault(_inline);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    setupWidgets: function setupWidgets(options) {
	        var isArray;

	        this.widgets = options.widgets;

	        if (!(options.widgets instanceof _WidgetList2.default)) {
	            this.widgets = new _WidgetList2.default(_inline2.default);

	            isArray = _lodash2.default.isArray(options.widgets);
	            _lodash2.default.each(options.widgets, function (widget, selector) {
	                this.widgets.add(widget, isArray ? undefined : selector);
	            }, this);
	        }
	    }
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var WidgetList = _Base2.default.extend({
	    initialize: function initialize(widgets) {
	        this.widgets = [];

	        if (_lodash2.default.isPlainObject(widgets)) {
	            _lodash2.default.each(widgets, function (widget, selector) {
	                this.add(widget, selector);
	            }, this);
	        }
	    },
	    add: function add(widget, selector) {
	        this.widgets.push(this.normalize(widget, selector));
	    },
	    normalize: function normalize(widget, selector) {
	        if (typeof widget === 'function') {
	            widget = {
	                run: widget
	            };
	        }

	        _lodash2.default.defaults(widget, {
	            compile: false,
	            render: function render() {},
	            run: function run(done) {
	                done();
	            },
	            fullscreen: function fullscreen(container, done) {
	                done();
	            },

	            selector: selector
	        });

	        if (!widget.selector) {
	            throw new Error('Failed to normalize widget. No selector found!');
	        }

	        return widget;
	    },
	    getMatchesForContainer: function getMatchesForContainer(container) {
	        var matches = [];

	        this.each(function (widget) {
	            var el = container.$el.is(widget.selector) ? container.$el : container.$el.find(widget.selector);

	            if (el.length) {
	                // If we chose the event-way of structuring widgets
	                // this could return an event object that supports `on` and `trigger`
	                matches.push({
	                    // TODO: this container should be a proxy with limited access to the real container
	                    container: container,
	                    widget: widget,
	                    $el: el,
	                    el: el[0]
	                });
	            }
	        }, this);

	        return matches;
	    }
	});

	/**
	 * Mixin basic iterator functions from underscore
	 *
	 * Add more as needed
	 */
	_lodash2.default.each(['each', 'map', 'isEmpty', 'filter'], function (fn) {
	    WidgetList.prototype[fn] = function () {
	        var args = Array.prototype.slice.call(arguments);
	        args.unshift(this.widgets);

	        return _lodash2.default[fn].apply(_lodash2.default, args);
	    };
	});

	exports.default = WidgetList;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	var _ScrollView = __webpack_require__(31);

	var _ScrollView2 = _interopRequireDefault(_ScrollView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function setupSlideshowPointerNav($parent, scrollView) {
	    var $nav = (0, _dom2.default)('<div class="alf-slideshow-nav">');
	    var $navNext = (0, _dom2.default)('<a class="alf-slideshow-nav-next"></a>');
	    var $navPrev = (0, _dom2.default)('<a class="alf-slideshow-nav-prev"></a>');

	    $nav.append($navPrev).append($navNext);

	    $parent.append($nav);

	    $navPrev.on('dblclick', false);
	    $navNext.on('dblclick', false);

	    $navPrev.on('click', function () {
	        scrollView.gotoPrevPage();
	        return false;
	    });
	    $navNext.on('click', function () {
	        scrollView.gotoNextPage();
	        return false;
	    });

	    var numPages = scrollView.options.numberOfPages;

	    $navPrev.addClass('alf-is-hidden');

	    scrollView.on('pageWillAppear', function (el, pageNum) {
	        if (pageNum === 0) {
	            $navPrev.addClass('alf-is-hidden');
	        } else if (pageNum > 0 && pageNum < numPages - 1) {
	            $navPrev.removeClass('alf-is-hidden');
	            $navNext.removeClass('alf-is-hidden');
	        } else if (pageNum === numPages - 1) {
	            $navNext.addClass('alf-is-hidden');
	        }
	    });
	} /**
	   * Builtin inline widgets
	   */

	exports.default = {
	    /**
	     * Slideshow widget
	     *
	     * @param {Container} container the matching container
	     * @param {DOMObject} $el the element matching the selector
	     * @param {Function} done callback to call when complete
	     * @return {void}
	     */
	    '.alf-slideshow': {
	        compile: true,

	        render: function render() {
	            console.log('RENDER SLIDESHOW');

	            var $wrapper, $toggler, $stack;

	            $wrapper = (0, _dom2.default)('<div>').css({
	                position: 'relative',
	                top: 0,
	                left: 0
	            });

	            $toggler = (0, _dom2.default)('<div>').addClass('alf-slideshow-toggle alf-fullscreen-toggle alf-is-draggable');

	            this.$el.children(':not(:first-child)').remove();

	            $wrapper.append($toggler).append(this.$el);

	            $stack = (0, _dom2.default)('<div>').addClass('alf-slideshow-stack');

	            this.$el.addClass('alf-slideshow-inline').prepend($stack.clone().addClass('alf-slideshow-stack-1')).prepend($stack.clone().addClass('alf-slideshow-stack-2'));

	            this.container.$el.append($wrapper);
	        },
	        run: function run(done) {
	            var $toggler = this.container.$el.find('.alf-slideshow-toggle');

	            // Only disable default events if there's a visible button
	            if ($toggler.length && $toggler.css('display') !== 'none') {
	                this.container.preventDefaultEvents();
	            }

	            this.container.$el.on(_util2.default.touchScreen ? 'tap' : 'click', '.alf-fullscreen-toggle', this.container.enterFullscreen).on('touchend', '.alf-fullscreen-toggle', function (event) {
	                event.preventDefault();
	            });

	            done();
	        },
	        fullscreen: function fullscreen(fullscreenContainer, done) {
	            var slideshowEl, $progress, elements, numberOfImages;

	            elements = fullscreenContainer.$el.find('.alf-slideshow').children().clone();
	            numberOfImages = elements.length;

	            $progress = (0, _dom2.default)('<button class="alf-slideshow-progress"></button>');
	            $progress.text('1/' + numberOfImages);

	            fullscreenContainer.layer.$toolbar.append($progress);

	            // TODO: find a better solution to all this boilerplate markup
	            slideshowEl = (0, _dom2.default)('' + '<div class="alf-slideshow"><div class="alf-pages">' + '<div class="alf-page alf-page-1">' + '<section class="alf-page-loader swiper-page-is-loading"></section><section class="alf-page-content"></section>' + '</div>' + '<div class="alf-page alf-page-2">' + '<section class="alf-page-loader swiper-page-is-loading"></section><section class="alf-page-content"></section>' + '</div>' + '<div class="alf-page alf-page-3">' + '<section class="alf-page-loader swiper-page-is-loading"></section><section class="alf-page-content"></section>' + '</div>' + '</div></div>');

	            fullscreenContainer.$el.empty().append(slideshowEl);

	            var scrollView = new _ScrollView2.default(slideshowEl[0], {
	                numberOfPages: elements.length,
	                enableKeyNavigation: true
	            });

	            scrollView.on('pageWillRender', function (el, pageNum) {
	                (0, _dom2.default)(el).empty().append(elements[pageNum]);
	            });

	            scrollView.on('pageWillAppear', function (el, pageNum) {
	                $progress.text(pageNum + 1 + '/' + numberOfImages);
	            });

	            scrollView.start();

	            if (!_util2.default.touchScreen) {
	                setupSlideshowPointerNav(fullscreenContainer.layer.$content, scrollView);
	            }

	            done();
	        }
	    },

	    '.alf-stretch-to-fit h1': {
	        compile: true,

	        render: function render() {
	            this.$el.textFit();
	        }
	    }

	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _swiper = __webpack_require__(32);

	var _swiper2 = _interopRequireDefault(_swiper);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Just a rename of the Swiper lib,
	 * untill something else is needed
	 */
	exports.default = _swiper2.default;

/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * Swiper.js
	 * Copyright 2012 Peter Rudolfsen <peter@aptoma.com>
	 */

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var FLICK_SPEED_TRESHOLD = 5;

	var BIND_METHODS = ['_onMove', '_onMoveStart', '_onMoveEnd', '_onMoveStartCapture', '_onMoveCapture', '_onMoveEndCapture', '_onTransitionEnd', '_onKeyPress', '_refresh', '_renderPages'];

	var slice = Array.prototype.slice,
	    each = function each(array, callback, context) {
	    return slice.call(array).forEach(callback, context);
	};

	var Swiper = function Swiper(el, options) {
	    var self = this,
	        pageContainer = el.children[0];

	    BIND_METHODS.forEach(function (fn) {
	        self[fn] = self[fn].bind(self);
	    });

	    this.el = el;
	    this.elements = {
	        pageContainer: pageContainer,
	        pages: [],
	        scrollablePages: []
	    };

	    each(pageContainer.children, function (el, i) {
	        this.elements.pages.push({ el: el, offset: i * 100, pageNum: i });
	        if (el.classList.contains('is-scrollable')) {
	            this.elements.scrollablePages.push(el);
	        }
	    }, this);

	    this.concurrentPages = this.elements.pages.length;

	    options = options || {};
	    options.overflowScrolling = options.overflowScrolling || false;
	    options.renderDeferTime = options.renderDeferTime || 200;
	    options.scrollDuration = options.scrollDuration || 320;
	    options.tapToFlip = options.tapToFlip || false;
	    options.loadingClass = options.loadingClass || 'swiper-page-is-loading';
	    options.enableKeyNavigation = options.enableKeyNavigation === undefined ? true : options.enableKeyNavigation;

	    this.options = options;
	    this.events = {};
	    this.renderTimeout = null;
	    this.pageFlipWidth = 50;
	    this.x = 0;
	    this.currentPage = 0;
	};

	Swiper.prototype = {

	    start: function start() {
	        this.pageWidth = this.elements.pages[0].el.clientWidth;
	        this.windowWidth = window.innerWidth;

	        this._renderPages();
	        this.enable();
	    },

	    gotoPage: function gotoPage(pageNum, scrollDuration, waitForScroll) {
	        var self = this,
	            currentPage,
	            prevPage,
	            prevX = this.x || 0;

	        scrollDuration = scrollDuration !== undefined ? scrollDuration : this.options.scrollDuration;
	        waitForScroll = scrollDuration === 0 ? false : waitForScroll;

	        // If pageNum is a string, bad things happens with calulcations
	        pageNum = parseInt(pageNum, 10);

	        clearTimeout(this.renderTimeout);

	        if (pageNum < 0 || isNaN(pageNum) || this.options.numberOfPages === 0) {
	            pageNum = 0;
	        } else if (pageNum > this.options.numberOfPages - 1) {
	            pageNum = this.options.numberOfPages - 1;
	        }

	        // Make sure currentPage is in sync
	        this.prevPage = this.currentPage;
	        this.currentPage = pageNum;

	        // Don't update positions on the first and last page
	        if (pageNum > 0 && pageNum < this.options.numberOfPages - 1) {
	            this._positionPages();
	        }

	        this.x = pageNum * this.pageWidth * -1;
	        this._moveX(this.elements.pageContainer, this.x + 'px', scrollDuration);

	        if (!waitForScroll || prevX === this.x) {
	            // Trigger page change with no delay in page rendering,
	            // as the transition doesn't fire with 0 duration
	            this._onPageChange(true);
	        }

	        // If staying on the same page...
	        if (this.prevPage === this.currentPage) {
	            return;
	        }

	        currentPage = this.elements.pages[pageNum % this.concurrentPages];
	        self.trigger('pageWillAppear', currentPage.el.children[1], pageNum);

	        prevPage = this.elements.pages[this.prevPage % this.concurrentPages];
	        self.trigger('pageWillDisappear', prevPage.el.children[1], this.prevPage);
	    },

	    on: function on(event, callback, context) {
	        var events = this.events[event] || (this.events[event] = []);

	        events.push({
	            callback: callback,
	            context: context || this
	        });
	    },

	    trigger: function trigger(event) {
	        var events = this.events[event],
	            args;
	        if (!events) {
	            return;
	        }

	        args = slice.call(arguments, 1);

	        for (var i in events) {
	            events[i].callback.apply(events[i].context, args);
	        }
	    },

	    enable: function enable() {
	        var container = this.elements.pageContainer;

	        this._disableOverflowScrolling();
	        container.addEventListener('touchstart', this._onMoveStartCapture, true);
	        container.addEventListener('webkitTransitionEnd', this._onTransitionEnd, true);
	        container.addEventListener('transitionend', this._onTransitionEnd, true);
	        window.addEventListener('keydown', this._onKeyPress, false);
	        window.addEventListener('resize', this._refresh, true);
	    },

	    disable: function disable() {
	        this._enableOverflowScrolling();
	        this.elements.pageContainer.addEventListener('touchstart', this._onMoveStartCapture, true);
	        window.removeEventListener('keydown', this._onKeyPress, false);
	        window.removeEventListener('resize', this._refresh, true);
	    },

	    gotoCurrentPage: function gotoCurrentPage(duration) {
	        this.gotoPage(this.currentPage, duration);
	    },

	    gotoPrevPage: function gotoPrevPage() {
	        this.gotoPage(this.currentPage - 1, this.options.scrollDuration);
	    },

	    gotoNextPage: function gotoNextPage() {
	        this.gotoPage(this.currentPage + 1, this.options.scrollDuration);
	    },

	    /**
	     * Refresh the scrollview and re-trigger events
	     *
	     * @return {void}
	     */
	    refresh: function refresh(options) {
	        each(this.elements.pages, function (page) {
	            page.prevPage = undefined;
	        });

	        options = options || {};
	        for (var key in options) {
	            this.options[key] = options[key];
	        }

	        this.trigger('refresh');
	        this.gotoPage(this.currentPage, undefined, false);
	    },

	    reset: function reset(options) {
	        this.prevPage = undefined;
	        each(this.elements.pages, function (page) {
	            page.prevPage = page.prevPage === undefined ? undefined : null;
	            page.pageNum = null;
	        });

	        options = options || {};
	        for (var key in options) {
	            this.options[key] = options[key];
	        }

	        this.trigger('refresh');
	        this.gotoPage(0, 0, false);
	    },

	    /**
	     * Calculate the position/offset pages based on the current page
	     * The actual rendering is done when the transition ends in _onTransitionEnd
	     *
	     * @return {void}
	     */
	    _positionPages: function _positionPages() {
	        var self = this,
	            pageNum = this.currentPage,
	            pagesPerSide = (this.concurrentPages - 1) / 2,
	            startPage = pageNum - pagesPerSide,
	            endPage = pageNum + pagesPerSide;

	        startPage = startPage < 0 ? 0 : startPage;
	        endPage = endPage < this.options.numberOfPages ? endPage : this.options.numberOfPages - 1;

	        // Precalculate page order and offset
	        for (var i = startPage; i <= endPage; i++) {
	            var page = this.elements.pages[i % this.concurrentPages],
	                offset = i * 100,
	                loadingPageEl = page.el.children[0];

	            page.prevOffset = page.offset === undefined ? offset : page.offset;
	            page.offset = offset;

	            if (page.prevOffset !== page.offset) {
	                loadingPageEl.classList.add(self.options.loadingClass);
	                this._moveX(page.el, page.offset + '%');
	            }
	        }
	    },

	    _renderPage: function _renderPage(page, pageNum) {
	        var contentEl = page.el.children[1],
	            initialRender = page.prevPage === undefined;

	        page.prevPage = page.pageNum;
	        page.pageNum = pageNum;

	        if (initialRender || page.prevPage !== page.pageNum) {
	            contentEl.scrollTop = 0;
	            contentEl.scrollLeft = 0;

	            if (!initialRender) {
	                this.trigger('pageWillDestruct', contentEl, page.prevPage);
	            }
	            this.trigger('pageWillRender', contentEl, pageNum);
	        }

	        page.el.children[0].classList.remove(this.options.loadingClass);
	    },

	    /**
	     * Render all pages
	     *
	     * Will first render the page the user is on,
	     * and then alternate between the left and right pages on the sides.
	     * Which of the left or right pages are rendered first,
	     * depends on the direction the user is scrolling
	     *
	     * Examples of the render order:
	     * If scrolling right to page 8 (pages come in from the right side, but the finger moving left):
	     * Order: 8, 9, 7
	     *
	     * If scrolling left back to page 3:
	     * Order: 3, 2, 4
	     *
	     * @return {void}
	     */
	    _renderPages: function _renderPages() {
	        var self = this,
	            page,
	            prevPage,
	            curPageNum = this.currentPage,
	            pageNum = curPageNum,
	            opts = this.options,
	            pages = this.elements.pages,
	            alternator = curPageNum <= this.prevPage ? 1 : -1;

	        for (var i = 0; i < this.concurrentPages; i++) {
	            pageNum = pageNum + i * alternator;
	            alternator *= -1;

	            page = pages[pageNum % this.concurrentPages];
	            if (!page || pageNum > opts.numberOfPages - 1) {
	                continue;
	            }

	            self._renderPage(page, pageNum);
	        }
	        self.trigger('pageDidAppear', pages[curPageNum % this.concurrentPages].el.children[1], curPageNum);

	        prevPage = pages[this.prevPage % this.concurrentPages];
	        if (prevPage) {
	            self.trigger('pageDidDisappear', prevPage.el.children[1], this.prevPage);
	        }
	    },

	    _refresh: function _refresh(event) {
	        this.pageWidth = this.elements.pages[0].el.clientWidth;
	        this.windowWidth = window.innerWidth;
	        this.gotoCurrentPage();
	    },

	    /**
	     * Keyboard navigation
	     *
	     * @param {Event} event
	     * @return {void}
	     */
	    _onKeyPress: function _onKeyPress(event) {
	        if (!this.options.enableKeyNavigation) {
	            return;
	        }

	        switch (event.keyCode) {
	            case 37:
	                // left
	                this.gotoPrevPage();
	                break;

	            case 39:
	                // right
	                this.gotoNextPage();
	                break;
	        }
	    },

	    /**
	     * On move start capture-phase event
	     * Initialize the movement, and add the appropiate event listeners
	     *
	     * @param {Event} event
	     * @return {void}
	     */
	    _onMoveStartCapture: function _onMoveStartCapture(event) {
	        var pageContainer = this.elements.pageContainer;

	        this.moved = false;

	        this.pointX = event.touches[0].pageX;
	        this.pointY = event.touches[0].pageY;
	        this.deltaX = 0;
	        this.deltaY = 0;
	        this.distX = 0;
	        this.distY = 0;
	        this.directionCalc = false;
	        this.multitouch = event.touches.length > 1;

	        // Disable scrolling when using multi-touch to not interfere with anything else needing it
	        if (this.multitouch) {
	            // Disable everything
	            this._disableOverflowScrolling();
	            pageContainer.removeEventListener('touchmove', this._onMoveCapture, true);
	            pageContainer.removeEventListener('touchend', this._onMoveEndCapture, true);
	        } else {
	            pageContainer.addEventListener('touchmove', this._onMoveCapture, true);
	            pageContainer.addEventListener('touchend', this._onMoveEndCapture, true);
	        }

	        pageContainer.addEventListener('touchstart', this._onMoveStart, false);
	    },

	    /**
	     * On move capture-phase event
	     * Find the direction (horizontal/vertical) the user swipes
	     * and add the appropiate event listeners
	     *
	     * @param {Event} event
	     * @return {void}
	     */
	    _onMoveCapture: function _onMoveCapture(event) {
	        var pageContainer = this.elements.pageContainer,
	            pointX = event.touches[0].pageX,
	            pointY = event.touches[0].pageY;

	        // Don't listen to multitouch events, to allow native multitouch gestures
	        if (this.multitouch) {
	            return;
	        }

	        this.deltaX = pointX - this.pointX;
	        this.deltaY = pointY - this.pointY;
	        this.pointX = pointX;
	        this.pointY = pointY;

	        // If the direction is already calculated, don't continue
	        if (this.directionCalc) {
	            return;
	        }

	        // Build up some distance, to see what direction the user scrolls
	        if (this.distX < 4 && this.distY < 4) {
	            this.distX += Math.abs(this.deltaX);
	            this.distY += Math.abs(this.deltaY);
	            this.directionCalc = true;
	        }

	        // Horizontal or vertical scrolling?
	        if (this.distY < 2 || this.distX > this.distY + 5) {
	            // Horizontal scrolling
	            this._disableOverflowScrolling();
	            pageContainer.addEventListener('touchmove', this._onMove, false);
	            pageContainer.addEventListener('touchend', this._onMoveEnd, false);
	        } else if (this.distX < 2 || this.distY > this.distX + 5) {
	            // Vertical scrolling
	            this._enableOverflowScrolling();
	        }
	    },

	    /**
	     * On move end capture-phase event
	     * Clean up event listeners and reset to inital state
	     *
	     * @param {Event} event
	     * @return {void}
	     */
	    _onMoveEndCapture: function _onMoveEndCapture(event) {
	        this.elements.pageContainer.removeEventListener('touchstart', this._onMoveStart, false);
	        this._disableOverflowScrolling();

	        // Was this just a tap?
	        if (this.options.tapToFlip && !this.moved) {
	            if (this.pointX < this.pageFlipWidth) {
	                this.gotoPrevPage();
	                return;
	            }

	            if (this.pointX > this.windowWidth - this.pageFlipWidth) {
	                this.gotoNextPage();
	                return;
	            }
	        }
	    },

	    /**
	     * On move start bubble-phase event
	     *
	     * @param {Event} event
	     * @return {void}
	     */
	    _onMoveStart: function _onMoveStart(event) {
	        this.startX = event.touches[0].pageX;
	        this.startY = event.touches[0].pageY;
	    },

	    /**
	     * On move bubble-phase event
	     * Move the pages
	     *
	     * @param {Event} event
	     * @return {void}
	     */
	    _onMove: function _onMove(event) {
	        event.preventDefault();

	        clearTimeout(this.renderTimeout);
	        this.moved = true;
	        if (this.x > 0 || this.currentPage === this.options.numberOfPages - 1 && this.x < 0) {
	            this.deltaX *= 0.5;
	        }

	        this.x += this.deltaX;
	        this._moveX(this.elements.pageContainer, Math.round(this.x) + 'px', 0);
	    },

	    /**
	     * On move end bubble-phase event
	     * Snap to the previous, current or next page
	     *
	     * @return {void}
	     */
	    _onMoveEnd: function _onMoveEnd() {
	        var pageContainer = this.elements.pageContainer,
	            distX = this.startX - this.pointX,
	            absDistX = Math.abs(distX),
	            absDeltaX = Math.abs(this.deltaX),
	            pageFlipThresholdX = this.pageWidth / 2,
	            duration = this.options.scrollDuration;

	        this.elements.pageContainer.style.webkitTransitionDuration = duration + 'ms';
	        this.elements.pageContainer.style.MozTransitionDuration = duration + 'ms';

	        pageContainer.removeEventListener('touchmove', this._onMove, false);
	        pageContainer.removeEventListener('touchend', this._onMoveEnd, false);
	        this._disableOverflowScrolling();

	        // Stick to current page if not moving past the page flip threshold, or flick speed threshold
	        if (absDistX < pageFlipThresholdX && absDeltaX < FLICK_SPEED_TRESHOLD) {
	            this.gotoCurrentPage();
	        } else {
	            if (distX > 0) {
	                this.gotoNextPage();
	            } else {
	                this.gotoPrevPage();
	            }
	        }
	    },

	    /**
	     * Move an element in x-space
	     *
	     * @param {HTMLElement} elm target element
	     * @param {int} x pixels to move
	     * @param {int} duration optional transition duration
	     * @return {void}
	     */
	    _moveX: function _moveX(elm, x, duration) {
	        if (duration !== undefined) {
	            elm.style.webkitTransitionDuration = duration + 'ms';
	            elm.style.MozTransitionDuration = duration + 'ms';
	        }
	        elm.style.webkitTransform = 'translate3d(' + x + ', 0, 0)';
	        elm.style.MozTransform = 'translate(' + x + ', 0)';
	    },

	    _onPageChange: function _onPageChange(noDefer) {
	        if (noDefer) {
	            this._renderPages();
	        } else {
	            this.renderTimeout = setTimeout(this._renderPages, this.options.renderDeferTime);
	        }
	    },

	    _onTransitionEnd: function _onTransitionEnd(event) {
	        // This event fires if the content fades in as well
	        // Make sure it only fires on transform changes
	        if (event.propertyName.indexOf('transform') === -1) {
	            return;
	        }

	        this._onPageChange();
	    },

	    /**
	     * Prevent default event, used in callbacks
	     *
	     * @param {Event} event
	     * @return {void}
	     */
	    _preventDefaultEvent: function _preventDefaultEvent(event) {
	        event.preventDefault();
	    },

	    /**
	     * Disable overflow scrolling
	     *
	     * @return {void}
	     */
	    _disableOverflowScrolling: function _disableOverflowScrolling() {
	        if (!this.options.overflowScrolling) {
	            return;
	        }

	        var self = this;
	        each(this.elements.scrollablePages, function (el) {
	            el.addEventListener('touchmove', self._preventDefaultEvent, true);
	        });
	    },

	    /**
	     * Enable overflow scrolling
	     * @return {void}
	     */
	    _enableOverflowScrolling: function _enableOverflowScrolling() {
	        if (!this.options.overflowScrolling) {
	            return;
	        }

	        var self = this;
	        each(this.elements.scrollablePages, function (el) {
	            el.removeEventListener('touchmove', self._preventDefaultEvent, true);
	        });
	    }

	};

	/**
	 * Aliases
	 */
	Swiper.prototype.destroy = Swiper.prototype.disable;

	exports.default = Swiper;

	if (!Function.prototype.bind) {
	    Function.prototype.bind = function (oThis) {
	        if (typeof this !== "function") {
	            // closest thing possible to the ECMAScript 5 internal IsCallable function
	            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	        }

	        var aArgs = Array.prototype.slice.call(arguments, 1),
	            fToBind = this,
	            fNOP = function fNOP() {},
	            fBound = function fBound() {
	            return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(Array.prototype.slice.call(arguments)));
	        };

	        fNOP.prototype = this.prototype;
	        fBound.prototype = new fNOP();

	        return fBound;
	    };
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	__webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Layout element mixin
	 *
	 * Contains common method for layout objects
	 *
	 * @type {Object}
	 */
	exports.default = {
	    isInline: false,

	    defaultMetrics: function defaultMetrics(metrics) {
	        this.metrics = _lodash2.default.extend({
	            height: 0,
	            width: 0,
	            outerHeight: 0,
	            lineHeight: 24,
	            marginTop: 0,
	            marginRight: 0,
	            marginBottom: 0,
	            marginLeft: 0,
	            marginHeight: 0,
	            marginWidth: 0
	        }, this.metrics || {}, metrics || {});
	    },
	    setMetrics: function setMetrics(metrics) {
	        this.metrics = _lodash2.default.extend(this.metrics || {}, metrics);
	    },

	    /**
	     * Calculate metrics of the element
	     *
	     * Uses a few tricks to account for inner elements with margin
	     *
	     * @return {void}
	     */
	    calculateMetrics: function calculateMetrics() {
	        if (!this.el.children.length) {
	            this.metrics = this.$el.metrics();

	            return;
	        }

	        var borderBottom = parseInt(window.getComputedStyle(this.el).getPropertyValue('border-bottom-width'), 10);
	        if (borderBottom) {
	            this.metrics = this.$el.metrics();

	            return;
	        }

	        if (!this.isInline) {
	            // This sucks, but I currently see no other way.
	            // It's a fix to force the margin on inner elements to be applied to the outerHeight
	            this.el.style.borderBottom = '1px solid transparent';
	        }

	        this.metrics = this.$el.metrics();

	        if (!this.isInline) {
	            this.el.style.removeProperty('border-bottom');
	            this.metrics.outerHeight -= 1;
	        }
	    },

	    /**
	     * Lock the size of the element
	     *
	     * Example of use:
	     * You have a widget that needs to alter the container,
	     * but wants to keep the original size
	     */
	    lockSize: function lockSize() {
	        var metrics = this.metrics;

	        this.$el.css({
	            height: metrics.height + 'px',
	            width: metrics.width + 'px'
	        });
	    },
	    isTextElement: function isTextElement() {
	        return ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEADER', 'SPAN'].indexOf(this.el.tagName) !== -1;
	    },

	    /**
	     * Normalize the element size
	     *
	     * The vertical grid is defined by the lineHeight
	     * This makes sure everything aligns nicely
	     *
	     * @return {void}
	     */
	    normalize: function normalize(lineHeight, elementAboveMarginBottom) {
	        if (this._isNormalized) {
	            return;
	        }

	        var css = {};
	        var isContainer = this.$el.hasClass(_classnames2.default.CONTAINER);
	        var metrics = this.metrics;
	        var rest = 0;

	        this._normalizeTopMargin(css);

	        elementAboveMarginBottom = elementAboveMarginBottom || 0;

	        var collapsedMargin = Math.min(elementAboveMarginBottom, metrics.marginTop);

	        // Ideally it should use the lineHeight of the region it's in, not it's own
	        lineHeight = lineHeight || metrics.lineHeight;

	        rest = (metrics.outerHeight - collapsedMargin) % lineHeight;

	        if (rest !== 0 && !isContainer) {
	            rest = lineHeight - rest;

	            metrics.marginBottom += rest;
	            metrics.marginHeight += rest;
	            metrics.outerHeight += rest;

	            css['margin-bottom'] = metrics.marginBottom + 'px';
	        }

	        this._isNormalized = true;

	        _lodash2.default.isEmpty(css) || this.$el.css(css);
	    },

	    /**
	     * Normalize the top margin
	     *
	     * Margin top usually just makes things really hard for normal text paragraphs
	     * It makes sense on quotes, factboxes, and elements with another design than normal text
	     *
	     * @param  {Object} css
	     * @return {void}
	     */
	    _normalizeTopMargin: function _normalizeTopMargin(css) {
	        var metrics = this.metrics;

	        if (metrics.marginTop > 0 && this.isTextElement()) {
	            metrics.outerHeight -= metrics.marginTop;
	            metrics.marginHeight -= metrics.marginTop;
	            metrics.marginTop = 0;
	            css['margin-top'] = 0;
	        }
	    }
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	var _Page = __webpack_require__(35);

	var _Page2 = _interopRequireDefault(_Page);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ArticleCompiler = _Base2.default.extend({

	    initialize: function initialize(article) {
	        this.article = article;
	        this.compiled = {};
	    },

	    compile: function compile() {
	        var data = this.article.content.toJSON();
	        var stylesheets;

	        data.meta.articleId = data.meta.articleId || data.meta.id;
	        delete data.meta.id;

	        stylesheets = _lodash2.default.map((0, _dom2.default)('.' + _classnames2.default.ASSET_STYLESHEET), function (ss) {
	            return ss.href;
	        });

	        data.compiled = {};

	        data.compiled.pages = _lodash2.default.map(this.article.pages, function (page) {
	            return page.compile();
	        });

	        data.compiled.assets = {
	            stylesheets: stylesheets,
	            revision: this.article.options.revision
	        };

	        return data;
	    },

	    /**
	     * Decompile the container
	     *
	     * @param {Object} object
	     * @return {void}
	     */
	    decompile: function decompile(stringOrObject) {
	        var object = _lodash2.default.isObject(stringOrObject) ? stringOrObject : JSON.parse(stringOrObject);
	        var revision = object.compiled.assets.revision;

	        if (revision) {
	            this.article.options.revision = revision;
	        }

	        this.article.pages = _lodash2.default.map(object.compiled.pages, function (pageString) {
	            var page = new _Page2.default({
	                revision: revision,
	                assetsBaseUrl: object.service.assetsBaseUrl
	            });

	            page.decompile(pageString);

	            return page;
	        });
	    }

	});

	exports.default = ArticleCompiler;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _Format = __webpack_require__(36);

	var _Format2 = _interopRequireDefault(_Format);

	var _Page = __webpack_require__(38);

	var _Page2 = _interopRequireDefault(_Page);

	var _PageTemplate = __webpack_require__(39);

	var _PageTemplate2 = _interopRequireDefault(_PageTemplate);

	var _TemplateManager = __webpack_require__(51);

	var _TemplateManager2 = _interopRequireDefault(_TemplateManager);

	var _LayoutElement = __webpack_require__(33);

	var _LayoutElement2 = _interopRequireDefault(_LayoutElement);

	var _Widgetable = __webpack_require__(28);

	var _Widgetable2 = _interopRequireDefault(_Widgetable);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Page = _BaseView2.default.extend();

	_lodash2.default.extend(Page.prototype, _LayoutElement2.default, _Widgetable2.default, {
	    className: 'page',

	    // jshint maxcomplexity:false
	    initialize: function initialize(options) {
	        options = this.options = _lodash2.default.extend({
	            revision: 'no-rev'
	        }, options || {});

	        _lodash2.default.bindAll(this, 'render');

	        this.decompiled = false;
	        this.pageNum = typeof options.pageNum === 'number' ? options.pageNum : null;
	        this.className = options.className || '';
	        this.content = options.content || null;
	        this.layer = options.layer || null;
	        this.fullscreenLayer = options.fullscreenLayer || this.layer && this.layer.above() || null;
	        this.templateManager = options.templateManager || _TemplateManager2.default;
	        this.format = options.format || null;

	        options.pixelRatio = parseInt(options.pixelRatio || window.devicePixelRatio || 1, 10);

	        this.defaultMetrics(options.metrics);
	        this.setupWidgets(options);
	    },

	    /**
	     * Tear down the page
	     *
	     * The page should not be used again after this
	     *
	     * @return {void}
	     */
	    tearDown: function tearDown() {
	        this.el = null;
	        this.pageTemplate && this.pageTemplate.tearDown();
	        this.pageTemplate = null;
	        this.content = null;

	        // TODO: this will not always be correct
	        // the fullscreen layer should only be hidden if this Page has anything inside this layer
	        this.fullscreenLayer && this.fullscreenLayer.hide();
	    },

	    /**
	     * Revert the page
	     *
	     * This will clear the page,
	     * but it can be used to render again
	     *
	     * The idea is that it should keep any manual changes to the
	     * page template, but remove all the content
	     *
	     * Call render to rerender the page with new content
	     *
	     * @return {void}
	     */
	    revert: function revert() {
	        this.rendered = false;
	        this.pageTemplate.revert();
	    },

	    /**
	     * Restore a page from raw HTML
	     *
	     * @param {string} html raw html of a page
	     * @return {void}
	     */
	    restoreFromHtml: function restoreFromHtml(html) {
	        this.setElement((0, _dom2.default)(html));

	        this.setPageTemplate(new _PageTemplate2.default({
	            el: this.el.children[0]
	        }));

	        this.rendered = true;
	    },
	    getBestTemplate: function getBestTemplate() {
	        var best;

	        best = this.templateManager.getBestTemplateForPage(this, this.templates);
	        if (!best.template) {
	            _util2.default.console.warn('No template found for page ' + this.pageNum + '! Remaining elements: ' + this.content.elementsLeft);
	            return false;
	        }

	        return best;
	    },

	    /**
	     * Pick the best template it has
	     *
	     * This assumes that the page already holds a reference to all
	     * eligible templates for this page.
	     */
	    setupBestTemplate: function setupBestTemplate() {
	        var best = this.getBestTemplate();

	        if (!best) {
	            return false;
	        }

	        this.setTemplate(best.template, best.containerMap, best.score);

	        return true;
	    },
	    setTemplate: function setTemplate(template, score) {
	        this.rendered = false;

	        this.score = score || 0;

	        if (this.template === template) {
	            this.pageTemplate.reload();
	            return this;
	        }

	        this.template = template;

	        this.setPageTemplate(this.templateManager.getPageTemplateFromTemplate(template, {
	            page: this
	        }));

	        return this;
	    },

	    /**
	     * Set template if the template is usable
	     *
	     *
	     * @param {[type]} template [description]
	     */
	    setTemplateIfUsable: function setTemplateIfUsable(template) {
	        var ok;
	        var containerMap = template.getContainerMap(this.content);

	        ok = !template.containers || !template.containers.length;

	        ok = ok || _lodash2.default.all(containerMap.positions, function (position) {
	            return position.isOptional || position.match;
	        });

	        if (!ok) {
	            _util2.default.console.warn('Page ', this.pageNum, ': Template ', template.name, 'is no longer usable');
	            return false;
	        }

	        this.setTemplate(template, containerMap);

	        return true;
	    },

	    /**
	     * Set page template
	     *
	     * @param {PageTemplate} pageTemplate
	     */
	    setPageTemplate: function setPageTemplate(pageTemplate) {
	        this.pageTemplate = pageTemplate;

	        this.$el.empty();
	        this.$el.append(this.pageTemplate.el);

	        this.containers = this.pageTemplate.containers;
	        this.regions = this.pageTemplate.regions;
	    },

	    /**
	     * Prepare to render this page
	     *
	     * This is run BEFORE it exists in the DOM, so no calculations can be done here
	     * This is mostly to make sure all possible content is in place
	     *
	     * @return {void}
	     */
	    prepareToRender: function prepareToRender() {
	        var pageClassNames = [];

	        if (this.rendered || !this.template) {
	            return this;
	        }

	        this.className && pageClassNames.push(this.className);

	        pageClassNames.push(_classnames2.default.REVISION(this.options.revision));

	        // 1-6 is more logical for the end-user than 0-5
	        pageClassNames.push(_classnames2.default.PAGENUM_X(this.pageNum + 1));
	        this.$el.addClass(pageClassNames.join(' '));

	        this.pageTemplate.prepareToRender();
	    },
	    render: function render(el) {
	        // Is this Page created from a compiled object?
	        if (!this.rendered && this.decompiled) {
	            return this._renderCompiled(el);
	        }

	        if (this._pendingReflow) {
	            this._pendingReflow = false;
	            this.reflow();

	            return this;
	        }

	        if (!this.template) {
	            return this;
	        }

	        if (this.rendered) {
	            this.pageTemplate.loadContainers();
	            return this;
	        }

	        this._setupMetrics();
	        this.pageTemplate.render();

	        this.rendered = true;

	        el && this._appendToEl(el);

	        return this;
	    },

	    /**
	     * All pages did render
	     *
	     * This is called after all pages are rendered
	     *
	     * @return {void}
	     */
	    allPagesDidRender: function allPagesDidRender(numberOfPages) {
	        var regexp;
	        var last = _classnames2.default.PAGENUM_X('last');
	        var total = _classnames2.default.PAGENUM_TOTAL_X('');
	        var pageClassNames = [_classnames2.default.PAGENUM_TOTAL_X(numberOfPages)];

	        regexp = new RegExp(' ?(' + last + '|' + total + '[\\d]*)', 'g');

	        if (numberOfPages === this.pageNum + 1) {
	            pageClassNames.push(last);
	        }

	        this.el.className = this.el.className.replace(regexp, '');
	        this.$el.addClass(pageClassNames.join(' '));
	    },

	    /**
	     * Play the page
	     *
	     * Currently this only adds a CSS-class so it's possible
	     * to add CSS transitions and animations when a page is playing.
	     * A page should only be playing when it's visible on the screen.
	     *
	     * Future functionality may include reading animation/transition attributes on
	     * HTML elements, making them into real animations/transitions (i.e. impress.js)
	     *
	     * @return {void}
	     */
	    play: function play() {
	        this.$el.addClass(_classnames2.default.IS_PLAYING);
	    },

	    /**
	     * Stop playing the page
	     *
	     * @see this.play()
	     *
	     * @return {void}
	     */
	    stop: function stop() {
	        this.$el.removeClass(_classnames2.default.IS_PLAYING);
	    },
	    prepareToReflow: function prepareToReflow() {
	        this.pageTemplate.prepareToReflow();
	    },
	    reflow: function reflow() {
	        if (!this.isInDOM()) {
	            this._pendingReflow = true;
	            return;
	        }

	        this.pageTemplate.reflow();
	    },

	    /**
	     * Lock the size of the page
	     *
	     * Typically done when compiling it for a specific width/height
	     *
	     * @return {void}
	     */
	    lockSize: function lockSize() {
	        if (this.pageTemplate.isResponsive) {
	            return;
	        }

	        this.$el.css({
	            width: this.metrics.width + 'px',
	            height: this.metrics.height + 'px',
	            overflow: 'hidden',
	            position: 'relative'
	        });
	    },
	    compile: function compile() {
	        var pageCompiler = new _Page2.default(this);

	        return pageCompiler.compile();
	    },

	    /**
	     * Decompile the Page
	     *
	     * @param {object|string} an object, or a stringified object
	     * @return {Page} self
	     */
	    decompile: function decompile(objectOrString, callback) {
	        var pageCompiler = new _Page2.default(this);

	        pageCompiler.decompile(objectOrString, callback);

	        return this;
	    },
	    _renderCompiled: function _renderCompiled(el) {
	        el && this._appendToEl(el);

	        this._setupMetrics();
	        this.pageTemplate.decompile();
	        this.rendered = true;

	        return this;
	    },
	    _appendToEl: function _appendToEl(el) {
	        var thisEl = this.el;

	        setTimeout(function () {
	            (0, _dom2.default)(el).empty().append(thisEl);
	        }, 0);
	    },
	    _setupMetrics: function _setupMetrics() {
	        var metrics = this.$el.metrics();

	        // If a format object exists, allow it to override width and height
	        if (this.format && this.format instanceof _Format2.default) {
	            metrics.height = this.format.get('height');
	            metrics.width = this.format.get('width');
	        }

	        if (!metrics.height && this.metrics.height) {
	            metrics.height = this.metrics.height;
	            metrics.outerHeight = this.metrics.outerHeight;
	        }

	        this.metrics = metrics;
	        this.pageTemplate.metrics = metrics;

	        metrics.contentHeight = metrics.height - metrics.marginHeight - metrics.paddingTop - metrics.paddingBottom;
	        metrics.contentWidth = metrics.width - metrics.marginWidth - metrics.paddingRight - metrics.paddingLeft;
	    }
	});

	exports.default = Page;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _BaseModel = __webpack_require__(37);

	var _BaseModel2 = _interopRequireDefault(_BaseModel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Format = _BaseModel2.default.extend({

	    defaults: {
	        title: '',
	        name: '',
	        width: 0,
	        height: 0
	    },

	    initializeFromWindow: function initializeFromWindow() {
	        this.set({
	            width: window.innerWidth,
	            height: window.innerHeight,
	            name: 'window',
	            title: 'Window'
	        });

	        return this;
	    }
	});

	exports.default = Format;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(9);

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Base model
	 *
	 * All models extend this
	 */
	exports.default = _backbone2.default.Model.extend({});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	var _PageTemplate = __webpack_require__(39);

	var _PageTemplate2 = _interopRequireDefault(_PageTemplate);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Container = __webpack_require__(50);

	var _Container2 = _interopRequireDefault(_Container);

	var _when = __webpack_require__(40);

	var _when2 = _interopRequireDefault(_when);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var STRIP = {
	    classNames: [_classnames2.default.IS_DRAGGABLE, _classnames2.default.IS_DRAGGABLE_X, _classnames2.default.IS_DRAGGABLE_Y, _classnames2.default.IS_EDITABLE, _classnames2.default.IS_OPTIONAL, _classnames2.default.IS_REMOVABLE, _classnames2.default.IS_RESIZABLE, _classnames2.default.MULTI_CHOICE],
	    attributes: ['data-filter-format-name', 'data-filter-page-pos', 'data-map', 'data-media', 'data-name', 'data-score'],
	    elements: ['.' + _classnames2.default.SIZE_DETECTOR]
	};

	var PageCompiler = _Base2.default.extend({
	    initialize: function initialize(page) {
	        _lodash2.default.bindAll(this, '_doDecompile');

	        this.page = page;
	        this.compiled = {
	            v: 1, // compiler version
	            elements: {},
	            assets: {
	                images: []
	            }
	        };
	    },

	    /**
	     * Compile the Page into an optimized structure
	     *
	     * @return {Object} a plain object
	     */
	    compile: function compile() {
	        this.page.lockSize();

	        this.compiled.html = this._getCompiledHtml();

	        this._compileImages();
	        this._compileStylesheets();

	        this.compiled.assets.revision = this.page.options.revision;

	        return this.compiled;
	    },

	    /**
	     * Decompile a compiled Page
	     *
	     * @param {mixed} objectOrString a plain object or a stringified plain object
	     * @return {void}
	     */
	    decompile: function decompile(objectOrString, callback) {
	        var el;

	        callback = callback || function () {};

	        this.page.decompiled = true;
	        this.compiledObject = _lodash2.default.isObject(objectOrString) ? objectOrString : JSON.parse(objectOrString);

	        if (this.compiledObject.assets.revision) {
	            this.page.options.revision = this.compiledObject.assets.revision;
	        }

	        el = (0, _dom2.default)(this.compiledObject.html).get(0);
	        this.page.pageTemplate = new _PageTemplate2.default({
	            el: el.children[0],
	            page: this.page
	        });

	        this.page.setElement(el);

	        this.promises = this.loadStylesheets(this.compiledObject.assets.stylesheets);

	        _when2.default.all(this.promises).then(this._doDecompile).then(callback);
	    },

	    /**
	     * Strip an element of reserved fields used for layout
	     *
	     * @param  {DOMObject|HTMLELement} $el the element to strip
	     * @return {void}
	     */
	    strip: function strip(el) {
	        var $el = (0, _dom2.default)(el);
	        var classNamesSelector;

	        classNamesSelector = '.' + STRIP.classNames.join(', .');

	        $el.find('.' + _classnames2.default.IS_DISABLED + ', .' + _classnames2.default.IS_REMOVED).remove();
	        $el.find(classNamesSelector).removeClass(STRIP.classNames.join(' '));

	        _lodash2.default.each(STRIP.attributes, function (attr) {
	            $el.find('[' + attr + ']').removeAttr(attr);
	        });

	        _lodash2.default.each(STRIP.elements, function (selector) {
	            $el.find(selector).remove();
	        });
	    },
	    _doDecompile: function _doDecompile() {
	        console.log('DO DECOMPILED!!!!!!');
	        this.page.containers = this.page.pageTemplate.containers;
	        this.page.regions = this.page.pageTemplate.regions;

	        // Decompile ALL containers in one huge batch
	        // TODO: should regions decompile their own containers?
	        // TODO: does this belong here? It doesnt feel natural.
	        // When rendering the article, the PageTemplate is responsible for setting the layer.
	        // Why should the PageCompiler suddenly do it when decompiling?
	        // Besides, now it'll be called twice, as its done by the PageTemplate in _prepareContainerForLoad

	        _lodash2.default.each(this.page.pageTemplate._getAllContainers(), function (container) {
	            this.page.layer && container.setLayer(this.page.layer);
	            this._decompileContainer(container, this.compiledObject.elements[container.el.id]);
	        }, this);
	    },
	    _decompileContainer: function _decompileContainer(container, compiledObject) {
	        new _Container2.default(container).decompile(compiledObject);
	    },

	    /**
	     * Get compiled HTML from the Page
	     *
	     * It operates on a copy of the original element to prevent
	     * affecting the on screen page while compiling
	     *
	     * @return {string} raw HTML
	     */
	    _getCompiledHtml: function _getCompiledHtml() {
	        var $el, compiled, containers, images;

	        $el = (0, _dom2.default)(this.page.el.outerHTML);

	        compiled = this.compiled;
	        containers = this.page.pageTemplate._getAllContainers();

	        _lodash2.default.each(containers, function (container) {
	            var compiledContainer = new _Container2.default(container).compile();

	            if (container.isDisabled || container.isRemoved) {
	                return;
	            }

	            compiled.elements[container.id] = compiledContainer;

	            if (container.fullscreenEl) {
	                images = (0, _dom2.default)(container.fullscreenEl).find('img[data-src]');
	                if (images.length > 0) {
	                    compiled.assets.images = compiled.assets.images.concat(_lodash2.default.toArray(images));
	                }
	            }

	            $el.find('#' + container.id).replaceWith(compiledContainer.html);

	            delete compiledContainer.html;
	        });

	        this.strip($el);

	        return $el[0].outerHTML;
	    },
	    _compileImages: function _compileImages() {
	        var images;
	        var compiled = this.compiled;

	        images = this.page.$('img[data-src]');
	        if (images.length > 0) {
	            compiled.assets.images = compiled.assets.images.concat(_lodash2.default.toArray(images));
	        }

	        compiled.assets.images = _lodash2.default.map(compiled.assets.images, this._compileImageAsset, this);
	    },

	    /**
	     * Compile image asset
	     *
	     * @param {HTMLElement} image
	     * @return {Object}
	     */
	    _compileImageAsset: function _compileImageAsset(image) {
	        var $image = (0, _dom2.default)(image);
	        var urls = {};
	        var src2x = $image.attr('data-src-2x');

	        urls['1x'] = $image.attr('data-src');
	        if (src2x) {
	            urls['2x'] = src2x;
	        }

	        return {
	            height: parseInt($image.attr('height'), 10),
	            width: parseInt($image.attr('width'), 10),
	            urls: urls
	        };
	    },
	    _compileStylesheets: function _compileStylesheets() {
	        this.compiled.assets.stylesheets = _lodash2.default.map((0, _dom2.default)('.' + _classnames2.default.ASSET_STYLESHEET), function (ss) {
	            return ss.href;
	        });
	    },

	    /**
	     * Load the stylesheets the Page require
	     *
	     * Both the HTML and the CSS of a Page are frozen in time when its compiled
	     * To make sure it displays correctly, we need to load the CSS from the time it was compiled.
	     *
	     * Each stylesheet loaded is added to the list of deferreds in the pageTemplate,
	     * which will make sure the loadComplete event fires at the right time
	     *
	     * @param {array} stylesheetUrls list of URLs to load
	     * @return {void}
	     */
	    loadStylesheets: function loadStylesheets(stylesheetUrls) {
	        // prepend assetsBaseUrl unless it's a absolute URL
	        stylesheetUrls = _lodash2.default.map(stylesheetUrls, function (url) {
	            return url.indexOf('://') === -1 ? this.page.options.assetsBaseUrl + url : url;
	        }, this);

	        var loadedStylesheets = _lodash2.default.filter((0, _dom2.default)('.' + _classnames2.default.ASSET_STYLESHEET), function (ss) {
	            return this.page.options.revision === ss.getAttribute('data-revision');
	        }, this);

	        var promises = [];
	        var url;

	        _lodash2.default.each(loadedStylesheets, function (element) {
	            var $element = (0, _dom2.default)(element);
	            var index = stylesheetUrls.indexOf($element.attr('href'));

	            if (index !== -1) {
	                // Stylesheet is still valid, remove the URL
	                stylesheetUrls.splice(index, 1);
	                return;
	            }

	            // The stylesheet is no longer valid
	            if (stylesheetUrls.length) {
	                url = stylesheetUrls.shift();

	                $element.attr('href', url);
	                this._trackStylesheetProgress(url);
	            } else {
	                $element.remove();
	            }
	        }, this);

	        // Add link elements if there are any URLs left to load
	        _lodash2.default.each(stylesheetUrls, function (url) {
	            var link = (0, _dom2.default)('<link rel="stylesheet" type="text/css">');

	            link.attr({
	                class: _classnames2.default.ASSET_STYLESHEET,
	                'data-revision': this.page.options.revision
	            });

	            (0, _dom2.default)('head').append(link.attr('href', url));

	            promises.push(this._trackStylesheetProgress(url));
	        }, this);

	        return promises;
	    },

	    /**
	     * Track progress of the stylesheet
	     *
	     * @param {string} url external URL to track progress of
	     * @return {void}
	     */
	    _trackStylesheetProgress: function _trackStylesheetProgress(url) {
	        var deferred, img;

	        deferred = _when2.default.defer();
	        img = document.createElement('img');

	        this.page.pageTemplate.addDeferred(deferred);

	        img.onerror = function () {
	            deferred.resolve();
	        };
	        img.src = url;

	        return deferred;
	    }
	});

	exports.default = PageCompiler;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _when = __webpack_require__(40);

	var _when2 = _interopRequireDefault(_when);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _LayoutElement = __webpack_require__(33);

	var _LayoutElement2 = _interopRequireDefault(_LayoutElement);

	var _Region = __webpack_require__(41);

	var _Region2 = _interopRequireDefault(_Region);

	var _Container = __webpack_require__(43);

	var _Container2 = _interopRequireDefault(_Container);

	var _FullscreenContainer = __webpack_require__(47);

	var _FullscreenContainer2 = _interopRequireDefault(_FullscreenContainer);

	var _SizeDetector = __webpack_require__(48);

	var _SizeDetector2 = _interopRequireDefault(_SizeDetector);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _hub = __webpack_require__(8);

	var _hub2 = _interopRequireDefault(_hub);

	__webpack_require__(49);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * PageTemplate
	 *
	 * A non-reusable template meant to be used by a single page
	 * Only meant to be used internally
	 *
	 * @author Peter Rudolfsen <peter@aptoma.com>
	 * @module Layout
	 * @protected
	 */
	var PageTemplate = _BaseView2.default.extend();

	_lodash2.default.extend(PageTemplate.prototype, _LayoutElement2.default, {
	    initialize: function initialize(options) {
	        this.options = options;

	        options.page && this.setPage(options.page);
	        this.template = options.template || null;

	        this.deferreds = [];
	        this.fullscreenContainer = this._getFullscreenContainer();
	    },
	    tearDown: function tearDown() {
	        this.stopListening();

	        _lodash2.default.invoke(this.containers, 'tearDown');
	        _lodash2.default.invoke(this.regions, 'tearDown');

	        this.template = null;
	        this.containers = null;
	        this.regions = null;

	        this.fullscreenContainer && this.fullscreenContainer.tearDown();
	    },
	    setElement: function setElement(el) {
	        PageTemplate.__super__.setElement.call(this, el);

	        this.isPositionedGrid = !!this.el.className.match(/cols\-([0-9])+/);

	        // If this is a responsive template, no containers are locked to a specific width or height
	        this.isResponsive = this.$el.hasClass(_classnames2.default.IS_RESPONSIVE);

	        this.reload();
	    },
	    setPage: function setPage(page) {
	        this.page = page;
	        this.content = page.content;
	    },

	    /**
	     * Prepare everything for rendering
	     *
	     * This is run BEFORE the Page actually exists in the DOM
	     * We want to do as much as possible before injecting a Page
	     *
	     * @return {[type]} [description]
	     */
	    prepareToRender: function prepareToRender() {
	        this._setupContainers();
	        this._renderContainers();
	    },

	    /**
	     * Render the page template
	     *
	     * @todo could setup and the different render functions be merged?
	     *       right now it feels too complex
	     *
	     * @return {PageTemplate} self
	     */
	    render: function render() {
	        this.loadContainers();

	        this._fit();
	        this._fillRegions();
	        this.trackProgress();

	        return this;
	    },
	    reload: function reload() {
	        this._findContainers();
	        this._findRegions();
	    },
	    prepareToReflow: function prepareToReflow() {
	        _lodash2.default.invoke(this.regions, 'tearDown');
	        this._findRegions();
	    },
	    reflow: function reflow() {
	        this._fit();
	        this._fillRegions();
	    },
	    revert: function revert() {
	        this._sizeListener = false;
	        this.stopListening();

	        _lodash2.default.invoke(this.regions, 'revert');
	        _lodash2.default.invoke(this.containers, 'revert');
	    },
	    decompile: function decompile() {
	        this.decompiled = true;
	        this.loadContainers(true, this._getAllContainers());
	        this.trackProgress();
	    },

	    /**
	     * Add a deferred to track progress
	     *
	     * @param {Deferred} deferred
	     */
	    addDeferred: function addDeferred(deferred) {
	        this.deferreds.push(deferred);
	    },
	    didRetainElements: function didRetainElements() {
	        return _lodash2.default.some(this.containers.concat(this.regions), function (retainer) {
	            return retainer.didRetainElements();
	        });
	    },

	    /**
	     * Load all containers
	     *
	     * @todo fix the skipMetrics hack, there must be a better way
	     * @param {boolean} skipMetrics will skip metrics calculations if true
	     * @param containers
	     * @return {PageTemplate} itself
	     */
	    loadContainers: function loadContainers(skipMetrics, containers) {
	        var deferreds = this.deferreds;

	        this._setupSizeDetector();

	        containers = containers || this.containers;

	        _lodash2.default.each(containers, function (container) {
	            this._prepareContainerForLoad(container, skipMetrics);

	            container.load();

	            deferreds = deferreds.concat(container.deferreds);
	        }, this);

	        this.deferreds = deferreds;

	        return this;
	    },

	    /**
	     * Track progress of loading
	     *
	     * @return {void}
	     */
	    trackProgress: function trackProgress() {
	        var page = this.page;
	        var loadComplete = function loadComplete() {
	            page.trigger('loadComplete', page);
	            _hub2.default.trigger('loadComplete', page);
	        };

	        this.deferreds.length ? _when2.default.all(this.deferreds, loadComplete) : loadComplete();
	    },
	    _findContainers: function _findContainers() {
	        var pageTemplate = this;
	        var containers = this.containers;

	        this.containers = _lodash2.default.map(this.$el.find('.' + _classnames2.default.CONTAINER), function (el) {
	            var container;

	            container = _lodash2.default.find(containers, function (container) {
	                return container.el === el;
	            });

	            if (!container) {
	                container = new _Container2.default({ el: el });
	                container.isResponsive = pageTemplate.isResponsive;
	            }

	            return container;
	        });
	    },
	    _findRegions: function _findRegions() {
	        var regions = this.regions;
	        var isPositionedGrid = this.isPositionedGrid;

	        this.regions = _lodash2.default.map(this.$el.find('.' + _classnames2.default.REGION), function (el) {
	            return _lodash2.default.find(regions, function (region) {
	                return region.el === el;
	            }) || new _Region2.default({
	                el: el,
	                isPositionedGrid: isPositionedGrid || (0, _dom2.default)(el).closest('.alf-grid', this.$el).length >= 1
	            });
	        }, this);
	    },
	    _getAllContainers: function _getAllContainers() {
	        var containers = _lodash2.default.flatten(_lodash2.default.pluck(this.regions, 'containers'));

	        return containers.concat(this.containers);
	    },
	    _setupSizeDetector: function _setupSizeDetector() {
	        if (this.sizeDetector) {
	            this.sizeDetector.start();
	            return;
	        }

	        this.sizeDetector = new _SizeDetector2.default({
	            target: this.el,
	            watch: this.isResponsive
	        }).render();
	    },

	    /**
	     * Setup all containers from
	     *
	     * This is run only in render and not decompile
	     *
	     * @return {void}
	     * @private
	     */
	    _setupContainers: function _setupContainers() {
	        var figures = this.page.content.getFigures();

	        // First pass to find figures for all elements with data-map
	        _lodash2.default.each(this.containers, function (container) {
	            if (container.fieldMap.length) {
	                findContainers.call(this, container, fieldMapMatcher);
	            }
	        }, this);

	        // Second pass to find figures for all elements with no data-map but with data-ref
	        // These depend on figures having ref set during the first pass
	        _lodash2.default.each(this.containers, function (container) {
	            if (!container.fieldMap.length) {
	                findContainers.call(this, container, refMatcher);
	            }
	        }, this);

	        function findContainers(container, matcher) {
	            if (container.isRemoved || container.isDisabled || container.rendered) {
	                return;
	            }

	            var matchingFigures = _lodash2.default.filter(figures, function (figure) {
	                return matcher.call(this, container, figure);
	            });

	            if (!matchingFigures.length) {
	                container.isOptional && container.disable();

	                return;
	            }

	            container.content = this.content;
	            container.matchingFigureElements = _lodash2.default.flatten(_lodash2.default.pluck(matchingFigures, 'mappedElements'));
	            container.useBestMatchingFigureEl();

	            if (container.ref) {
	                container.figure.ref = container.ref;
	            }
	        }

	        function fieldMapMatcher(container, figure) {
	            if (figure.retained) {
	                return false;
	            }

	            var mappedElements = figure.getElementsMappedToField(container.fieldMap);

	            if (mappedElements.length) {
	                figure.mappedElements = mappedElements;
	                return figure;
	            }

	            return false;
	        }

	        function refMatcher(container, figure) {
	            if (container.ref && container.ref === figure.ref) {
	                return figure;
	            }

	            return false;
	        }
	    },

	    /**
	     * Get the fullscreen container of the template (if any)
	     *
	     * @return {FullscreenContainer}
	     */
	    _getFullscreenContainer: function _getFullscreenContainer() {
	        var el = this.$el.find('.' + _classnames2.default.CONTAINER_FULLSCREEN)[0];

	        if (!el) {
	            return false;
	        }

	        return new _FullscreenContainer2.default({
	            el: el.cloneNode(true),
	            page: this,
	            layer: this.page ? this.page.fullscreenLayer : false,
	            revision: this.page && this.page.options.revision
	        });
	    },

	    /**
	     * Fit the elements in the template
	     *
	     * Make sure all elements have the correct size and metrics
	     * Supports basic templates, absolute-positioned-grids and regular grids
	     *
	     * @return {void}
	     * @private
	     */
	    _fit: function _fit() {
	        var metrics = this.page.metrics;
	        var gridOpts = {
	            lineHeight: metrics.lineHeight,
	            prefix: 'alf-'
	        };
	        var inlineGrid = this.$el.find('.alf-grid');

	        if (this.isPositionedGrid) {
	            this.$el.grid(gridOpts);
	        }

	        _lodash2.default.each(inlineGrid, function (el) {
	            (0, _dom2.default)(el).grid(gridOpts);
	        });

	        _lodash2.default.each(this.regions, function (region) {
	            region.metrics = region.$el.metrics();
	            region.metrics.contentHeight = 0;
	            region.metrics.lineHeight = metrics.lineHeight;
	        }, this);
	    },

	    /**
	     * Render all containers
	     *
	     * this renders the content (raw HTML), so we can calculate all metrics,
	     * but it doesn't cause any external requests (like images, iframes etc.)
	     *
	     * @return {[type]} [description]
	     * @private
	     */
	    _renderContainers: function _renderContainers() {
	        // Separating DOM operations and calculation of styles improves performance
	        // Styles are calculated in a batch, after this
	        _lodash2.default.invoke(this.containers, 'render');

	        return this;
	    },

	    /**
	     * Prepare a Container for loading
	     *
	     * This is run both in render and decompile
	     *
	     * @param {Container} container
	     * @param {boolean} skipMetrics
	     * @return {void}
	     */
	    _prepareContainerForLoad: function _prepareContainerForLoad(container, skipMetrics) {
	        console.log('PREPARE FOR LOAD', container.el);
	        var widgets, fsContainer;

	        widgets = this.page.widgets;
	        fsContainer = this.fullscreenContainer;

	        container.page = this.page;
	        container.setLayer(this.page.layer);
	        container.matchingWidgets = widgets.getMatchesForContainer(container);
	        console.log('container matching widgets', container.matchingWidgets);
	        container.options.pixelRatio = this.page.options.pixelRatio;

	        container.renderWidgets();
	        container.unload();

	        if (!skipMetrics) {
	            container.metrics = container.$el.metrics();

	            // Only normalize containers in non-responsive templates,
	            // as this would lock the container to a specific width/height
	            if (!this.isResponsive) {
	                container.normalize();
	            }
	        }

	        // Make sure the fullscreen container is aware of when the container goes into fullscreen
	        fsContainer && fsContainer.subscribeToContainer(container);
	    },

	    /**
	     * Fill all regions with blocks
	     *
	     * Iterate through all blocks and flow them
	     * through all available regions
	     *
	     * Is it a good idea to add a Flow-object?
	     * The CSS region spec has a `NamedFlow` definition
	     * By doing this we could add support for multiple Flows
	     * on the same page.
	     * E.g. a sub-article flowing at the bottom of each page
	     *
	     * @see http://dev.w3.org/csswg/css3-regions/#the-namedflow-interface
	     * @return {void}
	     * @private
	     */
	    _fillRegions: function _fillRegions() {
	        var content = this.page.content;
	        var regionContainers = [];
	        var regionIndex = 0;
	        var region = this.regions[regionIndex];

	        while (region) {
	            region.setContent(content);
	            if (region.containers.length) {
	                regionContainers = regionContainers.concat(region.containers);
	            }

	            if (!content.hasBlocksLeft()) {
	                break;
	            }

	            region = this.regions[++regionIndex] || false;
	        }
	        this.loadContainers(true, regionContainers);
	    }
	});

	exports.default = PageTemplate;

/***/ },
/* 40 */
/***/ function(module, exports) {

	/** @license MIT License (c) copyright B Cavalier & J Hann */

	/**
	* A lightweight CommonJS Promises/A and when() implementation
	* when is part of the cujo.js family of libraries (http://cujojs.com/)
	*
	* Licensed under the MIT License at:
	* http://www.opensource.org/licenses/mit-license.php
	*
	* @version 1.7.1
	*/

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var reduceArray, slice, undef;

	//
	// Public API
	//

	when.defer = defer; // Create a deferred
	when.resolve = resolve; // Create a resolved promise
	when.reject = reject; // Create a rejected promise

	when.join = join; // Join 2 or more promises

	when.all = all; // Resolve a list of promises
	when.map = map; // Array.map() for promises
	when.reduce = reduce; // Array.reduce() for promises

	when.any = any; // One-winner race
	when.some = some; // Multi-winner race

	when.chain = chain; // Make a promise trigger another resolver

	when.isPromise = isPromise; // Determine if a thing is a promise

	/**
	 * Register an observer for a promise or immediate value.
	 *
	 * @param {*} promiseOrValue
	 * @param {function?} [onFulfilled] callback to be called when promiseOrValue is
	 *   successfully fulfilled.  If promiseOrValue is an immediate value, callback
	 *   will be invoked immediately.
	 * @param {function?} [onRejected] callback to be called when promiseOrValue is
	 *   rejected.
	 * @param {function?} [onProgress] callback to be called when progress updates
	 *   are issued for promiseOrValue.
	 * @returns {Promise} a new {@link Promise} that will complete with the return
	 *   value of callback or errback or the completion value of promiseOrValue if
	 *   callback and/or errback is not supplied.
	 */
	function when(promiseOrValue, onFulfilled, onRejected, onProgress) {
	    // Get a trusted promise for the input promiseOrValue, and then
	    // register promise handlers
	    return resolve(promiseOrValue).then(onFulfilled, onRejected, onProgress);
	}

	/**
	 * Returns promiseOrValue if promiseOrValue is a {@link Promise}, a new Promise if
	 * promiseOrValue is a foreign promise, or a new, already-fulfilled {@link Promise}
	 * whose value is promiseOrValue if promiseOrValue is an immediate value.
	 *
	 * @param {*} promiseOrValue
	 * @returns Guaranteed to return a trusted Promise.  If promiseOrValue is a when.js {@link Promise}
	 *   returns promiseOrValue, otherwise, returns a new, already-resolved, when.js {@link Promise}
	 *   whose resolution value is:
	 *   * the resolution value of promiseOrValue if it's a foreign promise, or
	 *   * promiseOrValue if it's a value
	 */
	function resolve(promiseOrValue) {
	    var promise, deferred;

	    if (promiseOrValue instanceof Promise) {
	        // It's a when.js promise, so we trust it
	        promise = promiseOrValue;
	    } else {
	        // It's not a when.js promise. See if it's a foreign promise or a value.
	        if (isPromise(promiseOrValue)) {
	            // It's a thenable, but we don't know where it came from, so don't trust
	            // its implementation entirely.  Introduce a trusted middleman when.js promise
	            deferred = defer();

	            // IMPORTANT: This is the only place when.js should ever call .then() on an
	            // untrusted promise. Don't expose the return value to the untrusted promise
	            promiseOrValue.then(function (value) {
	                deferred.resolve(value);
	            }, function (reason) {
	                deferred.reject(reason);
	            }, function (update) {
	                deferred.progress(update);
	            });

	            promise = deferred.promise;
	        } else {
	            // It's a value, not a promise.  Create a resolved promise for it.
	            promise = fulfilled(promiseOrValue);
	        }
	    }

	    return promise;
	}

	/**
	 * Returns a rejected promise for the supplied promiseOrValue.  The returned
	 * promise will be rejected with:
	 * - promiseOrValue, if it is a value, or
	 * - if promiseOrValue is a promise
	 *   - promiseOrValue's value after it is fulfilled
	 *   - promiseOrValue's reason after it is rejected
	 * @param {*} promiseOrValue the rejected value of the returned {@link Promise}
	 * @return {Promise} rejected {@link Promise}
	 */
	function reject(promiseOrValue) {
	    return when(promiseOrValue, rejected);
	}

	/**
	 * Trusted Promise constructor.  A Promise created from this constructor is
	 * a trusted when.js promise.  Any other duck-typed promise is considered
	 * untrusted.
	 * @constructor
	 * @name Promise
	 */
	function Promise(then) {
	    this.then = then;
	}

	Promise.prototype = {
	    /**
	     * Register a callback that will be called when a promise is
	     * fulfilled or rejected.  Optionally also register a progress handler.
	     * Shortcut for .then(onFulfilledOrRejected, onFulfilledOrRejected, onProgress)
	     * @param {function?} [onFulfilledOrRejected]
	     * @param {function?} [onProgress]
	     * @return {Promise}
	     */
	    always: function always(onFulfilledOrRejected, onProgress) {
	        return this.then(onFulfilledOrRejected, onFulfilledOrRejected, onProgress);
	    },

	    /**
	     * Register a rejection handler.  Shortcut for .then(undefined, onRejected)
	     * @param {function?} onRejected
	     * @return {Promise}
	     */
	    otherwise: function otherwise(onRejected) {
	        return this.then(undef, onRejected);
	    },

	    /**
	     * Shortcut for .then(function() { return value; })
	     * @param  {*} value
	     * @return {Promise} a promise that:
	     *  - is fulfilled if value is not a promise, or
	     *  - if value is a promise, will fulfill with its value, or reject
	     *    with its reason.
	     */
	    yield: function _yield(value) {
	        return this.then(function () {
	            return value;
	        });
	    },

	    /**
	     * Assumes that this promise will fulfill with an array, and arranges
	     * for the onFulfilled to be called with the array as its argument list
	     * i.e. onFulfilled.spread(undefined, array).
	     * @param {function} onFulfilled function to receive spread arguments
	     * @return {Promise}
	     */
	    spread: function spread(onFulfilled) {
	        return this.then(function (array) {
	            // array may contain promises, so resolve its contents.
	            return all(array, function (array) {
	                return onFulfilled.apply(undef, array);
	            });
	        });
	    }
	};

	/**
	 * Create an already-resolved promise for the supplied value
	 * @private
	 *
	 * @param {*} value
	 * @return {Promise} fulfilled promise
	 */
	function fulfilled(value) {
	    var p = new Promise(function (onFulfilled) {
	        // TODO: Promises/A+ check typeof onFulfilled
	        try {
	            return resolve(onFulfilled ? onFulfilled(value) : value);
	        } catch (e) {
	            return rejected(e);
	        }
	    });

	    return p;
	}

	/**
	 * Create an already-rejected {@link Promise} with the supplied
	 * rejection reason.
	 * @private
	 *
	 * @param {*} reason
	 * @return {Promise} rejected promise
	 */
	function rejected(reason) {
	    var p = new Promise(function (_, onRejected) {
	        // TODO: Promises/A+ check typeof onRejected
	        try {
	            return onRejected ? resolve(onRejected(reason)) : rejected(reason);
	        } catch (e) {
	            return rejected(e);
	        }
	    });

	    return p;
	}

	/**
	 * Creates a new, Deferred with fully isolated resolver and promise parts,
	 * either or both of which may be given out safely to consumers.
	 * The Deferred itself has the full API: resolve, reject, progress, and
	 * then. The resolver has resolve, reject, and progress.  The promise
	 * only has then.
	 *
	 * @return {Deferred}
	 */
	function defer() {
	    var deferred, promise, handlers, progressHandlers, _then, _progress, _resolve2;

	    /**
	     * The promise for the new deferred
	     * @type {Promise}
	     */
	    promise = new Promise(then);

	    /**
	     * The full Deferred object, with {@link Promise} and {@link Resolver} parts
	     * @class Deferred
	     * @name Deferred
	     */
	    deferred = {
	        then: then, // DEPRECATED: use deferred.promise.then
	        resolve: promiseResolve,
	        reject: promiseReject,
	        // TODO: Consider renaming progress() to notify()
	        progress: promiseProgress,

	        promise: promise,

	        resolver: {
	            resolve: promiseResolve,
	            reject: promiseReject,
	            progress: promiseProgress
	        }
	    };

	    handlers = [];
	    progressHandlers = [];

	    /**
	     * Pre-resolution then() that adds the supplied callback, errback, and progback
	     * functions to the registered listeners
	     * @private
	     *
	     * @param {function?} [onFulfilled] resolution handler
	     * @param {function?} [onRejected] rejection handler
	     * @param {function?} [onProgress] progress handler
	     */
	    _then = function _then(onFulfilled, onRejected, onProgress) {
	        // TODO: Promises/A+ check typeof onFulfilled, onRejected, onProgress
	        var deferred, progressHandler;

	        deferred = defer();

	        progressHandler = typeof onProgress === 'function' ? function (update) {
	            try {
	                // Allow progress handler to transform progress event
	                deferred.progress(onProgress(update));
	            } catch (e) {
	                // Use caught value as progress
	                deferred.progress(e);
	            }
	        } : function (update) {
	            deferred.progress(update);
	        };

	        handlers.push(function (promise) {
	            promise.then(onFulfilled, onRejected).then(deferred.resolve, deferred.reject, progressHandler);
	        });

	        progressHandlers.push(progressHandler);

	        return deferred.promise;
	    };

	    /**
	     * Issue a progress event, notifying all progress listeners
	     * @private
	     * @param {*} update progress event payload to pass to all listeners
	     */
	    _progress = function _progress(update) {
	        processQueue(progressHandlers, update);
	        return update;
	    };

	    /**
	     * Transition from pre-resolution state to post-resolution state, notifying
	     * all listeners of the resolution or rejection
	     * @private
	     * @param {*} value the value of this deferred
	     */
	    _resolve2 = function _resolve(value) {
	        value = resolve(value);

	        // Replace _then with one that directly notifies with the result.
	        _then = value.then;
	        // Replace _resolve so that this Deferred can only be resolved once
	        _resolve2 = resolve;
	        // Make _progress a noop, to disallow progress for the resolved promise.
	        _progress = noop;

	        // Notify handlers
	        processQueue(handlers, value);

	        // Free progressHandlers array since we'll never issue progress events
	        progressHandlers = handlers = undef;

	        return value;
	    };

	    return deferred;

	    /**
	     * Wrapper to allow _then to be replaced safely
	     * @param {function?} [onFulfilled] resolution handler
	     * @param {function?} [onRejected] rejection handler
	     * @param {function?} [onProgress] progress handler
	     * @return {Promise} new promise
	     */
	    function then(onFulfilled, onRejected, onProgress) {
	        // TODO: Promises/A+ check typeof onFulfilled, onRejected, onProgress
	        return _then(onFulfilled, onRejected, onProgress);
	    }

	    /**
	     * Wrapper to allow _resolve to be replaced
	     */
	    function promiseResolve(val) {
	        return _resolve2(val);
	    }

	    /**
	     * Wrapper to allow _reject to be replaced
	     */
	    function promiseReject(err) {
	        return _resolve2(rejected(err));
	    }

	    /**
	     * Wrapper to allow _progress to be replaced
	     */
	    function promiseProgress(update) {
	        return _progress(update);
	    }
	}

	/**
	 * Determines if promiseOrValue is a promise or not.  Uses the feature
	 * test from http://wiki.commonjs.org/wiki/Promises/A to determine if
	 * promiseOrValue is a promise.
	 *
	 * @param {*} promiseOrValue anything
	 * @returns {boolean} true if promiseOrValue is a {@link Promise}
	 */
	function isPromise(promiseOrValue) {
	    return promiseOrValue && typeof promiseOrValue.then === 'function';
	}

	/**
	 * Initiates a competitive race, returning a promise that will resolve when
	 * howMany of the supplied promisesOrValues have resolved, or will reject when
	 * it becomes impossible for howMany to resolve, for example, when
	 * (promisesOrValues.length - howMany) + 1 input promises reject.
	 *
	 * @param {Array} promisesOrValues array of anything, may contain a mix
	 *      of promises and values
	 * @param howMany {number} number of promisesOrValues to resolve
	 * @param {function?} [onFulfilled] resolution handler
	 * @param {function?} [onRejected] rejection handler
	 * @param {function?} [onProgress] progress handler
	 * @returns {Promise} promise that will resolve to an array of howMany values that
	 * resolved first, or will reject with an array of (promisesOrValues.length - howMany) + 1
	 * rejection reasons.
	 */
	function some(promisesOrValues, howMany, onFulfilled, onRejected, onProgress) {

	    checkCallbacks(2, arguments);

	    return when(promisesOrValues, function (promisesOrValues) {

	        var toResolve, toReject, values, reasons, deferred, _fulfillOne, _rejectOne, progress, len, i;

	        len = promisesOrValues.length >>> 0;

	        toResolve = Math.max(0, Math.min(howMany, len));
	        values = [];

	        toReject = len - toResolve + 1;
	        reasons = [];

	        deferred = defer();

	        // No items in the input, resolve immediately
	        if (!toResolve) {
	            deferred.resolve(values);
	        } else {
	            progress = deferred.progress;

	            _rejectOne = function rejectOne(reason) {
	                reasons.push(reason);
	                if (! --toReject) {
	                    _fulfillOne = _rejectOne = noop;
	                    deferred.reject(reasons);
	                }
	            };

	            _fulfillOne = function fulfillOne(val) {
	                // This orders the values based on promise resolution order
	                // Another strategy would be to use the original position of
	                // the corresponding promise.
	                values.push(val);

	                if (! --toResolve) {
	                    _fulfillOne = _rejectOne = noop;
	                    deferred.resolve(values);
	                }
	            };

	            for (i = 0; i < len; ++i) {
	                if (i in promisesOrValues) {
	                    when(promisesOrValues[i], fulfiller, rejecter, progress);
	                }
	            }
	        }

	        return deferred.then(onFulfilled, onRejected, onProgress);

	        function rejecter(reason) {
	            _rejectOne(reason);
	        }

	        function fulfiller(val) {
	            _fulfillOne(val);
	        }
	    });
	}

	/**
	 * Initiates a competitive race, returning a promise that will resolve when
	 * any one of the supplied promisesOrValues has resolved or will reject when
	 * *all* promisesOrValues have rejected.
	 *
	 * @param {Array|Promise} promisesOrValues array of anything, may contain a mix
	 *      of {@link Promise}s and values
	 * @param {function?} [onFulfilled] resolution handler
	 * @param {function?} [onRejected] rejection handler
	 * @param {function?} [onProgress] progress handler
	 * @returns {Promise} promise that will resolve to the value that resolved first, or
	 * will reject with an array of all rejected inputs.
	 */
	function any(promisesOrValues, onFulfilled, onRejected, onProgress) {

	    function unwrapSingleResult(val) {
	        return onFulfilled ? onFulfilled(val[0]) : val[0];
	    }

	    return some(promisesOrValues, 1, unwrapSingleResult, onRejected, onProgress);
	}

	/**
	 * Return a promise that will resolve only once all the supplied promisesOrValues
	 * have resolved. The resolution value of the returned promise will be an array
	 * containing the resolution values of each of the promisesOrValues.
	 * @memberOf when
	 *
	 * @param {Array|Promise} promisesOrValues array of anything, may contain a mix
	 *      of {@link Promise}s and values
	 * @param {function?} [onFulfilled] resolution handler
	 * @param {function?} [onRejected] rejection handler
	 * @param {function?} [onProgress] progress handler
	 * @returns {Promise}
	 */
	function all(promisesOrValues, onFulfilled, onRejected, onProgress) {
	    checkCallbacks(1, arguments);
	    return map(promisesOrValues, identity).then(onFulfilled, onRejected, onProgress);
	}

	/**
	 * Joins multiple promises into a single returned promise.
	 * @return {Promise} a promise that will fulfill when *all* the input promises
	 * have fulfilled, or will reject when *any one* of the input promises rejects.
	 */
	function join() /* ...promises */{
	    return map(arguments, identity);
	}

	/**
	 * Traditional map function, similar to `Array.prototype.map()`, but allows
	 * input to contain {@link Promise}s and/or values, and mapFunc may return
	 * either a value or a {@link Promise}
	 *
	 * @param {Array|Promise} promise array of anything, may contain a mix
	 *      of {@link Promise}s and values
	 * @param {function} mapFunc mapping function mapFunc(value) which may return
	 *      either a {@link Promise} or value
	 * @returns {Promise} a {@link Promise} that will resolve to an array containing
	 *      the mapped output values.
	 */
	function map(promise, mapFunc) {
	    return when(promise, function (array) {
	        var results, len, toResolve, resolve, i, d;

	        // Since we know the resulting length, we can preallocate the results
	        // array to avoid array expansions.
	        toResolve = len = array.length >>> 0;
	        results = [];
	        d = defer();

	        if (!toResolve) {
	            d.resolve(results);
	        } else {

	            resolve = function resolveOne(item, i) {
	                when(item, mapFunc).then(function (mapped) {
	                    results[i] = mapped;

	                    if (! --toResolve) {
	                        d.resolve(results);
	                    }
	                }, d.reject);
	            };

	            // Since mapFunc may be async, get all invocations of it into flight
	            for (i = 0; i < len; i++) {
	                if (i in array) {
	                    resolve(array[i], i);
	                } else {
	                    --toResolve;
	                }
	            }
	        }

	        return d.promise;
	    });
	}

	/**
	 * Traditional reduce function, similar to `Array.prototype.reduce()`, but
	 * input may contain promises and/or values, and reduceFunc
	 * may return either a value or a promise, *and* initialValue may
	 * be a promise for the starting value.
	 *
	 * @param {Array|Promise} promise array or promise for an array of anything,
	 *      may contain a mix of promises and values.
	 * @param {function} reduceFunc reduce function reduce(currentValue, nextValue, index, total),
	 *      where total is the total number of items being reduced, and will be the same
	 *      in each call to reduceFunc.
	 * @returns {Promise} that will resolve to the final reduced value
	 */
	function reduce(promise, reduceFunc /*, initialValue */) {
	    var args = slice.call(arguments, 1);

	    return when(promise, function (array) {
	        var total;

	        total = array.length;

	        // Wrap the supplied reduceFunc with one that handles promises and then
	        // delegates to the supplied.
	        args[0] = function (current, val, i) {
	            return when(current, function (c) {
	                return when(val, function (value) {
	                    return reduceFunc(c, value, i, total);
	                });
	            });
	        };

	        return reduceArray.apply(array, args);
	    });
	}

	/**
	 * Ensure that resolution of promiseOrValue will trigger resolver with the
	 * value or reason of promiseOrValue, or instead with resolveValue if it is provided.
	 *
	 * @param promiseOrValue
	 * @param {Object} resolver
	 * @param {function} resolver.resolve
	 * @param {function} resolver.reject
	 * @param {*} [resolveValue]
	 * @returns {Promise}
	 */
	function chain(promiseOrValue, resolver, resolveValue) {
	    var useResolveValue = arguments.length > 2;

	    return when(promiseOrValue, function (val) {
	        val = useResolveValue ? resolveValue : val;
	        resolver.resolve(val);
	        return val;
	    }, function (reason) {
	        resolver.reject(reason);
	        return rejected(reason);
	    }, resolver.progress);
	}

	//
	// Utility functions
	//

	/**
	 * Apply all functions in queue to value
	 * @param {Array} queue array of functions to execute
	 * @param {*} value argument passed to each function
	 */
	function processQueue(queue, value) {
	    var handler,
	        i = 0;

	    while (handler = queue[i++]) {
	        handler(value);
	    }
	}

	/**
	 * Helper that checks arrayOfCallbacks to ensure that each element is either
	 * a function, or null or undefined.
	 * @private
	 * @param {number} start index at which to start checking items in arrayOfCallbacks
	 * @param {Array} arrayOfCallbacks array to check
	 * @throws {Error} if any element of arrayOfCallbacks is something other than
	 * a functions, null, or undefined.
	 */
	function checkCallbacks(start, arrayOfCallbacks) {
	    // TODO: Promises/A+ update type checking and docs
	    var arg,
	        i = arrayOfCallbacks.length;

	    while (i > start) {
	        arg = arrayOfCallbacks[--i];

	        if (arg != null && typeof arg != 'function') {
	            throw new Error('arg ' + i + ' must be a function');
	        }
	    }
	}

	/**
	 * No-Op function used in method replacement
	 * @private
	 */
	function noop() {}

	slice = [].slice;

	// ES5 reduce implementation if native not available
	// See: http://es5.github.com/#x15.4.4.21 as there are many
	// specifics and edge cases.
	reduceArray = [].reduce || function (reduceFunc /*, initialValue */) {
	    /*jshint maxcomplexity: 7*/

	    // ES5 dictates that reduce.length === 1

	    // This implementation deviates from ES5 spec in the following ways:
	    // 1. It does not check if reduceFunc is a Callable

	    var arr, args, reduced, len, i;

	    i = 0;
	    // This generates a jshint warning, despite being valid
	    // "Missing 'new' prefix when invoking a constructor."
	    // See https://github.com/jshint/jshint/issues/392
	    arr = Object(this);
	    len = arr.length >>> 0;
	    args = arguments;

	    // If no initialValue, use first item of array (we know length !== 0 here)
	    // and adjust i to start at second item
	    if (args.length <= 1) {
	        // Skip to the first real element in the array
	        for (;;) {
	            if (i in arr) {
	                reduced = arr[i++];
	                break;
	            }

	            // If we reached the end of the array without finding any real
	            // elements, it's a TypeError
	            if (++i >= len) {
	                throw new TypeError();
	            }
	        }
	    } else {
	        // If initialValue provided, use it
	        reduced = args[1];
	    }

	    // Do the actual reduce
	    for (; i < len; ++i) {
	        // Skip holes
	        if (i in arr) {
	            reduced = reduceFunc(reduced, arr[i], i, arr);
	        }
	    }

	    return reduced;
	};

	function identity(x) {
	    return x;
	}

	exports.default = when;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _LayoutElement = __webpack_require__(33);

	var _LayoutElement2 = _interopRequireDefault(_LayoutElement);

	var _ContentRetainer = __webpack_require__(42);

	var _ContentRetainer2 = _interopRequireDefault(_ContentRetainer);

	var _Container = __webpack_require__(43);

	var _Container2 = _interopRequireDefault(_Container);

	var _Figure = __webpack_require__(44);

	var _Figure2 = _interopRequireDefault(_Figure);

	var _Block = __webpack_require__(46);

	var _Block2 = _interopRequireDefault(_Block);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Region = _BaseView2.default.extend();

	_lodash2.default.extend(Region.prototype, _LayoutElement2.default, _ContentRetainer2.default, {
	    className: _classnames2.default.REGION,

	    initialize: function initialize(options) {
	        this.options = options || {};

	        this.defaultMetrics(this.options.metrics);
	        this.metrics.contentHeight = 0;
	        this.fragment = null;

	        // Internal property, only used in the render phase
	        this._contentContainers = [];

	        this.options.elements && this.addElements(this.options.elements);
	    },
	    tearDown: function tearDown() {
	        this.stopListening();
	        this.fragment = null;
	        this.revert();
	        this.el = null;
	        this.$el = null;
	    },
	    clone: function clone() {
	        var region = new Region({
	            el: this.el.cloneNode(true)
	        });
	        region.content = this.content;

	        return region;
	    },
	    setElement: function setElement(el) {
	        Region.__super__.setElement.call(this, el);

	        this._originalHtml = this.$el.html();

	        this.isFlexible = this.$el.hasClass(_classnames2.default.REGION_FLEXIBLE);
	        this._originalContainers = this._getInlineContainers();
	        this.containers = this._originalContainers.slice(0);
	    },
	    setContent: function setContent(content) {
	        this.content = content;
	        this.addElements(content.getElements());
	    },

	    /**
	     * Add elements to this region
	     *
	     * Only elements that fit are added,
	     * the rest are skipped
	     *
	     * @return {void}
	     */
	    addElements: function addElements(elements) {
	        this.$el.empty();
	        this.fragment = document.createDocumentFragment();
	        _lodash2.default.forEach(elements, this._addElement, this);
	        this.el.appendChild(this.fragment);

	        this.containers = this._contentContainers;
	        this._contentContainers = [];

	        return this;
	    },
	    getOverflow: function getOverflow(metrics) {
	        metrics = metrics || {};
	        var extraHeight = metrics.outerHeight || 0;
	        var collapsedMargin = 0;

	        if (this.lastUsedElement) {
	            collapsedMargin = Math.min(this.lastUsedElement.metrics.marginBottom, metrics.marginTop);
	        }

	        return this.metrics.contentHeight - this.metrics.height + extraHeight - collapsedMargin;
	    },
	    hasSpaceLeft: function hasSpaceLeft() {
	        return this.getOverflow() < 0;
	    },

	    /**
	     * Revert the region and all elements
	     *
	     * @param {string} html optional HTML to revert to
	     * @return {void}
	     */
	    revert: function revert(html) {
	        _lodash2.default.invoke(this.elements, 'revert');

	        html = html ? html : this._originalHtml || '';

	        this.metrics.contentHeight = 0;
	        this.lastUsedElement = null;
	        this.releaseAll();

	        this.el.innerHTML = html;
	        this._originalHtml = html;
	    },

	    /**
	     * Iterator to add a element to the region
	     *
	     * @param {Block|Figure} element
	     * @return {boolean} false exists the iteration, true continues to next element
	     */
	    _addElement: function _addElement(element) {
	        var overflow;

	        element = this._verifyElementIsUsable(element);

	        if (!element || !this.isFlexible && this.metrics.height === 0) {
	            return true;
	        }

	        if (this.metrics.contentHeight !== 0 && element.el && element.$el.hasClass(_classnames2.default.BREAK_BEFORE)) {
	            return false;
	        }

	        this._verifyElementMetrics(element);

	        overflow = this.getOverflow(element.metrics);

	        // There will be room for at least 1 more line AFTER this element is added, so add it and continue
	        if (this.isFlexible || overflow * -1 >= this.metrics.lineHeight) {
	            this._useElement(element);

	            return true;
	        }

	        // Not enough room left for another line, or just the margin overflowing? Perfect match! Add it and finish off
	        if (overflow > -this.metrics.lineHeight && overflow <= element.metrics.marginBottom) {
	            element.shouldStickToNext() || this._useElement(element);

	            return false;
	        }

	        return this._overflowElementIfSupported(element);
	    },

	    /**
	     * Use an element
	     *
	     * Mark an element as retained and do all required calculations
	     *
	     * @param {Block|Figure} element
	     * @return {void}
	     */
	    _useElement: function _useElement(element) {
	        var collapsedMargin = 0;

	        if (this.lastUsedElement) {
	            collapsedMargin = Math.min(this.lastUsedElement.metrics.marginBottom, element.metrics.marginTop);
	        }

	        var elementContentHeight = element.metrics.outerHeight - collapsedMargin;

	        this.metrics.contentHeight += elementContentHeight;
	        this.fragment.appendChild(element.render().el);
	        this.retain(element.figure || element);
	        this.lastUsedElement = element;

	        if (element instanceof _Container2.default) {
	            this._contentContainers.push(element);
	        }
	    },

	    /**
	     * Overflow the element if it supports it
	     *
	     * @param {Block|Container} element
	     * @param {number} overflow how many pixels its currently overflowing
	     * @return {boolean} true if overflowable, false if not
	     */
	    _overflowElementIfSupported: function _overflowElementIfSupported(element) {
	        var maxHeight, overflowBlock;
	        var isRearrangeable = element.isRearrangeable();

	        if (!isRearrangeable && !element.isSplittable()) {
	            // this elements could not be changed in any way,
	            // just finish off so the next region can handle it
	            return false;
	        } else if (isRearrangeable) {
	            this.anchoredBlock = element;

	            return true;
	        }

	        maxHeight = this.metrics.height - this.metrics.contentHeight;

	        this._useElement(element);

	        overflowBlock = element.getOverflowBlock(maxHeight).render();
	        this.content.addAfter(overflowBlock, this.anchoredBlock || this.lastUsedElement);

	        this.anchoredBlock = null;

	        return false;
	    },

	    /**
	     * Verify that the element is in a usable state
	     *
	     * @param {Block|Figure} element
	     * @return {mixed} false if not usable, otherwise a Block or Container
	     */
	    _verifyElementIsUsable: function _verifyElementIsUsable(element) {
	        if (element instanceof _Block2.default) {
	            return element;
	        } else if (element instanceof _Figure2.default && !this._originalContainers) {
	            return false;
	        }

	        var figureEl, inlineContainer;

	        _lodash2.default.each(this._originalContainers, function (container) {
	            figureEl = element.getElementMappedToField(container.fieldMap);
	            if (figureEl) {
	                inlineContainer = container;
	                return false;
	            }
	        });

	        if (!figureEl) {
	            return false;
	        }

	        inlineContainer = inlineContainer.clone();
	        inlineContainer.isInline = true;
	        inlineContainer.content = this.content;
	        inlineContainer.setFigure(element, figureEl);

	        this.$el.append(inlineContainer.render().el);

	        inlineContainer.calculateMetrics();
	        inlineContainer.metrics.lineHeight = this.metrics.lineHeight;

	        if (this.options.isPositionedGrid) {
	            inlineContainer.normalize(this.metrics.lineHeight, this.lastUsedElement && this.lastUsedElement.metrics.marginBottom);
	        }

	        // It's not actually in use here, it's just made ready for it
	        inlineContainer.releaseAll();

	        inlineContainer.$el.remove();

	        return inlineContainer;
	    },
	    _verifyElementMetrics: function _verifyElementMetrics(element) {
	        if (element.metrics.lineHeight !== this.metrics.lineHeight) {
	            _util2.default.console.warn('lineHeight mismatch between page and content.', 'lineHeight on ', this.el, ': ', this.metrics.lineHeight, 'lineHeight on ', element.el, ': ', element.metrics.lineHeight, 'The page might not look good!');
	        }

	        if (this.options.isPositionedGrid) {
	            element.normalize(this.metrics.lineHeight, this.lastUsedElement && this.lastUsedElement.metrics.marginBottom);
	        }
	    },

	    /**
	     * Get inline containers inside this region
	     *
	     * @todo create InlineContainer objects?
	     * @return {array}
	     */
	    _getInlineContainers: function _getInlineContainers() {
	        return _lodash2.default.map(this.$el.find('.' + _classnames2.default.CONTAINER_INLINE), function (el) {
	            return new _Container2.default({ el: el });
	        });
	    }
	});

	exports.default = Region;

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    retain: function retain(element) {
	        this.content.retain(element);
	        this.retained = this.retained || [];
	        this.retained.push(element);
	    },
	    releaseAll: function releaseAll() {
	        if (!this.retained || !this.retained.length) {
	            return;
	        }

	        this.content.release(this.retained);
	        this.retained = [];
	    },
	    didRetainElements: function didRetainElements() {
	        return !!this.retained && this.retained.length > 0;
	    }
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _transition = __webpack_require__(14);

	var _transition2 = _interopRequireDefault(_transition);

	var _LayoutElement = __webpack_require__(33);

	var _LayoutElement2 = _interopRequireDefault(_LayoutElement);

	var _ContentRetainer = __webpack_require__(42);

	var _ContentRetainer2 = _interopRequireDefault(_ContentRetainer);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _hub = __webpack_require__(8);

	var _hub2 = _interopRequireDefault(_hub);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	var _when = __webpack_require__(40);

	var _when2 = _interopRequireDefault(_when);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Container = _BaseView2.default.extend();

	// Cache of already loaded assets
	Container.loadedAssets = [];

	_lodash2.default.extend(Container.prototype, _LayoutElement2.default, _ContentRetainer2.default, {

	    fullscreenEvents: {
	        touch: {
	            'touchstart img, .alf-image': 'onTouchStart',
	            'touchmove img, .alf-image': 'onTouchMove',
	            'touchend img, .alf-image': 'onTouchEnd',
	            'tap img, .alf-image': 'onTap'
	            // 'gesturestart img': 'onGestureStart',
	            // 'gesturechange img': 'onGestureChange',
	            // 'gestureend img': 'onGestureEnd'
	        },
	        pointer: {
	            'click img, .alf-image': 'onClick',
	            'mousedown img, .alf-image': 'onMouseDown'
	        }
	    },

	    className: _classnames2.default.CONTAINER,

	    initialize: function initialize(options) {
	        options = this.options = _lodash2.default.extend({}, options || {});

	        _lodash2.default.bindAll(this, 'load', '_doLoad', '_loadComplete', '_loadReady', 'enterFullscreen');
	        this.defaultMetrics();

	        this.deferreds = [];
	        this.loaded = null;
	        this.isDirty = false;
	        this.isResponsive = false;

	        this.mouseDownX = 0;
	        this.mouseDownY = 0;
	        this.mouseDownTime = 0;

	        this.matchingFigureElements = [];
	        this._lastState = {};

	        options.pixelRatio = parseInt(options.pixelRatio || window.devicePixelRatio || 1, 10);
	    },
	    tearDown: function tearDown() {
	        this.releaseAll();
	        this.stopListening();
	        this.undelegateEvents();
	        this.el = null;
	        this.figureEl = null;
	        this.fullscreenEl && (0, _dom2.default)(this.fullscreenEl).remove();
	        this.fullscreenEl = null;
	        this.$el.find('img').each(function () {
	            this.style.removeProperty('max-width');
	            this.style.removeProperty('max-height');
	            this.style.removeProperty('width');
	            this.style.removeProperty('height');
	        });
	    },
	    remove: function remove() {
	        this.$el.addClass(_classnames2.default.IS_REMOVED);
	        this.isRemoved = true;
	        this.releaseAll();
	        this.figure = null;
	        this.figureEl = null;

	        this.$el.empty();
	    },
	    clone: function clone() {
	        var container;

	        container = new Container({
	            el: this.el.cloneNode(true)
	        });

	        container._setUniqueId();

	        return container;
	    },
	    setElement: function setElement(el) {
	        Container.__super__.setElement.call(this, el);
	        this.fieldMap = _util2.default.dom.getFieldMap(this.el);
	        this.ref = this.el.dataset.ref;
	        this.isOptional = this.$el.hasClass(_classnames2.default.IS_OPTIONAL);
	        this.isRemoved = this.$el.hasClass(_classnames2.default.IS_REMOVED);
	        this.type = this.$el.attr('data-type');
	    },

	    /**
	     * Set figure
	     *
	     * Tell the container which figure to use
	     *
	     * @param {Figure} figure figure-object
	     * @param {HTMLElement} figureEl
	     */
	    setFigure: function setFigure(figure, figureEl) {
	        // revert is needed to make the container ready for the next render
	        if (this.figureElSignature && this.figureElSignature !== figureEl.signature) {
	            this.revert();
	        }

	        this.figure = figure;
	        this.figureEl = figureEl;

	        // This is kept as a reference in case the container is reverted.
	        // When rendered again, it'll try to use the same figure element.
	        this.figureElSignature = figureEl.signature;

	        this.retain(figure);

	        return this;
	    },

	    /**
	     * Set figure element
	     *
	     * @param {FigureElement} figureEl
	     */
	    setFigureEl: function setFigureEl(figureEl) {
	        this.setFigure(figureEl.figure, figureEl);
	    },

	    /**
	     * Lock current figure element
	     *
	     * This will force the container to prefer a figure element over another
	     *
	     * @return {void}
	     */
	    lockFigureEl: function lockFigureEl() {
	        this.preferFigureElSignature = this.figureElSignature;
	    },

	    /**
	     * Use the "best" matching figure element
	     *
	     * This is mostly based on what the container previously used.
	     *
	     * @return {void} true on success, false on failure
	     */
	    useBestMatchingFigureEl: function useBestMatchingFigureEl() {
	        var _this = this;

	        if (!this.matchingFigureElements.length) {
	            return false;
	        }

	        var figureEl;

	        if (this.preferFigureElSignature) {
	            // `matchesAnySignature` is used for backwards compatibility, as it was previously based on innerHTML instead of outerHTML
	            figureEl = _lodash2.default.find(this.matchingFigureElements, function (el) {
	                return el.matchesAnySignature(_this.preferFigureElSignature);
	            });
	        }

	        this.setFigureEl(figureEl || this.matchingFigureElements[0]);

	        return true;
	    },

	    /**
	     * Use next available figure element
	     *
	     * Will switch the container to using the next figure element.
	     * Only works if the container supports multiple elements.
	     *
	     * @return {Boolean}
	     */
	    useNextFigureEl: function useNextFigureEl() {
	        var numElements = this.matchingFigureElements.length;

	        if (!numElements) {
	            return false;
	        }

	        var index = this.matchingFigureElements.indexOf(this.figureEl) + 1;

	        this.setFigureEl(this.matchingFigureElements[index % numElements]);
	        this.lockFigureEl();

	        return true;
	    },

	    /**
	     * Set layer
	     *
	     * Make the container aware of the layers available
	     * Will try to setup fullscreen if possible (requires a fullscreenEl present)
	     *
	     * @param {Layer} layer
	     */
	    setLayer: function setLayer(layer) {
	        this.layer = layer;
	        this.fullscreenLayer || (this.fullscreenLayer = layer.above());
	        this._setupFullscreen();
	    },

	    /**
	     * Set fullscreen el
	     *
	     * Set the element to be used in fullscreen mode
	     * Will try to setup fullscreen if possible (requires a fullscreen layer)
	     *
	     * @param {HTMLElement} el
	     */
	    setFullscreenEl: function setFullscreenEl(el) {
	        this.fullscreenEl = el;
	        this._setupFullscreen();
	    },

	    /**
	     * Prevent the default fullscreen events
	     *
	     * @api
	     * @return {void}
	     */
	    preventDefaultEvents: function preventDefaultEvents() {
	        this.undelegateEvents(this.fullscreenEvents);
	    },
	    isSplittable: function isSplittable() {
	        return false;
	    },

	    /**
	     * Is this Container rearrangeable?
	     *
	     * This is only applicable for inline containers
	     *
	     * @return {boolean}
	     */
	    isRearrangeable: function isRearrangeable() {
	        if (this.$el.hasClass(_classnames2.default.IS_REARRANGEABLE)) {
	            return true;
	        }

	        return false;
	    },

	    /**
	     * Render the content
	     *
	     * @return {Container} self
	     */
	    render: function render() {
	        console.log('RENDER CONTAINER', this.el);

	        if (!this.isReadyForRender()) {
	            return this;
	        }

	        this.id = this.el.id || this._setUniqueId();
	        this.rendered = true;

	        if (this.isUsingSameFigureEl()) {
	            this.$el.append(this._lastState.html);
	            // Since we're using previously rendered content, we have to
	            this.renderedWidgets = this._lastState.renderedWidgets || false;
	        } else {
	            this.renderProcessedContainerContent();
	            this.renderBgImages();
	            this._originalHtml = this.el.outerHTML;
	        }

	        if (this.matchingFigureElements && this.matchingFigureElements.length > 1) {
	            this.$el.addClass(_classnames2.default.MULTI_CHOICE);
	        }

	        return this;
	    },

	    /**
	     * Is the container ready for rendered?
	     *
	     * @return {Boolean}
	     */
	    isReadyForRender: function isReadyForRender() {
	        return this.figureEl && !this.rendered && !this.isDisabled && !this.isRemoved;
	    },
	    renderProcessedContainerContent: function renderProcessedContainerContent() {
	        var figureOuterHTML = this.figureEl.el.outerHTML;
	        var select = this.el.dataset.select || this.el.dataset.selectInner;
	        var selectNodes = select ? this.$el : (0, _dom2.default)(this.el).find('[data-select], [data-select-inner]');

	        if (selectNodes.length === 0) {
	            return this.$el.append(figureOuterHTML);
	        }

	        selectNodes.each(function (index, node) {
	            var matchingNode;
	            var selector = node.dataset.select;
	            var inner = false;

	            if (!selector) {
	                selector = node.dataset.selectInner;
	                inner = true;
	            }
	            try {
	                matchingNode = (0, _dom2.default)(figureOuterHTML).find(selector)[0];
	            } catch (error) {
	                // Catch invalid selectors
	            }
	            if (matchingNode) {
	                node.innerHTML = inner ? matchingNode.innerHTML : matchingNode.outerHTML;
	            } else {
	                node.parentNode.removeChild(node);
	            }
	        });
	    },

	    /**
	     * Render/convert images to background images
	     *
	     * This will enable more control of the positioning and size of the image
	     *
	     * @return {void}
	     */
	    renderBgImages: function renderBgImages() {
	        var _this2 = this;

	        if (this.type !== 'image') {
	            return;
	        }

	        var $images = this.$el.find('img');

	        if (!$images.length) {
	            return;
	        }

	        $images.each(function (i, el) {
	            var src = el.getAttribute('data-src') || el.getAttribute('src');
	            var src2x = el.getAttribute('data-src-2x');
	            var width = parseInt(el.getAttribute('width'), 10);
	            var height = parseInt(el.getAttribute('height'), 10);
	            var ratio = height / width;

	            var css = {
	                'width': '100%',
	                'padding-bottom': ratio * 100 + '%',
	                'background-image': 'url(' + src + ')',
	                'background-repeat': 'no-repeat',
	                'background-size': 'cover',
	                'background-position': '50% 50%'
	            };

	            var attributes = {
	                'data-ratio': ratio,
	                'data-width': width,
	                'data-height': height,
	                'data-src': el.getAttribute('data-src')
	            };

	            if (src2x) {
	                attributes['data-src-2x'] = src2x;
	            }

	            var $bgImg = (0, _dom2.default)('<div>').attr(attributes).addClass(_classnames2.default.IMAGE).css(css);

	            (0, _dom2.default)(el).replaceWith($bgImg);

	            _this2._trackAssetProgress(src);
	        });
	    },

	    /**
	     * Discard container changes
	     *
	     * Will restore the original content in the container
	     *
	     * @return {void}
	     */
	    discard: function discard() {
	        console.log('DISCARD CONTAINER');
	        this.rendered = false;
	        this._lastState = {};

	        // SHould we replace instead? What if the container itself changed?
	        this.$el.empty();
	        // this.setElement(el);

	        this.render();
	        this.renderedWidgets = false;
	        this.renderWidgets();
	        this.unload();
	        this.load();
	    },
	    revertToOriginal: function revertToOriginal() {
	        this.$el.html(this._originalHtml);
	    },
	    revert: function revert() {
	        if (this.rendered) {
	            this.saveState();
	        }

	        this._originalHtml = false;
	        this.rendered = false;
	        this.renderedWidgets = false;
	        this.figure = null;
	        this.figureEl = null;
	        this.fullscreenEl = null;
	        this.fullscreenLoaded = false;

	        this.releaseAll();

	        this.$el.empty();
	        this.enable();
	    },

	    /**
	     * Is the Container still using the same figure el as before?
	     *
	     * This is to keep the "old" contents of the Container after a revert
	     *
	     * @return {Boolean}
	     */
	    isUsingSameFigureEl: function isUsingSameFigureEl() {
	        // `matchesAnySignature` is for backwards compatibility (restoring old layouts),
	        // as it was previously based on innerHTML instead of outerHTML

	        var match = this.figureEl.matchesAnySignature(this._lastState.figureElSignature);

	        return match || this.isUsingSimilarFigureEl();
	    },

	    /**
	     * Check if the current state resembles the last state
	     *
	     * This is useful in cases where the signature doesn't match,
	     * but it's "similar enough" for us to accept it as the same figure element.
	     *
	     * @return {Boolean}
	     */
	    isUsingSimilarFigureEl: function isUsingSimilarFigureEl() {
	        if (!this._lastState.html || this.matchingFigureElements.length !== 1) {
	            return false;
	        }

	        var $lastEl = (0, _dom2.default)(this._lastState.html);

	        // We never try to restore images we are unsure about
	        if ($lastEl.find('img').length) {
	            return false;
	        }

	        if ($lastEl[0].tagName !== this.figureEl.el.tagName) {
	            return false;
	        }

	        return true;
	    },

	    /**
	     * Save the current state
	     *
	     * This is to enable the container to restore itself to a former state
	     * Commonly done when a container is rendered, modified manually, reverted and then rendered again
	     *
	     * @param {[Array]} data optional data
	     * @return {void}
	     */
	    saveState: function saveState(data) {
	        this._lastState = _lodash2.default.extend({
	            html: this.el.innerHTML,
	            figureElSignature: this.figureElSignature,
	            preferFigureElSignature: this.preferFigureElSignature,
	            renderedWidgets: this.renderedWidgets
	        }, data || {});
	    },

	    /**
	     * Load the container
	     *
	     * Load any external assets and then show it
	     *
	     * @param {array} matchingWidgets
	     * @return {Container} self
	     */
	    load: function load() {
	        console.log('LOAD CONTAINER', this.el);
	        _when2.default.all(this._runWidgets(), this._doLoad);
	    },

	    /**
	     * Unload the container
	     *
	     * Hide it and unload any external assets
	     *
	     * @return {void}
	     */
	    unload: function unload() {
	        if (this.loaded === false) {
	            return;
	        }

	        this.loaded = false;
	        this.unloadElement(this.el);
	    },
	    unloadElement: function unloadElement(el) {
	        var $el = (0, _dom2.default)(el);

	        $el.addClass(_classnames2.default.CONTAINER_IS_UNLOADED);
	        $el.find('img[data-src]').each(function () {
	            // Some browsers don't like images with no src tag, so we use the smallest possible image instead
	            this.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
	        });
	    },

	    /**
	     * Add a deferred to track progress
	     *
	     * @param {Deferred} deferred
	     */
	    addDeferred: function addDeferred(deferred) {
	        this.deferreds.push(deferred);
	    },

	    /**
	     * Should stick to next?
	     *
	     * This is only used for inline containers
	     *
	     * @return {boolean}
	     */
	    shouldStickToNext: function shouldStickToNext() {
	        return false;
	    },
	    enterFullscreen: function enterFullscreen(targetEl) {
	        if (!this._supportsFullscreen) {
	            _util2.default.console.warn('This container does not support fullscreen');
	            this.layer || _util2.default.console.warn('  Missing layer');
	            this.fullscreenEl || _util2.default.console.warn('  Missing fullscreenEl');

	            return;
	        }

	        var trans = this.transition;

	        if (this.gestureStarted || trans.isRunning()) {
	            return false;
	        }

	        // Tell the layer what transition is active, so it can be reversed
	        this.layer.transition = trans;

	        targetEl && targetEl instanceof HTMLElement && trans.setTargetEl(targetEl);

	        trans.run();
	    },

	    /**
	     * Setup fullscreen support
	     *
	     * Requires both layers and a fullscreen element present
	     *
	     * @return {void}
	     */
	    _setupFullscreen: function _setupFullscreen() {
	        if (this._supportsFullscreen || !(this.fullscreenEl && this.layer && this.fullscreenLayer)) {
	            return;
	        }

	        this.transition = this.transition || this.layer.transitionTo(this.fullscreenLayer, _transition2.default.Fade);

	        this.$el.addClass(_classnames2.default.SUPPORTS_FULLSCREEN);

	        // TODO: the way Container, FullscreenContainer and FullscreenLayer
	        // work together is not optimal. The responsibilities are not clear enough.
	        this.listenTo(this.transition, {
	            'willAppear': this._fullscreenWillAppear,
	            'didAppear': this._fullscreenDidAppear,
	            'didDisappear': this._fullscreenDidDisappear
	        });

	        this.layer.transition = this.transition;

	        this.delegateEvents(_util2.default.touchScreen ? this.fullscreenEvents.touch : this.fullscreenEvents.pointer);

	        this._supportsFullscreen = true;
	    },
	    _setUniqueId: function _setUniqueId(id) {
	        if (!id) {
	            id = _lodash2.default.uniqueId('c');
	        }

	        this.id = id;
	        this.el.id = id;

	        return id;
	    },
	    renderWidgetMatch: function renderWidgetMatch(match) {
	        match.widget.render.call(match, this, match.el);

	        // The container is modified by a widget that doesn't want the result compiled
	        if (!match.widget.compile) {
	            this.isDirty = true;
	        }
	    },
	    renderWidgets: function renderWidgets() {
	        console.log('RENDER WIDGETS', this.decompiled);
	        if (this.renderedWidgets) {
	            return false;
	        }

	        _lodash2.default.each(this.matchingWidgets, function (match) {
	            console.log('WIDGET MATCH', this.decompiled, this.el, match);
	            // widget.render should only be called if we're not decompiling this page,
	            // or if we're decompiling the page and the widget tells us to not compile the results
	            if (!this.decompiled || this.decompiled && !match.widget.compile) {
	                this.renderWidgetMatch(match);
	            }
	        }, this);

	        this.renderedWidgets = true;
	    },

	    /**
	     * Run all widgets
	     *
	     * @param {array} widgets
	     * @return {void}
	     */
	    _runWidgets: function _runWidgets() {
	        var deferred;
	        var deferreds = [];

	        _lodash2.default.each(this.matchingWidgets, function (match) {
	            deferred = _when2.default.defer();

	            // We have a widget, but its result should NOT be compiled
	            // Since we don't actually know if the widget alters the DOM,
	            // we'll have to flag the container as dirty to revert the content
	            if (!match.widget.compile) {
	                this.isDirty = true;
	            }

	            match.widget.run.call(match, deferred.resolve);
	            deferreds.push(deferred);
	        }, this);

	        return deferreds;
	    },
	    _doLoad: function _doLoad() {
	        var _this3 = this;

	        var dpr = Math.min(this.options.pixelRatio, 2);
	        var srcAttr;

	        if (this.loaded) {
	            return;
	        }

	        if (!this.$el.hasClass(_classnames2.default.ALLOW_OVERFLOW)) {
	            // TODO: This may be a little early
	            // What if this could run after the image has loaded and trigger a reflow?
	            this._fitBoundaries();
	        }

	        // TODO: Should assets have its own object?
	        this.$assets = this.$el.find('img[data-src]');
	        srcAttr = 'data-src' + (dpr > 1 ? '-' + dpr + 'x' : '');
	        _lodash2.default.each(this.$assets, function (asset) {
	            var src = asset.getAttribute(srcAttr) || asset.getAttribute('data-src');

	            _this3._trackAssetProgress(src || asset.getAttribute('src'), asset);

	            if (src) {
	                asset.src = src;
	            }
	        });

	        _when2.default.any(this.deferreds, this._loadReady);
	        _when2.default.all(this.deferreds, this._loadComplete);

	        this.loaded = true;

	        return this;
	    },
	    _fullscreenWillAppear: function _fullscreenWillAppear(transition, done) {
	        this.trigger('fullscreenWillAppear', transition, done);
	    },
	    _fullscreenDidAppear: function _fullscreenDidAppear(transition) {
	        this.trigger('fullscreenDidAppear', transition);
	    },
	    _fullscreenDidDisappear: function _fullscreenDidDisappear(transition) {
	        this.trigger('fullscreenDidDisappear', this);
	        _hub2.default.trigger('fullscreenDidDisappear', this);
	    },

	    /**
	     * Container is ready to be loaded/shown
	     *
	     * @return {void}
	     * @private
	     */
	    _loadReady: function _loadReady() {
	        this.$el.removeClass(_classnames2.default.CONTAINER_IS_UNLOADED);
	    },

	    /**
	     * Container is 100% loaded
	     *
	     * @return {void}
	     * @private
	     */
	    _loadComplete: function _loadComplete() {
	        this.trigger('loadComplete');
	    },

	    /**
	     * Track progress of an asset
	     *
	     * @param {HTMLElement} el
	     * @return {void}
	     * @private
	     */
	    _trackAssetProgress: function _trackAssetProgress(url, el) {
	        var _this4 = this;

	        var deferred = _when2.default.defer();

	        this.addDeferred(deferred);

	        if (Container.loadedAssets.indexOf(url) !== -1) {
	            deferred.resolve({}, el);
	        } else {
	            if (!el) {
	                el = new Image();
	                el.src = url;
	            }

	            el.addEventListener('load', function (event) {
	                Container.loadedAssets.push(url);
	                deferred.resolve(event, event.currentTarget);
	            });

	            el.addEventListener('error', function (event) {
	                deferred.resolve(event, event.currentTarget);
	                _hub2.default.trigger('assetLoadError', _this4, url);
	            });
	        }
	    },

	    /**
	     * Fit boundaries
	     *
	     * Makes sure no elements exceed the boundaries of the container
	     *
	     * @return {void}
	     * @private
	     */
	    _fitBoundaries: function _fitBoundaries() {
	        var images = [];
	        var that = this;

	        // No need to check this if the Container was restored from a compiled object
	        // Also skip if the container is responsive
	        if (this.decompiled || this.isResponsive) {
	            return;
	        }

	        // Separate fetching and applying of styles for performance

	        this.$el.find('img').each(function () {
	            var width = this.clientWidth;
	            var height = this.clientHeight;
	            var ratio;

	            if (width > that.metrics.width) {
	                ratio = that.metrics.width / width;
	                images.push({
	                    el: this,
	                    css: {
	                        height: height * ratio + 'px',
	                        width: that.metrics.width + 'px'
	                    }
	                });
	            }
	        });

	        // Batch
	        _lodash2.default.each(images, function (image) {
	            (0, _dom2.default)(image.el).css(image.css);
	        });
	    },

	    // Events

	    onTouchStart: function onTouchStart(event) {
	        event = event.originalEvent || event;

	        var point = event.touches[0];

	        this._touchStartX = point.pageX;
	        this._touchStartY = point.pageY;
	        this._touchMoveX = point.pageX;
	        this._touchMoveY = point.pageY;
	    },
	    onTouchMove: function onTouchMove(event) {
	        event = event.originalEvent || event;

	        var point = event.touches[0];

	        this._touchMoveX = point.pageX;
	        this._touchMoveY = point.pageY;
	    },
	    onTouchEnd: function onTouchEnd(event) {
	        var xdelta, ydelta;

	        xdelta = Math.abs(this._touchStartX - this._touchMoveX);
	        ydelta = Math.abs(this._touchStartY - this._touchMoveY);

	        // Don't prevent default event when the user moves his finger on the image.
	        if (xdelta < 7 && ydelta < 7) {
	            event.preventDefault();
	        }
	    },
	    onMouseDown: function onMouseDown(event) {
	        this.mouseDownX = event.pageX;
	        this.mouseDownY = event.pageY;
	        this.mouseDownTime = Date.now();
	    },
	    onTap: function onTap(event) {
	        this.enterFullscreen(event.currentTarget);
	    },
	    onClick: function onClick(event) {
	        // Don't trigger fullscreen if the user waits too long
	        // or move the cursor while holding down the mouse

	        var diffX = Math.abs(event.pageX - this.mouseDownX);
	        var diffY = Math.abs(event.pageY - this.mouseDownY);
	        var diffTime = Date.now() - this.mouseDownTime;

	        if (diffX > 5 || diffY > 5 || diffTime > 1500) {
	            return;
	        }

	        this.enterFullscreen(event.currentTarget);
	    },
	    onGestureStart: function onGestureStart(event) {
	        var trans = this.transition;

	        if (this.gestureStarted || trans.isRunning()) {
	            return false;
	        }

	        this.gestureStarted = true;
	        trans.setTargetEl(event.currentTarget);
	        this.startTransform(event);
	    },
	    onGestureChange: function onGestureChange(event) {
	        var trans = this.transition;

	        if (trans.isRunning()) {
	            return false;
	        }

	        this.transformEventTarget(event);
	    },
	    onGestureEnd: function onGestureEnd(event) {
	        var trans = this.transition;

	        if (trans.isRunning()) {
	            return false;
	        }

	        trans.run();
	        this.gestureStarted = false;
	    }
	});

	exports.default = Container;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _FigureElement = __webpack_require__(45);

	var _FigureElement2 = _interopRequireDefault(_FigureElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var memoizedGetExpressionForField = _lodash2.default.memoize(getExpressionForField);
	var memoizedFindFieldMapMatch = _lodash2.default.memoize(findFieldMapMatch, function (field, elementFields) {
	    return [field, elementFields];
	});

	var Figure = _BaseView2.default.extend({
	    initialize: function initialize() {
	        var _this = this;

	        this.elements = _lodash2.default.map(this.$el.children('[data-map]'), function (el, i) {
	            var fe = new _FigureElement2.default({
	                el: el,
	                figure: _this
	            });

	            // This prevents the signature of the element from changing,
	            // even though if the content in it changes
	            fe.lockSignature();

	            return fe;
	        });
	    },
	    setElement: function setElement(el) {
	        Figure.__super__.setElement.call(this, el);
	        this.isOptional = this.$el.hasClass(_classnames2.default.IS_OPTIONAL);
	    },

	    /**
	     * Get the element mapped to field(s)
	     *
	     * @param {array} fields array of fields
	     * @return {HTMLElement} the matching element
	     */
	    getElementMappedToField: function getElementMappedToField(fields) {
	        var element = false;
	        var potentialElement = false;

	        _lodash2.default.each(getExpressionsForFields(fields), function (field) {
	            element = _lodash2.default.find(this.elements, function (element) {
	                return memoizedFindFieldMapMatch(field, element.fieldMap);
	            });

	            if (!element) {
	                return;
	            }

	            if (element.noScore) {
	                // We have a match, but it's a no score element
	                // Just store the reference and continue looking for a better match
	                potentialElement = potentialElement || element;
	                element = false;

	                return;
	            }

	            // break out of _.each loop
	            return false;
	        }, this);

	        return element || potentialElement;
	    },

	    /**
	     * Get all elements matching the field map
	     *
	     * @param {array} fields array of fields
	     * @return {Array} list of matching elements
	     */
	    getElementsMappedToField: function getElementsMappedToField(fields) {
	        var _this2 = this;

	        var fieldElements = _lodash2.default.map(getExpressionsForFields(fields), function (field) {
	            return _lodash2.default.filter(_this2.elements, function (element) {
	                return memoizedFindFieldMapMatch(field, element.fieldMap);
	            });
	        });

	        var elements = _lodash2.default.flatten(fieldElements);

	        elements = elements.sort(function (a, b) {
	            if (a.noScore === b.noScore) {
	                return 0;
	            }

	            return b.noScore ? -1 : 1;
	        });

	        return elements;
	    }
	});

	function getExpressionsForFields(fields) {
	    return _lodash2.default.map(fields, memoizedGetExpressionForField);
	}

	function getExpressionForField(field) {
	    if (field.indexOf('*') === -1) {
	        return new RegExp('^' + field + '$');
	    }

	    var expression = field.replace(/([\-\:])/g, '\\$1');

	    expression = expression.replace(/(^|[^\\W\*])\*(\\|$)/g, '$1[^\\W]+$2');
	    expression = expression.replace(/(^|[^\\W])\*\*(\\|$)/g, '$1(.*)?$2');

	    return new RegExp('^' + expression + '$');
	}

	function findFieldMapMatch(field, elementFields) {
	    return _lodash2.default.find(elementFields, function (elementField) {
	        return elementField.match(field);
	    });
	}

	exports.default = Figure;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * FigureElement
	 *
	 * An element contained inside a Figure
	 * This is put inside a matching Container
	 *
	 * @type {Object}
	 */
	var FigureElement = _BaseView2.default.extend({
	    initialize: function initialize(options) {
	        this.figure = options.figure;
	    },
	    setElement: function setElement(el) {
	        FigureElement.__super__.setElement.call(this, el);
	        this.noScore = this.$el.hasClass(_classnames2.default.NO_SCORE);
	        this.fieldMap = _util2.default.dom.getFieldMap(this.el);
	    }
	});

	exports.default = FigureElement;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _LayoutElement = __webpack_require__(33);

	var _LayoutElement2 = _interopRequireDefault(_LayoutElement);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Block = _BaseView2.default.extend();

	_lodash2.default.extend(Block.prototype, _LayoutElement2.default, {
	    tagName: 'p',

	    isInline: true,

	    initialize: function initialize(data) {
	        data = data || {};
	        this.isOverflow = false;
	        this.isDirty = false;
	        this.originalMetrics = null;

	        if (!data.metrics) {
	            this.defaultMetrics();
	        }
	    },
	    render: function render() {
	        if (this.isRendered) {
	            return this;
	        }

	        if (this.isFirst) {
	            this.$el.addClass(_classnames2.default.IS_FIRST_BLOCK);
	        }

	        if (this.isLast) {
	            this.$el.addClass(_classnames2.default.IS_LAST_BLOCK);
	        }

	        if (this.isOverflow) {
	            var $el = (0, _dom2.default)('<div style="overflow:hidden;padding:0;"></div>');

	            $el.css('margin-bottom', this.metrics.marginBottom + 'px').addClass(_classnames2.default.IS_SPLITTABLE).addClass(_classnames2.default.IS_NON_REARRANGEABLE).append(this.el);

	            this.$el.css('margin-bottom', '0px');

	            // Dangerous...
	            this.setElement($el[0]);
	            this.isDirty = true;
	        }

	        this.isRendered = true;

	        return this;
	    },

	    /**
	     * Clone the block
	     *
	     * Creates a new Block pointed to a clone of this.el
	     *
	     * @return {Block}
	     */
	    clone: function clone() {
	        var block = new Block({
	            el: this.el.cloneNode(true)
	        });
	        block.clonedFrom = this;
	        block.metrics = _lodash2.default.extend({}, this.metrics);
	        block.isLast = this.isLast;

	        if (this.isDirty) {
	            block.$el.removeAttr('style');
	        }

	        return block;
	    },

	    /**
	     * Revert the block back to original state
	     *
	     * @return {void}
	     */
	    revert: function revert() {
	        if (this.isDirty) {
	            this.isOverflow || this.el.style.removeProperty('overflow');
	            this.el.style.removeProperty('height');

	            this.isDirty = false;
	        }
	    },

	    /**
	     * Is this block splittable?
	     *
	     * Can this block be split into pieces
	     * and distributed across regions?
	     *
	     * @return {boolean}
	     */
	    isSplittable: function isSplittable() {
	        if (this.$el.hasClass(_classnames2.default.IS_NON_SPLITTABLE)) {
	            return false;
	        }

	        return this.$el.hasClass(_classnames2.default.IS_SPLITTABLE) || ['P', 'UL', 'OL'].indexOf(this.el.tagName) !== -1;
	    },

	    /**
	     * Is this block rearrangeable?
	     *
	     * A factbox or a quote is typically not that context sensitive,
	     * and can be moved a bit for layout purposes.
	     *
	     * A paragraph or a sub title is highly context sensitive,
	     * and moving it would break the article.
	     *
	     * @return {boolean}
	     */
	    isRearrangeable: function isRearrangeable() {
	        if (this.$el.hasClass(_classnames2.default.IS_NON_REARRANGEABLE)) {
	            return false;
	        }

	        return this.$el.hasClass(_classnames2.default.IS_REARRANGEABLE) || ['DIV'].indexOf(this.el.tagName) !== -1;
	    },
	    shouldStickToNext: function shouldStickToNext() {
	        return this.$el.hasClass(_classnames2.default.STICK_TO_NEXT) || ['H1', 'H2', 'H3'].indexOf(this.el.tagName) !== -1;
	    },

	    /**
	     * Get a new block that corresponds to the overflow
	     *
	     * @param {number} maxHeight max height the original block can be
	     * @return {Block} an offset copy of this
	     */
	    getOverflowBlock: function getOverflowBlock(maxHeight) {
	        var newHeight = 0;
	        var snapLineHeight, overflowBlock;

	        overflowBlock = this.clone();

	        // This is to prevent the block to wrap another wrapper
	        if (this.isOverflow) {
	            overflowBlock.setElement(overflowBlock.$el.children().first());
	        }

	        overflowBlock._isNormalized = false;
	        overflowBlock.isOverflow = true;
	        overflowBlock.overflowMarginTop = this.isOverflow ? this.metrics.overflowMarginTop : 0;

	        snapLineHeight = maxHeight % this.metrics.lineHeight;
	        newHeight = maxHeight - snapLineHeight;

	        this.$el.css({
	            'overflow': 'hidden',
	            'height': newHeight + 'px'
	        });
	        this.isDirty = true;

	        var overflowMarginTop = overflowBlock.overflowMarginTop;

	        overflowBlock.$el.css('margin-top', overflowMarginTop - newHeight + 'px');
	        overflowBlock.metrics.height -= newHeight;
	        overflowBlock.metrics.outerHeight -= newHeight;
	        overflowBlock.metrics.overflowMarginTop = overflowMarginTop - newHeight;

	        return overflowBlock;
	    }
	});

	exports.default = Block;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _LayoutElement = __webpack_require__(33);

	var _LayoutElement2 = _interopRequireDefault(_LayoutElement);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _hub = __webpack_require__(8);

	var _hub2 = _interopRequireDefault(_hub);

	var _when = __webpack_require__(40);

	var _when2 = _interopRequireDefault(_when);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FullscreenContainer = _BaseView2.default.extend(); /**
	                                                        * Fullscreen Container
	                                                        *
	                                                        * This is used to show figure elements in fullscreen
	                                                        */

	_lodash2.default.extend(FullscreenContainer.prototype, _LayoutElement2.default, {
	    initialize: function initialize(options) {
	        options = this.options = _lodash2.default.extend({}, options || {});
	        this.layer = this.options.layer || null;
	    },
	    tearDown: function tearDown() {
	        this.stopListening();
	        this.$el.remove();
	    },
	    subscribeToContainer: function subscribeToContainer(container) {
	        var fullscreenEl;

	        if (!container.fullscreenEl && container.figure) {
	            fullscreenEl = this.getFullscreenElement(container.figure);
	            fullscreenEl && container.setFullscreenEl(fullscreenEl);
	        }

	        // TODO: Does this make it impossible for GC to remove the container?
	        this.listenTo(container, {
	            'fullscreenWillAppear': function fullscreenWillAppear(transition, done) {
	                this._loadMathchingWidgetsForContainer(container, done);
	            }
	        });
	    },
	    getFullscreenElement: function getFullscreenElement(figure) {
	        var fsMap = _util2.default.dom.getFieldMap(this.el);
	        var fullscreenEl = figure.getElementMappedToField(fsMap);

	        if (!fullscreenEl) {
	            return null;
	        }

	        return fullscreenEl.el.cloneNode(true);
	    },

	    /**
	     * Load container into fullscreen mode
	     *
	     * @param {Function} done call this to trigger complete
	     * @return {void}
	     * @private
	     */
	    loadContainer: function loadContainer(container, done) {
	        if (!this.layer) {
	            _util2.default.console.warn('No fullscreen layer found');

	            return;
	        }

	        var $images;
	        var allDone = function allDone() {
	            container.fullscreenLoaded = true;
	            done();
	        };

	        this.$el.empty().addClass(_classnames2.default.IS_VISIBLE).append(container.fullscreenEl);

	        this.layer.renderFullscreenContainer(this);

	        if (container.fullscreenLoaded) {
	            return allDone();
	        }

	        // TODO: this needs improvements
	        // Maybe this should be moved to another function?
	        // First render the container, then call the widget function, and then load all images?
	        $images = this.layer.$el.find('img[data-src]');
	        $images.length || allDone();

	        $images.each(function () {
	            this.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
	            this.addEventListener('load', allDone);
	            this.src = this.getAttribute('data-src');
	        });
	    },
	    exitFullscreen: function exitFullscreen() {
	        this.layer.exitFullscreen();
	    },
	    _loadMathchingWidgetsForContainer: function _loadMathchingWidgetsForContainer(container, done) {
	        var deferreds = [];
	        var allDone;

	        allDone = function allDone() {
	            _hub2.default.trigger('fullscreenWillAppear', container);
	            done();
	        };

	        if (!container.matchingWidgets || !container.matchingWidgets.length) {
	            return this.loadContainer(container, allDone);
	        }

	        deferreds.push(_when2.default.defer());
	        this.loadContainer(container, deferreds[0].resolve);

	        _lodash2.default.each(container.matchingWidgets, function (match) {
	            var deferred = _when2.default.defer();

	            deferreds.push(deferred);
	            match.widget.fullscreen.call(match, this, deferred.resolve);
	        }, this);

	        _when2.default.all(deferreds, allDone);
	    }
	});

	exports.default = FullscreenContainer;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _when = __webpack_require__(40);

	var _when2 = _interopRequireDefault(_when);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getOptionsIfExists = _lodash2.default.memoize(function (optionsString) {
	    // data-respond="start: 100px; end: 900px; interval: 50px; watch: true;"

	    if (!optionsString) {
	        return {};
	    }

	    var optionProps = optionsString.replace(/\s+/g, '').split(';');
	    var options = {};

	    _lodash2.default.each(optionProps, function (option) {
	        var property = option.split(':');
	        var key = property[0];
	        var value = parseInt(property[1], 10);

	        if (isNaN(value)) {
	            value = property[1] !== 'false';
	        }

	        options[key] = value;
	    });

	    return options;
	});

	var SizeDetector = _BaseView2.default.extend();

	_lodash2.default.extend(SizeDetector.prototype, {

	    tagName: 'object',

	    className: _classnames2.default.SIZE_DETECTOR,

	    initialize: function initialize(options) {
	        options = this.options = _lodash2.default.extend({
	            start: 300,
	            end: 1200,
	            interval: 50,
	            refreshRate: 50,
	            watch: true,
	            target: null
	        }, options || {});

	        this.$target = (0, _dom2.default)(this.options.target);

	        _lodash2.default.extend(this.options, getOptionsIfExists(this.$target.attr('data-respond')));

	        _lodash2.default.bindAll(this, '_onResize', '_setupListenerForView');

	        this._onResize = _lodash2.default.throttle(this._onResize, options.refreshRate);

	        this._deferred = _when2.default.defer();
	        this.isReady = this._deferred.promise;
	    },
	    start: function start() {
	        this._setupListenerForView();
	    },
	    tearDown: function tearDown() {
	        var doc = this.el.contentDocument;

	        if (doc && doc.defaultView) {
	            doc.defaultView.removeEventListener('resize', this._onResize);
	        }

	        this.$el.remove();
	    },
	    render: function render() {
	        if (!this.options.watch) {
	            this._applyClassNamesForWidth(this.$target.width());
	            this._deferred.resolve();
	            return this;
	        }

	        var $el = this.$target.find('.' + _classnames2.default.SIZE_DETECTOR);

	        if ($el.length) {
	            this.setElement($el);
	            this.start();

	            return this;
	        }

	        this.$el.css({
	            display: 'block',
	            position: 'absolute',
	            top: 0,
	            right: 0,
	            bottom: 0,
	            left: 0,
	            // visibility: 'hidden',
	            width: '100%',
	            'pointer-events': 'none',
	            'z-index': -2147483648
	        });

	        this.el.type = 'text/html';
	        this.el.data = 'about:blank';

	        this.start();

	        this.$target.append(this.$el);

	        return this;
	    },
	    getClassNamesForWidth: function getClassNamesForWidth(width) {
	        var options = this.options;
	        var start = options.start;
	        var end = options.end;
	        var interval = options.interval;
	        var classes = [];

	        for (var i = start; i <= end; i += interval) {
	            if (i < width) {
	                classes.push('alf-gt' + i);
	            } else {
	                classes.push('alf-lt' + i);
	            }
	        }

	        return classes;
	    },
	    _onResize: function _onResize(event) {
	        var width = event.target.innerWidth;

	        this._applyClassNamesForWidth(width);
	    },
	    _setupListenerForViewOnLoad: function _setupListenerForViewOnLoad() {
	        this.$el.on('load', _lodash2.default.bind(function () {
	            setTimeout(this._setupListenerForView, 0);
	            this.$el.off('load');
	        }, this));
	    },
	    _setupListenerForView: function _setupListenerForView() {
	        if (!this.el.contentDocument) {
	            this._setupListenerForViewOnLoad();
	            return;
	        }

	        var view = this.el.contentDocument.defaultView;

	        view.addEventListener('resize', this._onResize);

	        this._applyClassNamesForWidth(view.innerWidth);
	        this._deferred.resolve();
	    },
	    _applyClassNamesForWidth: function _applyClassNamesForWidth(width) {
	        var classNames = this.getClassNamesForWidth(width);

	        if (this.options.target) {
	            var target = (0, _dom2.default)(this.options.target).get(0);
	            var targetClassNames = target.className;

	            targetClassNames = _dom2.default.trim(targetClassNames.replace(/alf\-(g|l)t(\d+)\s?/g, ''));
	            targetClassNames += ' ' + classNames.join(' ');

	            target.className = targetClassNames;
	        }

	        this.trigger('resize', width);
	    }
	});

	exports.default = SizeDetector;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _jquery = __webpack_require__(5);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Grid
	 *
	 * Absolute positions columns and cells based on class names
	 *
	 * Usage:
	 *   Class names for the wrapper (this.el)
	 *     cols-x: total number of columns in the grid
	 *
	 *   Class names for cells:
	 *     col-x: start at column x
	 *     colspan-x: span across x columns
	 *
	 * @author Peter Rudolfsen <peter@aptoma.com>
	 */
	var Grid = function Grid(options) {
	    var styles;

	    this.options = _jquery2.default.extend({
	        prefix: ''
	    }, options);

	    this.el = options.el;

	    // The total height each column has available
	    this.height = options.height || (0, _jquery2.default)(this.el).height();

	    // Define lineHeight if you want to align columns to a "vertical grid"
	    this.lineHeight = options.lineHeight || 0;

	    // Make sure to respect the padding
	    styles = window.getComputedStyle(this.el, null);
	    this.paddingTop = parseInt(styles.getPropertyValue('padding-top'), 10);
	    this.paddingBottom = parseInt(styles.getPropertyValue('padding-bottom'), 10);
	    this.height -= this.paddingTop + this.paddingBottom;

	    this._position();
	};

	/**
	 * Position all elements in the grid based on the class names
	 *
	 * Currently does not support multiple flexing elements in a single column
	 * (flex = automatically adjust the height to the available space)
	 *
	 * @return {void}
	 * @private
	 */
	Grid.prototype._position = function () {
	    var that = this;
	    var columns = [];
	    var numCols = this.el.className.match(/cols\-([0-9]+)/);

	    if (!numCols) {
	        throw new Error('Failed to find number of columns');
	    }

	    // Initialize each column
	    numCols = parseInt(numCols[1], 10);
	    for (var i = 0; i < numCols; i++) {
	        columns[i] = {
	            remainingHeight: this.height,
	            cells: []
	        };
	    }

	    (0, _jquery2.default)(this.el).find('[class*="col-"]').each(function () {
	        var col = parseInt(this.className.match(/col\-([0-9]+)/)[1], 10) - 1;
	        var span = this.className.match(/colspan\-([0-9]+)/);
	        var cell = that._createCellFromEl(this);

	        span = span ? parseInt(span[1], 10) : 1;

	        if ((0, _jquery2.default)(this).css('display') === 'none') {
	            return;
	        }

	        // Cells that span across multiple columns are added to
	        // the array for each column it spans across
	        for (var i = col; i < col + span; i++) {
	            columns[i].cells.push(cell);
	        }
	    });

	    this._calcMetrics(columns);

	    _jquery2.default.each(columns, function (index, column) {
	        that._positionColumn(index, column);
	    });
	};

	/**
	 * Create a cell object from an HTML element
	 *
	 * Contains all required properties to calculate the grid
	 *
	 * @param {HTMLElement} el
	 * @return {Object}
	 */
	Grid.prototype._createCellFromEl = function (el) {
	    var flex = (0, _jquery2.default)(el).hasClass(this._class('flex'));

	    return {
	        el: el,
	        flex: flex,
	        height: 0,
	        innerHeight: 0,
	        top: 0
	    };
	};

	// jshint maxcomplexity:false
	// jshint maxstatements:32
	Grid.prototype._calcMetrics = function (columns) {
	    var colTop, colBottom, numColumns, numCells, cell, $cell, i, j, styles, marginBottom;

	    colTop = this._class('col-top');
	    colBottom = this._class('col-bottom');

	    numColumns = columns.length;

	    for (i = 0; i < numColumns; i++) {
	        numCells = columns[i].cells.length;

	        for (j = 0; j < numCells; j++) {
	            cell = columns[i].cells[j];
	            $cell = (0, _jquery2.default)(cell.el);
	            $cell.removeClass(colTop + ' ' + colBottom);

	            if (j === 0) {
	                cell.isTop = true;
	                $cell.addClass(colTop);
	            }

	            if (j === numCells - 1) {
	                cell.isBottom = true;
	                $cell.addClass(colBottom);
	            }
	        }
	    }

	    // Batch calculatation for DOM performance
	    for (i = 0; i < numColumns; i++) {
	        numCells = columns[i].cells.length;

	        for (j = 0; j < numCells; j++) {
	            cell = columns[i].cells[j];
	            $cell = (0, _jquery2.default)(cell.el);

	            cell.height = cell.flex ? 0 : $cell.outerHeight();

	            // If marginTop on the top element does not align to the vertical grid,
	            // it'll mess up the relationship between the different columns.
	            // This is required to make sure that columns with different number of rows still align properly
	            if (cell.isTop) {
	                styles = window.getComputedStyle(cell.el, null);
	                columns[i].marginTop = parseInt(styles.getPropertyValue('margin-top'), 10);
	                columns[i].marginTopOffset = columns[i].marginTop % this.lineHeight;

	                if (!cell.flex) {
	                    cell.innerHeight = $cell.height();
	                    if (cell.innerHeight === 0) {
	                        marginBottom = parseInt(styles.getPropertyValue('margin-bottom'), 10);
	                        cell.height -= marginBottom;
	                    }
	                }
	            }

	            columns[i].remainingHeight -= cell.height;
	        }
	    }
	};

	/**
	 * Position a single column
	 *
	 * Helper method for _position
	 *
	 * @param {number} index
	 * @param {HTMLElement} column
	 * @return {void}
	 * @private
	 */
	Grid.prototype._positionColumn = function (index, column) {
	    var that = this;
	    var top = this.paddingTop;

	    _jquery2.default.each(column.cells, function (index, cell) {
	        var $cell = (0, _jquery2.default)(cell.el);
	        var css = {};
	        var rest = 0;

	        // only snap to the vertical grid if it's not the top cell
	        // AND if it's a flexing cell
	        if (that.lineHeight && !cell.isTop && !(cell.isBottom && !cell.flex)) {
	            rest = (top - column.marginTopOffset - that.paddingTop) % that.lineHeight;

	            if (rest !== 0) {
	                rest = that.lineHeight - rest;
	                column.remainingHeight -= rest;
	                top += rest;
	            }
	        }

	        // Push it down to the lowest position so it doesn't overlap with any of the cells above it
	        if (!cell.isTop || cell.top < top) {
	            cell.top = top;
	        }

	        css.top = cell.top + 'px';

	        if (cell.flex) {
	            var margin = parseInt($cell.css('margin-bottom'), 10) + parseInt($cell.css('margin-top'), 10);

	            cell.height = column.remainingHeight;
	            css.height = (cell.height > margin ? cell.height - margin : 0) + 'px';
	        }

	        $cell.css(css);
	        top += cell.height;
	    });
	};

	/**
	 * Prefix a class name
	 *
	 * @param {string} string
	 * @return {string} prefixed string
	 */
	Grid.prototype._class = function (string) {
	    return this.options.prefix + string;
	};

	if (typeof window !== 'undefined') {
	    _jquery2.default.fn.grid = function (options) {
	        options = options || {};

	        options.el = this[0];
	        return new Grid(options);
	    };
	}

	exports.default = Grid;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ContainerCompiler = _Base2.default.extend({
	    initialize: function initialize(container) {
	        this.container = container;
	        this.compiled = {};
	    },

	    compile: function compile() {
	        var container = this.container;

	        // Isn't this too early to fetch the HTML?
	        // If widgets set compile to false the result of the widget wont be reverted
	        var $el = (0, _dom2.default)(container.el.outerHTML);

	        if (container.isDirty) {
	            container.revertToOriginal();
	        }

	        container.unloadElement($el);

	        this.compiled = {
	            loaded: false,
	            metrics: container.metrics,
	            html: $el[0].outerHTML
	        };

	        container.fullscreenEl && (this.compiled.fullscreenEl = container.fullscreenEl.outerHTML);

	        return this.compiled;
	    },

	    /**
	     * Decompile the container
	     *
	     * @param {Object} object
	     * @return {void}
	     */
	    decompile: function decompile(object) {
	        var container = this.container;

	        container.decompiled = true;
	        _lodash2.default.extend(container, object);
	        container.fullscreenEl && container.setFullscreenEl((0, _dom2.default)(container.fullscreenEl).get(0));
	    }
	});

	exports.default = ContainerCompiler;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Template = __webpack_require__(52);

	var _Template2 = _interopRequireDefault(_Template);

	var _article = __webpack_require__(53);

	var _article2 = _interopRequireDefault(_article);

	var _page = __webpack_require__(54);

	var _page2 = _interopRequireDefault(_page);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	var _PageTemplate = __webpack_require__(39);

	var _PageTemplate2 = _interopRequireDefault(_PageTemplate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getFilter(callback, name) {
	    return { callback: callback, name: name };
	}

	var TemplateManager = {
	    /**
	     * Template filters for articles and pages
	     */
	    filters: {
	        article: _lodash2.default.map(_article2.default, getFilter),
	        page: _lodash2.default.map(_page2.default, getFilter)
	    },

	    /**
	     * Add an article filter
	     *
	     * Article filters are run on the article, and takes a more general
	     * approach to filter than Page filters.
	     * Filtering based on media-queries, article types, categories, etc
	     * are examples of typical article filters
	     *
	     * These are run only once
	     *
	     * @param {Function} callback
	     */
	    addArticleFilter: function addArticleFilter(callback, name) {
	        this.filters.article.push({
	            callback: callback,
	            name: name || 'articlefilter'
	        });
	    },

	    /**
	     * Add a Page filter
	     *
	     * Page filters are run on each page in an article.
	     * Filters based on pagenum, or (FILL IN GOOD EXAMPLE HERE)
	     *
	     * @param {Function} callback
	     */
	    addPageFilter: function addPageFilter(callback, name) {
	        this.filters.page.push({
	            callback: callback,
	            name: name || 'pagefilter'
	        });
	    },

	    /**
	     * Get the best template for the page
	     *
	     * Ideas:
	     * The page should filter templates based on the actual content it is given.
	     * A template with matching containers should score higher than one without.
	     * If there are no figures on the page, only templates with no containers should match and so on
	     * It could also do a rough comparison on the height of the content (the blocks)
	     * and the total height of the regions in the template
	     * The important thing here is to do NO DOM MANIPULATION! Otherwise it'll kill performance.
	     *
	     * NB! Incomplete
	     *
	     * @param {Page} page
	     * @param {array} templates eligible templates
	     * @return {Template} the best matching Template for the Page
	     */
	    getBestTemplateForPage: function getBestTemplateForPage(page, templates) {
	        var map, score;
	        var best = {
	            score: -Infinity,
	            template: null,
	            containerMap: null
	        };

	        // console.info('$$$$ NEW PAGE ', page, '$$$$$');
	        // console.log('FIGURES', page.figures.map(function (fig) { return fig.el; }));
	        _lodash2.default.each(templates, function (template) {
	            map = template.getContainerMap(page.content);
	            score = template.score(page, map);

	            if (score > best.score || score === best.score && Math.random() > 0.5) {
	                best.score = score;
	                best.template = template;
	                best.containerMap = map;
	            }
	        });

	        // console.info('$$$$ DONE WITH PAGE $$$$$');

	        return best;
	    },

	    /**
	     * Get eligible templates for an article
	     *
	     * Ideas:
	     * The article could filter out templates based on the media query (if one exists) on the template.
	     * Maybe the article has some sort of parent template (category of some sorts) that
	     * limit the templates that can be used. E.g. an article with a gallery/slideshow have different templates
	     * than a regular newsstory or editorial comment. ++
	     *
	     * @param {Article} article
	     * @param {array} templates
	     * @return {array}
	     */
	    getEligibleTemplatesForArticle: function getEligibleTemplatesForArticle(article, templates) {
	        return this._filterTemplates('article', article, templates);
	    },
	    getEligibleTemplatesForPage: function getEligibleTemplatesForPage(page, templates) {
	        return this._filterTemplates('page', page, templates);
	    },
	    getScoredTemplatesForPage: function getScoredTemplatesForPage(page, templates) {
	        return _lodash2.default.map(this.getEligibleTemplatesForPage(page, templates), function (template) {
	            return {
	                template: template,
	                score: template.score(page)
	            };
	        });
	    },

	    /**
	     * Get an actual usable and modifiable Template,
	     * that's meant to be used with a single Page
	     *
	     * @return {Template}
	     */
	    getPageTemplateFromTemplate: function getPageTemplateFromTemplate(template, data) {
	        return new _PageTemplate2.default(_lodash2.default.extend(data || {}, {
	            el: template.el.cloneNode(true)
	        }));
	    },
	    getTemplateFromPageTemplate: function getTemplateFromPageTemplate(pageTemplate, data) {
	        var template = new _Template2.default(_lodash2.default.extend(data || {}, {
	            el: pageTemplate.el.cloneNode(true)
	        }));

	        // Revert all regions and containers to the proper state
	        // so they don't contain any content

	        _lodash2.default.each(template.regions, function (region, i) {
	            region.revert(pageTemplate.regions[i]._originalHtml);
	        });

	        _lodash2.default.invoke(template.containers, 'revert');

	        return template;
	    },

	    /**
	     * Filter templates for an object
	     *
	     * @param {string} type
	     * @param {Article|Page} object
	     * @param {Array} templates array of template objects
	     * @return {Array}
	     */
	    _filterTemplates: function _filterTemplates(type, object, templates) {
	        if (object.pages) {
	            _util2.default.console.groupCollapsed('** Filtering templates for article');
	        } else {
	            _util2.default.console.groupCollapsed('** Filtering templates for page', object.pageNum + 1);
	        }

	        _lodash2.default.each(this.filters[type], function (filter) {
	            var before = templates.slice(0);

	            templates = filter.callback.call(this, object, templates);
	            _util2.default.console.groupCollapsed('Filter `' + filter.name + '` on', before.length, 'templates (removed', before.length - templates.length, 'templates)');

	            if (before.length - templates.length) {
	                _lodash2.default.each(before, function (tmpl) {
	                    if (templates.indexOf(tmpl) === -1) {
	                        _util2.default.console.debug('-', tmpl.name);
	                    }
	                });
	            }

	            _util2.default.console.groupEnd();
	        }, this);

	        _util2.default.console.debug('Remaining templates:', templates.length);
	        _util2.default.console.groupEnd();

	        return templates;
	    }
	};

	exports.default = TemplateManager;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _BaseView = __webpack_require__(11);

	var _BaseView2 = _interopRequireDefault(_BaseView);

	var _Region = __webpack_require__(41);

	var _Region2 = _interopRequireDefault(_Region);

	var _Container = __webpack_require__(43);

	var _Container2 = _interopRequireDefault(_Container);

	var _Figure = __webpack_require__(44);

	var _Figure2 = _interopRequireDefault(_Figure);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var EMPTY_CONTAINER = -500;
	var MATCHING_CONTAINER = 100;
	var NON_MATCHING_OPTIONAL_CONTAINER = 0;
	var EMPTY_REGIONS = -500;
	var MATCHING_REGION = 100;
	var FIGURE_DISTANCE_FACTOR = 5;

	/**
	 * Template
	 *
	 * This is not meant to be used as an actual template,
	 * but be reusable and instead serve as a map to the template for calculation purposes
	 *
	 * @author Peter Rudolfsen <peter@aptoma.com>
	 * @module Layout
	 */
	var Template = _BaseView2.default.extend();

	_lodash2.default.extend(Template.prototype, {
	    setElement: function setElement(el) {
	        Template.__super__.setElement.call(this, el);

	        this.name = this.$el.attr('data-name');

	        // Reset the signature when a new element is set,
	        // before Containers and Region get the chance to tamper with the element
	        this.signature = undefined;
	        this.lockSignature();

	        this.containers = this.$el.find('.' + _classnames2.default.CONTAINER).map(function () {
	            return new _Container2.default({
	                el: this
	            });
	        });

	        this.regions = this.$el.find('.' + _classnames2.default.REGION).map(function () {
	            return new _Region2.default({
	                el: this
	            });
	        });

	        this.baseScore = parseInt(this.$el.attr('data-score') || 0, 10);
	    },

	    /**
	     * Calculate the score for the template
	     *
	     * Idea:
	     * Should we create a map of ALL the content and not just the containers?
	     *
	     * It could calculate approximately how much whitespace each region
	     * would contain and how much reordering of the content it would do
	     * This would be more accurate if the container or figure came with a
	     * min-height and max-height property
	     *
	     * @param {Page} page the page to score against
	     * @param {Object} containerMap optional precalculated containerMap
	     * @return {number} the score
	     */
	    score: function score(page, containerMap) {
	        var score = this.baseScore;
	        var blocks = page.content.getBlocks();

	        // util.console.info('  **********************************');
	        // util.console.info('  ***** NOW SCORING ', name, '*****');

	        // Create a list of scoring filters
	        // and put them in it's own object?

	        containerMap = containerMap || this.getContainerMap(page.content);
	        score += containerMap.score || 0;

	        _lodash2.default.each(containerMap.positions, function (pos) {
	            if (pos.match) {
	                score += pos.noScore ? 0 : MATCHING_CONTAINER;
	            } else {
	                score += pos.isOptional ? NON_MATCHING_OPTIONAL_CONTAINER : EMPTY_CONTAINER;
	            }
	        });

	        if (this.regions.length) {
	            score += blocks.length ? MATCHING_REGION : EMPTY_REGIONS;
	        }

	        this.lastScore = score;

	        // util.console.info('  ***** FINISHED SCORE ', name, score, '*****');
	        // util.console.info('  **********************************');

	        return score;
	    },

	    /**
	     * Map containers and figures
	     *
	     * This container map is reused by Page to calculate
	     * scoring and fill them with content
	     *
	     * @param {array} figures list of figure objects
	     * @return {array} the map
	     */
	    getContainerMap: function getContainerMap(content) {
	        var elements, figures, numElements;

	        var matchedFigures = [];
	        var map = {
	            matches: 0,
	            positions: {},
	            score: 0,
	            template: this
	        };

	        elements = content.getElements();
	        figures = content.getFigures();
	        numElements = elements.length;

	        _lodash2.default.each(this.containers, function (container, x) {
	            var i, mappedElement, pos;

	            pos = map.positions[x] = {
	                match: false,
	                fieldMap: container.fieldMap,
	                isOptional: container.isOptional || !container.fieldMap.length && container.ref
	            };

	            for (i = 0; i < numElements; i++) {
	                if (!(elements[i] instanceof _Figure2.default) || matchedFigures.indexOf(elements[i]) !== -1) {
	                    continue;
	                }

	                mappedElement = elements[i].getElementMappedToField(container.fieldMap);
	                if (mappedElement) {
	                    // The further away a Figure is from the first available content element,
	                    // the less score the Template will get by using it. It might even get a penalty for it.
	                    // This will make it respect the content order a lot more.
	                    map.score -= i * FIGURE_DISTANCE_FACTOR;
	                    map.matches += 1;
	                    matchedFigures.push(elements[i]);

	                    pos.match = true;
	                    pos.index = figures.indexOf(elements[i]);
	                    pos.noScore = mappedElement.noScore;

	                    return;
	                }
	            }
	        });

	        return map;
	    }
	});

	exports.default = Template;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var supportsMatchMedia = !!_util2.default.matchMedia;

	/**
	 * Builtin article filters
	 * All filters listed here will automatically be applied
	 */
	exports.default = {
	    /**
	     * Filter by media query
	     *
	     * Remove articles that do not match the media query of the article
	     *
	     * @param {Article} article
	     * @param {array} templates all available templates
	     * @return {array} eligible templates
	     */

	    mediaQuery: function mediaQuery(article, templates) {
	        if (!supportsMatchMedia) {
	            return templates;
	        }

	        return _lodash2.default.filter(templates, function (template) {
	            var media = _util2.default.dom.getMediaQuery(template.el);

	            return media ? _util2.default.matchMedia(media).matches : true;
	        });
	    },

	    /**
	     * Filter by field mapping (data-map) on the article
	     *
	     * @param {Article} article
	     * @param {array} templates all available templates
	     * @return {array} eligible templates
	     */
	    fieldMap: function fieldMap(article, templates) {
	        var articleFieldMap = article.content.fieldMap;
	        var templateFieldMap;

	        if (!articleFieldMap || !articleFieldMap.length) {
	            return templates;
	        }

	        return _lodash2.default.filter(templates, function (template) {
	            templateFieldMap = _util2.default.dom.getFieldMap(template.el);

	            if (!templateFieldMap.length) {
	                return false;
	            }

	            return _lodash2.default.intersection(articleFieldMap, templateFieldMap).length > 0;
	        });
	    },

	    /**
	     * Filter by empty containers
	     *
	     * Remove templates that have containers that do not match any content in the article
	     *
	     * @param {Article} article
	     * @param {array} templates all available templates
	     * @return {array} eligible templates
	     */
	    emptyContainers: function emptyContainers(article, templates) {
	        var isUsable;

	        isUsable = function isUsable(pos) {
	            return pos.match === true || pos.match === false && pos.isOptional;
	        };

	        return _lodash2.default.filter(templates, function (template) {
	            var containerMap = template.getContainerMap(article.content);

	            return _lodash2.default.every(containerMap.positions, isUsable);
	        });
	    },
	    formatName: function formatName(article, templates) {
	        var articleFormatName;

	        if (!article.format || !(articleFormatName = article.format.get('name'))) {
	            return templates;
	        }

	        return _lodash2.default.filter(templates, function (template) {
	            var formatName = template.$el.attr('data-filter-format-name');

	            if (!formatName) {
	                return true;
	            }

	            return formatName.split(' ').indexOf(articleFormatName) !== -1;
	        });
	    }
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Builtin page filters
	 * All filters listed here will automatically be applied
	 */
	exports.default = {
	    /**
	     * Filter by the page content
	     *
	     * e.g. remove templates with regions, if no blocks are left
	     *
	     * @param {Page} page
	     * @param {Array} templates
	     * @return {Array} remaining allowed templates
	     */

	    emptyBlocks: function emptyBlocks(page, templates) {
	        var blocks = page.content.getBlocks();
	        var figures = page.content.getFigures();

	        if (blocks.length) {
	            return templates;
	        }

	        return _lodash2.default.filter(templates, function (template) {
	            var regions = template.regions;

	            if (!regions.length) {
	                return template;
	            }

	            // We now know that there are NO blocks left
	            //
	            // We're looking for a `region` that has a `container` that matches any of the `figures` left
	            return _lodash2.default.any(regions, function (region) {
	                // This region has no containers, so this region will be empty and useless
	                if (!region.containers.length) {
	                    return false;
	                }

	                return _lodash2.default.any(region.containers, function (container) {
	                    return _lodash2.default.any(figures, function (figure) {
	                        return figure.getElementMappedToField(container.fieldMap);
	                    });
	                });
	            });
	        });
	    },

	    /**
	     * Filter by the page content
	     *
	     * e.g. remove templates with containers, if no figures are left
	     *
	     * @param {Page} page
	     * @param {Array} templates
	     * @return {Array} remaining allowed templates
	     */
	    emptyContainers: function emptyContainers(page, templates) {
	        var isUsable;

	        isUsable = function isUsable(pos) {
	            return pos.match === true || pos.match === false && pos.isOptional;
	        };

	        return _lodash2.default.filter(templates, function (template) {
	            var containerMap = template.getContainerMap(page.content);

	            return _lodash2.default.every(containerMap.positions, isUsable);
	        });
	    },

	    /**
	     * Filter by the page position
	     *
	     * Example:
	     * data-filter-page-pos="1" # only allow on page 1
	     * data-filter-page-pos="!1" # allow on all pages except 1
	     * data-filter-page-pos="1 2 3" # allow on pages 1 2 and 3
	     *
	     * @param {Page} page
	     * @param {Array} templates
	     * @return {Array} remaining allowed templates
	     */
	    pagePosition: function pagePosition(page, templates) {
	        return _lodash2.default.filter(templates, function (template) {
	            var positions = template.$el.attr('data-filter-page-pos');
	            var pageNum = page.pageNum + 1;
	            var allow = false;

	            if (!positions) {
	                return true;
	            }

	            positions = positions.split(' ');

	            _lodash2.default.each(positions, function (pos) {
	                var exclude = false;
	                var posNum = parseInt(pos, 10);

	                if (pos[0] === '!') {
	                    exclude = true;
	                    posNum = parseInt(pos.substr(1), 10);
	                }

	                if (exclude && posNum !== pageNum || !exclude && posNum === pageNum) {
	                    allow = true;

	                    return false;
	                }
	            });

	            return allow;
	        });
	    }
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _util = __webpack_require__(25);

	var _util2 = _interopRequireDefault(_util);

	var _BaseModel = __webpack_require__(37);

	var _BaseModel2 = _interopRequireDefault(_BaseModel);

	var _Block = __webpack_require__(46);

	var _Block2 = _interopRequireDefault(_Block);

	var _Figure = __webpack_require__(44);

	var _Figure2 = _interopRequireDefault(_Figure);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Content model
	 *
	 * Holds generic elements like Figures and Blocks
	 *
	 * This is somewhere in between a View and a Model
	 * It's a model, but it holds both model data and HTMLElements
	 */
	var Content = _BaseModel2.default.extend({
	    defaults: {
	        'contents': {},
	        'meta': {}
	    },

	    initialize: function initialize(data) {
	        data && data.contents && this._changeContents();
	        this.on('change:contents', this._changeContents);

	        this.__defineGetter__('elementsLeft', this._getElementsLeft);
	    },

	    /**
	     * Set content elements
	     *
	     * Creates blocks and figures dependending on the element type
	     *
	     * @param {array} elements array or array-like list of HTML elements
	     */
	    setElements: function setElements(elements) {
	        // Filter tags with just empty space
	        elements = _lodash2.default.filter(elements, function (element) {
	            if (element.tagName === 'P' && element.innerHTML.length < 15) {
	                if (!element.innerHTML.replace(/(\s+)?(<br(\s+)?\/?>)?(&nbsp;)?/gmi, '')) {
	                    return false;
	                }
	            }

	            return element;
	        });

	        this.elements = _lodash2.default.map(elements, function (element) {
	            var params = { el: element };

	            if (element.tagName === 'FIGURE') {
	                var figure = new _Figure2.default(params);
	                if (figure.elements.length) {
	                    return figure;
	                }
	            }

	            return new _Block2.default(params);
	        });

	        var blocks = this.getBlocks();

	        if (blocks.length) {
	            blocks[0].isFirst = true;
	            blocks[blocks.length - 1].isLast = true;
	        }
	    },

	    /**
	     * Add an element after another element
	     *
	     * @param {Block|Figure} element
	     * @param {Block|Figure} afterElement
	     */
	    addAfter: function addAfter(element, afterElement) {
	        var els = this.elements;

	        els.splice(els.indexOf(afterElement) + 1, 0, element);
	    },

	    /**
	     * Iterator helper for elements
	     *
	     * @param {Function} callback called on each element
	     * @param {object} context optional context object
	     */
	    each: function each(callback, context) {
	        _lodash2.default.each(this.elements, callback, context || this);
	    },

	    /**
	     * Release an element or array of elements
	     *
	     * This makes the element reusable by other objects
	     *
	     * @param {Object|array} objectOrArray
	     * @return {void}
	     */
	    release: function release(objectOrArray) {
	        objectOrArray = _lodash2.default.isArray(objectOrArray) ? objectOrArray : [objectOrArray];

	        _lodash2.default.each(objectOrArray, function (object, i) {
	            object.retained = false;

	            if (object.clonedFrom && !object.clonedFrom.retained) {
	                // The block it was cloned from is released, so the clone must be removed
	                this.elements.splice(this.elements.indexOf(object), 1);
	            } else {
	                object.revert && object.revert();
	            }
	        }, this);
	    },

	    /**
	     * Release all elements
	     *
	     * @return {void}
	     */
	    releaseAll: function releaseAll() {
	        this.release(this.elements);
	    },

	    /**
	     * Retain element(s)
	     *
	     * Mark an element as retained by someone else
	     *
	     * @param {Block|Figure|array} objectOrArray an object or an array of objects
	     * @return {void}
	     */
	    retain: function retain(objectOrArray) {
	        var objects = _lodash2.default.isArray(objectOrArray) ? objectOrArray : [objectOrArray];

	        _lodash2.default.each(objects, function (object) {
	            object.retained = true;
	        });
	    },
	    retainAll: function retainAll() {
	        _lodash2.default.each(this.elements, function (element) {
	            element.retained = true;
	        });
	    },
	    getElements: function getElements() {
	        return _lodash2.default.filter(this.elements, function (element) {
	            return !element.retained;
	        });
	    },
	    getBlocks: function getBlocks() {
	        return _lodash2.default.filter(this.elements, function (element) {
	            return !element.retained && element instanceof _Block2.default;
	        });
	    },
	    getFigures: function getFigures() {
	        return _lodash2.default.filter(this.elements, function (element, i) {
	            return !element.retained && element instanceof _Figure2.default;
	        });
	    },
	    hasBlocksLeft: function hasBlocksLeft() {
	        return this.getBlocks().length > 0;
	    },
	    isEmpty: function isEmpty() {
	        return this.elementsLeft === 0;
	    },
	    _changeContents: function _changeContents() {
	        var $source, elements;

	        $source = (0, _dom2.default)(this.get('contents').source);
	        elements = $source.children();

	        this.className = $source.attr('class');
	        this.fieldMap = _util2.default.dom.getFieldMap($source[0]);

	        this.setElements(elements);
	    },

	    /**
	     * Get elements left
	     *
	     * getter function for this.elementsLeft
	     *
	     * @todo this will need optimization or caching of some kind
	     * @return {number} number of elements left
	     */
	    _getElementsLeft: function _getElementsLeft() {
	        return _lodash2.default.reduce(this.elements, function (memo, element) {
	            return element.retained ? memo : memo + 1;
	        }, 0);
	    }
	});

	exports.default = Content;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Article = __webpack_require__(57);

	var _Article2 = _interopRequireDefault(_Article);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    Article: _Article2.default
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	var _Page = __webpack_require__(58);

	var _Page2 = _interopRequireDefault(_Page);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ArticleSerializer = _Base2.default.extend({
	    initialize: function initialize(article) {
	        this.article = article;
	    },
	    serialize: function serialize() {
	        return {
	            pages: _lodash2.default.map(this.article.pages, this._serializePage, this)
	        };
	    },
	    unserialize: function unserialize(serializedContent) {
	        var pages = [];
	        var serializer = new _Page2.default(null, this.article);

	        serializedContent = typeof serializedContent === 'string' ? JSON.parse(serializedContent) : serializedContent;

	        _lodash2.default.each(serializedContent.pages, function (serializedPage, pageNum) {
	            if (!serializedPage) {
	                return;
	            }

	            serializedPage.pageNum = pageNum;
	            pages.push(serializer.unserialize(serializedPage));
	        });

	        _lodash2.default.each(pages, function (page) {
	            this.article.pages[page.pageNum] = page;
	            this.article.setTemplateForPageNum(page.template, page.pageNum);
	        }, this);

	        // This will make sure that all pages are empty of Content,
	        // but keeping any required references to other objects so they can be rendered again
	        this.article.revert();

	        return this.article;
	    },
	    _serializePage: function _serializePage(page) {
	        var serializer = new _Page2.default(page, this.article);

	        return serializer.serialize();
	    }
	});

	exports.default = ArticleSerializer;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _dom = __webpack_require__(2);

	var _dom2 = _interopRequireDefault(_dom);

	var _Base = __webpack_require__(10);

	var _Base2 = _interopRequireDefault(_Base);

	var _Template = __webpack_require__(52);

	var _Template2 = _interopRequireDefault(_Template);

	var _TemplateManager = __webpack_require__(51);

	var _TemplateManager2 = _interopRequireDefault(_TemplateManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PageSerializer = _Base2.default.extend({
	    initialize: function initialize(page, article) {
	        this.page = page;
	        this.article = article;
	    },
	    serialize: function serialize() {
	        var containers = [];
	        var page = this.page;

	        if (!this.article.overrideTemplates[page.pageNum]) {
	            return false;
	        }

	        containers = _lodash2.default.map(page.pageTemplate.containers, function (container) {
	            if (!container.figureEl) {
	                return null;
	            }

	            return {
	                figureElementSignature: container.figureEl.signature,
	                preferFigureElSignature: container.preferFigureElSignature,
	                html: container.el.innerHTML
	            };
	        });

	        return {
	            template: {
	                signature: page.template.signature,
	                html: _TemplateManager2.default.getTemplateFromPageTemplate(page.pageTemplate).el.outerHTML
	            },
	            containers: containers
	        };
	    },

	    /**
	     * Unserialize
	     *
	     * Restore template and content to the Page
	     *
	     * @param  {Object} serializedPage
	     * @return {Alf.layout.Page}
	     */
	    unserialize: function unserialize(serializedPage) {
	        var templateSignature = serializedPage.template.signature;
	        var templateHtml = serializedPage.template.html;

	        // Create a forked template since the original template might be gone
	        var forkedTemplate = new _Template2.default({ el: (0, _dom2.default)(templateHtml) });

	        var template = this._findOriginalTemplate(templateSignature);

	        this.page = this.article.createPage(serializedPage.pageNum);
	        this.page.setTemplate(template || forkedTemplate);

	        var pageTemplate = _TemplateManager2.default.getPageTemplateFromTemplate(forkedTemplate, {
	            page: this.page
	        });
	        this.page.setPageTemplate(pageTemplate);

	        this._restoreContainers(serializedPage);

	        return this.page;
	    },
	    _findOriginalTemplate: function _findOriginalTemplate(templateSignature) {
	        return _lodash2.default.find(this.article.templates, function (template) {
	            return template.matchesAnySignature(templateSignature);
	        });
	    },

	    /**
	     * Restore containers
	     *
	     * Restore containers back to their previous state
	     *
	     * @param  {Object} serializedPage
	     * @return {void}
	     */
	    _restoreContainers: function _restoreContainers(serializedPage) {
	        _lodash2.default.each(this.page.pageTemplate.containers, function (container, i) {
	            var serializedContainer = serializedPage.containers[i];
	            var signature = serializedContainer && serializedContainer.figureElementSignature;

	            if (!signature) {
	                return;
	            }

	            container.figureElSignature = signature;
	            container.preferFigureElSignature = serializedContainer.preferFigureElSignature;

	            container.saveState({
	                html: serializedContainer.html,
	                renderedWidgets: true
	            });
	        });
	    }
	});

	exports.default = PageSerializer;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Article = __webpack_require__(34);

	var _Article2 = _interopRequireDefault(_Article);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    Article: _Article2.default
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ScrollView = __webpack_require__(31);

	var _ScrollView2 = _interopRequireDefault(_ScrollView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    ScrollView: _ScrollView2.default
	};

/***/ }
/******/ ])
});
;