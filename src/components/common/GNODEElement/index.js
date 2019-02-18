
import css from './style.css';

export default class GNODEElement {
    /**
     * @type {HTMLElement}
     */
    get element(){
        return this.dom;
    }
    /**
     * @constructor
     * @param {string} [element='div'] - tag name
     */
    constructor(element = 'div'){
        this.dom = null;
        if(element == null){return;}
        this.dom = document.createElement(element);
        this.dom.classList.add('GNODEElement');
    }
}
