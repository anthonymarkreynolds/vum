var cursor = {
    pos: { x: 0, y: 0 },
    char: '_'
};
var windowProps = {
    mode: 'normal',
    width: 0,
    height: 0,
    textCanvas: '',
    pendingRedraw: true
};
var sliceAt = function (textCanvas, text, pos) {
    var i = (windowProps.width + 1) * pos.y + pos.x;
    return textCanvas.slice(0, i) + text + textCanvas.slice(i + text.length, -1);
};
// const draw = (textObject:string, textCanvas:TextCanvas, location:CoOrd): TextCanvas => ;
var drawBlank = function () {
    return ('·'.repeat(windowProps.width) + '\n').repeat(windowProps.height);
};
var drawCanvas = function () {
    windowProps.textCanvas = drawBlank();
    var view = document.querySelector('#view');
    view.innerText = sliceAt(windowProps.textCanvas, cursor.char, cursor.pos);
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
var runAction = function (action, updateUi) {
    action();
    if (updateUi)
        drawCanvas();
    console.log(updateUi);
};
var nKeyActions = {
    j: function () { cursor.pos.y = (cursor.pos.y + 1) % windowProps.height; },
    k: function () { cursor.pos.y = (cursor.pos.y - 1 + windowProps.height) % windowProps.height; },
    l: function () { cursor.pos.x = (cursor.pos.x + 1) % (windowProps.width); },
    h: function () { cursor.pos.x = (cursor.pos.x - 1 + windowProps.width) % (windowProps.width); }
};
var handleNormalKey = function (key) {
    runAction(nKeyActions[key], true);
};
var handleKeypress = function (event) {
    if (event.key === 'Escape') {
        windowProps.mode = 'normal';
    }
    else {
        switch (windowProps.mode) {
            case 'normal':
                console.log(event.key);
                handleNormalKey(event.key);
                console.log(cursor.pos);
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
    }
};
// const view = document.body
window.addEventListener('keydown', handleKeypress);
window.addEventListener('resize', function () { return handleResize(); });
handleResize();
