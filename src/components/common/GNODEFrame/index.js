
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple frame element
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEFrame extends GNODEElement {
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple frame element.';}
    /**
     * @constructor
     * @param {string} [name=''] - name
     */
    constructor(name){
        super(name);
        // initialize properties ----------------------------------------------

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEFrame');

        // style setting ------------------------------------------------------
        this.addStyle({});
        this.appendStyle(css);

        // event setting ------------------------------------------------------
    }
}
