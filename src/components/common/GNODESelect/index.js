
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';
import GNODEInputButton from '../GNODEInputButton/index.js';

/**
 * simple select
 * @class
 * @extends {GNODEElement}
 */
export default class GNODESelect extends GNODEElement {
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple select.';}
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'change',
    ];}
    /**
     * @constructor
     * @param {string} [value=''] - value
     * @param {string} [name=''] - name
     * @param {string} [placeholder=''] - placeholder
     * @param {number} [max=null] - maxlength
     * @example
     * let E = new GNODESelect(['value0', 'value1'], 'name', 0);
     */
    constructor(value = [], name = '', selectedIndex = 0){
        super();
        // initialize properties ----------------------------------------------
        /**
         * @type {Array<string>}
         */
        this.value = value;
        /**
         * @type {string}
         */
        this.name = name;
        /**
         * @type {number}
         */
        this.selectedIndex = selectedIndex;

        // dom generation -----------------------------------------------------
        /**
         * @type {HTMLDivElement}
         */
        this.wrap = document.createElement('div');
        this.wrap.classList.add('GNODESelect');
        /**
         * @type {GNODEInputButton}
         */
        this.selected = new GNODEInputButton();
        this.children.push(this.selected);
        /**
         * @type {HTMLDivElement}
         */
        this.listWrap = document.createElement('div');
        this.listWrap.classList.add('list_wrap');
        /**
         * @type {Array<GNODEInputButton>}
         */
        this.list = [];
        if(this.value != null && Array.isArray(this.value) === true){
            this.value.map((v, i) => {
                if(i === this.selectedIndex){
                    this.selected.value = this.value[i];
                }
                let list = new GNODEInputButton(`${v}`, this.name);
                this.children.push(list);
                list.on('click', ((index) => {return () => {
                    closeListWrap();
                    this.selectedIndex = index;
                    this.selected.value = this.value[index];
                    this.emit('change', this.value[index]);
                };})(i));
                list.wrapper.style.width = '100%';
                list.control.style.width = '100%';
                this.list.push(list);
                this.listWrap.appendChild(list.element);
            });
        }

        this.wrap.appendChild(this.selected.element);
        this.wrap.appendChild(this.listWrap);
        this.shadow.appendChild(this.wrap);

        // style setting ------------------------------------------------------
        this.appendStyle(css);
        this.selected.wrapper.style.width = '100%';
        this.selected.control.style.width = '100%';

        // event setting ------------------------------------------------------
        const closeListWrap = () => {
            this.listWrap.style.display = 'none';
            window.removeEventListener('click', closeListWrap);
        };
        this.selected.on('click', (evt) => {
            evt.stopPropagation();
            if(this.value != null && Array.isArray(this.value) === true && this.value.length > 0){
                if(this.listWrap.style.display === 'flex'){
                    closeListWrap();
                }else{
                    this.listWrap.style.display = 'flex';
                    window.addEventListener('click', closeListWrap, false);
                }
            }
        });
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
