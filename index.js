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
var buffer = 'test\ntest2\ntest3\ntest4';
var sliceAt = function (text, pos) {
    var i = (windowProps.width + 1) * pos.y + pos.x;
    windowProps.textCanvas = windowProps.textCanvas.slice(0, i) + text + windowProps.textCanvas.slice(i + text.length);
};
var drawBuffer = function () {
    buffer.split('\n').forEach(function (line, i) { sliceAt(line, { x: 0, y: i }); });
};
var drawCursor = function () {
    sliceAt(cursor.char, cursor.pos);
};
var drawBlank = function () {
    windowProps.textCanvas = ('·'.repeat(windowProps.width) + '\n').repeat(windowProps.height);
};
var drawCanvas = function () {
    drawBlank();
    drawBuffer();
    drawCursor();
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
var runAction = function (action, updateUi) {
    action();
    if (updateUi)
        drawCanvas();
    console.log(updateUi);
};
var nKeyActions = {
    j: function () { cursor.pos.y = (cursor.pos.y + 1) % (windowProps.height - 2); },
    k: function () { cursor.pos.y = (cursor.pos.y - 1 + (windowProps.height - 2)) % (windowProps.height - 2); },
    l: function () { cursor.pos.x = (cursor.pos.x + 1) % (windowProps.width); },
    h: function () { cursor.pos.x = (cursor.pos.x - 1 + windowProps.width) % (windowProps.width); },
    i: function () { windowProps.mode = 'insert'; }
};
var handleKeypress = function (event) {
    if (event.key === 'Escape') {
        windowProps.mode = 'normal';
    }
    else {
        switch (windowProps.mode) {
            case 'normal':
                console.log(event.key);
                Object.keys(nKeyActions).includes(event.key) && runAction(nKeyActions[event.key], true);
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
