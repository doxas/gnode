
window.addEventListener('load', () => {
    let e = new GNODE.components.common.GNODEInputCheckbox('input-checkbox', true);
    document.body.appendChild(e.element);
    console.log(GNODE.util.hello);
    e.on('change', (evt, target) => {
        console.log('🔥', evt, target.value);
    });
}, false);

