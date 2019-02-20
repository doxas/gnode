
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input number
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputNumber extends GNODEElement {
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple input number.';}
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'input',
        'change',
    ];}
    /**
     * @type {number}
     */
    get value(){return this.input.value;}
    /**
     * @constructor
     * @param {number} [value=0] - value
     * @param {string} [name=''] - name
     * @param {number} [min=0] - min value
     * @param {number} [max=100] - max value
     * @param {number} [step=0] - step value
     * @example
     * let E = new GNODEInputNumber(50, 'name', 0, 100, 0.1);
     */
    constructor(value = 0, name = '', min = 0, max = 100, step = 1){
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
        this.wrap.classList.add('GNODEInputNumber');
        /**
         * @type {HTMLInputElement}
         */
        this.input = document.createElement('input');
        this.input.type = 'number';
        this.input.value = value;
        this.input.name = name;
        this.input.min = min;
        this.input.max = max;
        this.input.step = step;
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
