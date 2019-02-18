
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
        this.dom = document.createElement('div');
        this.dom.classList.add('GNODEElement');
        this.shadow = this.dom.attachShadow({mode: 'open'});
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
        if(this.dom.parentNode != null){
            this.dom.parentNode.removeChild(this.dom);
        }
        this.shadow = null;
        this.dom = null;
    }
}
