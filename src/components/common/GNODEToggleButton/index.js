
import css from './style.css';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

const COMPONENT_WIDTH = 40; // self css

/**
 * simple toggle button
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEToggleButton extends GNODEElement {
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
    get description(){return 'simple toggle button.';}
    /**
     * @type {HTMLInputElement}
     */
    get control(){return this.input;}
    /**
     * @type {boolean}
     */
    get value(){return this.input.checked;}
    /**
     * @param {boolean} v - checked
     */
    set value(v){this.input.checked = v;}
    /**
     * @alias value
     */
    get checked(){return this.value;}
    /**
     * @param {boolean} v - checked
     */
    set checked(v){this.value = v;}

    /**
     * @constructor
     * @param {boolean} [value=false] - checked
     * @param {string} [name=''] - name
     * @example
     * let switch = true;
     * let E = new GNODEToggleButton(switch, 'name');
     */
    constructor(value = false, name = ''){
        super(name);
        // initialize properties ----------------------------------------------

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEToggleButton');
        /**
         * @type {HTMLLabelElement}
         */
        this.wrap = document.createElement('label');
        this.wrap.classList.add('wrap');
        this.wrap.setAttribute('tabindex', 0);
        /**
         * @type {HTMLDivElement}
         */
        this.inner = document.createElement('div');
        this.inner.classList.add('inner');
        /**
         * @type {HTMLDivElement}
         */
        this.switch = document.createElement('div');
        this.switch.classList.add('switch');
        /**
         * @type {HTMLInputElement}
         */
        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.checked = value;
        this.input.name = name;
        this.wrap.appendChild(this.input);
        this.wrap.appendChild(this.inner);
        this.inner.appendChild(this.switch);
        this.append(this.wrap);

        // style setting ------------------------------------------------------
        this.addStyle({
            color:         `${CONST.COMPONENT_DEFAULT_COLOR}`,
            height:        `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            width:         `${COMPONENT_WIDTH}px`,
            verticalAlign: 'middle',
            display:       'inline-block',
        });
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.input, 'change', (evt) => {
            this.emit('change', this.value, evt);
        }, false);
        this.addEventListenerForSelf(this.wrap, 'keydown', (evt) => {
            evt.preventDefault();
            if(evt.key === ' '){
                this.input.checked = !this.input.checked;
                this.emit('change', this.value, evt);
            }
        }, false);
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
        this.enable(!disable);
    }
}
