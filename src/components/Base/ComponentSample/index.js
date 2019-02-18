
import indexstyle from './index.css';

export default class ComponentSample {
    constructor(){
        this.dom = document.createElement('div');
        this.dom.classList.add('hoge');
    }
    getDOM(){
        return this.dom;
    }
}
