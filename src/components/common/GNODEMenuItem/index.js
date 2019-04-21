
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * item on menu
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEMenuItem extends GNODEElement {
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
    get description(){return 'item on menu';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.item;}
    /**
     * @type {string}
     */
    get value(){return this.caption;}
    /**
     * @param {string} v - item caption
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
     * @param {boolean} [selectable=false] - selectability of this item
     * @example
     * let E = new GNODEMenuItem('value', 'name', false);
     */
    constructor(value = '', name = '', select = false, selectable = false){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {boolean}
         */
        this.select = select;
        /**
         * @type {boolean}
         */
        this.selectable = selectable;
        /**
         * @type {string}
         */
        this.caption = `${value}`;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEMenuItem');
        /**
         * @type {HTMLDivElement}
         */
        this.item = document.createElement('div');
        this.item.textContent = this.value;
        this.item.classList.add('item');
        if(select === true && selectable === true){
            this.item.classList.add('selected');
        }
        this.append(this.item);

        // style setting ------------------------------------------------------
        this.addStyle({});
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.item, 'click', (evt) => {
            if(this.selectable === true){
                this.selected = !this.selected;
            }
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
