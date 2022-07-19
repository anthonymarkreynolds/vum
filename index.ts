type Mode = 'normal' | 'insert' | 'select' | 'command'
type TextCanvas = string

interface WindowProps {
  mode: Mode
  width: number
  height: number
  textCanvas: TextCanvas
  pendingRedraw: boolean
}

interface Coord {
  x: number,
  y: number
}

interface Cursor {
  pos: Coord,
  char: string
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
  pendingRedraw: true
}

let buffer:string = 'test\ntest2\ntest3\ntest4'

const sliceAt = (text:string, pos:Coord):void => {
  const i = (windowProps.width + 1) * pos.y + pos.x
  windowProps.textCanvas = windowProps.textCanvas.slice(0, i) + text + windowProps.textCanvas.slice(i + text.length)
}
const drawBuffer = ():void => {
  buffer.split('\n').forEach((line, i) => { sliceAt(line, { x: 0, y: i }) })
}
const drawCursor = ():void => {
  sliceAt(cursor.char, cursor.pos)
}

const drawBlank = ():void => {
  windowProps.textCanvas = ('·'.repeat(windowProps.width) + '\n').repeat(windowProps.height)
}
const drawCanvas = (): void => {
  drawBlank()
  drawBuffer()
  drawCursor()
  const view = document.querySelector('#view') as HTMLElement
  view.innerText = windowProps.textCanvas
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

const runAction = (action:Function, updateUi:boolean): void => {
  action()
  if (updateUi) drawCanvas()
  console.log(updateUi)
}

interface KeyActions {
  [key: string]: Function
}

const nKeyActions: KeyActions = {
  j: () => { cursor.pos.y = (cursor.pos.y + 1) % (windowProps.height - 2) },
  k: () => { cursor.pos.y = (cursor.pos.y - 1 + (windowProps.height - 2)) % (windowProps.height - 2) },
  l: () => { cursor.pos.x = (cursor.pos.x + 1) % (windowProps.width) },
  h: () => { cursor.pos.x = (cursor.pos.x - 1 + windowProps.width) % (windowProps.width) },
  i: () => { windowProps.mode = 'insert' }
}

const handleKeypress = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    windowProps.mode = 'normal'
  } else {
    switch (windowProps.mode) {
      case 'normal':
        console.log(event.key)
        Object.keys(nKeyActions).includes(event.key) && runAction(nKeyActions[event.key], true)
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
