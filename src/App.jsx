import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import bgv from "./assets/bgv.mp4";
import axios from 'axios'
function App() {
  // const [count, setCount] = useState(0)

  // const [ApiResponse, setApiResponse] = useState()
  const [place,setPlace]=useState('')
  const [input, setInput] = useState('')
  const fetchLocation = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place},IN&limit=1&appid=acc5e5da6e39648e8e35dd685a5f8cdd`
     )
     let latValue= response.data[0].lat
     let lonvalue = response.data[0].lon

     const dataResponse =await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lonvalue}&appid=acc5e5da6e39648e8e35dd685a5f8cdd&&units=metric`
     )
     console.log("response.lat",response.data[0].lat,"response.lon",response.data[0].lon)
     console.log("dataResponse",dataResponse)
    }
    fetchLocation()
      // acc5e5da6e39648e8e35dd685a5f8cdd
  // Weather-Api
//  const handleSubmit=(e)=>{
//   e.preventDefault()
// }
const handleSearch = () => {
  setPlace(input)
}
  return (
    <>
    <section> 
      <div>
        {/* background image  */}
        <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover"
  >
    <source src={bgv} type="video/mp4" />
  </video>
  </div>
        <div className="h-screen  w-full ">
         {/* content */}
         <div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
          </div>
      </div>
    </section>     
    </>
  )
}
export default App
