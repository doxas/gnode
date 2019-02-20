
window.addEventListener('load', () => {
    let side = document.body.querySelector('#side');
    let main = document.body.querySelector('#main');

    head('gnode common', side, main); // ======================================
    gen(
        'GNODEFrame',
        new GNODE.components.common.GNODEFrame(),
        main, [], []
    );
    gen(
        'GNODEInputCheckbox',
        new GNODE.components.common.GNODEInputCheckbox('input-checkbox', 'single', true),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputRadio',
        new GNODE.components.common.GNODEInputRadio('input-radio', 'single', true),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputText',
        new GNODE.components.common.GNODEInputText('single', 'set maxlength = 20', '', 20),
        main,
        ['change'],
        [(evt) => {console.log(evt);}]
    );

    head('other', side, main); // =============================================
    gen(
        'GNODEElement',
        new GNODE.components.common.GNODEElement(),
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

