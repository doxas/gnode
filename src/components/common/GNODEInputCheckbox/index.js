
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input checkbox
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputCheckbox extends GNODEElement {
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
    get description(){return 'simple input checkbox.';}
    /**
     * @type {HTMLInputElement}
     */
    get control(){return this.input;}
    /**
     * @type {boolean}
     */
    get value(){return this.input.checked;}
    /**
     * @param {boolean} v - checked
     */
    set value(v){this.input.checked = v;}
    /**
     * @alias value
     */
    get checked(){return this.value;}
    /**
     * @param {boolean} v - checked
     */
    set checked(v){this.value = v;}

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
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {string}
         */
        this.text = text;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEInputCheckbox');
        /**
         * @type {HTMLLabelElement}
         */
        this.wrap = document.createElement('label');
        this.wrap.classList.add('wrap');
        this.wrap.setAttribute('tabindex', 0);
        /**
         * @type {HTMLDivElement}
         */
        this.box = document.createElement('div');
        this.box.classList.add('box');
        /**
         * @type {HTMLDivElement}
         */
        this.before = document.createElement('div');
        this.before.classList.add('before');
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
        this.box.appendChild(this.before);
        this.wrap.appendChild(this.input);
        this.wrap.appendChild(this.box);
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
            this.emit('input', this.value, evt);
        }, false);
        this.addEventListenerForSelf(this.input, 'change', (evt) => {
            this.emit('change', this.value, evt);
        }, false);
        this.addEventListenerForSelf(this.wrap, 'keydown', (evt) => {
            evt.preventDefault();
            if(evt.key === ' '){
                this.input.checked = !this.input.checked;
            }
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
