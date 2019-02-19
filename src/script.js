
import util from './static/util.js';
import components from './components/index.js';

window.addEventListener('load', () => {
    let e = new components.common.GNODEInputCheckbox('input-checkbox', true);
    document.body.appendChild(e.element);
    console.log(util.hello);
    e.on('change', (evt, target) => {
        console.log('🔥', evt, target);
    });
}, false);


