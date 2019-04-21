
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
        'GNODEInputButton',
        new GNODE.Components.InputButton('input-button', 'single'),
        main,
        GNODE.Components.InputButton.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODEInputCheckbox',
        new GNODE.Components.InputCheckbox(true, 'single', 'input-checkbox'),
        main,
        GNODE.Components.InputCheckbox.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODEInputRadio',
        new GNODE.Components.InputRadio(true, 'single', 'input-radio'),
        main,
        GNODE.Components.InputRadio.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    ).value = false;
    gen(
        'GNODEInputText',
        new GNODE.Components.InputText('', 'single', 'set maxlength = 20', 20),
        main,
        GNODE.Components.InputText.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODEInputNumber',
        new GNODE.Components.InputNumber(0, 'single', 0, 10, 0.1),
        main,
        GNODE.Components.InputNumber.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODEInputRange',
        new GNODE.Components.InputRange(5, 'single', 0, 10, 0.1),
        main,
        GNODE.Components.InputRange.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODECombobox',
        new GNODE.Components.Combobox('', 'single', ['item1', 'item2'], 'set maxlength = 20', 20),
        main,
        GNODE.Components.Combobox.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODEToggleButton',
        new GNODE.Components.ToggleButton(false, 'single'),
        main,
        GNODE.Components.ToggleButton.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODEGradationCanvas',
        new GNODE.Components.GradationCanvas([{offset: 0.0, color: 'transparent'}, {offset: 1.0, color: 'rgba(255, 0, 0, 1.0)'}], 'single', 'horizontal', 128, 64),
        main,
        GNODE.Components.GradationCanvas.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    let detail = gen(
        'GNODEDetail',
        new GNODE.Components.Detail('detail title', 'single'),
        main,
        GNODE.Components.Detail.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
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
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODESelectOption',
        new GNODE.Components.SelectOption('item', 'single', false),
        main,
        GNODE.Components.SelectOption.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODEMenuItem',
        new GNODE.Components.MenuItem('menu item', 'single', false, true),
        main,
        GNODE.Components.MenuItem.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODETreeItem',
        new GNODE.Components.TreeItem('tree item', 'single', false, false),
        main,
        GNODE.Components.TreeItem.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    let tab = gen(
        'GNODETabStrip',
        new GNODE.Components.TabStrip(['title0', 'title1', 'title2'], 'single', 1),
        main,
        GNODE.Components.TabStrip.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    tab.checkTitleVisible();
    tab.getPageElement(0).textContent = 'page0';
    tab.getPageElement(1).textContent = 'page1';
    tab.getPageElement(2).textContent = 'page2';

    head('GNODE Component', side, main); // ===================================
    gen(
        'GNODEMenu',
        new GNODE.Components.Menu('dropdown menu sample', 'single', [
            {
                caption: 'item0', selected: false, selectable: true, callback: (v, evt) => {console.log(v);}
            }, {
                caption: 'item1', selected: false, selectable: true, callback: (v, evt) => {console.log(v);}
            }, {
                caption: 'item2', selected:  true, selectable: true, callback: (v, evt) => {console.log(v);}
            }, {
                caption: 'item3', selected:  true, selectable: true, callback: (v, evt) => {console.log(v);}
            }
        ]),
        main,
        GNODE.Components.Menu.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
    );
    gen(
        'GNODESelect',
        new GNODE.Components.Select(['item1', 'item2', 'item3', 'item4'], 'single', 2),
        main,
        GNODE.Components.Select.EVENTS,
        [(value, evt) => {console.log(value, evt);}]
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
        [(value, evt) => {console.log(value, evt);}]
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

