
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input button
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputButton extends GNODEElement {
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple input button.';}
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'click',
    ];}
    /**
     * @constructor
     * @param {string} [value=''] - value
     * @param {string} [name=''] - name
     * @example
     * let E = new GNODEInputButton('value', 'name');
     */
    constructor(value = '', name = ''){
        super();
        // initialize properties ----------------------------------------------
        /**
         * @type {string}
         */
        this.name = name;
        /**
         * @type {string}
         */
        this.value = `${value}`;

        // dom generation -----------------------------------------------------
        /**
         * @type {HTMLDivElement}
         */
        this.wrap = document.createElement('div');
        this.wrap.classList.add('GNODEInputButton');
        /**
         * @type {HTMLDivElement}
         */
        this.button = document.createElement('div');
        this.button.classList.add('button');
        this.button.textContent = this.value;
        this.wrap.appendChild(this.button);
        this.shadow.appendChild(this.wrap);

        // style setting ------------------------------------------------------
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.button, 'click', (evt) => {
            this.emit('click', evt);
        }, false);
    }
    /**
     * set disabled attribute
     * @param {boolean} [enable=true] - disabled = !enable
     */
    enable(enable = true){
        if(enable === true){
            this.button.classList.remove('disabled');
        }else{
            this.button.classList.add('disabled');
        }
    }
    /**
     * set disabled attribute
     * @param {boolean} [disable=true] - disabled
     */
    disable(disable = true){
        if(disable === true){
            this.button.classList.add('disabled');
        }else{
            this.button.classList.remove('disabled');
        }
    }
}
