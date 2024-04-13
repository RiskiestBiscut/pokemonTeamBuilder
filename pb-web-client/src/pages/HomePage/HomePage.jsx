import "./HomePage.css"
import { useState, useEffect } from "react";
import NewUserPopup from "../../components/newUser/NewUserPopup/NewUserPopup";
import { Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import axios from "axios";
import MainCanvas from "../../components/HomeComps/MainCanvas";
import PokeIcon from "../../components/HomeComps/PokeIcon";
import BattleParty from "../../components/HomeComps/BattleParty";
import PokedexPopupScreen from "../../components/HomeComps/PokedexPopupScreen";

const HomePage = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const { newUser } = useSelector(state => state.user.credentials)
  const { authenticated } = useSelector(state => state.user)

  const [pokeData, setPokeData] = useState('')
  const [pokedexPopup, setPokedexPopup] = useState(false)

  const getBattleParty = async () => {
    const {data} = await axios.get('http://localhost:5000/pb-maker/us-central1/api/getBattleParty');
    console.log(data)
    try {
      setPokeData(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getBattleParty();
  }, [])


  const addNewPokemon = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    };

    try {
      const {data} = await axios.post('http://localhost:5000/pb-maker/us-central1/api/addNewPokemon', {}, config)
    } catch (err) {
      console.log(err)
    }
  }

  const getAllPokedex = async () => {
    const {data} = await axios.get('http://localhost:5000/pb-maker/us-central1/api/getBattleParty');
    console.log(data)
    try {
      setPokeData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async () => {
    const pokedex = await getAllPokedex()
    setPokedexPopup(true)
    return pokedex;
  }

  return (
    authenticated === false ? <Navigate to="/login" /> :
     <>
      {newUser && <NewUserPopup buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} newUser={newUser}/>}
      {pokedexPopup && <PokedexPopupScreen />}
      <main className="bg-stone-400 h-screen">
        <h1 className="text-center text-white text-6xl py-10">HomePage</h1>
        {!newUser && 
        <div>
            <div className="flex justify-center">
           <MainCanvas  />
        </div>
        <div className="flex justify-center">
          <div>
            <PokeIcon title="Add New Pokemon" buttonClick={addNewPokemon}/>
          </div>
          <BattleParty pokeData={pokeData} />
          <PokeIcon buttonClick={handleClick}/>
        </div>
        </div>}
      </main>
     </>
  )
}


export default HomePage