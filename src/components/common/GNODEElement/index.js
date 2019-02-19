
import css from './style.css';
import EventEmitter3 from 'eventemitter3';

export default class GNODEElement extends EventEmitter3 {
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
     * @constructor
     */
    constructor(){
        super();
        // initialize properties
        this.listenersForSelf = {};

        // dom generation
        this.dom = document.createElement('div');
        this.dom.classList.add('GNODEElement');
        this.shadow = this.dom.attachShadow({mode: 'open'});

        // style setting
        this.appendStyle(css);
    }
    /**
     * append to this.dom
     * @param {HTMLElement} element - html element
     */
    append(element){
        this.dom.appendChild(element);
    }
    /**
     * @alias append
     */
    appendChild(element){
        this.append(element);
    }
    /**
     * release
     */
    release(){
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
    /**
     * append style tag
     * @param {string} css - css from raw-loader
     */
    appendStyle(css){
        let style = document.createElement('style');
        style.textContent = css;
        this.shadow.insertBefore(style, this.shadow.firstChild);
    }
}
