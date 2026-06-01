import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import bgv from "./assets/bgv.mp4";
import axios from 'axios'
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineWaterDrop, MdOutlineVisibility } from "react-icons/md";
import { IoThermometerOutline } from "react-icons/io5";
import { SlSpeedometer } from "react-icons/sl";
import { FaWind } from "react-icons/fa";
function App() {
  const [weatherType, setWeatherType] = useState('')
  const [weatherData, setWeatherData] = useState('')
  // const [ApiResponse, setApiResponse] = useState()
  const [place, setPlace] = useState('')
  const [input, setInput] = useState('')
  console.log("input", input)
  const fetchLocation = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place},IN&limit=1&appid=d71953310a9f78669b3c020f5f477ed2`
    )
    let latValue = response.data[0].lat
    let lonvalue = response.data[0].lon

    const dataResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lonvalue}&appid=d71953310a9f78669b3c020f5f477ed2&&units=metric`
    )
    console.log("response.lat", dataResponse.data.weather[0].main, "response.lon", response.data[0].lon)
    console.log("dataResponse", dataResponse)
    setWeatherData(dataResponse)
    setWeatherType(dataResponse.data.weather[0].main)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLocation();
  };



  // acc5e5da6e39648e8e35dd685a5f8cdd
  // Weather-Api
  //  const handleSubmit=(e)=>{
  //   e.preventDefault()
  // }
  const handleSearch = () => {
    setPlace(input)
  }
  const today = new Date();

  const currentDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const weatherIcons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
    Smoke: "🌫️",
    Dust: "🌪️",
    Sand: "🌪️",
    Ash: "🌋",
    Squall: "💨",
    Tornado: "🌪️",
  };
  const weatherIcon = weatherIcons[weatherType] || "🌍";
  // console.log("weatherIcon",weatherType)
  // console.log("weatherData.feels_like",weatherData.data.main.feels_like);

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
            className="absolute top-0 left-0 w-full h-full object-cover">
            <source src={bgv} type="video/mp4" />
          </video>
        </div>
        <div className=" w-full ">
          {/* content */}
          <div className='max-w-120 max-h-6/12 flex mt-15 ml-auto mr-auto gap-4 flex-col  bg-black/2 backdrop-blur-sm border border-white/20 rounded-xl shadow-xs shadow-blue-900 p-4'>
            <div>
              <form className='flex w-full h-fit p-2  bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xs shadow-blue-900 justify-around ' onSubmit={handleSubmit} action="">
                <IoIosSearch className='text-white/70 mt-0.5' size={25} />
                <input className=' placeholder:text-white/70 text-white/70  outline-none min-w-2/3 max-h-7 rounded p-2' type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Search city...' />
                <button type='submit' className='text-md font-semibold bg-white/10  text-center text-white/60 min-w-20 shadow hover:shadow-xs hover:text-white/80 hover:shadow-blue-400/50 rounded border-2 border-blue-50/5 tracking-widest' onClick={handleSearch}>Search</button>
              </form>
            </div>
            {/* main */}
            <div className=' grid gap-4 grid-cols-2 '>
              <div className='container flex flex-col '>
                <p className='text-sm font-medium text-white/85 p-1 text-left px-2'>{currentDate}</p>
                <span className='text-5xl text-left w-fit text-white text-shadow-xl m-2'><span>{weatherIcon}</span> <span className='text-5xl font-semibold'>{weatherData?.data?.main?.temp ? Math.round(weatherData?.data?.main?.temp) : "--"} <span className='text-2xl font-normal align-text-top'>°C</span> </span></span>
                <span className='text-lg font-bold text-white/85 text-left m-2'>{weatherType}</span>
                <span className='bg-white/10 ml-1 max-w-3/5  backdrop-blur-3xl text-xs font-medium p-1 rounded-full  text-white/85 text-left pl-4 shadow-md'>Feels Like {weatherData?.data?.main?.feels_like ? Math.round(weatherData?.data?.main?.feels_like) : "--"}°C</span>
                <span className='w-fit gap-3 text-sm font-bold m-1 p-2  text-white/85 text-left pl-4 text-shadow-md flex'><FaMapMarkerAlt className="text-white/75 mt-0.5 text-sm" />{weatherData?.data?.name ? (weatherData?.data?.name) : "--"},india</span>
              </div>
              <div className='bg-white/4 text-sm  backdrop-blur-3xl  rounded-2xl shadow-2xl max-w-52 px-2 py-2  grid grid-rows-5'>
                <span className='border-b  flex gap-2 px-3 py-1 text-white/75 w-full   border-white/15'><p className='text-left pt-0.5'><MdOutlineWaterDrop /></p> Humidity {weatherData?.data?.main?.humidity ? (weatherData?.data?.main?.humidity) : "--"}%</span>

                <span className='border-b  flex gap-2 px-3 py-1 text-white/75 w-full   border-white/15'><p className='text-left pt-0.5'><FaWind /></p> Wind Speed {weatherData?.data?.wind?.speed ? (weatherData?.data?.wind?.speed * 3.6).toFixed(1) : "--"} km/h</span>

                <span className='border-b  flex gap-2 px-3 py-1 text-white/75 w-full   border-white/15'><p className='text-left pt-0.5'><SlSpeedometer /></p>Pressure {weatherData?.data?.main?.pressure ? (weatherData?.data?.main?.pressure) : "--"} mb</span>

                <span className='border-b  flex gap-2  px-3 py-1 text-white/75 w-full  border-white/15'><p className='text-left pt-0.5'><MdOutlineVisibility /></p> Visibility {weatherData?.data?.visibility ? (weatherData?.data?.visibility / 1000) : "--"} <span className='text-sm font-bold'>km</span></span>

                <span className='border-b  flex gap-2  px-3 py-1 text-white/75 w-full  border-white/15'><p className='text-left pt-0.5'><IoThermometerOutline /></p> Feels Like {weatherData?.data?.main?.feels_like ? Math.round(weatherData?.data?.main?.feels_like) : "--"}°C</span>

              </div>
            </div>
            {/* another content */}
            <div>
              <div>
                <span></span>
                <div>
                  <p></p>
                  <p></p>
                </div>
              </div>

              <div>
                <span></span>
                <div>
                  <p></p>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* another section */}
        <div>
          <div>
            <p></p>
            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
export default App










