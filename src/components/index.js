
// import common component
import Common      from './common/index.js';

// import multi component
import GNODESelect from './GNODESelect/index.js';
import GNODETree   from './GNODETree/index.js';

export default class Components {
    static get Common()          {return Common;}
    static get Element()         {return Common.Element;}
    static get Frame()           {return Common.Frame;}
    static get Detail()          {return Common.Detail;}
    static get TreeItem()        {return Common.TreeItem;}
    static get DraggableList()   {return Common.DraggableList;}
    static get InputButton()     {return Common.InputButton;}
    static get InputCheckbox()   {return Common.InputCheckbox;}
    static get InputRadio()      {return Common.InputRadio;}
    static get InputText()       {return Common.InputText;}
    static get InputNumber()     {return Common.InputNumber;}
    static get InputRange()      {return Common.InputRange;}
    static get SelectOption()    {return Common.SelectOption;}
    static get ToggleButton()    {return Common.ToggleButton;}
    static get Combobox()        {return Common.Combobox;}
    static get GradationCanvas() {return Common.GradationCanvas;}
    static get Select()          {return GNODESelect;}
    static get Tree()            {return GNODETree;}
}

