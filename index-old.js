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

const buffer = {
  text: 'test\ntest2\ntest3',
};

const drawBuffer = () => {
  buffer.text.split('\n').forEach((line, i) => {
    console.log(line, i);
    windowProps.text = windowProps.text.slice(0, i * (windowProps.width + 1))
      + line
      + windowProps.text.slice(i * (windowProps.width + 1) + line.length, -1);
  });
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
    ).join('')
    + cursorInfo
    + windowProps.text.slice(lineEnd, -1);
};

const drawBlank = () => {
  const line = Array.from(
    { length: windowProps.width },
    () => '·',
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
  if ( (width !== windowProps.width)
    || (height !== windowProps.height)
    || windowProps.pendingChange) {
    console.log({ windowProps });
    windowProps.width = width;
    windowProps.height = height;
    windowProps.redrawcount += 1;
    drawBlank();
    drawBuffer();
    drawCursor();
    drawStatusLine();
    document.querySelector('#view').innerText = windowProps.text
      .slice(0, -lastPressed.label.length + 1) + lastPressed.label + lastPressed.key;
  }
  if (windowProps.pendingChange) {
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
        case 'i':
          windowProps.mode = 'insert';
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
    if (key === '\\') {
      windowProps.mode = 'normal';
    }
  } else if (windowProps.mode === 'insert') {
    const curLocal = cursor.row * (windowProps.width + 1) + cursor.col;
    if (key === 'Enter') {key = '\n'; }
    switch (key) {
      case '\\':
        windowProps.mode = 'normal';
        break;
      default:
        buffer.text = buffer.text.slice(0, curLocal) + key + buffer.text.slice(curLocal, -1);
    }
  }
  handleRedraw();
};

window.addEventListener('resize', handleRedraw);
window.onkeypress = handleKeypress;

handleRedraw();
