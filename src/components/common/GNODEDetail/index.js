
import css from './style.css';
import GNODEElement from '../GNODEElement/index.js';

/**
 * simple detail element
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEDetail extends GNODEElement {
    /**
     * @type {Array.<string>}
     */
    static get EVENTS(){return [
        'open',
        'close',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'simple detail element';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.inner;}

    /**
     * @constructor
     * @param {string} [title=''] - title string
     * @param {string} [name=''] - name
     * @param {boolean} [opened=false] - is detail opened
     * @example
     * let E = new GNODEDetail('title', 'name', true);
     */
    constructor(title = '', name = '', opened = false){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {boolean}
         */
        this.isOpen = opened;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEDetail');
        /**
         * @type {HTMLDivElement}
         */
        this.header = document.createElement('div');
        this.header.classList.add('header');
        /**
         * @type {HTMLDivElement}
         */
        this.down = document.createElement('div');
        this.down.classList.add('downwrap');
        /**
         * @type {HTMLDivElement}
         */
        this.triangle = document.createElement('div');
        this.triangle.classList.add('triangle');
        this.triangle.textContent = '▶';
        /**
         * @type {HTMLDivElement}
         */
        this.title = document.createElement('div');
        this.title.classList.add('title');
        this.title.textContent = title;
        /**
         * @type {HTMLDivElement}
         */
        this.inner = document.createElement('div');
        this.inner.classList.add('inner');
        this.down.append(this.triangle);
        this.header.appendChild(this.down);
        this.header.appendChild(this.title);
        this.append(this.header);
        this.append(this.inner);

        // style setting ------------------------------------------------------
        this.addStyle({
            padding: '5px',
            display: 'flex',
            flexDirection: 'column',
        });
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(this.header, 'click', (evt) => {
            this.isOpen = !this.isOpen;
            this.open(this.isOpen, true, evt);
        }, false);

        // initial setting ----------------------------------------------------
        this.open(this.isOpen, false);
    }
    /**
     * open detail
     * @param {boolean} [opened=true] - is open
     * @param {boolean} [isEmit=true] - do emittion
     * @param {MouseEvent} [evt] - mouse event
     */
    open(opened = true, isEmit = true, evt){
        this.isOpen = opened;
        if(this.isOpen === true){
            this.triangle.classList.add('down');
            this.inner.classList.add('down');
            if(isEmit === true){
                this.emit('open', this.isOpen, evt);
            }
        }else{
            this.triangle.classList.remove('down');
            this.inner.classList.remove('down');
            if(isEmit === true){
                this.emit('close', this.isOpen, evt);
            }
        }
    }
    /**
     * close detail
     * @param {boolean} [closed=true] - is close
     */
    close(closed = true){
        this.open(!closed);
    }
    /**
     * append to inner
     * @param {HTMLElement} element - append element
     */
    appendToInner(element){
        this.inner.appendChild(element);
    }
}
