
import util from './static/util.js';
import components from './components/index.js';

window.addEventListener('load', () => {
    let e = new components.common.GNODEElement();
    document.body.appendChild(e.element);
    console.log(util.hello);
}, false);


