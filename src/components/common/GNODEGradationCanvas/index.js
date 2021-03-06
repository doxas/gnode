
import css from './style.css';
import Util from '../../../static/util.js';
import CONST from '../../../static/constant.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * gradation canvas
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEGradationCanvas extends GNODEElement {
    /**
     * @type {Array.<string>}
     */
    static get EVENTS(){return [
        'click',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'gradation canvas';}
    /**
     * @type {HTMLCanvasElement}
     */
    get control(){return this.canvas;}

    /**
     * @constructor
     * @param {Array.<object>} color - array of color stop
     * @property {number} offset - range from 0.0 to 1.0
     * @property {string} color - like css style color
     * @param {string} [name=''] - name
     * @param {string} [direction='horizontal'] - direction for gradation
     * @param {number} [width=300] - canvas width
     * @param {number} [height=150] - canvas height
     * @param {boolean} [transparent=false] - use transparent background pattern
     * @example
     * let color = [{offset: 0.0, color: 'red'}, {offset: 1.0, color: 'blue'}];
     * let E = new GNODEGradationCanvas(color, 'name', 'horizontal', 256, 128);
     */
    constructor(color, name = '', direction = 'horizontal', width = 300, height = 150, transparent = true){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {Canvas2DRenderingContext}
         */
        this.context = null;
        /**
         * @type {ImageData}
         */
        this.latestImageData = null;
        /**
         * @type {boolean}
         */
        this.isEnable = true;
        /**
         * @type {boolean}
         */
        this.isTransparent = transparent;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEGradationCanvas');
        /**
         * @type {HTMLCanvasElement}
         */
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        /**
         * @type {HTMLDivElement}
         */
        this.background = document.createElement('div');
        this.background.classList.add('background');
        this.background.style.width = `${width}px`;
        this.background.style.height = `${height}px`;
        this.append(this.canvas);
        this.append(this.background);

        // style setting ------------------------------------------------------
        this.addStyle({});
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.canvas, 'click', (evt) => {
            if(this.isEnable !== true){return;}
            let b = this.canvas.getBoundingClientRect();
            let x = evt.clientX - b.left;
            let y = evt.clientY - b.top;
            this.emit('click', this.pick(x, y), evt);
        }, false);

        // initial setting ----------------------------------------------------
        this.context = this.canvas.getContext('2d');
        this.createTilePattern();
        this.draw(color, direction);
    }
    /**
     * pick color
     * @param {number} x - coordinate x on canvas
     * @param {number} y - coordinate y on canvas
     * @return {object}
     * @property {string} hex - e.g. "#ffffff"
     * @property {Array.<number>} - RGBA in array
     */
    pick(x, y){
        if(this.isEnable !== true){return;}
        let i = this.context.getImageData(x, y, 1, 1);
        let num = [i.data[0], i.data[1], i.data[2], i.data[3]];
        let hex = Util.Color.RGBtoHEX(num);
        return {hex: hex, number: num}
    }
    /**
     * fill gradation
     * @param {Array.<object>} color - array of color stop
     * @property {number} offset - range from 0.0 to 1.0
     * @property {string} color - like css style color
     * @param {string} [direction='horizontal'] - direction for gradation
     * @param {boolean} [isClearCanvas=true] - is clear at previously draw
     */
    draw(color, direction = 'horizontal', isClearCanvas = true){
        if(this.isEnable !== true){return;}
        if(color == null || Array.isArray(color) !== true || color.length === 0){
            Util.Error.throw('the first argument should be a type of {Array.<object>}', 'GNODEGradationCanvas.draw', 'type');
        }
        let c = this.canvas;
        let cx = this.context;
        let g = null;
        if(direction === 'horizontal'){
            g = cx.createLinearGradient(0, 0, c.width, 0);
        }else{
            g = cx.createLinearGradient(0, 0, 0, c.height);
        }
        color.map((v) => {
            g.addColorStop(v.offset, v.color);
        });
        if(isClearCanvas === true){
            if(this.isTransparent === true){
                cx.fillStyle = 'transparent';
                cx.fillRect(0, 0, c.width, c.height);
            }else{
                cx.fillStyle = 'white';
                cx.fillRect(0, 0, c.width, c.height);
            }
        }
        cx.fillStyle = g;
        cx.fillRect(0, 0, c.width, c.height);
    }
    /**
     * create transparent background pattern
     * @param {number} [size=CONST.COMPONENT_TRANSPARENT_BLOCK_SIZE] - block size
     */
    createTilePattern(size = CONST.COMPONENT_TRANSPARENT_BLOCK_SIZE){
        if(size == null || Util.isNumber(size) !== true || size < 1){
            Util.Error.throw('should be a type of {number} and greater than 0', 'GNODEGradationCanvas.createTilePattern', 'type');
        }
        let c = document.createElement('canvas');
        let cx = c.getContext('2d');
        c.width = size * 2;
        c.height = size * 2;
        cx.fillStyle = CONST.COMPONENT_TRANSPARENT_BLOCK_LIGHT_COLOR;
        cx.fillRect(0, 0, c.width, c.height);
        cx.fillStyle = CONST.COMPONENT_TRANSPARENT_BLOCK_DARK_COLOR;
        cx.fillRect(0, 0, size, size);
        cx.fillRect(size, size, size, size);
        this.background.style.backgroundImage = `url(${c.toDataURL()})`;
        cx = null;
        c = null;
    }
    /**
     * set enable
     * @param {boolean} [enable=true] - disabled = !enable
     */
    enable(enable = true){
        this.isEnable = enable;
        let c = this.canvas;
        let cx = this.context;
        if(enable === true){
            if(this.latestImageData != null){
                cx.globalAlpha = 1.0;
                cx.putImageData(this.latestImageData, 0, 0);
                this.latestImageData = null;
            }
        }else{
            this.latestImageData = cx.getImageData(0, 0, c.width, c.height);
            cx.fillStyle = CONST.COMPONENT_DEFAULT_DISABLED_COLOR;
            cx.globalAlpha = 0.8;
            cx.fillRect(0, 0, c.width, c.height);
        }
    }
    /**
     * set disabled
     * @param {boolean} [disable=true] - disabled
     */
    disable(disable = true){
        this.enable(!disable);
    }
}
