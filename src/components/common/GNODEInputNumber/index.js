
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input number
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputNumber extends GNODEElement {
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'input',
        'change',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple input number.';}
    /**
     * @type {HTMLInputElement}
     */
    get control(){return this.input;}
    /**
     * @type {number}
     */
    get value(){return this.input.value;}
    /**
     * @param {number} v - value
     */
    set value(v){this.input.value = v;}
    /**
     * @type {number}
     */
    get min(){return this.input.min;}
    /**
     * @param {number} v - min
     */
    set min(v){this.input.min = v;}
    /**
     * @type {number}
     */
    get max(){return this.input.max;}
    /**
     * @param {number} v - max
     */
    set max(v){this.input.max = v;}
    /**
     * @type {number}
     */
    get step(){return this.input.step;}
    /**
     * @param {number} v - step
     */
    set step(v){this.input.step = v;}
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
        super(name);
        // initialize properties ----------------------------------------------

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEInputNumber');
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
        this.append(this.input);

        // style setting ------------------------------------------------------
        this.addStyle({
            color:         `${CONST.COMPONENT_DEFAULT_COLOR}`,
            lineHeight:    `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            height:        `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            verticalAlign: 'middle',
            display:       'inline-block',
        });
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.input, 'input', (evt) => {
            this.emit('input', this.value, evt);
        }, false);
        this.addEventListenerForSelf(this.input, 'change', (evt) => {
            this.emit('change', this.value, evt);
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
        this.enable(!disable);
    }
}
