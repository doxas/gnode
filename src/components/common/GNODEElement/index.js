
import css from './style.css';
import Util from '../../../static/util.js';
import EventEmitter3 from 'eventemitter3';

const ERR_APPEND = `[GNODE ERROR] invalid argument 1 is not of type 'Element' or 'GNODEElement'`;

/**
 * super class of GNODE element
 * @class
 * @extends {EventEmitter3}
 */
export default class GNODEElement extends EventEmitter3 {
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'description text.';}
    /**
     * @alias dom
     */
    get element(){
        return this.dom;
    }
    /**
     * @alias dom
     */
    get elm(){
        return this.dom;
    }
    /**
     * @alias shadow
     */
    get shadowRoot(){
        return this.shadow;
    }
    /**
     * @type {HTMLDivElement}
     */
    get control(){return null;}
    /**
     * @constructor
     * @param {string} name - name of element
     */
    constructor(name){
        super();
        // initialize properties ----------------------------------------------
        /**
         * @type {string}
         */
        this.name = name;
        /**
         * @type {object}
         */
        this.listenersForSelf = {};
        /**
         * @type {Array}
         */
        this.children = [];

        // dom generation -----------------------------------------------------
        /**
         * @type {HTMLDivElement}
         */
        this.dom = document.createElement('div');
        this.dom.classList.add('GNODEElement');
        /**
         * @type {ShadowRoot}
         */
        this.shadow = this.dom.attachShadow({mode: 'open'});

        // style setting ------------------------------------------------------
        this.addStyle({});
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        // see addEventListenerForSelf method comments
    }
    /**
     * append to this.dom
     * @param {HTMLElement|GNODEElement} element - html element or GNODEElement
     */
    append(element){
        if(element == null){
            throw new Error(ERR_APPEND);
        }
        if(element instanceof GNODEElement === true){
            this.children.push(element);
            this.shadow.appendChild(element.element);
        }else if(element instanceof HTMLElement === true){
            this.shadow.appendChild(element);
        }else{
            throw new Error(ERR_APPEND);
        }
    }
    /**
     * @alias append
     */
    appendChild(element){
        this.append(element);
    }
    /**
     * append style tag
     * @param {string} css - css from webpack raw-loader (plane text)
     */
    appendStyle(css){
        let style = document.createElement('style');
        style.textContent = css;
        this.shadow.insertBefore(style, this.shadow.firstChild);
    }
    /**
     * add style to dom
     * @param {object} style - object of style
     */
    addStyle(style){
        if(Util.isObject(style) !== true){return;}
        for(let key in style){
            this.dom.style[key] = style[key];
        }
    }
    /**
     * add attribute to dom
     * @param {object} attribute - object of attribute
     */
    addAttribute(attribute){
        if(Util.isObject(attribute) !== true){return;}
        for(let key in attribute){
            this.dom.setAttribute(key, attribute[key]);
        }
    }
    /**
     * release
     */
    release(){
        // remove all child of GNODEElement
        this.children.map((v) => {
            v.release();
            v = null;
        });
        // remove event listener
        this.removeEventListenerForSelf();
        // remove all element
        if(this.dom.parentNode != null){
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
     * @example
     * // in constructor
     * this.addEventListenerForSelf(this.dom, 'click', (evt) => {
     *     this.emit('click', evt);
     * }, false);
     */
    addEventListenerForSelf(target, evt, listener, capture = false){
        if(this.listenersForSelf.hasOwnProperty(evt) !== true){
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
    removeEventListenerForSelf(){
        for(let evt in this.listenersForSelf){
            this.listenersForSelf[evt].map((v) => {
                v.target.removeEventListener(evt, v.listener);
            });
        }
        this.listenersForSelf = {};
    }
}
