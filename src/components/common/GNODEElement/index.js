
import css from './style.css';

import EventEmitter3 from 'eventemitter3';

export default class GNODEElement extends EventEmitter3 {
    /**
     * @type {HTMLElement}
     */
    get element(){
        return this.dom;
    }
    /**
     * @alias element
     */
    get elm(){
        return this.element;
    }
    /**
     * @type {ShadowRoot}
     */
    get shadow(){
        return this.shadowRoot;
    }
    /**
     * @constructor
     */
    constructor(){
        super();
        this.dom = document.createElement('div');
        this.dom.classList.add('GNODEElement');
        this.shadowRoot = this.dom.attachShadow({mode: 'open'});
    }
}
