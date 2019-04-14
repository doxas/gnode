
import Common      from './common/index.js';
import GNODESelect from './GNODESelect/index.js';
import GNODETree   from './GNODETree/index.js';

export default class Components {
    static get Common() {return Common;}
    static get Select() {return GNODESelect;}
    static get Tree()   {return GNODETree;}
}

