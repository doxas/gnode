
import css from './style.css';
import Util from '../../../static/util.js';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

const LINE_WIDTH = 1; // for css border width
const HANDLE_WIDTH = 8; // for css handle width

/**
 * simple input range
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEInputRange extends GNODEElement {
    /**
     * @type {Array<string>}
     */
    static get EVENTS(){return [
        'input',
        'change',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple input range.';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.handle;}
    /**
     * @type {boolean}
     */
    get disabled(){return !this.enableFlag;}
    /**
     * @param {boolean} v - flag of disabled
     */
    set disabled(v){
        this.enable(!v);
    }
    /**
     * @type {number}
     */
    get value(){return this.range;}
    /**
     * @param {number} v - value
     */
    set value(v){
        this.range = Util.Math.clamp(v, this.minValue, this.maxValue);
        this.updateHandlePosition();
    }
    /**
     * @type {number}
     */
    get min(){return this.minValue;}
    /**
     * @param {number} v - min value
     */
    set min(v){
        this.minValue = Math.min(v, this.maxValue);
        this.updateHandlePosition();
    }
    /**
     * @type {number}
     */
    get max(){return this.maxValue;}
    /**
     * @param {number} v - max value
     */
    set max(v){
        this.maxValue = Math.max(v, this.minValue);
        this.updateHandlePosition();
    }
    /**
     * @type {number}
     */
    get step(){return this.stepValue;}
    /**
     * @param {number} v - step value
     */
    set step(v){
        this.stepValue = Util.Math.clamp(v, this.minValue, this.maxValue);
    }

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
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {boolean}
         */
        this.enableFlag = true;
        /**
         * @type {number}
         */
        this.range = value;
        /**
         * @type {number}
         */
        this.minValue = min;
        /**
         * @type {number}
         */
        this.maxValue = max;
        /**
         * @type {number}
         */
        this.stepValue = step;
        /**
         * @type {boolean}
         */
        this.isMouseDown = false;
        /**
         * @type {number}
         */
        this.mouseDownPositionX = 0;
        /**
         * @type {DOMRect}
         */
        this.mouseDownHandleBound = null;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEInputRange');
        /**
         * @type {HTMLDivElement}
         */
        this.wrap = document.createElement('div');
        this.wrap.classList.add('wrap');
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
        this.wrap.appendChild(this.background);
        this.wrap.appendChild(this.handle);
        this.shadow.appendChild(this.wrap);
        this.updateHandlePosition();

        // style setting ------------------------------------------------------
        this.addStyle({
            lineHeight:    `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            width:         `${CONST.COMPONENT_RANGE_WIDTH}px`,
            height:        `${CONST.COMPONENT_DEFAULT_HEIGHT}px`,
            verticalAlign: 'middle',
            display:       'flex',
            flexDirection: 'row',
        });
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.mousemove = this.mousemove.bind(this);
        this.mouseup = this.mouseup.bind(this);
        this.keydown = this.keydown.bind(this);
        this.addEventListenerForSelf(this.handle, 'mousedown', (evt) => {
            if(this.enableFlag !== true){return;}
            this.isMouseDown = true;
            this.handle.classList.add('active');
            this.mouseDownPositionX = evt.clientX;
            this.mouseDownHandleBound = this.handle.getBoundingClientRect();
            window.addEventListener('mousemove', this.mousemove, false);
            window.addEventListener('mouseup', this.mouseup, false);
            evt.stopPropagation();
        }, false);
        this.addEventListenerForSelf(this.wrap, 'mousedown', (evt) => {
            if(this.enableFlag !== true){return;}
            let b = this.wrap.getBoundingClientRect();
            let c = this.handle.getBoundingClientRect();
            let innerWidth = b.width - c.width - LINE_WIDTH * 2;
            let x = evt.clientX;
            if(x < c.left){
                this.range = Util.Math.clamp(this.range - this.stepValue, this.minValue, this.maxValue);
            }else{
                this.range = Util.Math.clamp(this.range + this.stepValue, this.minValue, this.maxValue);
            }
            this.updateHandlePosition();
            this.emit('input', this.range, evt);
            this.emit('change', this.range, evt);
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
        this.emit('input', this.range, evt);
        this.emit('change', this.range, evt);
        window.removeEventListener('mousemove', this.mousemove);
        window.removeEventListener('mouseup', this.mouseup);
    }
    /**
     * mouse move event of window
     * @param {MouseEvent} evt - MouseMove event from target of window
     */
    mousemove(evt){
        if(this.enableFlag !== true){return;}
        evt.preventDefault();
        let b = this.wrap.getBoundingClientRect();
        let x = evt.clientX - this.mouseDownPositionX;
        let innerWidth = b.width - this.mouseDownHandleBound.width - LINE_WIDTH * 2;
        let handleLeft = this.mouseDownHandleBound.left - b.left + x;
        let handleX = Util.Math.clamp(handleLeft, 0, innerWidth);
        this.range = (handleX / innerWidth) * (this.maxValue - this.minValue) + this.minValue;
        this.range = Math.round(this.range / this.stepValue) * this.stepValue;
        this.range = Util.Math.clamp(this.range, this.minValue, this.maxValue);
        this.updateHandlePosition();
        this.emit('input', this.range, evt);
    }
    /**
     * keydown event
     * @param {KeyboardEvent} evt - KeyDown event from element
     */
    keydown(evt){
        if(this.enableFlag !== true){return;}
        evt.preventDefault();
        let previouse = this.range;
        switch(evt.key){
            case 'ArrowLeft':
            case 'ArrowDown':
                this.range = Util.Math.clamp(this.range - this.stepValue, this.minValue, this.maxValue);
                if(this.range !== previouse){
                    this.updateHandlePosition();
                    this.emit('input', this.range, evt);
                    this.emit('change', this.range, evt);
                }
                break;
            case 'ArrowRight':
            case 'ArrowUp':
                this.range = Util.Math.clamp(this.range + this.stepValue, this.minValue, this.maxValue);
                if(this.range !== previouse){
                    this.updateHandlePosition();
                    this.emit('input', this.range, evt);
                    this.emit('change', this.range, evt);
                }
                break;
        }
    }
    /**
     * update handle position from value
     */
    updateHandlePosition(){
        let b = this.wrap.getBoundingClientRect();
        let c = this.handle.getBoundingClientRect();
        let innerWidth = b.width - c.width - LINE_WIDTH * 2;
        if(innerWidth <= 0 || b.width === 0 || c.width === 0){
            innerWidth = CONST.COMPONENT_RANGE_WIDTH - HANDLE_WIDTH - LINE_WIDTH * 2;
        }
        let ratio = ((this.range - this.minValue) / (this.maxValue - this.minValue));
        this.handle.style.left = `${ratio * innerWidth}px`;
        this.background.style.width = `${ratio * 100}%`;
    }
    /**
     * like set to disabled attribute
     * @param {boolean} [enable=true] - disabled = !enable
     */
    enable(enable = true){
        this.enableFlag = enable;
        if(enable === true){
            this.wrap.classList.remove('disabled');
        }else{
            this.wrap.classList.add('disabled');
        }
    }
    /**
     * like set to disabled attribute
     * @param {boolean} [disable=true] - disabled
     */
    disable(disable = true){
        this.enable(!disable);
    }
}
