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
// let buffer:Buffer = {
//   name: 'teset',
//   text: 'test\ntest2\ntest3\ntest4'.split('\n')
// }
// const sliceAt = (text:string, pos:Coord):void => {
//   const i = (windowProps.width + 1) * pos.y + pos.x
//   windowProps.textCanvas = windowProps.textCanvas.slice(0, i) + text + windowProps.textCanvas.slice(i + text.length)
// }
// const drawBuffer = ():void => {
//   buffer.split('\n').forEach((line, i) => { sliceAt(line, { x: 0, y: i }) })
// }
var drawBlank = function () {
    return Array.from({ length: windowProps.height }, function () { return Array.from({ length: windowProps.width }, function () { return null; }); });
};
var drawCursor = function (lineArray) {
    lineArray[cursor.pos.y][cursor.pos.x] = cursor.char;
    console.log(lineArray);
    return lineArray;
};
var renderLineArray = function (lineArray) {
    var view = document.querySelector('#view');
    view.innerText = lineArray.map(function (line) { return line.map(function (char) { return char || '·'; }).join(''); }).join('\n');
};
var drawCanvas = function () {
    // drawBuffer()
    // drawCursor()
    // const view = document.querySelector('#view') as HTMLElement
    // view.innerText = windowProps.textCanvas
    renderLineArray(drawCursor(drawBlank()));
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
    action === null || action === void 0 ? void 0 : action();
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
                // Object.keys(nKeyActions).includes(event.key) &&
                runAction(nKeyActions[event.key], true);
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
