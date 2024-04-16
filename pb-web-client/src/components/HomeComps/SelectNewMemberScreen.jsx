import './popups.css'

const SelectNewMemberScreen = ({data, setNewName, buttonClick, setNewMemberPopup}) => {
  const handleClick = (name) => {
    setNewName(name);
    setNewMemberPopup(false)
  }

  return (
    <div className='popup'>
      <div className="popup-inner">
      <h1>Select a pokemon</h1>
      {data !== '' ?
          data.value.map((item, index) => (
          <button key={index} onClick={() => handleClick(item.name)}>
            <div>
              <img src={item.image} alt="poke image"/>
              <h2 className="font-sans text-2xl">{item.name}</h2>
            </div>
        </button>
          )) : ''}
          <button className="close-btn" onClick={buttonClick}>close</button>
      </div>
    </div>
  )
}

export default SelectNewMemberScreen