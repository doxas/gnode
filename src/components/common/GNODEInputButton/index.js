
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input button
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputButton extends GNODEElement {
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'click',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple input button.';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.button;}
    /**
     * @type {HTMLDivElement}
     */
    get value(){return this.caption;}
    /**
     * @param {string} v - button caption
     */
    set value(v){
        this.caption = `${v}`;
        this.button.textContent = this.caption;
    }

    /**
     * @constructor
     * @param {string} [value=''] - value
     * @param {string} [name=''] - name
     * @example
     * let E = new GNODEInputButton('value', 'name');
     */
    constructor(value = '', name = ''){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {string}
         */
        this.caption = `${value}`;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEInputButton');
        /**
         * @type {HTMLDivElement}
         */
        this.button = document.createElement('div');
        this.button.classList.add('button');
        this.button.setAttribute('tabindex', 0);
        this.button.textContent = this.value;
        this.shadow.appendChild(this.button);

        // style setting ------------------------------------------------------
        this.addStyle({
            color:         `${CONST.COMPONENT_DEFAULT_COLOR}`,
            lineHeight:    `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            height:        `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            verticalAlign: 'middle',
            display:       'inline-block',
        });
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.button, 'click', (evt) => {
            this.emit('click', this.caption, evt);
        }, false);
        this.addEventListenerForSelf(this.button, 'keydown', (evt) => {
            evt.preventDefault();
            if(evt.key === ' '){this.emit('click', this.caption, evt);}
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
        this.enable(!disable);
    }
}
