
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

export default class GNODEInputCheckbox extends GNODEElement {
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'input',
        'change',
    ];}
    /**
     * @type {boolean}
     */
    get value(){return this.input.value;}
    /**
     * @constructor
     * @param {string} [text=''] - text
     * @param {boolean} [value=false] - checked
     */
    constructor(text = '', value = false){
        super();
        // initialize properties ----------------------------------------------
        this.text = text;

        // dom generation -----------------------------------------------------
        this.wrap = document.createElement('label');
        this.wrap.classList.add('GNODEInputCheckbox');
        this.box = document.createElement('div');
        this.box.classList.add('box');
        this.label = document.createElement('div');
        this.label.classList.add('label');
        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.checked = value;
        this.wrap.appendChild(this.input);
        this.wrap.appendChild(this.box);
        this.wrap.appendChild(this.label);
        this.shadow.appendChild(this.wrap);
        this.label.textContent = text;

        // style setting ------------------------------------------------------
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.input, 'input', (evt) => {
            this.emit('input', evt);
        }, false);
        this.addEventListenerForSelf(this.input, 'change', (evt) => {
            this.emit('change', evt);
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
        this.input.disabled = disable;
    }
}
