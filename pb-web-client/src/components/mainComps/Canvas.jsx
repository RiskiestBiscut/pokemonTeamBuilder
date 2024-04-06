import useCanvas from "./UseCanvas"

const Canvas = (props) => {

  const { draw, ...rest} = props
  const ref = useCanvas(draw)
   
  return (
    <canvas ref={ref} {...rest}/>
  )
}

export default Canvas
