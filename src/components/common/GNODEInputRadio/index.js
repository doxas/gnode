
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input radio button
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputRadio extends GNODEElement {
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
    get description(){return 'simple input radio button.';}
    /**
     * @type {HTMLInputElement}
     */
    get control(){return this.input;}
    /**
     * @type {boolean}
     */
    get checked(){return this.input.checked;}
    /**
     * @alias checked
     */
    get value(){return this.input.checked;}
    /**
     * @param {boolean} v - checked
     */
    set value(v){this.input.checked = v;}

    /**
     * @constructor
     * @param {boolean} [value=false] - checked
     * @param {string} [name=''] - name
     * @param {string} [text=''] - text
     * @example
     * let checked = true;
     * let E = new GNODEInputRadio(checked, 'name', 'label caption');
     */
    constructor(value = false, name = '', text = ''){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {string}
         */
        this.text = text;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEInputRadio');
        /**
         * @type {HTMLLabelElement}
         */
        this.wrap = document.createElement('label');
        this.wrap.classList.add('wrap');
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
