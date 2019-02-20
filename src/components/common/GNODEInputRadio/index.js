
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input radio button
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputRadio extends GNODEElement {
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple input radio button.';}
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'input',
        'change',
    ];}
    /**
     * @type {boolean}
     */
    get checked(){return this.input.checked;}
    /**
     * @alias checked
     */
    get value(){return this.input.checked;}
    /**
     * @constructor
     * @param {string} [text=''] - text
     * @param {string} [name=''] - name
     * @param {boolean} [value=false] - checked
     * @example
     * let checked = true;
     * let E = new GNODEInputRadio('label caption', checked);
     */
    constructor(text = '', name = '', value = false){
        super();
        // initialize properties ----------------------------------------------
        /**
         * @type {string}
         */
        this.text = text;
        /**
         * @type {string}
         */
        this.name = name;

        // dom generation -----------------------------------------------------
        /**
         * @type {HTMLLabelElement}
         */
        this.wrap = document.createElement('label');
        this.wrap.classList.add('GNODEInputRadio');
        /**
         * @type {HTMLDivElement}
         */
        this.radio = document.createElement('div');
        this.radio.classList.add('radio');
        /**
         * @type {HTMLDivElement}
         */
        this.label = document.createElement('div');
        this.label.classList.add('label');
        /**
         * @type {HTMLInputElement}
         */
        this.input = document.createElement('input');
        this.input.type = 'radio';
        this.input.checked = value;
        this.input.name = name;
        this.wrap.appendChild(this.input);
        this.wrap.appendChild(this.radio);
        this.wrap.appendChild(this.label);
        this.shadow.appendChild(this.wrap);
        this.label.textContent = text;

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
