
import Root from './components/index.js';

window.addEventListener('load', () => {
    let c = new Root.Base.ComponentSample();
    document.body.appendChild(c.getDOM());
}, false);


