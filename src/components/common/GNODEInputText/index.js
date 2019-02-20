
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input text
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputText extends GNODEElement {
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple input text.';}
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'input',
        'change',
    ];}
    /**
     * @alias checked
     */
    get value(){return this.input.value;}
    /**
     * @constructor
     * @param {string} [value=''] - value
     * @param {string} [name=''] - name
     * @param {string} [placeholder=''] - placeholder
     * @param {number} [max=null] - maxlength
     * @example
     * let maxlength = 20;
     * let E = new GNODEInputText('value', 'name', 'placeholder', maxlength);
     */
    constructor(value = '', name = '', placeholder = '', max){
        super();
        // initialize properties ----------------------------------------------
        /**
         * @type {string}
         */
        this.name = name;

        // dom generation -----------------------------------------------------
        /**
         * @type {HTMLDivElement}
         */
        this.wrap = document.createElement('div');
        this.wrap.classList.add('GNODEInputText');
        /**
         * @type {HTMLInputElement}
         */
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.value = value;
        this.input.name = name;
        this.input.setAttribute('placeholder', placeholder);
        this.input.setAttribute('maxlength', max);
        this.wrap.appendChild(this.input);
        this.shadow.appendChild(this.wrap);

        // style setting ------------------------------------------------------
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.input, 'input', (evt) => {
            this.emit('input', evt);
        }, false);
        this.addEventListenerForSelf(this.input, 'change', (evt) => {
            this.emit('change', evt);
        }, false);
    }
    /**
     * set disabled attribute
     * @param {boolean} [enable=true] - disabled = !enable
     */
    enable(enable = true){
        this.input.disabled = !enable;
    }
    /**
     * set disabled attribute
     * @param {boolean} [disable=true] - disabled
     */
    disable(disable = true){
        this.input.disabled = disable;
    }
}
