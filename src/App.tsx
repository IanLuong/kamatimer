import React, { useEffect, useState } from "react"
import useSound from "use-sound"
import Navbar from "./components/Navbar"
import SettingsPopup from "./components/SettingsPopup"

const bellSfx = require("./sounds/bell.mp3")
const tickSfx = require("./sounds/tick.mp3")

function App() {
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")!) || {
      isMuted: false,
      readyTimer: 5,
      activeTimer: 1500,
      breakTimer: 300,
      darkMode: false,
    } //TODO: Implement Dark Mode
  )

  const [timeRemaining, setTimeRemaining] = useState(settings.readyTimer)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [mode, setMode] = useState("ready for it?")
  const [backgroundColor, setBackgroundColor] = useState("bg-yellow-500")

  const [isSettingsVisible, setIsSettingsVisible] = useState(false)

  const [playTick] = useSound(tickSfx)
  const [playBell] = useSound(bellSfx)

  //Tracks time changes
  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      let timer = setTimeout(() => {
        setTimeRemaining((time: number) => time - 1)
      }, 1000)
      if (timeRemaining < 10) {
        playTick()
      }
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      playBell()
      updateMode()
    }
  }, [timeRemaining, isTimeRunning])

  //Tracks settings changes
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings))
  }, [settings])

  function updateMode() {
    switch (mode) {
      case "ready for it?":
        setMode("active")
        setTimeRemaining(settings.activeTimer)
        setBackgroundColor("bg-red-500")
        break
      case "active":
        setMode("break")
        setTimeRemaining(settings.breakTimer)
        setBackgroundColor("bg-green-500")
        break
      case "break":
        setMode("active")
        setTimeRemaining(settings.readyTimer)
        setBackgroundColor("bg-red-500")
        break
    }
  }

  function getTimeString(input: number) {
    const minutes = Math.floor(input / 60)
    const seconds = input - Math.floor(input / 60) * 60

    let timeString = ""
    if (minutes < 10) {
      timeString += "0"
    }
    timeString += `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`

    return timeString
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, checked } = event.target
    setSettings((prevSettings: Object) => ({
      ...prevSettings,
      [name]: name === "darkMode" ? checked : value,
    }))
  }

  return (
    <div
      className={`w-full h-screen rounded-lg ${backgroundColor} border-4 border-white border-solid flex flex-col`}
    >
      <Navbar setIsSettingsVisible={setIsSettingsVisible} settings={settings} setSettings={setSettings} />
      <div className="m-auto">
        <div className="w-full h-3/4 flex flex-col justify-center gap-8 items-center font-cabin">
          <h1 className="text-6xl font-bold text-white">{mode}</h1>
          <h1 className="text-8xl font-bold text-white w-full">
            {getTimeString(timeRemaining)}
          </h1>
          <div className="flex flex-col gap-4 items-center w-full">
            <button
              className="timer-button text-2xl w-full"
              onClick={() => setIsTimeRunning((prev) => !prev)}
            >
              {isTimeRunning ? "Pause" : "Start"}
            </button>
            <div className="flex gap-4 w-full justify-center">
              <button
                className="timer-button w-full"
                onClick={() =>
                  setTimeRemaining((current: number) => current + 60)
                }
              >
                +1:00
              </button>
              <button
                className="timer-button w-full"
                onClick={() => {
                  setTimeRemaining(settings.readyTimer)
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
      <SettingsPopup
        visible={isSettingsVisible}
        setVisible={setIsSettingsVisible}
      >
        <div className="flex justify-between border-b-2 py-4">
          <div>
            <h1 className="">Set Focus Time (secs)</h1>
            <p className="text-sm text-black/60">Default = 1500s</p>
            <p className="text-sm text-black/60">
              Timer must be stopped before applying
            </p>
          </div>
          <input
            className="bg-red-300 w-16 text-center h-6 self-center"
            type="text"
            name="activeTimer"
            value={settings.activeTimer}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between border-b-2 py-4">
          <div>
            <h1 className="">Set Break Time (secs)</h1>
            <p className="text-sm text-black/60">Default = 300s</p>
            <p className="text-sm text-black/60">
              Timer must be stopped before applying
            </p>
          </div>
          <input
            className="bg-green-300 w-16 text-center h-6 self-center"
            type="text"
            name="breakTimer"
            value={settings.breakTimer}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between border-b-2 py-4">
          <h1 className="">Dark Mode</h1>
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
          />
        </div>
      </SettingsPopup>
    </div>
  )
}

export default App
