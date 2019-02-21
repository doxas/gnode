
import Util from './static/util.js';
import Components from './components/index.js';

class GNODE {
    static get Util(){return Util;}
    static get Components(){return Components;}
}

// temp
window.GNODE = GNODE;

