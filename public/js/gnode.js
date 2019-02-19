/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/eventemitter3/index.js":
/*!**********************************************!*\
  !*** ../node_modules/eventemitter3/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./components/common/GNODEElement/index.js":
/*!*************************************************!*\
  !*** ./components/common/GNODEElement/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(/*! ./style.css */ "./components/common/GNODEElement/style.css");

var _style2 = _interopRequireDefault(_style);

var _eventemitter = __webpack_require__(/*! eventemitter3 */ "../node_modules/eventemitter3/index.js");

var _eventemitter2 = _interopRequireDefault(_eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GNODEElement = function (_EventEmitter) {
    _inherits(GNODEElement, _EventEmitter);

    _createClass(GNODEElement, [{
        key: 'element',

        /**
         * @alias dom
         */
        get: function get() {
            return this.dom;
        }
        /**
         * @alias dom
         */

    }, {
        key: 'elm',
        get: function get() {
            return this.dom;
        }
        /**
         * @alias shadow
         */

    }, {
        key: 'shadowRoot',
        get: function get() {
            return this.shadow;
        }
        /**
         * @constructor
         */

    }]);

    function GNODEElement() {
        _classCallCheck(this, GNODEElement);

        // initialize properties
        var _this = _possibleConstructorReturn(this, (GNODEElement.__proto__ || Object.getPrototypeOf(GNODEElement)).call(this));

        _this.listenersForSelf = {};

        // dom generation
        _this.dom = document.createElement('div');
        _this.dom.classList.add('GNODEElement');
        _this.shadow = _this.dom.attachShadow({ mode: 'open' });

        // style setting
        _this.appendStyle(_style2.default);
        return _this;
    }
    /**
     * append to this.dom
     * @param {HTMLElement} element - html element
     */


    _createClass(GNODEElement, [{
        key: 'append',
        value: function append(element) {
            this.dom.appendChild(element);
        }
        /**
         * @alias append
         */

    }, {
        key: 'appendChild',
        value: function appendChild(element) {
            this.append(element);
        }
        /**
         * release
         */

    }, {
        key: 'release',
        value: function release() {
            // remove event listener
            this.removeEventListenerForSelf();
            // remove all element
            if (this.dom.parentNode != null) {
                this.dom.parentNode.removeChild(this.dom);
            }
            // clear member
            this.shadow = null;
            this.dom = null;
        }
        /**
         * add event for self
         * @param {Element} target - event target
         * @param {string} evt - event name
         * @param {function} listener - listener function
         * @param {boolean} [capture=false] - is using capture
         */

    }, {
        key: 'addEventListenerForSelf',
        value: function addEventListenerForSelf(target, evt, listener) {
            var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            if (this.listenersForSelf.hasOwnProperty(evt) !== true) {
                this.listenersForSelf.evt = [];
            }
            this.listenersForSelf.evt.push({
                target: target,
                listener: listener
            });
            target.addEventListener(evt, listener, capture);
        }
        /**
         * remove event for self
         */

    }, {
        key: 'removeEventListenerForSelf',
        value: function removeEventListenerForSelf() {
            var _this2 = this;

            var _loop = function _loop(evt) {
                _this2.listenersForSelf[evt].map(function (v) {
                    v.target.removeEventListener(evt, v.listener);
                });
            };

            for (var evt in this.listenersForSelf) {
                _loop(evt);
            }
            this.listenersForSelf = {};
        }
        /**
         * append style tag
         * @param {string} css - css from raw-loader
         */

    }, {
        key: 'appendStyle',
        value: function appendStyle(css) {
            var style = document.createElement('style');
            style.textContent = css;
            this.shadow.insertBefore(style, this.shadow.firstChild);
        }
    }]);

    return GNODEElement;
}(_eventemitter2.default);

exports.default = GNODEElement;

/***/ }),

/***/ "./components/common/GNODEElement/style.css":
/*!**************************************************!*\
  !*** ./components/common/GNODEElement/style.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".GNODEElement {}\r\n"

/***/ }),

/***/ "./components/common/GNODEFrame/index.js":
/*!***********************************************!*\
  !*** ./components/common/GNODEFrame/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(/*! ./style.css */ "./components/common/GNODEFrame/style.css");

var _style2 = _interopRequireDefault(_style);

var _index = __webpack_require__(/*! ../GNODEElement/index.js */ "./components/common/GNODEElement/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GNODEFrame = function (_GNODEElement) {
    _inherits(GNODEFrame, _GNODEElement);

    _createClass(GNODEFrame, null, [{
        key: 'EVENTS',

        /**
         * @type {Array<string>}
         */
        get: function get() {
            return ['click'];
        }
        /**
         * @constructor
         */

    }]);

    function GNODEFrame() {
        _classCallCheck(this, GNODEFrame);

        // dom generation
        var _this = _possibleConstructorReturn(this, (GNODEFrame.__proto__ || Object.getPrototypeOf(GNODEFrame)).call(this));

        _this.frame = document.createElement('div');
        _this.frame.classList.add('GNODEFrame');
        _this.shadow.appendChild(_this.frame);

        // style setting
        _this.appendStyle(_style2.default);

        // event setting
        _this.addEventListenerForSelf(_this.frame, 'click', function (evt) {
            _this.emit('click', evt, _this.frame);
        }, false);
        return _this;
    }

    return GNODEFrame;
}(_index2.default);

exports.default = GNODEFrame;

/***/ }),

/***/ "./components/common/GNODEFrame/style.css":
/*!************************************************!*\
  !*** ./components/common/GNODEFrame/style.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".GNODEFrame {}\r\n"

/***/ }),

/***/ "./components/common/GNODEInputCheckbox/index.js":
/*!*******************************************************!*\
  !*** ./components/common/GNODEInputCheckbox/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = __webpack_require__(/*! ./style.css */ "./components/common/GNODEInputCheckbox/style.css");

var _style2 = _interopRequireDefault(_style);

var _index = __webpack_require__(/*! ../GNODEElement/index.js */ "./components/common/GNODEElement/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GNODEInputCheckbox = function (_GNODEElement) {
    _inherits(GNODEInputCheckbox, _GNODEElement);

    _createClass(GNODEInputCheckbox, [{
        key: 'value',

        /**
         * @type {boolean}
         */
        get: function get() {
            return this.input.value;
        }
        /**
         * @constructor
         * @param {string} [text=''] - text
         * @param {boolean} [value=false] - checked
         */

    }], [{
        key: 'EVENTS',

        /**
         * @type {Array<string>}
         */
        get: function get() {
            return ['input', 'change'];
        }
    }]);

    function GNODEInputCheckbox() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, GNODEInputCheckbox);

        // initialize properties ----------------------------------------------
        var _this = _possibleConstructorReturn(this, (GNODEInputCheckbox.__proto__ || Object.getPrototypeOf(GNODEInputCheckbox)).call(this));

        _this.text = text;

        // dom generation -----------------------------------------------------
        _this.wrap = document.createElement('label');
        _this.wrap.classList.add('GNODEInputCheckbox');
        _this.box = document.createElement('div');
        _this.box.classList.add('box');
        _this.label = document.createElement('div');
        _this.label.classList.add('label');
        _this.input = document.createElement('input');
        _this.input.type = 'checkbox';
        _this.input.checked = value;
        _this.wrap.appendChild(_this.input);
        _this.wrap.appendChild(_this.box);
        _this.wrap.appendChild(_this.label);
        _this.shadow.appendChild(_this.wrap);
        _this.label.textContent = text;

        // style setting ------------------------------------------------------
        _this.appendStyle(_style2.default);

        // event setting ------------------------------------------------------
        _this.addEventListenerForSelf(_this.input, 'input', function (evt) {
            _this.emit('input', evt);
        }, false);
        _this.addEventListenerForSelf(_this.input, 'change', function (evt) {
            _this.emit('change', evt);
        }, false);
        return _this;
    }
    /**
     * set disabled attribute
     * @param {boolean} [enable=true] - disabled = !enable
     */


    _createClass(GNODEInputCheckbox, [{
        key: 'enable',
        value: function enable() {
            var _enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.input.disabled = !_enable;
        }
        /**
         * set disabled attribute
         * @param {boolean} [disable=true] - disabled
         */

    }, {
        key: 'disable',
        value: function disable() {
            var _disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this.input.disabled = _disable;
        }
    }]);

    return GNODEInputCheckbox;
}(_index2.default);

exports.default = GNODEInputCheckbox;

/***/ }),

/***/ "./components/common/GNODEInputCheckbox/style.css":
/*!********************************************************!*\
  !*** ./components/common/GNODEInputCheckbox/style.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".GNODEInputCheckbox {\r\n    color: silver;\r\n    line-height: 20px;\r\n    height: 20px;\r\n    display: inline-block;\r\n}\r\n\r\ninput[type=checkbox] {\r\n    display: none;\r\n}\r\n\r\n.box {\r\n    background-color: white;\r\n    min-width: 20px;\r\n    max-width: 20px;\r\n    min-height: 20px;\r\n    max-height: 20px;\r\n    margin: 0px 5px 0px 0px;\r\n    display: inline-block;\r\n}\r\n\r\n.box:before {\r\n    text-align: center;\r\n    font-weight: bold;\r\n    width: 100%;\r\n    height: 100%;\r\n    display: inline-block;\r\n    box-shadow: 0px 0px 0px 1px inset;\r\n}\r\n\r\ninput:checked + .box:before {\r\n    content: '✓';\r\n}\r\ninput + .box:before {\r\n    content: '　';\r\n}\r\n\r\n.label {\r\n    display: inline-block;\r\n    user-select: none;\r\n}\r\n"

/***/ }),

/***/ "./components/common/index.js":
/*!************************************!*\
  !*** ./components/common/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(/*! ./GNODEElement/index.js */ "./components/common/GNODEElement/index.js");

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(/*! ./GNODEFrame/index.js */ "./components/common/GNODEFrame/index.js");

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(/*! ./GNODEInputCheckbox/index.js */ "./components/common/GNODEInputCheckbox/index.js");

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Common = function () {
    function Common() {
        _classCallCheck(this, Common);
    }

    _createClass(Common, null, [{
        key: 'GNODEElement',
        get: function get() {
            return _index2.default;
        }
    }, {
        key: 'GNODEFrame',
        get: function get() {
            return _index4.default;
        }
    }, {
        key: 'GNODEInputCheckbox',
        get: function get() {
            return _index6.default;
        }
    }]);

    return Common;
}();

exports.default = Common;

/***/ }),

/***/ "./components/index.js":
/*!*****************************!*\
  !*** ./components/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(/*! ./common/index.js */ "./components/common/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Components = function () {
    function Components() {
        _classCallCheck(this, Components);
    }

    _createClass(Components, null, [{
        key: 'common',
        get: function get() {
            return _index2.default;
        }
    }]);

    return Components;
}();

exports.default = Components;

/***/ }),

/***/ "./script.js":
/*!*******************!*\
  !*** ./script.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(/*! ./static/util.js */ "./static/util.js");

var _util2 = _interopRequireDefault(_util);

var _index = __webpack_require__(/*! ./components/index.js */ "./components/index.js");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GNODE = function () {
    function GNODE() {
        _classCallCheck(this, GNODE);
    }

    _createClass(GNODE, null, [{
        key: 'util',
        get: function get() {
            return _util2.default;
        }
    }, {
        key: 'components',
        get: function get() {
            return _index2.default;
        }
    }]);

    return GNODE;
}();

// temp


window.GNODE = GNODE;

/***/ }),

/***/ "./static/util.js":
/*!************************!*\
  !*** ./static/util.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: 'hello',
        get: function get() {
            return 'hello!';
        }
    }]);

    return Util;
}();

exports.default = Util;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvY29tbW9uL0dOT0RFRWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2NvbW1vbi9HTk9ERUVsZW1lbnQvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvY29tbW9uL0dOT0RFRnJhbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jb21tb24vR05PREVGcmFtZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jb21tb24vR05PREVJbnB1dENoZWNrYm94L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvY29tbW9uL0dOT0RFSW5wdXRDaGVja2JveC9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3V0aWwuanMiXSwibmFtZXMiOlsiR05PREVFbGVtZW50IiwiZG9tIiwic2hhZG93IiwibGlzdGVuZXJzRm9yU2VsZiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImF0dGFjaFNoYWRvdyIsIm1vZGUiLCJhcHBlbmRTdHlsZSIsImNzcyIsImVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImFwcGVuZCIsInJlbW92ZUV2ZW50TGlzdGVuZXJGb3JTZWxmIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwidGFyZ2V0IiwiZXZ0IiwibGlzdGVuZXIiLCJjYXB0dXJlIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1hcCIsInYiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3R5bGUiLCJ0ZXh0Q29udGVudCIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJFdmVudEVtaXR0ZXIzIiwiR05PREVGcmFtZSIsImZyYW1lIiwiYWRkRXZlbnRMaXN0ZW5lckZvclNlbGYiLCJlbWl0IiwiR05PREVJbnB1dENoZWNrYm94IiwiaW5wdXQiLCJ2YWx1ZSIsInRleHQiLCJ3cmFwIiwiYm94IiwibGFiZWwiLCJ0eXBlIiwiY2hlY2tlZCIsImVuYWJsZSIsImRpc2FibGVkIiwiZGlzYWJsZSIsIkNvbW1vbiIsIkNvbXBvbmVudHMiLCJjb21tb24iLCJHTk9ERSIsInV0aWwiLCJjb21wb25lbnRzIiwid2luZG93IiwiVXRpbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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OzRCQUNlO0FBQUMsbUJBQU9DLGNBQVA7QUFBYTs7OzRCQUNSO0FBQUMsbUJBQU9DLGVBQVA7QUFBbUI7Ozs7OztBQUcvQzs7O0FBQ0FDLE9BQU9ILEtBQVAsR0FBZUEsS0FBZixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDVHFCSSxJOzs7Ozs7OzRCQUNDO0FBQUMsbUJBQU8sUUFBUDtBQUFpQjs7Ozs7O2tCQURuQkEsSSIsImZpbGUiOiJnbm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zY3JpcHQuanNcIik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgcHJlZml4ID0gJ34nO1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIHN0b3JhZ2UgZm9yIG91ciBgRUVgIG9iamVjdHMuXG4gKiBBbiBgRXZlbnRzYCBpbnN0YW5jZSBpcyBhIHBsYWluIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBldmVudCBuYW1lcy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEV2ZW50cygpIHt9XG5cbi8vXG4vLyBXZSB0cnkgdG8gbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuIEluIHNvbWUgZW5naW5lcyBjcmVhdGluZyBhblxuLy8gaW5zdGFuY2UgaW4gdGhpcyB3YXkgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBgT2JqZWN0LmNyZWF0ZShudWxsKWAgZGlyZWN0bHkuXG4vLyBJZiBgT2JqZWN0LmNyZWF0ZShudWxsKWAgaXMgbm90IHN1cHBvcnRlZCB3ZSBwcmVmaXggdGhlIGV2ZW50IG5hbWVzIHdpdGggYVxuLy8gY2hhcmFjdGVyIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90XG4vLyBvdmVycmlkZGVuIG9yIHVzZWQgYXMgYW4gYXR0YWNrIHZlY3Rvci5cbi8vXG5pZiAoT2JqZWN0LmNyZWF0ZSkge1xuICBFdmVudHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvL1xuICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGBfX3Byb3RvX19gIHByb3BlcnR5IGlzIHN0aWxsIGluaGVyaXRlZCBpblxuICAvLyBzb21lIG9sZCBicm93c2VycyBsaWtlIEFuZHJvaWQgNCwgaVBob25lIDUuMSwgT3BlcmEgMTEgYW5kIFNhZmFyaSA1LlxuICAvL1xuICBpZiAoIW5ldyBFdmVudHMoKS5fX3Byb3RvX18pIHByZWZpeCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCBlbWl0dGVyLCBvbmNlKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdKSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyLCBlbWl0dGVyLl9ldmVudHNDb3VudCsrO1xuICBlbHNlIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0uZm4pIGVtaXR0ZXIuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gW2VtaXR0ZXIuX2V2ZW50c1tldnRdLCBsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbi8qKlxuICogQ2xlYXIgZXZlbnQgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2dCBUaGUgRXZlbnQgbmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNsZWFyRXZlbnQoZW1pdHRlciwgZXZ0KSB7XG4gIGlmICgtLWVtaXR0ZXIuX2V2ZW50c0NvdW50ID09PSAwKSBlbWl0dGVyLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIGVsc2UgZGVsZXRlIGVtaXR0ZXIuX2V2ZW50c1tldnRdO1xufVxuXG4vKipcbiAqIE1pbmltYWwgYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgdmFyIG5hbWVzID0gW11cbiAgICAsIGV2ZW50c1xuICAgICwgbmFtZTtcblxuICBpZiAodGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHJldHVybiBuYW1lcztcblxuICBmb3IgKG5hbWUgaW4gKGV2ZW50cyA9IHRoaXMuX2V2ZW50cykpIHtcbiAgICBpZiAoaGFzLmNhbGwoZXZlbnRzLCBuYW1lKSkgbmFtZXMucHVzaChwcmVmaXggPyBuYW1lLnNsaWNlKDEpIDogbmFtZSk7XG4gIH1cblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHJldHVybiBuYW1lcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhldmVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBuYW1lcztcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuIFtdO1xuICBpZiAoaGFuZGxlcnMuZm4pIHJldHVybiBbaGFuZGxlcnMuZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gaGFuZGxlcnNbaV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBsaXN0ZW5pbmcgdG8gYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gbGlzdGVuZXJDb3VudChldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiAwO1xuICBpZiAobGlzdGVuZXJzLmZuKSByZXR1cm4gMTtcbiAgcmV0dXJuIGxpc3RlbmVycy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgY2FzZSA0OiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyLCBhMyk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogQWRkIGEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGxpc3RlbmVycyBvZiBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBtYXRjaCB0aGlzIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBoYXZlIHRoaXMgY29udGV4dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIHRoaXM7XG4gIGlmICghZm4pIHtcbiAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChcbiAgICAgIGxpc3RlbmVycy5mbiA9PT0gZm4gJiZcbiAgICAgICghb25jZSB8fCBsaXN0ZW5lcnMub25jZSkgJiZcbiAgICAgICghY29udGV4dCB8fCBsaXN0ZW5lcnMuY29udGV4dCA9PT0gY29udGV4dClcbiAgICApIHtcbiAgICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGV2ZW50cyA9IFtdLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fFxuICAgICAgICAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpIHx8XG4gICAgICAgIChjb250ZXh0ICYmIGxpc3RlbmVyc1tpXS5jb250ZXh0ICE9PSBjb250ZXh0KVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gICAgLy9cbiAgICBpZiAoZXZlbnRzLmxlbmd0aCkgdGhpcy5fZXZlbnRzW2V2dF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICAgIGVsc2UgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0O1xuXG4gIGlmIChldmVudCkge1xuICAgIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG4gICAgaWYgKHRoaXMuX2V2ZW50c1tldnRdKSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBBbGxvdyBgRXZlbnRFbWl0dGVyYCB0byBiZSBpbXBvcnRlZCBhcyBtb2R1bGUgbmFtZXNwYWNlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG4iLCJcclxuaW1wb3J0IGNzcyBmcm9tICcuL3N0eWxlLmNzcyc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIzIGZyb20gJ2V2ZW50ZW1pdHRlcjMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR05PREVFbGVtZW50IGV4dGVuZHMgRXZlbnRFbWl0dGVyMyB7XHJcbiAgICAvKipcclxuICAgICAqIEBhbGlhcyBkb21cclxuICAgICAqL1xyXG4gICAgZ2V0IGVsZW1lbnQoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb207XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBhbGlhcyBkb21cclxuICAgICAqL1xyXG4gICAgZ2V0IGVsbSgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRvbTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGFsaWFzIHNoYWRvd1xyXG4gICAgICovXHJcbiAgICBnZXQgc2hhZG93Um9vdCgpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNoYWRvdztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvLyBpbml0aWFsaXplIHByb3BlcnRpZXNcclxuICAgICAgICB0aGlzLmxpc3RlbmVyc0ZvclNlbGYgPSB7fTtcclxuXHJcbiAgICAgICAgLy8gZG9tIGdlbmVyYXRpb25cclxuICAgICAgICB0aGlzLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoJ0dOT0RFRWxlbWVudCcpO1xyXG4gICAgICAgIHRoaXMuc2hhZG93ID0gdGhpcy5kb20uYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcclxuXHJcbiAgICAgICAgLy8gc3R5bGUgc2V0dGluZ1xyXG4gICAgICAgIHRoaXMuYXBwZW5kU3R5bGUoY3NzKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogYXBwZW5kIHRvIHRoaXMuZG9tXHJcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gaHRtbCBlbGVtZW50XHJcbiAgICAgKi9cclxuICAgIGFwcGVuZChlbGVtZW50KXtcclxuICAgICAgICB0aGlzLmRvbS5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGFsaWFzIGFwcGVuZFxyXG4gICAgICovXHJcbiAgICBhcHBlbmRDaGlsZChlbGVtZW50KXtcclxuICAgICAgICB0aGlzLmFwcGVuZChlbGVtZW50KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogcmVsZWFzZVxyXG4gICAgICovXHJcbiAgICByZWxlYXNlKCl7XHJcbiAgICAgICAgLy8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVyXHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyRm9yU2VsZigpO1xyXG4gICAgICAgIC8vIHJlbW92ZSBhbGwgZWxlbWVudFxyXG4gICAgICAgIGlmKHRoaXMuZG9tLnBhcmVudE5vZGUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5kb20pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjbGVhciBtZW1iZXJcclxuICAgICAgICB0aGlzLnNoYWRvdyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5kb20gPSBudWxsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBhZGQgZXZlbnQgZm9yIHNlbGZcclxuICAgICAqIEBwYXJhbSB7RWxlbWVudH0gdGFyZ2V0IC0gZXZlbnQgdGFyZ2V0XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0IC0gZXZlbnQgbmFtZVxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgLSBsaXN0ZW5lciBmdW5jdGlvblxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbY2FwdHVyZT1mYWxzZV0gLSBpcyB1c2luZyBjYXB0dXJlXHJcbiAgICAgKi9cclxuICAgIGFkZEV2ZW50TGlzdGVuZXJGb3JTZWxmKHRhcmdldCwgZXZ0LCBsaXN0ZW5lciwgY2FwdHVyZSA9IGZhbHNlKXtcclxuICAgICAgICBpZih0aGlzLmxpc3RlbmVyc0ZvclNlbGYuaGFzT3duUHJvcGVydHkoZXZ0KSAhPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzRm9yU2VsZi5ldnQgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNGb3JTZWxmLmV2dC5wdXNoKHtcclxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXHJcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lclxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2dCwgbGlzdGVuZXIsIGNhcHR1cmUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgZXZlbnQgZm9yIHNlbGZcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lckZvclNlbGYoKXtcclxuICAgICAgICBmb3IobGV0IGV2dCBpbiB0aGlzLmxpc3RlbmVyc0ZvclNlbGYpe1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc0ZvclNlbGZbZXZ0XS5tYXAoKHYpID0+IHtcclxuICAgICAgICAgICAgICAgIHYudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCB2Lmxpc3RlbmVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzRm9yU2VsZiA9IHt9O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBhcHBlbmQgc3R5bGUgdGFnXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY3NzIC0gY3NzIGZyb20gcmF3LWxvYWRlclxyXG4gICAgICovXHJcbiAgICBhcHBlbmRTdHlsZShjc3Mpe1xyXG4gICAgICAgIGxldCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBjc3M7XHJcbiAgICAgICAgdGhpcy5zaGFkb3cuaW5zZXJ0QmVmb3JlKHN0eWxlLCB0aGlzLnNoYWRvdy5maXJzdENoaWxkKTtcclxuICAgIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiLkdOT0RFRWxlbWVudCB7fVxcclxcblwiIiwiXHJcbmltcG9ydCBjc3MgZnJvbSAnLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgR05PREVFbGVtZW50IGZyb20gJy4uL0dOT0RFRWxlbWVudC9pbmRleC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHTk9ERUZyYW1lIGV4dGVuZHMgR05PREVFbGVtZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0FycmF5PHN0cmluZz59XHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXQgRVZFTlRTKCl7cmV0dXJuIFtcclxuICAgICAgICAnY2xpY2snLFxyXG4gICAgXTt9XHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8gZG9tIGdlbmVyYXRpb25cclxuICAgICAgICB0aGlzLmZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5mcmFtZS5jbGFzc0xpc3QuYWRkKCdHTk9ERUZyYW1lJyk7XHJcbiAgICAgICAgdGhpcy5zaGFkb3cuYXBwZW5kQ2hpbGQodGhpcy5mcmFtZSk7XHJcblxyXG4gICAgICAgIC8vIHN0eWxlIHNldHRpbmdcclxuICAgICAgICB0aGlzLmFwcGVuZFN0eWxlKGNzcyk7XHJcblxyXG4gICAgICAgIC8vIGV2ZW50IHNldHRpbmdcclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJGb3JTZWxmKHRoaXMuZnJhbWUsICdjbGljaycsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdjbGljaycsIGV2dCwgdGhpcy5mcmFtZSk7XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCIuR05PREVGcmFtZSB7fVxcclxcblwiIiwiXHJcbmltcG9ydCBjc3MgZnJvbSAnLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgR05PREVFbGVtZW50IGZyb20gJy4uL0dOT0RFRWxlbWVudC9pbmRleC5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHTk9ERUlucHV0Q2hlY2tib3ggZXh0ZW5kcyBHTk9ERUVsZW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCBFVkVOVFMoKXtyZXR1cm4gW1xyXG4gICAgICAgICdpbnB1dCcsXHJcbiAgICAgICAgJ2NoYW5nZScsXHJcbiAgICBdO31cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGdldCB2YWx1ZSgpe3JldHVybiB0aGlzLmlucHV0LnZhbHVlO31cclxuICAgIC8qKlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3RleHQ9JyddIC0gdGV4dFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbdmFsdWU9ZmFsc2VdIC0gY2hlY2tlZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0ID0gJycsIHZhbHVlID0gZmFsc2Upe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBwcm9wZXJ0aWVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG5cclxuICAgICAgICAvLyBkb20gZ2VuZXJhdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHRoaXMud3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XHJcbiAgICAgICAgdGhpcy53cmFwLmNsYXNzTGlzdC5hZGQoJ0dOT0RFSW5wdXRDaGVja2JveCcpO1xyXG4gICAgICAgIHRoaXMuYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdGhpcy5ib3guY2xhc3NMaXN0LmFkZCgnYm94Jyk7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZCgnbGFiZWwnKTtcclxuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICB0aGlzLmlucHV0LnR5cGUgPSAnY2hlY2tib3gnO1xyXG4gICAgICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZCh0aGlzLmlucHV0KTtcclxuICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQodGhpcy5ib3gpO1xyXG4gICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZCh0aGlzLmxhYmVsKTtcclxuICAgICAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZCh0aGlzLndyYXApO1xyXG4gICAgICAgIHRoaXMubGFiZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG5cclxuICAgICAgICAvLyBzdHlsZSBzZXR0aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHRoaXMuYXBwZW5kU3R5bGUoY3NzKTtcclxuXHJcbiAgICAgICAgLy8gZXZlbnQgc2V0dGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJGb3JTZWxmKHRoaXMuaW5wdXQsICdpbnB1dCcsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdpbnB1dCcsIGV2dCk7XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lckZvclNlbGYodGhpcy5pbnB1dCwgJ2NoYW5nZScsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBldnQpO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogc2V0IGRpc2FibGVkIGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZW5hYmxlPXRydWVdIC0gZGlzYWJsZWQgPSAhZW5hYmxlXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZShlbmFibGUgPSB0cnVlKXtcclxuICAgICAgICB0aGlzLmlucHV0LmRpc2FibGVkID0gIWVuYWJsZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogc2V0IGRpc2FibGVkIGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGlzYWJsZT10cnVlXSAtIGRpc2FibGVkXHJcbiAgICAgKi9cclxuICAgIGRpc2FibGUoZGlzYWJsZSA9IHRydWUpe1xyXG4gICAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSBkaXNhYmxlO1xyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCIuR05PREVJbnB1dENoZWNrYm94IHtcXHJcXG4gICAgY29sb3I6IHNpbHZlcjtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dFt0eXBlPWNoZWNrYm94XSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5ib3gge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgbWluLXdpZHRoOiAyMHB4O1xcclxcbiAgICBtYXgtd2lkdGg6IDIwcHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1heC1oZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogMHB4IDVweCAwcHggMHB4O1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5ib3g6YmVmb3JlIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDBweCAxcHggaW5zZXQ7XFxyXFxufVxcclxcblxcclxcbmlucHV0OmNoZWNrZWQgKyAuYm94OmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICfinJMnO1xcclxcbn1cXHJcXG5pbnB1dCArIC5ib3g6YmVmb3JlIHtcXHJcXG4gICAgY29udGVudDogJ+OAgCc7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxufVxcclxcblwiIiwiXHJcbmltcG9ydCBHTk9ERUVsZW1lbnQgICAgICAgZnJvbSAnLi9HTk9ERUVsZW1lbnQvaW5kZXguanMnO1xyXG5pbXBvcnQgR05PREVGcmFtZSAgICAgICAgIGZyb20gJy4vR05PREVGcmFtZS9pbmRleC5qcyc7XHJcbmltcG9ydCBHTk9ERUlucHV0Q2hlY2tib3ggZnJvbSAnLi9HTk9ERUlucHV0Q2hlY2tib3gvaW5kZXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbW9uIHtcclxuICAgIHN0YXRpYyBnZXQgR05PREVFbGVtZW50KCkgICAgICAge3JldHVybiBHTk9ERUVsZW1lbnQ7fVxyXG4gICAgc3RhdGljIGdldCBHTk9ERUZyYW1lKCkgICAgICAgICB7cmV0dXJuIEdOT0RFRnJhbWU7fVxyXG4gICAgc3RhdGljIGdldCBHTk9ERUlucHV0Q2hlY2tib3goKSB7cmV0dXJuIEdOT0RFSW5wdXRDaGVja2JveDt9XHJcbn1cclxuXHJcbiIsIlxyXG5pbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uL2luZGV4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudHMge1xyXG4gICAgc3RhdGljIGdldCBjb21tb24oKXtyZXR1cm4gY29tbW9uO31cclxufVxyXG5cclxuIiwiXHJcbmltcG9ydCB1dGlsIGZyb20gJy4vc3RhdGljL3V0aWwuanMnO1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMvaW5kZXguanMnO1xyXG5cclxuY2xhc3MgR05PREUge1xyXG4gICAgc3RhdGljIGdldCB1dGlsKCl7cmV0dXJuIHV0aWw7fVxyXG4gICAgc3RhdGljIGdldCBjb21wb25lbnRzKCl7cmV0dXJuIGNvbXBvbmVudHM7fVxyXG59XHJcblxyXG4vLyB0ZW1wXHJcbndpbmRvdy5HTk9ERSA9IEdOT0RFO1xyXG5cclxuIiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWwge1xyXG4gICAgc3RhdGljIGdldCBoZWxsbygpe3JldHVybiAnaGVsbG8hJzt9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=