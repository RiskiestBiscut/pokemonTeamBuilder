import Canvas from "../../components/Canvas/Canvas"
import axios from "axios";
import { useState, useEffect } from "react";


const MainCanvas = () => {

  const [pokeData, setPokeData] = useState({
    pokemon: ''
  })

 
  const getFirstPokemon = async () => {
    const {data} = await axios.get('http://localhost:5000/pb-maker/us-central1/api/getBattleParty');
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


  // set background
  const background = new Image();
  background.src = '../../../public/assets/pixel-background.jpeg'
  background.width = 800;
  background.height = 400;

  let gameFrame = 0;
  let staggerFrames = 10;
  let startY = 250;
  let startX = 600
  let y;
  let x;
  let backgroundX = 0;
  let backgroundX2 = -800;
  let gameSpeed = 3;


  const draw = (context) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)

    let position = Math.floor(gameFrame/staggerFrames) % 5;
    
    if (position === 0) {
      y = startY;
      x = startX;
    } else if (position === 1) {
      y = startY - 5
      x = startX - 5
    } else if (position === 2) {
      y = startY - 10
      x = startX - 10
    } else if (position === 3) {
      y = startY - 5
      x = startX - 10
    } else if (position === 4) {
      y = startY
      x = startX - 5
    } 

    gameFrame++
    context.drawImage(background, (backgroundX), 0, background.width, background.height)
    context.drawImage(background, (backgroundX2), 0, background.width, background.height)
    if (backgroundX > 800) {
      backgroundX = -800 + backgroundX2 + gameSpeed;
    } else {
      backgroundX += gameSpeed;
    }
    if (backgroundX2 > 800) {
      backgroundX2 = -800 + backgroundX + gameSpeed;
    } else {
      backgroundX2 += gameSpeed;
    }
    
    if (pokeData.pokemon !== '') {
      pokeData.pokemon.currentParty.forEach((item, index) => { 
        const image = new Image();
        image.width = 200;
        image.height = 200;
        let xVar = 120*index;
        image.src = item.image;
        context.drawImage(image, x - xVar, y, image.width, image.height);
      })
    }
    

  }
    
  return (
    <>
     <Canvas draw={draw} width="800" height="400" style={{border:'10px solid black', borderRadius: '10px' }}/>
    </>
   
  )
}

export default MainCanvas
