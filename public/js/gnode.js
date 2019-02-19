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

/**
 * super class of GNODE element
 * @class
 * @extends {EventEmitter3}
 */
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

        // initialize properties ----------------------------------------------
        /**
         * @type {object}
         */
        var _this = _possibleConstructorReturn(this, (GNODEElement.__proto__ || Object.getPrototypeOf(GNODEElement)).call(this));

        _this.listenersForSelf = {};

        // dom generation -----------------------------------------------------
        /**
         * @type {HTMLDivElement}
         */
        _this.dom = document.createElement('div');
        _this.dom.classList.add('GNODEElement');
        /**
         * @type {ShadowRoot}
         */
        _this.shadow = _this.dom.attachShadow({ mode: 'open' });

        // style setting ------------------------------------------------------
        _this.appendStyle(_style2.default);

        // event setting ------------------------------------------------------
        /** @example */
        // this.addEventListenerForSelf(this.dom, 'click', (evt) => {
        //     this.emit('click', evt);
        // }, false);
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

/**
 * simple frame element
 * @class
 * @extends {GNODEElement}
 */
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

    // initialize properties ----------------------------------------------

    // dom generation -----------------------------------------------------
    /**
     * @type {HTMLDivElement}
     */
    var _this = _possibleConstructorReturn(this, (GNODEFrame.__proto__ || Object.getPrototypeOf(GNODEFrame)).call(this));

    _this.frame = document.createElement('div');
    _this.frame.classList.add('GNODEFrame');
    _this.shadow.appendChild(_this.frame);

    // style setting ------------------------------------------------------
    _this.appendStyle(_style2.default);

    // event setting ------------------------------------------------------
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

/**
 * simple input checkbox
 * @class
 * @extends {EventEmitter3}
 */
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
     * @alias value
     */

  }, {
    key: 'checked',
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
    /**
     * @type {string}
     */
    var _this = _possibleConstructorReturn(this, (GNODEInputCheckbox.__proto__ || Object.getPrototypeOf(GNODEInputCheckbox)).call(this));

    _this.text = text;

    // dom generation -----------------------------------------------------
    /**
     * @type {HTMLLabelElement}
     */
    _this.wrap = document.createElement('label');
    _this.wrap.classList.add('GNODEInputCheckbox');
    /**
     * @type {HTMLDivElement}
     */
    _this.box = document.createElement('div');
    _this.box.classList.add('box');
    /**
     * @type {HTMLDivElement}
     */
    _this.label = document.createElement('div');
    _this.label.classList.add('label');
    /**
     * @type {HTMLInputElement}
     */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvY29tbW9uL0dOT0RFRWxlbWVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2NvbW1vbi9HTk9ERUVsZW1lbnQvc3R5bGUuY3NzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvY29tbW9uL0dOT0RFRnJhbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jb21tb24vR05PREVGcmFtZS9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jb21tb24vR05PREVJbnB1dENoZWNrYm94L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvY29tbW9uL0dOT0RFSW5wdXRDaGVja2JveC9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9jb21tb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zY3JpcHQuanMiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL3V0aWwuanMiXSwibmFtZXMiOlsiR05PREVFbGVtZW50IiwiZG9tIiwic2hhZG93IiwibGlzdGVuZXJzRm9yU2VsZiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImF0dGFjaFNoYWRvdyIsIm1vZGUiLCJhcHBlbmRTdHlsZSIsImNzcyIsImVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImFwcGVuZCIsInJlbW92ZUV2ZW50TGlzdGVuZXJGb3JTZWxmIiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwidGFyZ2V0IiwiZXZ0IiwibGlzdGVuZXIiLCJjYXB0dXJlIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1hcCIsInYiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3R5bGUiLCJ0ZXh0Q29udGVudCIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJFdmVudEVtaXR0ZXIzIiwiR05PREVGcmFtZSIsImZyYW1lIiwiYWRkRXZlbnRMaXN0ZW5lckZvclNlbGYiLCJlbWl0IiwiR05PREVJbnB1dENoZWNrYm94IiwiaW5wdXQiLCJ2YWx1ZSIsInRleHQiLCJ3cmFwIiwiYm94IiwibGFiZWwiLCJ0eXBlIiwiY2hlY2tlZCIsImVuYWJsZSIsImRpc2FibGVkIiwiZGlzYWJsZSIsIkNvbW1vbiIsIkNvbXBvbmVudHMiLCJjb21tb24iLCJHTk9ERSIsInV0aWwiLCJjb21wb25lbnRzIiwid2luZG93IiwiVXRpbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxFQUFFO0FBQ2IsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsZ0JBQWdCO0FBQzNCLFdBQVcsU0FBUztBQUNwQixXQUFXLEVBQUU7QUFDYixXQUFXLFFBQVE7QUFDbkIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLGdCQUFnQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseURBQXlELE9BQU87QUFDaEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUNBQXlDLFNBQVM7QUFDbEQ7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBLGVBQWUsWUFBWTtBQUMzQjs7QUFFQTtBQUNBLDJEQUEyRDtBQUMzRCwrREFBK0Q7QUFDL0QsbUVBQW1FO0FBQ25FLHVFQUF1RTtBQUN2RTtBQUNBLDBEQUEwRCxTQUFTO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxFQUFFO0FBQ2IsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0IsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsRUFBRTtBQUNiLGFBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLFdBQVcsU0FBUztBQUNwQixXQUFXLEVBQUU7QUFDYixXQUFXLFFBQVE7QUFDbkIsYUFBYSxhQUFhO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCwyREFBMkQsWUFBWTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCLGFBQWEsYUFBYTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQTZCO0FBQ2pDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlVQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7SUFLcUJBLFk7Ozs7OztBQUNqQjs7OzRCQUdhO0FBQ1QsbUJBQU8sS0FBS0MsR0FBWjtBQUNIO0FBQ0Q7Ozs7Ozs0QkFHUztBQUNMLG1CQUFPLEtBQUtBLEdBQVo7QUFDSDtBQUNEOzs7Ozs7NEJBR2dCO0FBQ1osbUJBQU8sS0FBS0MsTUFBWjtBQUNIO0FBQ0Q7Ozs7OztBQUdBLDRCQUFhO0FBQUE7O0FBRVQ7QUFDQTs7O0FBSFM7O0FBTVQsY0FBS0MsZ0JBQUwsR0FBd0IsRUFBeEI7O0FBRUE7QUFDQTs7O0FBR0EsY0FBS0YsR0FBTCxHQUFXRyxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQVg7QUFDQSxjQUFLSixHQUFMLENBQVNLLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLGNBQXZCO0FBQ0E7OztBQUdBLGNBQUtMLE1BQUwsR0FBYyxNQUFLRCxHQUFMLENBQVNPLFlBQVQsQ0FBc0IsRUFBQ0MsTUFBTSxNQUFQLEVBQXRCLENBQWQ7O0FBRUE7QUFDQSxjQUFLQyxXQUFMLENBQWlCQyxlQUFqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBMUJTO0FBMkJaO0FBQ0Q7Ozs7Ozs7OytCQUlPQyxPLEVBQVE7QUFDWCxpQkFBS1gsR0FBTCxDQUFTWSxXQUFULENBQXFCRCxPQUFyQjtBQUNIO0FBQ0Q7Ozs7OztvQ0FHWUEsTyxFQUFRO0FBQ2hCLGlCQUFLRSxNQUFMLENBQVlGLE9BQVo7QUFDSDtBQUNEOzs7Ozs7a0NBR1M7QUFDTDtBQUNBLGlCQUFLRywwQkFBTDtBQUNBO0FBQ0EsZ0JBQUcsS0FBS2QsR0FBTCxDQUFTZSxVQUFULElBQXVCLElBQTFCLEVBQStCO0FBQzNCLHFCQUFLZixHQUFMLENBQVNlLFVBQVQsQ0FBb0JDLFdBQXBCLENBQWdDLEtBQUtoQixHQUFyQztBQUNIO0FBQ0Q7QUFDQSxpQkFBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxpQkFBS0QsR0FBTCxHQUFXLElBQVg7QUFDSDtBQUNEOzs7Ozs7Ozs7O2dEQU93QmlCLE0sRUFBUUMsRyxFQUFLQyxRLEVBQTBCO0FBQUEsZ0JBQWhCQyxPQUFnQix1RUFBTixLQUFNOztBQUMzRCxnQkFBRyxLQUFLbEIsZ0JBQUwsQ0FBc0JtQixjQUF0QixDQUFxQ0gsR0FBckMsTUFBOEMsSUFBakQsRUFBc0Q7QUFDbEQscUJBQUtoQixnQkFBTCxDQUFzQmdCLEdBQXRCLEdBQTRCLEVBQTVCO0FBQ0g7QUFDRCxpQkFBS2hCLGdCQUFMLENBQXNCZ0IsR0FBdEIsQ0FBMEJJLElBQTFCLENBQStCO0FBQzNCTCx3QkFBUUEsTUFEbUI7QUFFM0JFLDBCQUFVQTtBQUZpQixhQUEvQjtBQUlBRixtQkFBT00sZ0JBQVAsQ0FBd0JMLEdBQXhCLEVBQTZCQyxRQUE3QixFQUF1Q0MsT0FBdkM7QUFDSDtBQUNEOzs7Ozs7cURBRzRCO0FBQUE7O0FBQUEsdUNBQ2hCRixHQURnQjtBQUVwQix1QkFBS2hCLGdCQUFMLENBQXNCZ0IsR0FBdEIsRUFBMkJNLEdBQTNCLENBQStCLFVBQUNDLENBQUQsRUFBTztBQUNsQ0Esc0JBQUVSLE1BQUYsQ0FBU1MsbUJBQVQsQ0FBNkJSLEdBQTdCLEVBQWtDTyxFQUFFTixRQUFwQztBQUNILGlCQUZEO0FBRm9COztBQUN4QixpQkFBSSxJQUFJRCxHQUFSLElBQWUsS0FBS2hCLGdCQUFwQixFQUFxQztBQUFBLHNCQUE3QmdCLEdBQTZCO0FBSXBDO0FBQ0QsaUJBQUtoQixnQkFBTCxHQUF3QixFQUF4QjtBQUNIO0FBQ0Q7Ozs7Ozs7b0NBSVlRLEcsRUFBSTtBQUNaLGdCQUFJaUIsUUFBUXhCLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWjtBQUNBdUIsa0JBQU1DLFdBQU4sR0FBb0JsQixHQUFwQjtBQUNBLGlCQUFLVCxNQUFMLENBQVk0QixZQUFaLENBQXlCRixLQUF6QixFQUFnQyxLQUFLMUIsTUFBTCxDQUFZNkIsVUFBNUM7QUFDSDs7OztFQWpIcUNDLHNCOztrQkFBckJoQyxZOzs7Ozs7Ozs7OztBQ1RyQixrQ0FBa0MsSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNDbEM7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7O0lBS3FCaUMsVTs7Ozs7O0FBQ2pCOzs7d0JBR21CO0FBQUMsYUFBTyxDQUN2QixPQUR1QixDQUFQO0FBRWpCO0FBQ0g7Ozs7OztBQUdBLHdCQUFhO0FBQUE7O0FBRVQ7O0FBRUE7QUFDQTs7O0FBTFM7O0FBUVQsVUFBS0MsS0FBTCxHQUFhOUIsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0EsVUFBSzZCLEtBQUwsQ0FBVzVCLFNBQVgsQ0FBcUJDLEdBQXJCLENBQXlCLFlBQXpCO0FBQ0EsVUFBS0wsTUFBTCxDQUFZVyxXQUFaLENBQXdCLE1BQUtxQixLQUE3Qjs7QUFFQTtBQUNBLFVBQUt4QixXQUFMLENBQWlCQyxlQUFqQjs7QUFFQTtBQUNBLFVBQUt3Qix1QkFBTCxDQUE2QixNQUFLRCxLQUFsQyxFQUF5QyxPQUF6QyxFQUFrRCxVQUFDZixHQUFELEVBQVM7QUFDdkQsWUFBS2lCLElBQUwsQ0FBVSxPQUFWLEVBQW1CakIsR0FBbkIsRUFBd0IsTUFBS2UsS0FBN0I7QUFDSCxLQUZELEVBRUcsS0FGSDtBQWhCUztBQW1CWjs7O0VBN0JtQ2xDLGU7O2tCQUFuQmlDLFU7Ozs7Ozs7Ozs7O0FDVHJCLGdDQUFnQyxLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NoQzs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7SUFLcUJJLGtCOzs7Ozs7QUFRakI7Ozt3QkFHVztBQUFDLGFBQU8sS0FBS0MsS0FBTCxDQUFXQyxLQUFsQjtBQUF5QjtBQUNyQzs7Ozs7O3dCQUdhO0FBQUMsYUFBTyxLQUFLRCxLQUFMLENBQVdDLEtBQWxCO0FBQXlCO0FBQ3ZDOzs7Ozs7Ozs7QUFmQTs7O3dCQUdtQjtBQUFDLGFBQU8sQ0FDdkIsT0FEdUIsRUFFdkIsUUFGdUIsQ0FBUDtBQUdqQjs7O0FBY0gsZ0NBQXFDO0FBQUEsUUFBekJDLElBQXlCLHVFQUFsQixFQUFrQjtBQUFBLFFBQWRELEtBQWMsdUVBQU4sS0FBTTs7QUFBQTs7QUFFakM7QUFDQTs7O0FBSGlDOztBQU1qQyxVQUFLQyxJQUFMLEdBQVlBLElBQVo7O0FBRUE7QUFDQTs7O0FBR0EsVUFBS0MsSUFBTCxHQUFZckMsU0FBU0MsYUFBVCxDQUF1QixPQUF2QixDQUFaO0FBQ0EsVUFBS29DLElBQUwsQ0FBVW5DLFNBQVYsQ0FBb0JDLEdBQXBCLENBQXdCLG9CQUF4QjtBQUNBOzs7QUFHQSxVQUFLbUMsR0FBTCxHQUFXdEMsU0FBU0MsYUFBVCxDQUF1QixLQUF2QixDQUFYO0FBQ0EsVUFBS3FDLEdBQUwsQ0FBU3BDLFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLEtBQXZCO0FBQ0E7OztBQUdBLFVBQUtvQyxLQUFMLEdBQWF2QyxTQUFTQyxhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQSxVQUFLc0MsS0FBTCxDQUFXckMsU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUIsT0FBekI7QUFDQTs7O0FBR0EsVUFBSytCLEtBQUwsR0FBYWxDLFNBQVNDLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBYjtBQUNBLFVBQUtpQyxLQUFMLENBQVdNLElBQVgsR0FBa0IsVUFBbEI7QUFDQSxVQUFLTixLQUFMLENBQVdPLE9BQVgsR0FBcUJOLEtBQXJCO0FBQ0EsVUFBS0UsSUFBTCxDQUFVNUIsV0FBVixDQUFzQixNQUFLeUIsS0FBM0I7QUFDQSxVQUFLRyxJQUFMLENBQVU1QixXQUFWLENBQXNCLE1BQUs2QixHQUEzQjtBQUNBLFVBQUtELElBQUwsQ0FBVTVCLFdBQVYsQ0FBc0IsTUFBSzhCLEtBQTNCO0FBQ0EsVUFBS3pDLE1BQUwsQ0FBWVcsV0FBWixDQUF3QixNQUFLNEIsSUFBN0I7QUFDQSxVQUFLRSxLQUFMLENBQVdkLFdBQVgsR0FBeUJXLElBQXpCOztBQUVBO0FBQ0EsVUFBSzlCLFdBQUwsQ0FBaUJDLGVBQWpCOztBQUVBO0FBQ0EsVUFBS3dCLHVCQUFMLENBQTZCLE1BQUtHLEtBQWxDLEVBQXlDLE9BQXpDLEVBQWtELFVBQUNuQixHQUFELEVBQVM7QUFDdkQsWUFBS2lCLElBQUwsQ0FBVSxPQUFWLEVBQW1CakIsR0FBbkI7QUFDSCxLQUZELEVBRUcsS0FGSDtBQUdBLFVBQUtnQix1QkFBTCxDQUE2QixNQUFLRyxLQUFsQyxFQUF5QyxRQUF6QyxFQUFtRCxVQUFDbkIsR0FBRCxFQUFTO0FBQ3hELFlBQUtpQixJQUFMLENBQVUsUUFBVixFQUFvQmpCLEdBQXBCO0FBQ0gsS0FGRCxFQUVHLEtBRkg7QUEzQ2lDO0FBOENwQztBQUNEOzs7Ozs7Ozs2QkFJcUI7QUFBQSxVQUFkMkIsT0FBYyx1RUFBTCxJQUFLOztBQUNqQixXQUFLUixLQUFMLENBQVdTLFFBQVgsR0FBc0IsQ0FBQ0QsT0FBdkI7QUFDSDtBQUNEOzs7Ozs7OzhCQUl1QjtBQUFBLFVBQWZFLFFBQWUsdUVBQUwsSUFBSzs7QUFDbkIsV0FBS1YsS0FBTCxDQUFXUyxRQUFYLEdBQXNCQyxRQUF0QjtBQUNIOzs7O0VBakYyQ2hELGU7O2tCQUEzQnFDLGtCOzs7Ozs7Ozs7OztBQ1RyQix1Q0FBdUMsc0JBQXNCLDBCQUEwQixxQkFBcUIsOEJBQThCLEtBQUssOEJBQThCLHNCQUFzQixLQUFLLGNBQWMsZ0NBQWdDLHdCQUF3Qix3QkFBd0IseUJBQXlCLHlCQUF5QixnQ0FBZ0MsOEJBQThCLEtBQUsscUJBQXFCLDJCQUEyQiwwQkFBMEIsb0JBQW9CLHFCQUFxQiw4QkFBOEIsMENBQTBDLEtBQUsscUNBQXFDLHFCQUFxQixLQUFLLHlCQUF5QixxQkFBcUIsS0FBSyxnQkFBZ0IsOEJBQThCLDBCQUEwQixLQUFLLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQzF4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCWSxNOzs7Ozs7OzRCQUNlO0FBQUMsbUJBQU9qRCxlQUFQO0FBQXFCOzs7NEJBQ3RCO0FBQUMsbUJBQU9pQyxlQUFQO0FBQW1COzs7NEJBQ3BCO0FBQUMsbUJBQU9JLGVBQVA7QUFBMkI7Ozs7OztrQkFIM0NZLE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSnJCOzs7Ozs7OztJQUVxQkMsVTs7Ozs7Ozs0QkFDRTtBQUFDLG1CQUFPQyxlQUFQO0FBQWU7Ozs7OztrQkFEbEJELFU7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGckI7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUUsSzs7Ozs7Ozs0QkFDZTtBQUFDLG1CQUFPQyxjQUFQO0FBQWE7Ozs0QkFDUjtBQUFDLG1CQUFPQyxlQUFQO0FBQW1COzs7Ozs7QUFHL0M7OztBQUNBQyxPQUFPSCxLQUFQLEdBQWVBLEtBQWYsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ1RxQkksSTs7Ozs7Ozs0QkFDQztBQUFDLG1CQUFPLFFBQVA7QUFBaUI7Ozs7OztrQkFEbkJBLEkiLCJmaWxlIjoiZ25vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2NyaXB0LmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHByZWZpeCA9ICd+JztcblxuLyoqXG4gKiBDb25zdHJ1Y3RvciB0byBjcmVhdGUgYSBzdG9yYWdlIGZvciBvdXIgYEVFYCBvYmplY3RzLlxuICogQW4gYEV2ZW50c2AgaW5zdGFuY2UgaXMgYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFdmVudHMoKSB7fVxuXG4vL1xuLy8gV2UgdHJ5IHRvIG5vdCBpbmhlcml0IGZyb20gYE9iamVjdC5wcm90b3R5cGVgLiBJbiBzb21lIGVuZ2luZXMgY3JlYXRpbmcgYW5cbi8vIGluc3RhbmNlIGluIHRoaXMgd2F5IGlzIGZhc3RlciB0aGFuIGNhbGxpbmcgYE9iamVjdC5jcmVhdGUobnVsbClgIGRpcmVjdGx5LlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGNoYXJhY3RlciB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdFxuLy8gb3ZlcnJpZGRlbiBvciB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vL1xuaWYgKE9iamVjdC5jcmVhdGUpIHtcbiAgRXZlbnRzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgLy9cbiAgLy8gVGhpcyBoYWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoZSBgX19wcm90b19fYCBwcm9wZXJ0eSBpcyBzdGlsbCBpbmhlcml0ZWQgaW5cbiAgLy8gc29tZSBvbGQgYnJvd3NlcnMgbGlrZSBBbmRyb2lkIDQsIGlQaG9uZSA1LjEsIE9wZXJhIDExIGFuZCBTYWZhcmkgNS5cbiAgLy9cbiAgaWYgKCFuZXcgRXZlbnRzKCkuX19wcm90b19fKSBwcmVmaXggPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBldmVudCBsaXN0ZW5lci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEBjb25zdHJ1Y3RvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBlbWl0dGVyIFJlZmVyZW5jZSB0byB0aGUgYEV2ZW50RW1pdHRlcmAgaW5zdGFuY2UuXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIFNwZWNpZnkgaWYgdGhlIGxpc3RlbmVyIGlzIGEgb25lLXRpbWUgbGlzdGVuZXIuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXIoZW1pdHRlciwgZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIH1cblxuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgZW1pdHRlciwgb25jZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCFlbWl0dGVyLl9ldmVudHNbZXZ0XSkgZW1pdHRlci5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lciwgZW1pdHRlci5fZXZlbnRzQ291bnQrKztcbiAgZWxzZSBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdLmZuKSBlbWl0dGVyLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IFtlbWl0dGVyLl9ldmVudHNbZXZ0XSwgbGlzdGVuZXJdO1xuXG4gIHJldHVybiBlbWl0dGVyO1xufVxuXG4vKipcbiAqIENsZWFyIGV2ZW50IGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldnQgVGhlIEV2ZW50IG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjbGVhckV2ZW50KGVtaXR0ZXIsIGV2dCkge1xuICBpZiAoLS1lbWl0dGVyLl9ldmVudHNDb3VudCA9PT0gMCkgZW1pdHRlci5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICBlbHNlIGRlbGV0ZSBlbWl0dGVyLl9ldmVudHNbZXZ0XTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBgRXZlbnRFbWl0dGVyYCBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBuYW1lcyA9IFtdXG4gICAgLCBldmVudHNcbiAgICAsIG5hbWU7XG5cbiAgaWYgKHRoaXMuX2V2ZW50c0NvdW50ID09PSAwKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIChldmVudHMgPSB0aGlzLl9ldmVudHMpKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbGlzdGVuZXJzIHJlZ2lzdGVyZWQgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0FycmF5fSBUaGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBoYW5kbGVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghaGFuZGxlcnMpIHJldHVybiBbXTtcbiAgaWYgKGhhbmRsZXJzLmZuKSByZXR1cm4gW2hhbmRsZXJzLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGhhbmRsZXJzLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IGhhbmRsZXJzW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gdGhlIG51bWJlciBvZiBsaXN0ZW5lcnMgbGlzdGVuaW5nIHRvIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWJlciBvZiBsaXN0ZW5lcnMuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uIGxpc3RlbmVyQ291bnQoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmICghbGlzdGVuZXJzKSByZXR1cm4gMDtcbiAgaWYgKGxpc3RlbmVycy5mbikgcmV0dXJuIDE7XG4gIHJldHVybiBsaXN0ZW5lcnMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBDYWxscyBlYWNoIG9mIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBldmVudCBoYWQgbGlzdGVuZXJzLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgNDogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMiwgYTMpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBBZGQgYSBsaXN0ZW5lciBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IHRvIGludm9rZSB0aGUgbGlzdGVuZXIgd2l0aC5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFkZCBhIG9uZS10aW1lIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICByZXR1cm4gYWRkTGlzdGVuZXIodGhpcywgZXZlbnQsIGZuLCBjb250ZXh0LCB0cnVlKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgb2YgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgbWF0Y2ggdGhpcyBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBPbmx5IHJlbW92ZSB0aGUgbGlzdGVuZXJzIHRoYXQgaGF2ZSB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25lLXRpbWUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuICBpZiAoIWZuKSB7XG4gICAgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdO1xuXG4gIGlmIChsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAoXG4gICAgICBsaXN0ZW5lcnMuZm4gPT09IGZuICYmXG4gICAgICAoIW9uY2UgfHwgbGlzdGVuZXJzLm9uY2UpICYmXG4gICAgICAoIWNvbnRleHQgfHwgbGlzdGVuZXJzLmNvbnRleHQgPT09IGNvbnRleHQpXG4gICAgKSB7XG4gICAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAodmFyIGkgPSAwLCBldmVudHMgPSBbXSwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHxcbiAgICAgICAgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSB8fFxuICAgICAgICAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAgIC8vXG4gICAgaWYgKGV2ZW50cy5sZW5ndGgpIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgICBlbHNlIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycywgb3IgdGhvc2Ugb2YgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gW2V2ZW50XSBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9IGB0aGlzYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dDtcblxuICBpZiAoZXZlbnQpIHtcbiAgICBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuICAgIGlmICh0aGlzLl9ldmVudHNbZXZ0XSkgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX2V2ZW50cyA9IG5ldyBFdmVudHMoKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBwcmVmaXguXG4vL1xuRXZlbnRFbWl0dGVyLnByZWZpeGVkID0gcHJlZml4O1xuXG4vL1xuLy8gQWxsb3cgYEV2ZW50RW1pdHRlcmAgdG8gYmUgaW1wb3J0ZWQgYXMgbW9kdWxlIG5hbWVzcGFjZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgbW9kdWxlKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xufVxuIiwiXHJcbmltcG9ydCBjc3MgZnJvbSAnLi9zdHlsZS5jc3MnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyMyBmcm9tICdldmVudGVtaXR0ZXIzJztcclxuXHJcbi8qKlxyXG4gKiBzdXBlciBjbGFzcyBvZiBHTk9ERSBlbGVtZW50XHJcbiAqIEBjbGFzc1xyXG4gKiBAZXh0ZW5kcyB7RXZlbnRFbWl0dGVyM31cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdOT0RFRWxlbWVudCBleHRlbmRzIEV2ZW50RW1pdHRlcjMge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAYWxpYXMgZG9tXHJcbiAgICAgKi9cclxuICAgIGdldCBlbGVtZW50KCl7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAYWxpYXMgZG9tXHJcbiAgICAgKi9cclxuICAgIGdldCBlbG0oKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5kb207XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBhbGlhcyBzaGFkb3dcclxuICAgICAqL1xyXG4gICAgZ2V0IHNoYWRvd1Jvb3QoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaGFkb3c7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBwcm9wZXJ0aWVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzRm9yU2VsZiA9IHt9O1xyXG5cclxuICAgICAgICAvLyBkb20gZ2VuZXJhdGlvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtIVE1MRGl2RWxlbWVudH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuZG9tLmNsYXNzTGlzdC5hZGQoJ0dOT0RFRWxlbWVudCcpO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtTaGFkb3dSb290fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuc2hhZG93ID0gdGhpcy5kb20uYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcclxuXHJcbiAgICAgICAgLy8gc3R5bGUgc2V0dGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICB0aGlzLmFwcGVuZFN0eWxlKGNzcyk7XHJcblxyXG4gICAgICAgIC8vIGV2ZW50IHNldHRpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLyoqIEBleGFtcGxlICovXHJcbiAgICAgICAgLy8gdGhpcy5hZGRFdmVudExpc3RlbmVyRm9yU2VsZih0aGlzLmRvbSwgJ2NsaWNrJywgKGV2dCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmVtaXQoJ2NsaWNrJywgZXZ0KTtcclxuICAgICAgICAvLyB9LCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIGFwcGVuZCB0byB0aGlzLmRvbVxyXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCAtIGh0bWwgZWxlbWVudFxyXG4gICAgICovXHJcbiAgICBhcHBlbmQoZWxlbWVudCl7XHJcbiAgICAgICAgdGhpcy5kb20uYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBhbGlhcyBhcHBlbmRcclxuICAgICAqL1xyXG4gICAgYXBwZW5kQ2hpbGQoZWxlbWVudCl7XHJcbiAgICAgICAgdGhpcy5hcHBlbmQoZWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHJlbGVhc2VcclxuICAgICAqL1xyXG4gICAgcmVsZWFzZSgpe1xyXG4gICAgICAgIC8vIHJlbW92ZSBldmVudCBsaXN0ZW5lclxyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lckZvclNlbGYoKTtcclxuICAgICAgICAvLyByZW1vdmUgYWxsIGVsZW1lbnRcclxuICAgICAgICBpZih0aGlzLmRvbS5wYXJlbnROb2RlICE9IG51bGwpe1xyXG4gICAgICAgICAgICB0aGlzLmRvbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZG9tKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2xlYXIgbWVtYmVyXHJcbiAgICAgICAgdGhpcy5zaGFkb3cgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZG9tID0gbnVsbDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogYWRkIGV2ZW50IGZvciBzZWxmXHJcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhcmdldCAtIGV2ZW50IHRhcmdldFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2dCAtIGV2ZW50IG5hbWVcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIC0gbGlzdGVuZXIgZnVuY3Rpb25cclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NhcHR1cmU9ZmFsc2VdIC0gaXMgdXNpbmcgY2FwdHVyZVxyXG4gICAgICovXHJcbiAgICBhZGRFdmVudExpc3RlbmVyRm9yU2VsZih0YXJnZXQsIGV2dCwgbGlzdGVuZXIsIGNhcHR1cmUgPSBmYWxzZSl7XHJcbiAgICAgICAgaWYodGhpcy5saXN0ZW5lcnNGb3JTZWxmLmhhc093blByb3BlcnR5KGV2dCkgIT09IHRydWUpe1xyXG4gICAgICAgICAgICB0aGlzLmxpc3RlbmVyc0ZvclNlbGYuZXZ0ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzRm9yU2VsZi5ldnQucHVzaCh7XHJcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxyXG4gICAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldnQsIGxpc3RlbmVyLCBjYXB0dXJlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogcmVtb3ZlIGV2ZW50IGZvciBzZWxmXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJGb3JTZWxmKCl7XHJcbiAgICAgICAgZm9yKGxldCBldnQgaW4gdGhpcy5saXN0ZW5lcnNGb3JTZWxmKXtcclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNGb3JTZWxmW2V2dF0ubWFwKCh2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dCwgdi5saXN0ZW5lcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpc3RlbmVyc0ZvclNlbGYgPSB7fTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogYXBwZW5kIHN0eWxlIHRhZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNzcyAtIGNzcyBmcm9tIHJhdy1sb2FkZXJcclxuICAgICAqL1xyXG4gICAgYXBwZW5kU3R5bGUoY3NzKXtcclxuICAgICAgICBsZXQgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgICAgIHN0eWxlLnRleHRDb250ZW50ID0gY3NzO1xyXG4gICAgICAgIHRoaXMuc2hhZG93Lmluc2VydEJlZm9yZShzdHlsZSwgdGhpcy5zaGFkb3cuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIi5HTk9ERUVsZW1lbnQge31cXHJcXG5cIiIsIlxyXG5pbXBvcnQgY3NzIGZyb20gJy4vc3R5bGUuY3NzJztcclxuaW1wb3J0IEdOT0RFRWxlbWVudCBmcm9tICcuLi9HTk9ERUVsZW1lbnQvaW5kZXguanMnO1xyXG5cclxuLyoqXHJcbiAqIHNpbXBsZSBmcmFtZSBlbGVtZW50XHJcbiAqIEBjbGFzc1xyXG4gKiBAZXh0ZW5kcyB7R05PREVFbGVtZW50fVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR05PREVGcmFtZSBleHRlbmRzIEdOT0RFRWxlbWVudCB7XHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtBcnJheTxzdHJpbmc+fVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0IEVWRU5UUygpe3JldHVybiBbXHJcbiAgICAgICAgJ2NsaWNrJyxcclxuICAgIF07fVxyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vIGluaXRpYWxpemUgcHJvcGVydGllcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gICAgICAgIC8vIGRvbSBnZW5lcmF0aW9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHR5cGUge0hUTUxEaXZFbGVtZW50fVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmZyYW1lLmNsYXNzTGlzdC5hZGQoJ0dOT0RFRnJhbWUnKTtcclxuICAgICAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZCh0aGlzLmZyYW1lKTtcclxuXHJcbiAgICAgICAgLy8gc3R5bGUgc2V0dGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICB0aGlzLmFwcGVuZFN0eWxlKGNzcyk7XHJcblxyXG4gICAgICAgIC8vIGV2ZW50IHNldHRpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyRm9yU2VsZih0aGlzLmZyYW1lLCAnY2xpY2snLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnY2xpY2snLCBldnQsIHRoaXMuZnJhbWUpO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiLkdOT0RFRnJhbWUge31cXHJcXG5cIiIsIlxyXG5pbXBvcnQgY3NzIGZyb20gJy4vc3R5bGUuY3NzJztcclxuaW1wb3J0IEdOT0RFRWxlbWVudCBmcm9tICcuLi9HTk9ERUVsZW1lbnQvaW5kZXguanMnO1xyXG5cclxuLyoqXHJcbiAqIHNpbXBsZSBpbnB1dCBjaGVja2JveFxyXG4gKiBAY2xhc3NcclxuICogQGV4dGVuZHMge0V2ZW50RW1pdHRlcjN9XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHTk9ERUlucHV0Q2hlY2tib3ggZXh0ZW5kcyBHTk9ERUVsZW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn1cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldCBFVkVOVFMoKXtyZXR1cm4gW1xyXG4gICAgICAgICdpbnB1dCcsXHJcbiAgICAgICAgJ2NoYW5nZScsXHJcbiAgICBdO31cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIGdldCB2YWx1ZSgpe3JldHVybiB0aGlzLmlucHV0LnZhbHVlO31cclxuICAgIC8qKlxyXG4gICAgICogQGFsaWFzIHZhbHVlXHJcbiAgICAgKi9cclxuICAgIGdldCBjaGVja2VkKCl7cmV0dXJuIHRoaXMuaW5wdXQudmFsdWU7fVxyXG4gICAgLyoqXHJcbiAgICAgKiBAY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbdGV4dD0nJ10gLSB0ZXh0XHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFt2YWx1ZT1mYWxzZV0gLSBjaGVja2VkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRleHQgPSAnJywgdmFsdWUgPSBmYWxzZSl7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvLyBpbml0aWFsaXplIHByb3BlcnRpZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuXHJcbiAgICAgICAgLy8gZG9tIGdlbmVyYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7SFRNTExhYmVsRWxlbWVudH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLndyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xyXG4gICAgICAgIHRoaXMud3JhcC5jbGFzc0xpc3QuYWRkKCdHTk9ERUlucHV0Q2hlY2tib3gnKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5ib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICB0aGlzLmJveC5jbGFzc0xpc3QuYWRkKCdib3gnKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7SFRNTERpdkVsZW1lbnR9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMubGFiZWwuY2xhc3NMaXN0LmFkZCgnbGFiZWwnKTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH1cclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgICAgICB0aGlzLmlucHV0LnR5cGUgPSAnY2hlY2tib3gnO1xyXG4gICAgICAgIHRoaXMuaW5wdXQuY2hlY2tlZCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZCh0aGlzLmlucHV0KTtcclxuICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQodGhpcy5ib3gpO1xyXG4gICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZCh0aGlzLmxhYmVsKTtcclxuICAgICAgICB0aGlzLnNoYWRvdy5hcHBlbmRDaGlsZCh0aGlzLndyYXApO1xyXG4gICAgICAgIHRoaXMubGFiZWwudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG5cclxuICAgICAgICAvLyBzdHlsZSBzZXR0aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgICAgIHRoaXMuYXBwZW5kU3R5bGUoY3NzKTtcclxuXHJcbiAgICAgICAgLy8gZXZlbnQgc2V0dGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJGb3JTZWxmKHRoaXMuaW5wdXQsICdpbnB1dCcsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdpbnB1dCcsIGV2dCk7XHJcbiAgICAgICAgfSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lckZvclNlbGYodGhpcy5pbnB1dCwgJ2NoYW5nZScsIChldnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBldnQpO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogc2V0IGRpc2FibGVkIGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZW5hYmxlPXRydWVdIC0gZGlzYWJsZWQgPSAhZW5hYmxlXHJcbiAgICAgKi9cclxuICAgIGVuYWJsZShlbmFibGUgPSB0cnVlKXtcclxuICAgICAgICB0aGlzLmlucHV0LmRpc2FibGVkID0gIWVuYWJsZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogc2V0IGRpc2FibGVkIGF0dHJpYnV0ZVxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZGlzYWJsZT10cnVlXSAtIGRpc2FibGVkXHJcbiAgICAgKi9cclxuICAgIGRpc2FibGUoZGlzYWJsZSA9IHRydWUpe1xyXG4gICAgICAgIHRoaXMuaW5wdXQuZGlzYWJsZWQgPSBkaXNhYmxlO1xyXG4gICAgfVxyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCIuR05PREVJbnB1dENoZWNrYm94IHtcXHJcXG4gICAgY29sb3I6IHNpbHZlcjtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG5pbnB1dFt0eXBlPWNoZWNrYm94XSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5ib3gge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgbWluLXdpZHRoOiAyMHB4O1xcclxcbiAgICBtYXgtd2lkdGg6IDIwcHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1heC1oZWlnaHQ6IDIwcHg7XFxyXFxuICAgIG1hcmdpbjogMHB4IDVweCAwcHggMHB4O1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5ib3g6YmVmb3JlIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDBweCAxcHggaW5zZXQ7XFxyXFxufVxcclxcblxcclxcbmlucHV0OmNoZWNrZWQgKyAuYm94OmJlZm9yZSB7XFxyXFxuICAgIGNvbnRlbnQ6ICfinJMnO1xcclxcbn1cXHJcXG5pbnB1dCArIC5ib3g6YmVmb3JlIHtcXHJcXG4gICAgY29udGVudDogJ+OAgCc7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbCB7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XFxyXFxufVxcclxcblwiIiwiXHJcbmltcG9ydCBHTk9ERUVsZW1lbnQgICAgICAgZnJvbSAnLi9HTk9ERUVsZW1lbnQvaW5kZXguanMnO1xyXG5pbXBvcnQgR05PREVGcmFtZSAgICAgICAgIGZyb20gJy4vR05PREVGcmFtZS9pbmRleC5qcyc7XHJcbmltcG9ydCBHTk9ERUlucHV0Q2hlY2tib3ggZnJvbSAnLi9HTk9ERUlucHV0Q2hlY2tib3gvaW5kZXguanMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tbW9uIHtcclxuICAgIHN0YXRpYyBnZXQgR05PREVFbGVtZW50KCkgICAgICAge3JldHVybiBHTk9ERUVsZW1lbnQ7fVxyXG4gICAgc3RhdGljIGdldCBHTk9ERUZyYW1lKCkgICAgICAgICB7cmV0dXJuIEdOT0RFRnJhbWU7fVxyXG4gICAgc3RhdGljIGdldCBHTk9ERUlucHV0Q2hlY2tib3goKSB7cmV0dXJuIEdOT0RFSW5wdXRDaGVja2JveDt9XHJcbn1cclxuXHJcbiIsIlxyXG5pbXBvcnQgY29tbW9uIGZyb20gJy4vY29tbW9uL2luZGV4LmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBvbmVudHMge1xyXG4gICAgc3RhdGljIGdldCBjb21tb24oKXtyZXR1cm4gY29tbW9uO31cclxufVxyXG5cclxuIiwiXHJcbmltcG9ydCB1dGlsIGZyb20gJy4vc3RhdGljL3V0aWwuanMnO1xyXG5pbXBvcnQgY29tcG9uZW50cyBmcm9tICcuL2NvbXBvbmVudHMvaW5kZXguanMnO1xyXG5cclxuY2xhc3MgR05PREUge1xyXG4gICAgc3RhdGljIGdldCB1dGlsKCl7cmV0dXJuIHV0aWw7fVxyXG4gICAgc3RhdGljIGdldCBjb21wb25lbnRzKCl7cmV0dXJuIGNvbXBvbmVudHM7fVxyXG59XHJcblxyXG4vLyB0ZW1wXHJcbndpbmRvdy5HTk9ERSA9IEdOT0RFO1xyXG5cclxuIiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWwge1xyXG4gICAgc3RhdGljIGdldCBoZWxsbygpe3JldHVybiAnaGVsbG8hJzt9XHJcbn1cclxuXHJcbiJdLCJzb3VyY2VSb290IjoiIn0=