
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';
import GNODEInputButton from '../GNODEInputButton/index.js';

/**
 * simple select
 * @class
 * @extends {GNODEElement}
 */
export default class GNODESelect extends GNODEElement {
    /**
     * @type {Array<string>}
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
     * @constructor
     * @param {string} [value=[]] - value
     * @param {string} [name=''] - name
     * @param {number} [selectedIndex=0] - default selected index
     * @example
     * let E = new GNODESelect(['value0', 'value1'], 'name', 0);
     */
    constructor(value = [], name = '', selectedIndex = 0){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {Array<string>}
         */
        this.value = value;
        /**
         * @type {number}
         */
        this.selectedIndex = selectedIndex;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODESelect');
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
                list.element.style.width = '100%';
                list.control.style.width = '100%';
                this.list.push(list);
                this.listWrap.appendChild(list.element);
            });
        }

        this.shadow.appendChild(this.selected.element);
        this.shadow.appendChild(this.listWrap);

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
        this.selected.element.style.width = '100%';
        this.selected.control.style.width = '100%';

        // event setting ------------------------------------------------------
        const closeListWrap = () => {
            this.selected.control.style.backgroundColor = '';
            this.selected.control.style.boxShadow = '';
            this.listWrap.style.display = 'none';
            window.removeEventListener('click', closeListWrap);
        };
        this.selected.on('click', (evt) => {
            evt.stopPropagation();
            if(this.value != null && Array.isArray(this.value) === true && this.value.length > 0){
                if(this.listWrap.style.display === 'flex'){
                    closeListWrap();
                }else{
                    this.selected.control.style.backgroundColor = 'transparent';
                    this.selected.control.style.boxShadow = `0px 0px 0px 1px ${CONST.COMPONENT_DEFAULT_COLOR} inset`;
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
