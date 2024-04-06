import './HomeBoxPopUp.css'


const HomeBoxPopUp = ({trigger, setTrigger, type, children}) => {
  return (trigger) ? (
    <div className="popup">
        <div className="popup-inner">
          <button className="close-btn" onClick={() => setTrigger(false)}>close</button>
          <h3 className='text'>Are you sure you want to start with a <span className={type}>{type}</span> type?</h3>
          {children}
        </div>
    </div>
  ) : ''
}

export default HomeBoxPopUp
