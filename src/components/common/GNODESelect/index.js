
import css from './style.css';
import Util from '../../../static/util.js';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';
import GNODESelectOption from '../GNODESelectOption/index.js';

const LIST_WRAP_HEIGHT = 60;
const LIST_HEIGHT = 20;

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
         * @type {boolean}
         */
        this.isOpen = false;
        /**
         * @type {Array.<string>}
         */
        this.item = [];
        /**
         * @type {Array.<GNODESelectOption>}
         */
        this.list = [];
        /**
         * @type {number}
         */
        this.selectedItemIndex = -1;
        /**
         * @type {number}
         */
        this.activeIndex = -1;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODESelect');
        /**
         * @type {HTMLDivElement}
         */
        this.selected = document.createElement('div');
        this.selected.classList.add('select');
        this.selected.setAttribute('tabindex', 0);
        /**
         * @type {HTMLDivElement}
         */
        this.listWrap = document.createElement('div');
        this.listWrap.classList.add('list_wrap');
        if(value != null && Array.isArray(value) === true){
            value.map((v, i) => {
                let list = this.generateItem(`${v}`);
                if(list == null){return;}
                this.item.push(v);
                this.list.push(list);
                this.children.push(list);
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

        // event setting ------------------------------------------------------
        this.close = this.close.bind(this);
        const openListWrap = (evt) => {
            if(this.isEnable !== true){return;}
            evt.stopPropagation();
            if(this.item != null && Array.isArray(this.item) === true && this.item.length > 0){
                if(this.listWrap.style.display === 'flex'){
                    this.isOpen = false;
                    this.close();
                }else{
                    this.isOpen = true;
                    this.activeIndex = this.selectedItemIndex;
                    this.list.map((v) => {
                        v.selected = false;
                    });
                    this.list[this.activeIndex].selected = true;
                    this.selected.style.backgroundColor = 'transparent';
                    this.selected.style.boxShadow = `0px 0px 0px 1px ${CONST.COMPONENT_DEFAULT_COLOR} inset`;
                    this.listWrap.style.display = 'flex';
                    window.addEventListener('click', this.close, false);
                    let s = Math.max(0, this.list[this.activeIndex].element.offsetTop - LIST_HEIGHT);
                    this.listWrap.scrollTo(0, s);
                }
            }
        };
        const changeListSelectorIndex = (evt) => {
            let index = this.activeIndex;
            if(evt.key === 'ArrowUp'){
                index = Util.Math.clamp(index - 1, 0, this.list.length - 1);
            }else if(evt.key === 'ArrowDown'){
                index = Util.Math.clamp(index + 1, 0, this.list.length - 1);
            }
            if(this.isOpen === true){
                this.list.map((v) => {
                    v.selected = false;
                });
                this.list[index].selected = true;
                this.activeIndex = index;
                let s = Math.max(0, this.list[index].element.offsetTop - LIST_HEIGHT);
                this.listWrap.scrollTo(0, s);
            }else{
                if(this.selectedItemIndex !== index){
                    this.activeIndex = index;
                    this.selectedItemIndex = index;
                    this.selected.textContent = this.item[index];
                    this.emit('change', this.item[index], evt);
                }
            }
        };
        this.addEventListenerForSelf(this.selected, 'click', (evt) => {
            openListWrap(evt);
        });
        this.addEventListenerForSelf(this.selected, 'keydown', (evt) => {
            if(this.isEnable !== true){return;}
            switch(evt.key){
                case 'Escape':
                    this.close();
                    break;
                case ' ':
                    evt.preventDefault()
                case 'Enter':
                    if(this.isOpen === true){
                        if(this.selectedItemIndex !== this.activeIndex){
                            this.selectedItemIndex = this.activeIndex;
                            this.selected.textContent = this.item[this.activeIndex];
                            this.emit('change', this.item[this.activeIndex], evt);
                        }
                        this.close();
                    }else{
                        openListWrap(evt);
                    }
                    break;
                case 'ArrowUp':
                case 'ArrowDown':
                    evt.preventDefault()
                    changeListSelectorIndex(evt);
                    break;
            }
        });

        // initial setting -----------------------------------------------------
        this.selectedItemIndex = Util.Math.clamp(selectedIndex, -1, this.item.length - 1);
        this.activeIndex = this.selectedItemIndex;
        if(this.selectedItemIndex > -1){
            this.selected.textContent = this.item[this.selectedItemIndex];
        }
    }
    /**
     * close item list
     */
    close(){
        this.isOpen = false;
        this.selected.style.backgroundColor = '';
        this.selected.style.boxShadow = '';
        this.listWrap.style.display = 'none';
        window.removeEventListener('click', this.close);
    }
    /**
     * item generate
     * @param {string} text - text
     */
    generateItem(text){
        if(
            text == null ||
            Util.isString(text) !== true ||
            text === '' ||
            this.list.includes(text) === true
        ){
            return null;
        }
        let list = new GNODESelectOption(text, this.name);
        list.on('click', (v, evt) => {
            this.close();
            this.selectedItemIndex = this.item.indexOf(text);
            this.selected.textContent = text;
            this.emit('change', text, evt);
        });
        return list;
    }
    /**
     * add to list
     * @param {string} item - item
     * @param {number} [index] - index
     */
    addItem(item, index){
        let targetIndex = Util.Math.clamp(index, 0, this.list.length);
        let isLastChild = targetIndex === this.list.length;
        let list = this.generateItem(item);
        if(list == null){return;}
        if(this.selectedItemIndex >= targetIndex){
            ++this.selectedItemIndex;
            ++this.activeIndex;
        }
        if(isLastChild === true){
            this.listWrap.appendChild(list.element);
        }else{
            this.listWrap.insertBefore(list.element, this.list[targetIndex].element);
        }
        this.item.splice(targetIndex, 0, item);
        this.list.splice(targetIndex, 0, list);
    }
    /**
     * remove from list
     * @param {number} index - target
     */
    removeItem(index){
        if(index < 0 || index > this.list.length - 1){return;}
        this.list[index].element.parentNode.removeChild(this.list[index].element);
        this.item.splice(index, 1);
        this.list.splice(index, 1);
        this.selectedItemIndex = Math.min(this.selectedItemIndex, this.list.length - 1);
        this.activeIndex = this.selectedItemIndex;
    }
    /**
     * like set disabled attribute
     * @param {boolean} [enable=true] - disabled = !enable
     */
    enable(enable = true){
        this.isEnable = enable;
        if(enable === true){
            this.selected.classList.remove('disabled');
        }else{
            this.selected.classList.add('disabled');
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
