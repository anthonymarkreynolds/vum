// test file
const windowProps = {
  width: 0,
  height: 0,
  redrawcount: 0,
  text: '',
  mode: 'normal',
  pendingChange: true,
};

const lastPressed = {
  label: 'last pressed: ',
  key: ' ',
};

const cursor = {
  col: 0,
  row: 0,
  char: '_',
};

const statusLine = {};
const drawStatusLine = () => {
  const lineStart = (windowProps.width + 1) * (windowProps.height - 2);
  const lineEnd = lineStart + windowProps.width;
  const cursorInfo = `${cursor.row.toString()}:${cursor.col.toString()}`;
  windowProps.text = windowProps.text.slice(0, lineStart)
    + windowProps.mode.toUpperCase()
    + Array.from(
      { length: windowProps.width - (windowProps.mode.length + cursorInfo.length) },
      () => '-',
    ).join('').trim()
    + cursorInfo
    + windowProps.text.slice(lineEnd,-1);
};

const drawBlank = () => {
  const line = Array.from(
    { length: windowProps.width },
    () => '╳',
  ).join('');
  windowProps.text = Array.from(
    { length: windowProps.height },
    () => line,
  ).join('\n');
};

const drawCursor = () => {
  const cursorPos = (windowProps.width + 1) * cursor.row + cursor.col;
  windowProps.text = windowProps.text
    .slice(0, cursorPos) + cursor.char + windowProps.text.slice(cursorPos + 1, -1);
};

const handleRedraw = () => {
  const height = Math.trunc(document.body.clientHeight / 25);
  const width = Math.trunc(document.body.clientWidth / 12.03);
  if ((width !== windowProps.width) || (height !== windowProps.height)) {
    console.log({ windowProps });
    windowProps.width = width;
    windowProps.height = height;
    windowProps.redrawcount += 1;
    drawBlank();
    drawCursor();
    drawStatusLine();
    document.body.innerText = windowProps.text
      .slice(0, -lastPressed.label.length - 2) + lastPressed.label + lastPressed.key;
  }
  if (windowProps.pendingChange) {
    drawBlank();
    drawCursor();
    drawStatusLine();
    document.body.innerText = windowProps.text
      .slice(0, -lastPressed.label.length - 2) + lastPressed.label + lastPressed.key;
    windowProps.pendingChange = false;
  }
};

const handleKeypress = ({ key, keyCode }) => {
  console.log(key, keyCode);
  windowProps.pendingChange = true;
  lastPressed.key = key;
  if (windowProps.mode === 'normal') {
    const keyAction = () => {
      switch (key) {
        case ':':
          windowProps.mode = 'command';
          break;
        case 'j':
          cursor.row += 1;
          break;
        case 'k':
          cursor.row -= 1;
          break;
        case 'l':
          cursor.col += 1;
          break;
        case 'h':
          cursor.col -= 1;
          break;
        default:
      }
    };
    keyAction();

    // Use this to dodge newlines
    if ((cursor.col + 1) % (windowProps.width + 1) === 0) {
      keyAction();
    }
  } else if (windowProps.mode === 'command') {
    if (key === 'Escape') {
      windowProps.mode = 'normal';
    }
  }
  handleRedraw();
};

window.addEventListener('resize', handleRedraw);
window.onkeypress = handleKeypress;

handleRedraw();
