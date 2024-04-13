

const BattleParty = ({pokeData}) => {
  
  return (
    <>
    
      <div  className="bg-slate-50 m-10 px-10 py-6 rounded-xl flex">
        {pokeData !== '' ?
          pokeData.currentParty.map((item) => (
          <div key={item.id}>
            <div>
              <img src={item.image} alt="poke image"/>
              <h2 className="font-sans text-2xl">{item.name}</h2>
            </div>
          <ul className="flex">
            <li className="p-2">HP: {item.stats.HP}</li>
            <li className="p-2">ATK: {item.stats.ATK}</li>
            <li className="p-2">DEF: {item.stats.DEF}</li>
          </ul >
        </div>
          )) : ''}
      </div> 
    </>
  )
}

export default BattleParty
