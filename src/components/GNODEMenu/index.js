
import css from './style.css';
import Util from '../../static/util.js';
import CONST from '../../static/constant.js';
import GNODEElement from '../common/GNODEElement/index.js';
import GNODEMenuItem from '../common/GNODEMenuItem/index.js';

const LIST_HEIGHT = 30;

/**
 * simple menu
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEMenu extends GNODEElement {
    /**
     * @type {Array.<string>}
     */
    static get EVENTS(){return [
        'open',
        'close',
        'change',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple menu.';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.title;}

    /**
     * @constructor
     * @param {string} [title='menu'] - title
     * @param {string} [name=''] - name
     * @param {Array.<object>} [item=[]] - item
     * @property {string} caption - item caption
     * @property {boolean} selected - item selected
     * @property {boolean} selectable - item selectebl
     * @property {function} callback - callback at item click
     * @example
     * let items = [
     *   {
     *     caption: 'item0',
     *     selected: true,
     *     selectable: true,
     *     callback: (arg) => {console.log(arg);};
     *   }
     * ];
     * let E = new GNODEMenu('menu title', 'name', items);
     */
    constructor(title = 'menu', name = '', item = []){
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
         * @type {string}
         */
        this.title = title;
        /**
         * @type {Array.<string>}
         */
        this.item = [];
        /**
         * @type {Array.<GNODEMenuItem>}
         */
        this.list = [];

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEMenu');
        /**
         * @type {HTMLDivElement}
         */
        this.listWrap = document.createElement('div');
        this.listWrap.classList.add('listwrap');
        /**
         * @type {HTMLDivElement}
         */
        this.listTitle = document.createElement('div');
        this.listTitle.classList.add('listtitle');
        this.listTitle.textContent = title;
        this.listWrap.appendChild(this.listTitle);
        this.append(this.listWrap);

        // style setting ------------------------------------------------------
        this.addStyle({
            minWidth: '60px',
            display: 'inline-block',
        });
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.listTitle, 'click', (evt) => {
            this.toggle(evt);
        });
        this.addEventListenerForSelf(this.listWrap, 'mouseleave', (evt) => {
            this.close(evt, false);
        });

        // initial setting -----------------------------------------------------
        item.map((v) => {
            let list = this.generateItem(v.caption, v.selected, v.selectable, v.callback);
            this.list.push(list);
            this.listWrap.appendChild(list.element);
        });
    }
    /**
     * item generate
     * @param {string} caption - caption
     * @param {boolean} selected - selected
     * @param {boolean} selectable - selectable
     * @param {function} callback - callback
     * @return {GNODEMenuItem} - inserted item or null(at dupulicated)
     */
    generateItem(caption, selected, selectable, callback){
        if(caption == null || Util.isString(caption) !== true || caption === ''){
            Util.Error.throw('should be a type of {string}', 'GNODEMenu.generateItem', 'type');
        }
        if(this.item.includes(caption) === true){
            Util.Error.warn('duplicate item', 'GNODEMenu.generateItem');
            return null;
        }
        let list = new GNODEMenuItem(caption, this.name, selected === true, selectable === true);
        list.on('click', (v, evt) => {
            this.close(evt);
            this.emit('change', v, evt);
            if(callback != null){callback(v, evt);}
        });
        return list;
    }
    /**
     * open item list
     * @param {MouseEvent} evt - mouse event
     * @param {boolean} [isEmit=true] - whether emittion
     */
    open(evt, isEmit = true){
        if(this.isEnable !== true){return;}
        this.isOpen = true;
        this.listWrap.classList.add('visible');
        if(isEmit === true){
            this.emit('open', this.isOpen, evt);
        }
    }
    /**
     * close item list
     * @param {MouseEvent} evt - mouse event
     * @param {boolean} [isEmit=true] - whether emittion
     */
    close(evt, isEmit = true){
        this.isOpen = false;
        this.listWrap.classList.remove('visible');
        if(isEmit === true){
            this.emit('close', this.isOpen, evt);
        }
    }
    /**
     * toggle item list
     * @param {MouseEvent} evt - mouse event
     */
    toggle(evt){
        if(this.isOpen === true){
            this.close(evt);
        }else{
            this.open(evt);
        }
    }
    /**
     * like set disabled attribute
     * @param {boolean} [enable=true] - disabled = !enable
     */
    enable(enable = true){
        this.isEnable = enable;
        if(enable === true){
            this.listWrap.classList.remove('disabled');
        }else{
            this.listWrap.classList.add('disabled');
            this.close();
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
