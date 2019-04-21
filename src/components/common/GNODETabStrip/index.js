
import css from './style.css';
import Util from '../../../static/util.js';
import GNODEElement from '../GNODEElement/index.js';

const TITLE_WIDTH = 100;
const ARROW_WIDTH = 50;
const TITLE_OFFSET = 25;

/**
 * simple tabstrip element
 * @class
 * @extends {GNODEElement}
 */
export default class GNODETabStrip extends GNODEElement {
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
    get description(){return 'simple tabstrip element';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.inners;}

    /**
     * @constructor
     * @param {Array.<string>} [titles=['tab']] - title string
     * @param {string} [name=''] - name
     * @param {number} [selectedIndex=0] - selected index
     * @example
     * let E = new GNODETabStrip(['title0', 'title1'], 'name', 0);
     */
    constructor(titles = ['tab'], name = '', selectedIndex = 0){
        super(name);
        // initialize properties ----------------------------------------------
        /**
         * @type {boolean}
         */
        this.selectedIndex = selectedIndex;
        /**
         * @type {Array.<string>}
         */
        this.titles = titles;

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODETabStrip');
        /**
         * @type {HTMLDivElement}
         */
        this.headerWrap = document.createElement('div');
        this.headerWrap.classList.add('headerwrap');
        /**
         * @type {HTMLDivElement}
         */
        this.headerContainer = document.createElement('div');
        this.headerContainer.classList.add('headercontainer');
        /**
         * @type {HTMLDivElement}
         */
        this.header = document.createElement('div');
        this.header.classList.add('header');
        this.header.style.left = '0px';
        /**
         * @type {HTMLDivElement}
         */
        this.headerArrowWrap = document.createElement('div');
        this.headerArrowWrap.classList.add('headerarrowwrap');
        /**
         * @type {HTMLDivElement}
         */
        this.headerArrowLeft = document.createElement('div');
        this.headerArrowLeft.classList.add('headerarrow');
        this.headerArrowLeft.textContent = '◀';
        /**
         * @type {HTMLDivElement}
         */
        this.headerArrowRight = document.createElement('div');
        this.headerArrowRight.classList.add('headerarrow');
        this.headerArrowRight.textContent = '▶';
        /**
         * @type {HTMLDivElement}
         */
        this.innerWrap = document.createElement('div');
        this.innerWrap.classList.add('innerwrap');
        /**
         * @type {Array.<HTMLDivElement>}
         */
        this.pages = [];
        /**
         * @type {Array.<HTMLDivElement>}
         */
        this.inners = [];
        this.headerArrowWrap.appendChild(this.headerArrowLeft);
        this.headerArrowWrap.appendChild(this.headerArrowRight);
        this.headerContainer.appendChild(this.header);
        this.headerWrap.appendChild(this.headerContainer);
        this.headerWrap.appendChild(this.headerArrowWrap);
        this.append(this.headerWrap);
        this.append(this.innerWrap);

        // style setting ------------------------------------------------------
        this.addStyle({
            backgroundColor: '#666',
            display: 'flex',
            flexDirection: 'column',
        });
        this.appendStyle(css);

        // event setting ------------------------------------------------------
        this.addEventListenerForSelf(window, 'resize', (evg) => {
            this.checkTitleVisible();
        });
        this.addEventListenerForSelf(this.headerArrowLeft, 'click', (evg) => {
            this.setTitleOffset(true);
        });
        this.addEventListenerForSelf(this.headerArrowRight, 'click', (evg) => {
            this.setTitleOffset(false);
        });

        // initial setting ----------------------------------------------------
        this.titles.map((v, index) => {
            this.addPage(v, index);
        });
        this.pages[this.selectedIndex].classList.add('active');
        this.inners[this.selectedIndex].classList.add('active');
        this.checkTitleVisible();
    }
    /**
     * return page inner element
     * @param {number} index - target index
     */
    getPageElement(index){
        return this.inners[index];
    }
    /**
     * add pages
     * @param {string} title - title string
     * @param {number} [index] - target index
     */
    addPage(title, index){
        let pageIndex = index;
        if(this.pages[index] != null){
            let e = this.pages[index];
            e.parentNode.removeChild(e);
            e = null;
            this.pages[index] = null;
            e= this.inners[index];
            e.parentNode.removeChild(e);
            e = null;
            this.inners[index] = null;
        }
        this.pages[index] = document.createElement('div');
        this.pages[index].classList.add('title');
        this.pages[index].textContent = title;
        this.header.appendChild(this.pages[index]);
        this.inners[index] = document.createElement('div');
        this.inners[index].classList.add('inner');
        this.innerWrap.appendChild(this.inners[index]);

        this.addEventListenerForSelf(this.pages[index], 'click', (evt) => {
            this.selectedIndex = pageIndex;
            this.pages.map((v, idx) => {
                this.pages[idx].classList.remove('active');
                this.inners[idx].classList.remove('active');
            });
            this.pages[this.selectedIndex].classList.add('active');
            this.inners[this.selectedIndex].classList.add('active');
            this.emit('change', this.selectedIndex, evt);
        }, false);
    }
    /**
     * append to inner
     * @param {HTMLElement} element - append element
     * @param {number} index - target index
     */
    appendToPage(element, index){
        if(index != null && Util.isNumber(index) === true){
            if(this.inners[index] != null){
                this.addPage(`page${index}`, index);
            }
        }else{
            return;
        }
        this.inners[index].appendChild(element);
    }
    /**
     * check tab width
     */
    checkTitleVisible(){
        let bound = this.headerContainer.getBoundingClientRect();
        let bArrow = this.headerArrowWrap.getBoundingClientRect();
        if(bound.width === 0){return;}
        if(bound.width + bArrow.width < this.titles.length * TITLE_WIDTH){
            this.headerArrowWrap.classList.add('visible');
        }else{
            this.headerArrowWrap.classList.remove('visible');
        }
        bound = this.headerContainer.getBoundingClientRect();
        let s = bound.width - this.titles.length * TITLE_WIDTH;
        let offset = parseInt(this.header.style.left.replace(/px/, ''), 10);
        let v = Math.min(0, Math.max(offset, bound.width - this.titles.length * TITLE_WIDTH));
        this.header.style.left = `${v}px`;
    }
    /**
     * set tab offset
     * @param {boolean} isLeft - whether header move to left
     */
    setTitleOffset(isLeft){
        let bound = this.header.getBoundingClientRect();
        let offset = parseInt(this.header.style.left.replace(/px/, ''), 10);
        if(isLeft === true){
            let containerWidth = this.headerContainer.getBoundingClientRect().width;
            let v = TITLE_WIDTH * this.titles.length - containerWidth;
            let w = Math.max(-v, offset - TITLE_OFFSET);
            this.header.style.left = `${w}px`;
        }else{
            let v = Math.min(0, offset + TITLE_OFFSET);
            this.header.style.left = `${v}px`;
        }
    }
}
