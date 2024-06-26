import './popups.css'

const PokedexPopupScreen = ({data, buttonClick}) => {
  return (
    <div className="popup">
      <div className='popup-inner'>
      {data !== '' ?
          data.value.map((item, index) => (
          <button key={index}>
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

export default PokedexPopupScreen
