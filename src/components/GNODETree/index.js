
import css from './style.css';
import GNODEElement from '../common/GNODEElement/index.js';
import GNODETreeItem from '../common/GNODETreeItem/index.js';

/**
 * simple detail element
 * @class
 * @extends {GNODEElement}
 */
export default class GNODETree extends GNODEElement {
    /**
     * @type {Array.<string>}
     */
    static get EVENTS(){return [
        'open',
        'close',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple tree';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.shadow;}

    /**
     * @constructor
     * @param {string} [name=''] - name
     * @param {Array.<object>} [item=[]] - tree items
     * @example
     * let anchor = document.createElement('a');
     * anchor.textContent = 'link text';
     * let items = [
     *     {
     *         title: anchor,
     *         opened: true,
     *         children: [
     *             {
     *                 title: 'text or element',
     *                 opened: true,
     *                 children: null
     *             }, {
     *                 title: 'text or element',
     *                 opened: true,
     *                 children: null
     *             }
     *         ]
     *     }
     * ];
     * let E = new GNODETree('name', items);
     */
    constructor(name = '', item){
        super(name);
        // initialize properties ----------------------------------------------

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODETree');

        // style setting ------------------------------------------------------
        this.addStyle({});
        this.appendStyle(css);

        // event setting ------------------------------------------------------

        // initial setting ----------------------------------------------------
        this.generateList(item);
    }
    /**
     * generate list
     * @param {Array.<object>} [item=[]] - tree items
     * @param {HTMLElement} [wrap=this.shadow] - insert target
     */
    generateList(item, wrap){
        let target = wrap || this.shadow;
        item.map((v) => {
            let opened = false;
            let openable = false;
            if(v.hasOwnProperty('title') !== true){return;}
            if(v.hasOwnProperty('opened') === true){opened = v.opened;}
            if(v.hasOwnProperty('children') === true && Array.isArray(v.children) === true && v.children.length > 0){
                openable = true;
            }
            let treeItem = new GNODETreeItem(v.title, this.name, opened, openable);
            treeItem.on('open', ((targetItem) => {return (v, evt) => {
                this.emit('open', targetItem, evt)
            };})(treeItem));
            treeItem.on('close', ((targetItem) => {return (v, evt) => {
                this.emit('close', targetItem, evt)
            };})(treeItem));
            target.appendChild(treeItem.element);
            if(openable === true){
                this.generateList(v.children, treeItem.control);
            }
        });
    }
}
