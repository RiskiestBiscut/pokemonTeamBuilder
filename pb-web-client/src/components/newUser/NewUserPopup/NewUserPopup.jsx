import HomeBox from "../HomeBox/HomeBox";
import HomeBoxPopUp from "../HomeBox/HomeBoxPopUp";
import axios from "axios";
import "./NewUserPopup.css";
import { useState } from "react";
import FirstPokemonPopUp from "../FirstPokemonPopup/FirstPokemonPopUp";


const NewUserPopup = ({ newUser, buttonPopup, setButtonPopup}) => {
  const [type, setType] = useState('');
  const [newUserPopup, setNewUserPopup] = useState(true)
  const [pop, setPop] = useState(false);
  const [pokeData, setPokeData] = useState({
    pokemon: null
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

  const createPokdex = async () => {
    const pokeType = {
      type: type
    } 

    
    setNewUserPopup(false)
    setPop(true);

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    };

    try {
      const {data} = await axios.post('http://localhost:5000/pb-maker/us-central1/api/addPokedex', pokeType, config)
      await getFirstPokemon()
    } catch (err) {
      console.log(err)
    }
  }

  

  return (newUserPopup) ? (
    <div className="popup-user">
      <div className="popup-inner-user">
        <h1 className="text-8xl font-sans font-bold text-white text-center" >Choose Your Starter</h1>
        <div className="flex justify-center">
          <HomeBox className="blue" setTrigger={setButtonPopup} setType={setType} color='water'/>
          <HomeBox className="red" setTrigger={setButtonPopup} setType={setType} color='fire'/>
          <HomeBox className="green" setTrigger={setButtonPopup} setType={setType} color='grass'/>
        </div>
        <HomeBoxPopUp trigger={buttonPopup} setTrigger={setButtonPopup} type={type} setNewUser={setNewUserPopup} >
        <button className='rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' onClick={createPokdex}>Confirm</button>
        </HomeBoxPopUp>
      </div>
    </div>
  ) : <FirstPokemonPopUp newUser={newUser} pop={pop} setPop={setPop} pokeData={pokeData} />
}

export default NewUserPopup
