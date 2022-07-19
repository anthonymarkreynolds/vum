var windowProps = {
    mode: 'normal',
    width: 0,
    height: 0,
    textCanvas: ''
};
// const draw = (textObject:string, textCanvas:TextCanvas, location:CoOrd): TextCanvas => ;
var drawBlank = function () {
    return 'test'.repeat(3);
    // return ('*'.repeat(windowProps.width) + '\n')//.repeat(windowProps.height).slice(0, -2)
    // windowProps.textCanvas = Array.from(
    //   { length: windowProps.height },
    //   () => line
    // ).join('\n')
};
var drawCanvas = function () {
    drawBlank();
    var view = document.querySelector('#view');
    view.innerText = windowProps.textCanvas;
};
var handleResize = function () {
    var newHeight = Math.floor(document.body.clientHeight / 25);
    var newWidth = Math.floor(document.body.clientWidth / 12.03);
    if ((newWidth !== windowProps.width) || (newHeight !== windowProps.height)) {
        drawCanvas();
    }
};
window.addEventListener('keydown', console.log);
window.addEventListener('resize', function () { return handleResize(); });
