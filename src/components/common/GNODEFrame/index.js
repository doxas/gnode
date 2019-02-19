
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

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
        // dom generation
        this.frame = document.createElement('div');
        this.frame.classList.add('GNODEFrame');
        this.shadow.appendChild(this.frame);

        // style setting
        this.appendStyle(css);

        // event setting
        this.addEventListenerForSelf(this.frame, 'click', (evt) => {
            this.emit('click', evt, this.frame);
        }, false);
    }
}
