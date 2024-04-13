import axios from "axios";

import { useDispatch } from "react-redux";
import { getUserData } from "../../../redux/actions/userActions";


const FirstPokemonPopUp = ({ newUser, pop, setPop, pokeData}) => {

  const dispatch = useDispatch()

  const updateNewUser = async () => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    };
    const {data} = await axios.put('http://localhost:5000/pb-maker/us-central1/api/user', config);
  }

  const handleClick = () => {
    updateNewUser();
    dispatch(getUserData());
    setPop(false)
  }
 
  return (
    (newUser) ?

    <div className="popup">
      {console.log(pokeData)}
    <div className="popup-inner">
      <button className="close-btn" onClick={handleClick}>close</button>
      {(pokeData.pokemon) ? <div>
      <img src={pokeData.pokemon.currentParty[0].image} alt="Pokemon" />
      <h3 className='text'>Congratulations! you got a {pokeData.pokemon.currentParty[0].name}.</h3>
      </div> : ''}
    </div>
  </div> : ''  
  )
}



export default FirstPokemonPopUp
