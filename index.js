var windowProps = {
    mode: 'normal',
    width: 0,
    height: 0,
    textCanvas: ''
};
// const draw = (textObject:string, textCanvas:TextCanvas, location:CoOrd): TextCanvas => ;
var drawBlank = function () {
    return ('·'.repeat(windowProps.width) + '\n').repeat(windowProps.height);
};
var drawCanvas = function () {
    windowProps.textCanvas = drawBlank();
    var view = document.querySelector('#view');
    view.innerText = windowProps.textCanvas;
    console.log(windowProps);
};
var handleResize = function () {
    var newHeight = Math.floor(document.body.clientHeight / 25);
    var newWidth = Math.floor(document.body.clientWidth / 12.03);
    if ((newWidth !== windowProps.width) || (newHeight !== windowProps.height)) {
        windowProps.width = newWidth;
        windowProps.height = newHeight;
        drawCanvas();
        console.log('resizing');
    }
};
var handleKeypress = function (event) {
    switch (windowProps.mode) {
        case 'normal':
            console.log(event.key);
            break;
        case 'insert':
            break;
        case 'select':
            break;
        case 'command':
            break;
        default:
            windowProps.mode = 'normal';
    }
};
// const view = document.body
window.addEventListener('keydown', handleKeypress);
window.addEventListener('resize', function () { return handleResize(); });
