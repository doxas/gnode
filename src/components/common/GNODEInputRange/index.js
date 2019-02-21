
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple input range
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputRange extends GNODEElement {
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple input range.';}
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'input',
        'change',
    ];}
    /**
     * @constructor
     * @param {number} [value=0] - value
     * @param {string} [name=''] - name
     * @param {number} [min=0] - min value
     * @param {number} [max=100] - max value
     * @param {number} [step=0] - step value
     * @example
     * let E = new GNODEInputRange(50, 'name', 0, 100, 0.1);
     */
    constructor(value = 0, name = '', min = 0, max = 100, step = 1){
        super();
        // initialize properties ----------------------------------------------
        /**
         * @type {number}
         */
        this.value = value;
        /**
         * @type {string}
         */
        this.name = name;
        /**
         * @type {number}
         */
        this.min = min;
        /**
         * @type {number}
         */
        this.max = max;
        /**
         * @type {number}
         */
        this.step = step;
        /**
         * @type {boolean}
         */
        this.isMouseDown = false;
        /**
         * @type {number}
         */
        this.mousePositionX = 0;
        /**
         * @type {number}
         */
        this.mouseDownPositionX = 0;
        /**
         * @type {DOMRect}
         */
        this.mouseDownHandleBound = null;

        // dom generation -----------------------------------------------------
        /**
         * @type {HTMLDivElement}
         */
        this.wrap = document.createElement('div');
        this.wrap.classList.add('GNODEInputRange');
        /**
         * @type {HTMLDivElement}
         */
        this.inner = document.createElement('div');
        this.inner.classList.add('inner');
        /**
         * @type {HTMLDivElement}
         */
        this.background = document.createElement('div');
        this.background.classList.add('background');
        /**
         * @type {HTMLDivElement}
         */
        this.handle = document.createElement('div');
        this.handle.classList.add('handle');
        this.handle.setAttribute('tabindex', 0);
        this.inner.appendChild(this.background);
        this.inner.appendChild(this.handle);
        this.wrap.appendChild(this.inner);
        this.shadow.appendChild(this.wrap);

        // style setting ------------------------------------------------------
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.mousemove = this.mousemove.bind(this);
        this.mouseup = this.mouseup.bind(this);
        this.keydown = this.keydown.bind(this);
        this.addEventListenerForSelf(this.handle, 'mousedown', (evt) => {
            this.isMouseDown = true;
            this.handle.classList.add('active');
            this.mouseDownPositionX = evt.clientX;
            this.mouseDownHandleBound = this.handle.getBoundingClientRect();
            window.addEventListener('mousemove', this.mousemove, false);
            window.addEventListener('mouseup', this.mouseup, false);
            evt.stopPropagation();
        }, false);
        this.addEventListenerForSelf(this.inner, 'mousedown', (evt) => {
            let b = this.inner.getBoundingClientRect();
            let c = this.handle.getBoundingClientRect();
            let innerWidth = b.width - c.width - 2; // 2 is linewidth x 2
            let x = evt.clientX;
            if(x < c.left){
                this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
            }else{
                this.value = Math.min(Math.max(this.value + this.step, this.min), this.max);
            }
            this.updateHandlePosition();
            this.emit('input', this.value);
            this.emit('change', this.value);
        }, false);
        this.addEventListenerForSelf(this.handle, 'keydown', this.keydown, false);
    }
    /**
     * mouse up event of window
     * @param {MouseEvent} evt - MouseUp event from target of window
     */
    mouseup(evt){
        this.isMouseDown = false;
        this.handle.classList.remove('active');
        this.emit('input', this.value);
        this.emit('change', this.value);
        window.removeEventListener('mousemove', this.mousemove);
        window.removeEventListener('mouseup', this.mouseup);
    }
    /**
     * mouse move event of window
     * @param {MouseEvent} evt - MouseMove event from target of window
     */
    mousemove(evt){
        evt.preventDefault();
        let b = this.inner.getBoundingClientRect();
        let x = evt.clientX - this.mouseDownPositionX;
        let innerWidth = b.width - this.mouseDownHandleBound.width - 2; // 2 is linewidth x 2
        let handleLeft = this.mouseDownHandleBound.left - b.left + x;
        let handleX = Math.min(Math.max(handleLeft, 0), innerWidth);
        this.value = (handleX / innerWidth) * (this.max - this.min) + this.min;
        this.value = Math.round(this.value / this.step) * this.step;
        this.value = Math.min(Math.max(this.value, this.min), this.max);
        this.updateHandlePosition();
        this.emit('input', this.value);
    }
    /**
     * keydown event
     * @param {KeyboardEvent} evt - KeyDown event from element
     */
    keydown(evt){
        let previouse = this.value;
        switch(evt.key){
            case 'ArrowLeft':
            case 'ArrowDown':
                this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
                if(this.value !== previouse){
                    this.updateHandlePosition();
                    this.emit('input', this.value);
                    this.emit('change', this.value);
                }
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                this.value = Math.min(Math.max(this.value + this.step, this.min), this.max);
                if(this.value !== previouse){
                    this.updateHandlePosition();
                    this.emit('input', this.value);
                    this.emit('change', this.value);
                }
                break;
        }
    }
    /**
     * update handle position from value
     */
    updateHandlePosition(){
        let b = this.inner.getBoundingClientRect();
        let c = this.handle.getBoundingClientRect();
        let innerWidth = b.width - c.width - 2; // 2 is linewidth x 2
        let ratio = ((this.value - this.min) / (this.max - this.min));
        this.handle.style.left = `${ratio * innerWidth}px`;
        this.background.style.width = `${ratio * 100}%`;
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
