
import css from './style.css';

export default class GNODEElement {
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
        this.dom = document.createElement('div');
        this.dom.classList.add('GNODEElement');
        this.shadowRoot = this.dom.attachShadow({mode: 'open'});
    }
}
