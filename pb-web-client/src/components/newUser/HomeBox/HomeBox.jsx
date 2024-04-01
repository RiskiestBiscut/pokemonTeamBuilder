import "./HomeBox.css"


const HomeBox = ({className, setTrigger}) => {

  return (
    <button onClick={() => setTrigger(true)}>
    <svg className="box" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 540">
      <path className={className} d="M455,131.25v127.19h-124.72c-5.47-28.22-30.33-49.53-60.15-49.53s-54.68,21.31-60.15,49.53h-124.98v-127.19c0-25.54,20.71-46.25,46.25-46.25h277.5c25.54,0,46.25,20.71,46.25,46.25Z"/>
      <path className="cls3" d="M330.34,281.56h124.66v127.19c0,25.54-20.71,46.25-46.25,46.25H131.25c-25.54,0-46.25-20.71-46.25-46.25v-127.19h124.91c5.33,28.41,30.26,49.9,60.22,49.9s54.89-21.49,60.22-49.9Z"/>
      <circle className="cls2" cx="270" cy="270" r="43.94"/>
    </svg>
    </button>
  )
}

export default HomeBox