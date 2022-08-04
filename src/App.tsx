import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faGear, faVolumeMute, faVolumeHigh } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"


function App() {
  let readyVal = 5
  let activeVal = 900
  let breakVal = 300
  
  const [timeRemaining, setTimeRemaining] = useState(readyVal)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [mode, setMode] = useState("ready for it?")
  const [backgroundColor, setBackgroundColor] = useState("bg-yellow-500")

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      let timer = setTimeout(() => {
        setTimeRemaining((time) => time - 1)
      }, 1000)
      return () => clearTimeout(timer)

    } else if (timeRemaining === 0) {
      updateMode()
    }
  }, [timeRemaining, isTimeRunning])

  function updateMode() {
    switch (mode) {
      case "ready for it?":
        setMode("active")
        setTimeRemaining(activeVal)
        setBackgroundColor("bg-red-500")
        break
      case "active":
        setMode("break")
        setTimeRemaining(breakVal)
        setBackgroundColor("bg-green-500")
        break
      case "break":
        setMode("active")
        setTimeRemaining(readyVal)
        setBackgroundColor("bg-red-500")
        break
    }
  }

  function getTimeString() {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining - Math.floor(timeRemaining / 60) * 60

    let timeString = ""
    if (minutes < 10) {
      timeString += "0"
    }
    timeString += `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`

    return timeString
  }

  return (
    <div
      className={`w-full h-screen rounded-lg ${backgroundColor} border-4 border-white border-solid flex flex-col`}
    >
      <nav className="w-full p-4 flex justify-between items-center border-b-4">
        <FontAwesomeIcon
          className="text-3xl md:text-4xl text-gray-800 cursor-pointer"
          icon={faVolumeMute}
        />
        <h4 className="font-cinzel text-3xl md:text-4xl font-bold">KamaTimer</h4>
        {/* <FontAwesomeIcon
          className="text-5xl text-gray-800 cursor-pointer mx-auto"
          icon={faGithub}
        /> */}
        <FontAwesomeIcon
          className="text-3xl md:text-4xl text-gray-800 cursor-pointer"
          icon={faGear}
        />
      </nav>
      <div className="h-1/2 m-auto">
        <div className="w-full h-3/4 flex flex-col justify-around items-center font-cabin">
          <h1 className="text-5xl font-bold text-white">{mode}</h1>
          <h1 className="text-8xl font-bold text-white">{getTimeString()}</h1>
          <div className="flex gap-4">
            <button
              className="bg-white w-24 rounded-lg text-lg hover:bg-black hover:text-white cursor-pointer"
              onClick={() => setIsTimeRunning((prev) => !prev)}
            >
              {isTimeRunning ? "Pause" : "Start"}
            </button>
            <button
              className="bg-white w-24 rounded-lg text-lg hover:bg-black hover:text-white cursor-pointer"
              onClick={() => {
                setTimeRemaining(readyVal)
                setMode("ready for it?")
                setBackgroundColor("bg-yellow-500")
                setIsTimeRunning(false)
              }}
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
