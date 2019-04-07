
import GNODEElement         from './GNODEElement/index.js';
import GNODEFrame           from './GNODEFrame/index.js';
import GNODEDetail          from './GNODEDetail/index.js';
import GNODEInputButton     from './GNODEInputButton/index.js';
import GNODEInputCheckbox   from './GNODEInputCheckbox/index.js';
import GNODEInputRadio      from './GNODEInputRadio/index.js';
import GNODEInputText       from './GNODEInputText/index.js';
import GNODEInputNumber     from './GNODEInputNumber/index.js';
import GNODEInputRange      from './GNODEInputRange/index.js';
import GNODESelect          from './GNODESelect/index.js';
import GNODEToggleButton    from './GNODEToggleButton/index.js';
import GNODEGradationCanvas from './GNODEGradationCanvas/index.js';

export default class Common {
    static get Element()         {return GNODEElement;}
    static get Frame()           {return GNODEFrame;}
    static get Detail()          {return GNODEDetail;}
    static get InputButton()     {return GNODEInputButton;}
    static get InputCheckbox()   {return GNODEInputCheckbox;}
    static get InputRadio()      {return GNODEInputRadio;}
    static get InputText()       {return GNODEInputText;}
    static get InputNumber()     {return GNODEInputNumber;}
    static get InputRange()      {return GNODEInputRange;}
    static get Select()          {return GNODESelect;}
    static get ToggleButton()    {return GNODEToggleButton;}
    static get GradationCanvas() {return GNODEGradationCanvas;}
}

