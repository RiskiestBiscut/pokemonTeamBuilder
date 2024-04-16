

const BattleParty = ({pokeData, setKey, setNewMemberPopup}) => {

  
  return (
    <>
      <div  className="bg-slate-50 m-10 px-10 py-6 rounded-xl flex flex-wrap w-2/5 justify-center gap-7">
        {pokeData !== '' ?
          pokeData.currentParty.map((item, index) => (
          <button className="rounded border-slate-200 border-4 bg-slate-200 hover:bg-slate-50" key={index} onClick={() => {
            setKey(item.name);
            setNewMemberPopup(true);
          }}>
            <div>
              <img className="m-auto" src={item.image} alt="poke image"/>
              <h2 className="font-sans text-2xl">{item.name}</h2>
            </div>
          <ul className="flex">
            <li className="p-2">HP: {item.stats.HP}</li>
            <li className="p-2">ATK: {item.stats.ATK}</li>
            <li className="p-2">DEF: {item.stats.DEF}</li>
          </ul >
        </button>
          )) : ''}
      </div> 
    </>
  )
}

export default BattleParty
