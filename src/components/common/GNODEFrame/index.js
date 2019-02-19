
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
    static get EVENTS(){return [
        'click',
    ];}
    /**
     * @constructor
     */
    constructor(){
        super();
        // initialize properties ----------------------------------------------

        // dom generation -----------------------------------------------------
        /**
         * @type {HTMLDivElement}
         */
        this.frame = document.createElement('div');
        this.frame.classList.add('GNODEFrame');
        this.shadow.appendChild(this.frame);

        // style setting ------------------------------------------------------
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.frame, 'click', (evt) => {
            this.emit('click', evt, this.frame);
        }, false);
    }
}
