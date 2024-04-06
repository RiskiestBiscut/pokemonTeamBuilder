import { useState, useEffect } from "react";
import axios from "axios";


const FirstPokemonPopUp = ({ newUser, setNewUser, pop, setPop}) => {
 
  const [pokeData, setPokeData] = useState({
    pokemon: null
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
    console.log(pokeData);
  }, [pop])

  const handleClick = () => {
    setNewUser(false)
    setPop(false)
  }


  return (
    (newUser) ?
    <div className="popup">
    <div className="popup-inner">
      <button className="close-btn" onClick={handleClick}>close</button>
      {(pokeData.pokemon) ? <div>
      <img src={pokeData.pokemon.image} alt="Pokemon" />
      <h3 className='text'>Congratulations! you got a {pokeData.pokemon.name}.</h3>
      </div> : ''}
      
    </div>
  </div> : ''  
  )
}

export default FirstPokemonPopUp
