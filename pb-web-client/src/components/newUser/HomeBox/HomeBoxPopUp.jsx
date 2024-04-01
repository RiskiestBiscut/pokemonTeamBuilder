import './HomeBoxPopUp.css'


const HomeBoxPopUp = ({trigger, setTrigger, children}) => {
  return (trigger) ? (
    <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={() => setTrigger(false)}>close</button>
          {children}
        </div>
    </div>
  ) : ''
}

export default HomeBoxPopUp
