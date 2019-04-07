
import css from './style.css';
import Util from '../../../static/util.js';
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
     * let presetItems = ['item1', 'item2'];
     * let E = new GNODECombobox('value', 'name', presetItems, 'placeholder', maxlength);
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
        /**
         * @type {number}
         */
        this.activeIndex = -1;
        /**
         * did this component get the focus
         * @type {boolean}
         */
        this.isInitialFocused = false;

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
                this.setActiveItem(index, false);
            });
        }, false);
        this.addEventListenerForSelf(this.input, 'keydown', (evt) => {
            this.isInitialFocused = true;
            switch(evt.key){
                case 'Enter':
                    if(this.item[this.activeIndex] == null){return;}
                    this.input.value = this.item[this.activeIndex].textContent;
                    this.emit('input', this.value, evt);
                    this.emit('change', this.value, evt);
                    this.wrap.classList.remove('visible');
                    this.item.map((v, index) => {
                        v.removeEventListener('click', this.itemListener[index]);
                        this.setActiveItem(index, false);
                    });
                    this.activeIndex = -1;
                    break;
                case 'ArrowDown':
                    evt.preventDefault();
                    this.activeIndex = Util.Math.clamp(this.activeIndex + 1, -1, this.item.length);
                    this.item.map((v, index) => {
                        this.setActiveItem(index, index === this.activeIndex);
                    });
                    break;
                case 'ArrowUp':
                    evt.preventDefault();
                    this.activeIndex = Util.Math.clamp(this.activeIndex - 1, -1, this.item.length);
                    this.item.map((v, index) => {
                        this.setActiveItem(index, index === this.activeIndex);
                    });
                    break;
                default:
                    this.item.map((v, index) => {
                        this.setActiveItem(index, index === this.activeIndex);
                    });
                    this.activeIndex = -1;
            }
        }, false);
        this.addEventListenerForSelf(this.input, 'focus', (evt) => {
            this.isInitialFocused = false;
            this.wrap.classList.add('visible');
            this.item.map((v, index) => {
                this.itemListener[index] = (evt) => {
                    this.input.value = this.item[index].textContent;
                    this.emit('input', this.value, evt);
                    this.emit('change', this.value, evt);
                };
                v.addEventListener('click', this.itemListener[index], false);
                this.setActiveItem(index, false);
            });
            this.activeIndex = -1;
            let windowEvent = () => {
                if(this.isInitialFocused !== true){
                    this.isInitialFocused = true;
                    return;
                }
                this.wrap.classList.remove('visible');
                this.item.map((v, index) => {
                    v.removeEventListener('click', this.itemListener[index]);
                    this.setActiveItem(index, false);
                });
                window.removeEventListener('click', windowEvent);
            };
            window.addEventListener('click', windowEvent, false);
        }, false);
    }
    /**
     * set active to item
     * @param {number} index - target index
     * @param {boolean} active - is active
     */
    setActiveItem(index, active){
        if(this.item[index] != null){
            if(active === true){
                this.item[index].classList.add('active');
            }else{
                this.item[index].classList.remove('active');
            }
        }
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
