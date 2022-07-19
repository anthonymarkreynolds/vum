type Mode = 'normal' | 'insert' | 'select' | 'command'
type TextCanvas = string
type Point = number

interface WindowProps {
  mode: Mode
  width: number
  height: number
  textCanvas: TextCanvas
  pendingRedraw: boolean
}

interface Coord {
  x: Point,
  y: Point
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

const sliceAt = (textCanvas:TextCanvas, text:string, pos:Coord): TextCanvas => {
  const i = (windowProps.width + 1) * pos.y + pos.x
  return textCanvas.slice(0, i) + text + textCanvas.slice(i + text.length, -1)
}

// const draw = (textObject:string, textCanvas:TextCanvas, location:CoOrd): TextCanvas => ;
const drawBlank = ():string => {
  return ('·'.repeat(windowProps.width) + '\n').repeat(windowProps.height)
}
const drawCanvas = (): void => {
  windowProps.textCanvas = drawBlank()
  const view = document.querySelector('#view') as HTMLElement
  view.innerText = sliceAt(windowProps.textCanvas, cursor.char, cursor.pos)
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
  j: () => { cursor.pos.y = (cursor.pos.y + 1) % windowProps.height },
  k: () => { cursor.pos.y = (cursor.pos.y - 1 + windowProps.height) % windowProps.height },
  l: () => { cursor.pos.x = (cursor.pos.x + 1) % (windowProps.width) },
  h: () => { cursor.pos.x = (cursor.pos.x - 1 + windowProps.width) % (windowProps.width) }
}

const handleNormalKey = (key:string): void => {
  runAction(nKeyActions[key], true)
}

const handleKeypress = (event: KeyboardEvent): void => {
  if (event.key === 'Escape') {
    windowProps.mode = 'normal'
  } else {
    switch (windowProps.mode) {
      case 'normal':
        console.log(event.key)
        handleNormalKey(event.key)
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
