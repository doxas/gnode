
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * option on select
 * @class
 * @extends {GNODEElement}
 */
export default class GNODESelectOption extends GNODEElement {
    /**
     * @type {Array.<string>}
     */
    static get EVENTS(){return [
        'click',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'option on select';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.item;}
    /**
     * @type {string}
     */
    get value(){return this.caption;}
    /**
     * @param {string} v - button caption
     */
    set value(v){
        this.caption = `${v}`;
        this.item.textContent = this.caption;
    }
    /**
     * @type {boolean}
     */
    get selected(){return this.select;}
    /**
     * @param {boolean} v - item selected
     */
    set selected(v){
        this.select = v;
        if(v === true){
            this.item.classList.add('selected');
        }else{
            this.item.classList.remove('selected');
        }
    }

    /**
     * @constructor
     * @param {string} [value=''] - value
     * @param {string} [name=''] - name
     * @param {boolean} [select=false] - select
     * @example
     * let E = new GNODESelectOption('value', 'name', false);
     */
    constructor(value = '', name = '', select = false){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {boolean}
         */
        this.select = select;
        /**
         * @type {string}
         */
        this.caption = `${value}`;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODESelectOption');
        /**
         * @type {HTMLDivElement}
         */
        this.item = document.createElement('div');
        this.item.textContent = this.value;
        this.item.classList.add('item');
        if(select === true){
            this.item.classList.add('selected');
        }
        this.append(this.item);

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
        this.addEventListenerForSelf(this.item, 'click', (evt) => {
            this.selected = true;
            this.emit('click', this.selected, evt);
        }, false);
    }
    /**
     * set disabled attribute
     * @param {boolean} [enable=true] - disabled = !enable
     */
    enable(enable = true){
        if(enable === true){
            this.item.classList.remove('disabled');
        }else{
            this.item.classList.add('disabled');
        }
    }
    /**
     * set disabled attribute
     * @param {boolean} [disable=true] - disabled
     */
    disable(disable = true){
        this.enable(!disable);
    }
}
