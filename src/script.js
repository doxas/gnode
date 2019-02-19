
import util from './static/util.js';
import components from './components/index.js';

window.addEventListener('load', () => {
    let e = new components.common.GNODEFrame();
    document.body.appendChild(e.element);
    console.log(e);
    console.log(util.hello);
    e.on('click', (evt, target) => {
        console.log('🔥 event fired 🔥');
        console.log(evt, target);
    });
}, false);


