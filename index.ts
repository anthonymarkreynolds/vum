type Mode = 'normal' | 'insert' | 'select' | 'command'
type TextCanvas = string

interface WindowProps {
  mode: Mode
  width: number
  height: number
  textCanvas: TextCanvas
}

interface CoOrd {
  x: number,
  y: number
}

const windowProps: WindowProps = {
  mode: 'normal',
  width: 0,
  height: 0,
  textCanvas: ''
}

// const draw = (textObject:string, textCanvas:TextCanvas, location:CoOrd): TextCanvas => ;

const drawBlank = ():string => {
  return ('·'.repeat(windowProps.width) + '\n').repeat(windowProps.height)
}
const drawCanvas = (): void => {
  windowProps.textCanvas = drawBlank()
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

const handleKeypress = (event: KeyboardEvent): void => {
  switch (windowProps.mode) {
    case 'normal':
      console.log(event.key)
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

// const view = document.body
window.addEventListener('keydown', handleKeypress)
window.addEventListener('resize', () => handleResize())
