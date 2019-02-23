
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input text
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputText extends GNODEElement {
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
    get description(){return 'simple input text.';}
    /**
     * @type {HTMLInputElement}
     */
    get control(){return this.input;}
    /**
     * @type {string}
     */
    get value(){return this.input.value;}
    /**
     * @param {boolean} v - value
     */
    set value(v){this.input.value = v;}

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
        super(name);
        // initialize properties ----------------------------------------------

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEInputText');
        /**
         * @type {HTMLInputElement}
         */
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.value = value;
        this.input.name = name;
        this.input.setAttribute('placeholder', placeholder);
        this.input.setAttribute('maxlength', max);
        this.shadow.appendChild(this.input);

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
