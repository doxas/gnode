
window.addEventListener('load', () => {
    let side = document.body.querySelector('#side');
    let main = document.body.querySelector('#main');

    head('GNODE Common', side, main); // ======================================
    gen(
        'GNODEFrame',
        new GNODE.Components.Common.Frame(),
        main, [], []
    );
    let detail = gen(
        'GNODEDetail',
        new GNODE.Components.Common.Detail('detail title', 'single'),
        main,
        ['open'],
        [(evt) => {console.log(evt);}]
    );
    let check = new GNODE.Components.Common.InputCheckbox(true, 'test', 'test checkbox');
    detail.control.appendChild(check.element);
    gen(
        'GNODEInputButton',
        new GNODE.Components.Common.InputButton('input-button', 'single'),
        main,
        ['click'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputCheckbox',
        new GNODE.Components.Common.InputCheckbox(true, 'single', 'input-checkbox'),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputRadio',
        new GNODE.Components.Common.InputRadio(true, 'single', 'input-radio'),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    ).value = false;
    gen(
        'GNODEInputText',
        new GNODE.Components.Common.InputText('', 'single', 'set maxlength = 20', 20),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODECombobox',
        new GNODE.Components.Common.Combobox('', 'single', ['item1', 'item2'], 'set maxlength = 20', 20),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputNumber',
        new GNODE.Components.Common.InputNumber(0, 'single', 0, 10, 0.1),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputRange',
        new GNODE.Components.Common.InputRange(5, 'single', 0, 10, 0.1),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODESelect',
        new GNODE.Components.Common.Select(['item1', 'item2', 'item3', 'item4'], 'single', 2),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEToggleButton',
        new GNODE.Components.Common.ToggleButton(false, 'single'),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEGradationCanvas',
        new GNODE.Components.Common.GradationCanvas([{offset: 0.0, color: 'transparent'}, {offset: 1.0, color: 'rgba(255, 0, 0, 1.0)'}], 'single', 'horizontal', 128, 64),
        main,
        ['click'],
        [(evt) => {console.log(evt);}]
    );

    head('Other', side, main); // =============================================
    gen(
        'GNODEElement',
        new GNODE.Components.Common.Element(),
        main, [], []
    );

}, false);

// generate and insert to frame
function head(name, side, main){
    let h = document.createElement('h1');
    h.textContent = name;
    main.appendChild(h);
    let d = document.createElement('h3');
    d.textContent = name;
    side.appendChild(d);
}

// generate and insert to mainframe
function gen(name, component, appendTarget, eventNames, listeners){
    let a = document.createElement('a');
    a.textContent = name;
    a.addEventListener('click', (evt) => {
        let padding = 20; // from css padding property
        let id = evt.target.textContent;
        let t = appendTarget.querySelector(`#${id}`);
        let b = t.getBoundingClientRect();
        appendTarget.scrollTo(0, (appendTarget.scrollTop - padding) + b.top);
    }, false);
    document.body.querySelector('#side').appendChild(a);
    let d = document.createElement('div');
    let e = document.createElement('div');
    let h = document.createElement('h2');
    d.classList.add('component_sample_wrap');
    e.classList.add('component_inner_wrap');
    h.textContent = name;
    h.setAttribute('id', name);
    appendTarget.appendChild(d);
    d.appendChild(h);
    d.appendChild(e);
    e.appendChild(component.element);
    eventNames.map((eve, index) => {
        component.on(eve, listeners[index]);
    });
    if(component.description != null){
        let c = document.createElement('div');
        c.classList.add('description');
        if(component.description instanceof HTMLElement === true){
            c.appendChild(component.description);
        }else{
            c.innerHTML = component.description;
        }
        d.appendChild(c);
    }
    return component;
}

