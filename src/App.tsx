import { faGithub } from "@fortawesome/free-brands-svg-icons"
import {
  faGear,
  faVolumeMute,
  faVolumeHigh,
  faPause,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import Settings from "./components/Settings"

function App() {
  let readyVal = 5
  let activeVal = 900
  let breakVal = 300

  const [timeRemaining, setTimeRemaining] = useState(readyVal)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [mode, setMode] = useState("ready for it?")
  const [backgroundColor, setBackgroundColor] = useState("bg-yellow-500")

  const [isSettingsVisible, setIsSettingsVisible] = useState(true)

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
        <div className="flex gap-2">
          <FontAwesomeIcon className="navbar-icon" icon={faVolumeMute} />
          {/* <FontAwesomeIcon className="navbar-icon" icon={faPause} /> */}
        </div>
        <h4 className="font-cinzel text-3xl md:text-4xl font-bold text-white">
          KamaTimer
        </h4>
        {/* <FontAwesomeIcon
          className="text-5xl text-gray-800 cursor-pointer mx-auto"
          icon={faGithub}
        /> */}
        <button onClick={() => setIsSettingsVisible(true)}>
          <FontAwesomeIcon className="navbar-icon" icon={faGear} />
        </button>
      </nav>
      <div className="h-1/2 m-auto">
        <div className="w-full h-3/4 flex flex-col justify-center gap-8 items-center font-cabin">
          <h1 className="text-5xl font-bold text-white">{mode}</h1>
          <h1 className="text-8xl font-bold text-white">{getTimeString()}</h1>
          <div className="flex gap-4">
            <button
              className="timer-button"
              onClick={() => setIsTimeRunning((prev) => !prev)}
            >
              {isTimeRunning ? "Pause" : "Start"}
            </button>
            <button
              className="timer-button"
              onClick={() => setTimeRemaining((current) => current + 60)}
            >
              +1:00
            </button>
            <button
              className="timer-button"
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
      <Settings
        visible={isSettingsVisible}
        setVisible={setIsSettingsVisible}
      >
        <div>
          Bob
        </div>
      </Settings>
    </div>
  )
}

export default App
