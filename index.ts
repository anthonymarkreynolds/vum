type Mode = 'normal' | 'insert' | 'select' | 'command'
type TextCanvas = string

interface WindowProps {
  mode: Mode
  width: number
  height: number
  textCanvas: TextCanvas
  pendingRedraw: boolean
  multiplier: string
}

interface Coord {
  x: number,
  y: number
}

interface Cursor {
  pos: Coord,
  char: string
}

type Line = Array<string|null>
type LineArray = Array<Line>

interface Buffer {
  name: string,
  text: LineArray
}

const cursor: Cursor = {
  pos: { x: 0, y: 0 },
  char: '_'
}

const windowProps: WindowProps = {
  mode: 'normal',
  width: 0,
  height: 0,
  textCanvas: '',
  pendingRedraw: true,
  multiplier: '1'
}

let buffer:Buffer = {
  name: 'teset',
  text: 'test\ntest2\ntest3\ntest4'.split('\n').map(line => line.split(''))
}

// const sliceAt = (text:string, pos:Coord):void => {
//   const i = (windowProps.width + 1) * pos.y + pos.x
//   windowProps.textCanvas = windowProps.textCanvas.slice(0, i) + text + windowProps.textCanvas.slice(i + text.length)
// }
// const drawBuffer = ():void => {
//   buffer.split('\n').forEach((line, i) => { sliceAt(line, { x: 0, y: i }) })
// }
const drawBlank = ():LineArray => {
  return Array.from({ length: windowProps.height }, () => Array.from({ length: windowProps.width }, () => null))
}
const drawCursor = (lineArray:LineArray):LineArray => {
  lineArray[cursor.pos.y][cursor.pos.x] = cursor.char
  console.log(lineArray)
  return lineArray
}

const renderLineArray = (lineArray:LineArray): void => {
  const view = document.querySelector('#view') as HTMLElement
  view.innerText = lineArray.map(line => line.map(char => char || '·').join('')).join('\n')
}

const drawCanvas = (): void => {
  // drawBuffer()
  // drawCursor()
  // const view = document.querySelector('#view') as HTMLElement
  // view.innerText = windowProps.textCanvas
  renderLineArray(drawCursor(drawBlank()))
  console.log(windowProps)
}

const handleResize = (): void => {
  const newHeight:number = Math.floor(document.body.clientHeight / 25)
  const newWidth:number = Math.floor(document.body.clientWidth / 12.03)
  if ((newWidth !== windowProps.width) || (newHeight !== windowProps.height)) {
    windowProps.width = newWidth
    windowProps.height = newHeight
    drawCanvas()
    console.log('resizing')
  }
}

const runAction = (action:Function|undefined, updateUi:boolean): void => {
  action?.()
  if (updateUi) drawCanvas()
  console.log(updateUi)
}

const useMultiplier = ():number => {
  const mult = 1 * Number(windowProps.multiplier || 1)
  windowProps.multiplier = ''
  return mult
}

interface KeyActions {
  [key: string]: Function | undefined
}

const nKeyActions: KeyActions = {
  j: () => { cursor.pos.y = (cursor.pos.y + useMultiplier()) % (windowProps.height - 2) },
  k: () => { cursor.pos.y = (cursor.pos.y - useMultiplier() + (windowProps.height - 2)) % (windowProps.height - 2) },
  l: () => { cursor.pos.x = (cursor.pos.x + useMultiplier()) % (windowProps.width) },
  h: () => { cursor.pos.x = (cursor.pos.x - useMultiplier() + windowProps.width) % (windowProps.width) },
  i: () => { windowProps.mode = 'insert' }//,
}

for (let i = 0; i < 10; i++) {
  nKeyActions[i] = () => { windowProps.multiplier += i.toString() }
}

const handleKeypress = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    windowProps.mode = 'normal'
  } else {
    switch (windowProps.mode) {
      case 'normal':
        console.log(event.key)
        // Object.keys(nKeyActions).includes(event.key) &&
        runAction(nKeyActions[event.key], true)
        console.log(cursor.pos)
        break
      case 'insert':
        break
      case 'select':
        break
      case 'command':
        break
      default:
        windowProps.mode = 'normal'
    }
  }
}

// const view = document.body
window.addEventListener('keydown', handleKeypress)
window.addEventListener('resize', () => handleResize())

handleResize()
