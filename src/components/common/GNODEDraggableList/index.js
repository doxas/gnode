
import css from './style.css';
import Util from '../../../static/util.js';
import GNODEElement from '../GNODEElement/index.js';

/**
 * draggable list
 * @class
 * @extends {GNODEElement}
 */
export default class GNODEDraggableList extends GNODEElement {
    /**
     * @type {Array.<string>}
     */
    static get EVENTS(){return [
        'float',
        'change',
    ];}
    /**
     * description
     * @type {string|HTMLElement}
     */
    get description(){return 'draggable list';}
    /**
     * @type {HTMLDivElement}
     */
    get control(){return this.content;}

    /**
     * @constructor
     * @param {string} [name=''] - name
     * @param {Array.<object>} [inner] - title and inner dom
     * @example
     * let d0 = docuemnt.createElement('div');
     * let d1 = docuemnt.createElement('div');
     * let obj0 = {title: 'title0', element: d0};
     * let obj1 = {title: 'title1', element: d1};
     * let E = new GNODEDraggableList('name', [obj0, obj1]);
     */
    constructor(name = '', inner = []){
        super(name);
        // initialize properties ----------------------------------------------
        this.list = [];

        // dom generation -----------------------------------------------------
        this.dom.classList.add('GNODEDraggableList');

        // style setting ------------------------------------------------------
        this.addStyle({
            display: 'flex',
            flexDirection: 'column',
        });
        this.appendStyle(css);

        // event setting ------------------------------------------------------

        // initial setting ----------------------------------------------------
        inner.map((v) => {
            if(v.hasOwnProperty('title') === true && v.hasOwnProperty('element') === true){
                this.generateList(v.title, v.element);
            }
        });
    }
    /**
     * generate list item
     * @param {string} title - title
     * @param {HTMLElement} element - inner element
     */
    generateList(title, element){
        let wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        let handle = document.createElement('div');
        handle.classList.add('handle');
        let handleIcon = document.createElement('div');
        handleIcon.classList.add('handleicon');
        let iconInTop = document.createElement('div');
        let iconInMiddle = document.createElement('div');
        let iconInBottom = document.createElement('div');
        handleIcon.appendChild(iconInTop);
        handleIcon.appendChild(iconInMiddle);
        handleIcon.appendChild(iconInBottom);
        handle.appendChild(handleIcon);
        let inner = document.createElement('div');
        inner.classList.add('inner');
        let titlebar = document.createElement('div');
        titlebar.classList.add('title');
        titlebar.textContent = title;
        let content = document.createElement('div');
        content.classList.add('content');
        inner.appendChild(titlebar);
        inner.appendChild(content);
        wrapper.appendChild(handle);
        wrapper.appendChild(inner);
        this.append(wrapper);
        this.list.push(wrapper);
        if(element != null && element instanceof HTMLElement){
            content.appendChild(element);
        }else if(element != null && Util.isString(element) === true){
            content.textContent = element;
        }
        let mousedown = (evt) => {
            let current = 0;
            let isMouseDown = true;
            this.list.map((v, index) => {
                v.classList.add('dragging');
                if(wrapper === v){
                    v.classList.add('target');
                    current = index;
                }
            });
            let mouseup;
            mouseup = (evt) => {
                window.removeEventListener('mouseup', mouseup);
                let currentIndex = 0;
                let mouseupIndex = 0;
                let b = [];
                let p = this.dom.getBoundingClientRect();
                this.list.map((v, index) => {
                    if(wrapper === v){currentIndex = index;}
                    b[index] = v.getBoundingClientRect();
                    v.classList.remove('dragging');
                    v.classList.remove('target');
                });
                if(
                    evt.clientX < p.left || evt.clientX > p.left + p.width ||
                    evt.clientY < p.top  || evt.clientY > p.top  + p.height
                ){return;}
                for(let i = 0; i < b.length; ++i){
                    if(currentIndex === i){continue;}
                    let bound = b[i];
                    let top = bound.top - p.top;
                    let bottom = top + bound.height;
                    if(top <= evt.offsetY && evt.offsetY <= bottom){
                        this.shadow.removeChild(wrapper);
                        this.list.splice(currentIndex, 1);
                        if(b.length - 1 === i){
                            this.shadow.appendChild(wrapper);
                            this.list.push(wrapper);
                        }else{
                            this.shadow.insertBefore(wrapper, this.list[i]);
                            this.list.splice(i, 0, wrapper);
                        }
                        this.emit('change', this.list, evt, `from ${currentIndex} to ${i}`);
                        return;
                    }
                }
            };
            window.addEventListener('mouseup', mouseup);
            this.emit('float', current, evt);
        };
        this.addEventListenerForSelf(handle, 'mousedown', mousedown, false);
    }
}
