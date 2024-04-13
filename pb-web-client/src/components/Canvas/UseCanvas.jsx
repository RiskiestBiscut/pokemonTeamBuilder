import { useRef, useEffect } from 'react'

const useCanvas = (draw) => {
  
  const ref = useRef(null)
  
  useEffect(() => {
    
    const canvas = ref.current
    const context = canvas.getContext('2d')
    let animationId
    
    const renderer = () => {
      draw(context)
      animationId = window.requestAnimationFrame(renderer)
    }
    renderer()
    
    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [draw])
  
  return ref
}

export default useCanvas