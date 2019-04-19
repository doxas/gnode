
window.addEventListener('load', () => {
    let side = document.body.querySelector('#side');
    let main = document.body.querySelector('#main');

    head('GNODE Common', side, main); // ======================================
    gen(
        'GNODEFrame',
        new GNODE.Components.Frame(),
        main, [], []
    );
    gen(
        'GNODETabStrip',
        new GNODE.Components.TabStrip(['title0', 'title1', 'title2'], 'single', 1),
        main,
        GNODE.Components.TabStrip.EVENTS,
        [(evt) => {console.log(evt);}]
    ).checkTitleVisible();
    gen(
        'GNODEInputButton',
        new GNODE.Components.InputButton('input-button', 'single'),
        main,
        GNODE.Components.InputButton.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputCheckbox',
        new GNODE.Components.InputCheckbox(true, 'single', 'input-checkbox'),
        main,
        GNODE.Components.InputCheckbox.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputRadio',
        new GNODE.Components.InputRadio(true, 'single', 'input-radio'),
        main,
        GNODE.Components.InputRadio.EVENTS,
        [(evt) => {console.log(evt);}]
    ).value = false;
    gen(
        'GNODEInputText',
        new GNODE.Components.InputText('', 'single', 'set maxlength = 20', 20),
        main,
        GNODE.Components.InputText.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputNumber',
        new GNODE.Components.InputNumber(0, 'single', 0, 10, 0.1),
        main,
        GNODE.Components.InputNumber.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEInputRange',
        new GNODE.Components.InputRange(5, 'single', 0, 10, 0.1),
        main,
        GNODE.Components.InputRange.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODECombobox',
        new GNODE.Components.Combobox('', 'single', ['item1', 'item2'], 'set maxlength = 20', 20),
        main,
        GNODE.Components.Combobox.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEToggleButton',
        new GNODE.Components.ToggleButton(false, 'single'),
        main,
        GNODE.Components.ToggleButton.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODEGradationCanvas',
        new GNODE.Components.GradationCanvas([{offset: 0.0, color: 'transparent'}, {offset: 1.0, color: 'rgba(255, 0, 0, 1.0)'}], 'single', 'horizontal', 128, 64),
        main,
        GNODE.Components.GradationCanvas.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    let detail = gen(
        'GNODEDetail',
        new GNODE.Components.Detail('detail title', 'single'),
        main,
        GNODE.Components.Detail.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    let check = new GNODE.Components.InputCheckbox(true, 'test', 'test checkbox');
    detail.appendToInner(check.element);
    let draggableinner = document.createElement('div');
    let radio = new GNODE.Components.InputRadio(true, 'single', 'input-radio');
    draggableinner.appendChild(radio.element);
    let draggabledata = [
        {title: 'list0', element: draggableinner},
        {title: 'list1', element: 'text'},
        {title: 'list2', element: 'text text text'},
        {title: 'list3', element: 'text text text text text'},
        {title: 'list4', element: 'text text text text text text text'},
    ];
    let draggable = gen(
        'GNODEDraggableList',
        new GNODE.Components.DraggableList('single', draggabledata),
        main,
        GNODE.Components.DraggableList.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODESelectOption',
        new GNODE.Components.SelectOption('item', 'single', false),
        main,
        GNODE.Components.SelectOption.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    gen(
        'GNODETreeItem',
        new GNODE.Components.TreeItem('tree item', 'single', false, false),
        main,
        GNODE.Components.TreeItem.EVENTS,
        [(evt) => {console.log(evt);}]
    );

    head('GNODE Component', side, main); // ===================================
    gen(
        'GNODESelect',
        new GNODE.Components.Select(['item1', 'item2', 'item3', 'item4'], 'single', 2),
        main,
        GNODE.Components.Select.EVENTS,
        [(evt) => {console.log(evt);}]
    );
    let anchor = document.createElement('a');
    anchor.href = '#';
    anchor.textContent = 'link text';
    let treeitems = [
        {
            title: anchor,
            opened: true,
            children: [
                {
                    title: 'text or element',
                    opened: true,
                    children: null
                }, {
                    title: 'text or element',
                    opened: true,
                    children: null
                }
            ]
        }, {
            title: 'parent',
            opened: false,
            children: [
                {
                    title: 'child',
                    opened: false,
                    children: null
                }, {
                    title: 'child',
                    opened: false,
                    children: [
                        {
                            title: 'child for child',
                            opened: false,
                            children: null
                        }
                    ]
                }
            ]
        }
    ];
    gen(
        'GNODETree',
        new GNODE.Components.Tree('multi', treeitems),
        main,
        GNODE.Components.Tree.EVENTS,
        [(evt) => {console.log(evt);}]
    );

    head('Other', side, main); // =============================================
    gen(
        'GNODEElement',
        new GNODE.Components.Element(),
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
        if(listeners[index] != null){
            component.on(eve, listeners[index]);
        }else{
            component.on(eve, listeners[0]);
        }
        console.log(`set event for ${name}[%c${eve}%c]`, 'color: crimson', 'color: inherit');
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

