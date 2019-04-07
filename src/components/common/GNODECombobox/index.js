
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple combobox
 * @class
 * @extends {GNODEElement}
 */
export default class GNODECombobox extends GNODEElement {
    /**
     * @type {Array.<string>}
     */
    static get EVENTS(){return [
        'input',
        'change',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple combobox.';}
    /**
     * @type {HTMLInputElement}
     */
    get control(){return this.input;}
    /**
     * @type {string}
     */
    get value(){return this.input.value;}
    /**
     * @param {string} v - value
     */
    set value(v){this.input.value = v;}

    /**
     * @constructor
     * @param {string} [value=''] - value
     * @param {string} [name=''] - name
     * @param {Array.<string>} [item=[]] - list items
     * @param {string} [placeholder=''] - placeholder
     * @param {number} [max=null] - maxlength
     * @example
     * let maxlength = 20;
     * let E = new GNODECombobox('value', 'name', 'placeholder', maxlength);
     */
    constructor(value = '', name = '', item = [], placeholder = '', max){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {Array.<HTMLDivElement>}
         */
        this.item = [];
        /**
         * @type {Array.<function>}
         */
        this.itemListener = [];
        /**
         * @type {Array.<string>}
         */
        this.list = item;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODECombobox');
        /**
         * @type {HTMLInputElement}
         */
        this.input = document.createElement('input');
        this.input.type = 'text';
        this.input.value = value;
        this.input.name = name;
        this.input.setAttribute('placeholder', placeholder);
        this.input.setAttribute('maxlength', max);
        /**
         * @type {HTMLDivElement}
         */
        this.wrap = document.createElement('div');
        this.wrap.classList.add('listwrap');
        this.list.map((v) => {
            let e = document.createElement('div');
            e.classList.add('list');
            e.textContent = v;
            this.wrap.appendChild(e);
            this.item.push(e);
        });
        this.append(this.input);
        this.append(this.wrap);

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
            this.wrap.classList.remove('visible');
            this.item.map((v, index) => {
                v.removeEventListener('click', this.itemListener[index]);
            });
        }, false);
        this.addEventListenerForSelf(this.input, 'focus', (evt) => {
            this.wrap.classList.add('visible');
            this.item.map((v, index) => {
                this.itemListener[index] = (evt) => {
                    this.input.value = this.item[index].textContent;
                    this.emit('input', this.value, evt);
                    this.emit('change', this.value, evt);
                };
                v.addEventListener('click', this.itemListener[index], false);
            });
        }, false);
        this.addEventListenerForSelf(this.input, 'blur', (evt) => {
            setTimeout(() => {
                this.wrap.classList.remove('visible');
                this.item.map((v, index) => {
                    v.removeEventListener('click', this.itemListener[index]);
                });
            }, 100);
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
