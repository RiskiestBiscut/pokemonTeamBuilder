import "./HomePage.css"
import { useState, useEffect, useLayoutEffect } from "react";
import NewUserPopup from "../../components/newUser/NewUserPopup/NewUserPopup";
import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from "../../redux/actions/userActions";
import axios from "axios";
import MainCanvas from "../../components/HomeComps/MainCanvas";
import PokeIcon from "../../components/HomeComps/PokeIcon";
import BattleParty from "../../components/HomeComps/BattleParty";
import PokedexPopupScreen from "../../components/HomeComps/PokedexPopupScreen";
import SelectNewMemberScreen from "../../components/HomeComps/SelectNewMemberScreen";

const HomePage = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const { newUser } = useSelector(state => state.user.credentials);
  const { authenticated } = useSelector(state => state.user);

  const [pokeData, setPokeData] = useState('')
  const [pokedexPopup, setPokedexPopup] = useState(false)
  const [newMemberPopup, setNewMemberPopup] = useState(false)
  const [pokedexData, setPokedexData] = useState('')
  const [oldName, setOldName] = useState(null);
  const [newName, setNewName] = useState(null);

  const dispatch = useDispatch();


  const getBattleParty = async () => {
    const {data} = await axios.get('http://localhost:5000/pb-maker/us-central1/api/getBattleParty');
    console.log(data)
    try {
      setPokeData(data)
    } catch (err) {
      console.log(err)
    }
  }

  useLayoutEffect(() => {
    getBattleParty();
    getAllPokedex()
  }, [])

  useEffect(() => {
    console.log(newName)
    console.log(oldName)
    if (newName !== null) {
      updateBattleParty();
    }
  }, [newName])



  const addNewPokemon = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    };

    try {
      const {data} = await axios.post('http://localhost:5000/pb-maker/us-central1/api/addNewPokemon', {}, config)
      location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  const getAllPokedex = async () => {
    const {data} = await axios.get('http://localhost:5000/pb-maker/us-central1/api/getAllPokedex');
    console.log(data)
    try {
      setPokedexData(data)
    } catch (err) {
      console.log(err)
    }
  }

  const signOut = () => {
    dispatch(logoutUser())
  }


  const updateBattleParty = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    };

    const sendData = {
      oldName: oldName,
      newName: newName
    }

    try {
      const {data} = await axios.post('http://localhost:5000/pb-maker/us-central1/api/updateBattleParty', sendData, config);
      console.log('update Battle Party ran')
      location.reload();
    } catch (err) {
      console.log(err)
    }
    
  }

  const handleOpenPokedex = () => {
     setPokedexPopup(true)
  }

  const handleClosePokedex = () => {
    setPokedexPopup(false)
  }

  const handleCloseNewMemberPopup = () => {
    setNewMemberPopup(false);
  }

  return (
    authenticated === false ? <Navigate to="/login" /> :
     <>
     <button onClick={signOut}>logout</button>
      {newUser && <NewUserPopup buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} newUser={newUser}/>}
      {pokedexPopup && <PokedexPopupScreen data={pokedexData} buttonClick={handleClosePokedex} />}
      {newMemberPopup && <SelectNewMemberScreen data={pokedexData} setNewName={setNewName} buttonClick={handleCloseNewMemberPopup} setNewMemberPopup={setNewMemberPopup}/>}
      <main className="bg-stone-400 h-screen">
        <h1 className="text-center text-white text-6xl py-10">HomePage</h1>
        {!newUser && 
        <div>
            <div className="flex justify-center">
           <MainCanvas  />
        </div>
        <div className="flex justify-center">
          <PokeIcon title="Add New Pokemon" buttonClick={addNewPokemon}/>
          <BattleParty pokeData={pokeData} setKey={setOldName} setNewMemberPopup={setNewMemberPopup} />
          <PokeIcon title="View Pokedex" buttonClick={handleOpenPokedex}/>
        </div>
        </div>}
      </main>
     </>
  )
}


export default HomePage