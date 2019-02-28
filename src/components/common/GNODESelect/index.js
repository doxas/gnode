
import css from './style.css';
import Util from '../../../static/util.js';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';
import GNODESelectOption from '../GNODESelectOption/index.js';

/**
 * simple select
 * @class
 * @extends {GNODEElement}
 */
export default class GNODESelect extends GNODEElement {
    /**
     * @type {Array.<string>}
     */
    static get EVENTS(){return [
        'change',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple select.';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.selected;}
    /**
     * @type {string}
     */
    get value(){return this.item[this.selectedItemIndex];}
    /**
     * @param {string} v - selected item
     */
    set value(v){
        if(this.item.includes(v) === true){
            let index = this.item.indexOf(v);
            this.selectedItemIndex = index;
            this.selected.textContent = v;
        }
    }
    /**
     * @type {number}
     */
    get selectedIndex(){return this.selectedItemIndex;}
    /**
     * @param {number} v - selectedIndex
     */
    set selectedIndex(v){
        this.selectedItemIndex = v;
        this.selected.textContent = this.item[this.selectedItemIndex];
    }

    /**
     * @constructor
     * @param {Array.<string>} [value=[]] - value
     * @param {string} [name=''] - name
     * @param {number} [selectedIndex=0] - default selected index
     * @example
     * let E = new GNODESelect(['value0', 'value1'], 'name', 0);
     */
    constructor(value = [], name = '', selectedIndex = 0){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {boolean}
         */
        this.isEnable = true;
        /**
         * @type {Array.<string>}
         */
        this.item = value;
        /**
         * @type {number}
         */
        this.selectedItemIndex = Util.Math.clamp(selectedIndex, 0, Math.max(this.item.length - 1, 0));

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODESelect');
        /**
         * @type {HTMLDivElement}
         */
        this.selected = document.createElement('div');
        this.selected.classList.add('select');
        this.selected.textContent = this.item[this.selectedItemIndex];
        /**
         * @type {HTMLDivElement}
         */
        this.listWrap = document.createElement('div');
        this.listWrap.classList.add('list_wrap');
        /**
         * @type {Array.<GNODESelectOption>}
         */
        this.list = [];
        if(this.item != null && Array.isArray(this.item) === true){
            this.item.map((v, i) => {
                if(i === this.selectedItemIndex){
                    this.selected.tectContent = this.item[i];
                }
                let list = new GNODESelectOption(`${v}`, this.name);
                this.children.push(list);
                list.on('click', ((index) => {return (v, evt) => {
                    closeListWrap();
                    this.selectedItemIndex = index;
                    this.selected.textContent = this.item[index];
                    this.emit('change', this.item[index], evt);
                };})(i));
                list.element.style.width = '100%';
                list.control.style.width = '100%';
                this.list.push(list);
                this.listWrap.appendChild(list.element);
            });
        }
        this.append(this.selected);
        this.append(this.listWrap);

        // style setting ------------------------------------------------------
        this.addStyle({
            color:         `${CONST.COMPONENT_DEFAULT_COLOR}`,
            lineHeight:    `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            width:         `${CONST.COMPONENT_SELECT_WIDTH}px`,
            height:        `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            verticalAlign: 'middle',
            display:       'inline-block',
        });
        this.appendStyle(css);
        this.selected.style.width = '100%';

        // event setting ------------------------------------------------------
        const closeListWrap = () => {
            this.selected.style.backgroundColor = '';
            this.selected.style.boxShadow = '';
            this.listWrap.style.display = 'none';
            window.removeEventListener('click', closeListWrap);
        };
        this.addEventListenerForSelf(this.selected, 'click', (evt) => {
            if(this.isEnable !== true){return;}
            evt.stopPropagation();
            if(this.item != null && Array.isArray(this.item) === true && this.item.length > 0){
                if(this.listWrap.style.display === 'flex'){
                    closeListWrap();
                }else{
                    this.selected.style.backgroundColor = 'transparent';
                    this.selected.style.boxShadow = `0px 0px 0px 1px ${CONST.COMPONENT_DEFAULT_COLOR} inset`;
                    this.listWrap.style.display = 'flex';
                    window.addEventListener('click', closeListWrap, false);
                }
            }
        });
    }
    /**
     * like set disabled attribute
     * @param {boolean} [enable=true] - disabled = !enable
     */
    enable(enable = true){
        this.isEnable = enable;
        if(enable !== true){
            this.selected.style.backgroundColor = '';
            this.selected.style.boxShadow = '';
            this.listWrap.style.display = 'none';
        }
    }
    /**
     * like set disabled attribute
     * @param {boolean} [disable=true] - disabled
     */
    disable(disable = true){
        this.enable(!disable);
    }
}
