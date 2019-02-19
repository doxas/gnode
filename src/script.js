
import util from './static/util.js';
import components from './components/index.js';

class GNODE {
    static get util(){return util;}
    static get components(){return components;}
}

// temp
window.GNODE = GNODE;

