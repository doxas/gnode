
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input checkbox
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputCheckbox extends GNODEElement {
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple input checkbox.';}
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
     * @param {boolean} [value=false] - checked
     * @param {string} [name=''] - name
     * @param {string} [text=''] - text
     * @example
     * let checked = true;
     * let E = new GNODEInputCheckbox(checked, 'name', 'label caption');
     */
    constructor(value = false, name = '', text = ''){
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
        this.wrap.classList.add('GNODEInputCheckbox');
        /**
         * @type {HTMLDivElement}
         */
        this.box = document.createElement('div');
        this.box.classList.add('box');
        /**
         * @type {HTMLDivElement}
         */
        this.label = document.createElement('div');
        this.label.classList.add('label');
        /**
         * @type {HTMLInputElement}
         */
        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.checked = value;
        this.input.name = name;
        this.wrap.appendChild(this.input);
        this.wrap.appendChild(this.box);
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
