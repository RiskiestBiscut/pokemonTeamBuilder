import Canvas from "../../components/mainComps/Canvas"
import axios from "axios";
import { useState, useEffect } from "react";

const TestPage = () => {

  const [pokeData, setPokeData] = useState({
    pokemon: ''
  })

 
  const getFirstPokemon = async () => {
    const {data} = await axios.get('http://localhost:5000/pb-maker/us-central1/api/getFirstPokemon');
    console.log(data)
    try {
      setPokeData({
        pokemon: data
      })
      
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getFirstPokemon();
  }, [])
  const image = new Image();
  image.src = pokeData.pokemon.image;
  image.width = 200;
  image.height = 200;
  

  

  let gameFrame = 0;
  let staggerFrames = 20;
  let y = 20
  let x = 10


  const draw = (context) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    let position = Math.floor(gameFrame/staggerFrames) % 5;
    
    if (position === 0) {
      y = 20;
      x = 10
    } else if (position === 1) {
      y = 15
      x = 15
    } else if (position === 2) {
      y = 10
      x = 20
    } else if (position === 3) {
      y = 15
      x = 20
    } else if (position === 4) {
      y = 20
      x = 15
    } 

    gameFrame++
    
    context.scale(-1, 1);
    context.drawImage(image, (image.width + x) * -1, y, image.width, image.height);
    context.restore();
    // context.drawImage(image, x, y, 100, 100 )
  }

  return (
    <Canvas draw={draw} width="800" height="800" style={{border:'1px solid black'}}/>
  )
}

export default TestPage
