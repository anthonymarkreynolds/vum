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
  return 'test'.repeat(3)
  // return ('*'.repeat(windowProps.width) + '\n')//.repeat(windowProps.height).slice(0, -2)
  // windowProps.textCanvas = Array.from(
  //   { length: windowProps.height },
  //   () => line
  // ).join('\n')
}
const drawCanvas = (): void => {
  drawBlank()
  const view = document.querySelector('#view') as HTMLElement
  view.innerText = windowProps.textCanvas
}

const handleResize = (): void => {
  const newHeight:number = Math.floor(document.body.clientHeight / 25)
  const newWidth:number = Math.floor(document.body.clientWidth / 12.03)
  if ((newWidth !== windowProps.width) || (newHeight !== windowProps.height)) {
    drawCanvas()
  }
}

window.addEventListener('keydown', console.log)
window.addEventListener('resize', () => handleResize())
