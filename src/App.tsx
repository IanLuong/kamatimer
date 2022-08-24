import { inactiveMessages, activeMessages, breakMessages } from "./messages"
import React, { useEffect, useState } from "react"
import useSound from "use-sound"
import Navbar from "./components/Navbar"
import SettingsPopup from "./components/SettingsPopup"

const bellSfx = require("./sounds/bell.mp3")
const tickSfx = require("./sounds/tick.mp3")

//TODO: Refactor and simplify mode switching code
enum Mode {
  INACTIVE,
  ACTIVE,
  BREAK,
}

function App() {
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")!) || {
      isMuted: false,
      readyTimer: 5,
      activeTimer: 1500,
      breakTimer: 300,
      darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false, //TODO: Add dark mode device preference check
    }
  )

  const [timeRemaining, setTimeRemaining] = useState(settings.readyTimer)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [mode, setMode] = useState(Mode.INACTIVE)
  const [message, setMessage] = useState(
    inactiveMessages[Math.floor(Math.random() * inactiveMessages.length)]
  )
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
      if (!settings.isMuted) {
        if (timeRemaining < 10) {
          playTick()
        }
      }
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      if (!settings.isMuted) {
        playBell()
      }
      updateMode()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, isTimeRunning])

  //Tracks settings changes
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings))
  }, [settings])

  function updateMode() {
    switch (mode) {
      case Mode.INACTIVE:
        changeToMode(Mode.ACTIVE, settings.activeTimer, "bg-red-500")
        break
      case Mode.ACTIVE:
        changeToMode(Mode.BREAK, settings.breakTimer, "bg-green-500")
        break
      case Mode.BREAK:
        changeToMode(Mode.ACTIVE, settings.activeTimer, "bg-red-500")
        break
    }
  }

  function changeToMode(
    inputMode: Mode,
    inputTime: number,
    inputColor: string
  ) {
    setMode(inputMode)
    const selectedMessages =
      inputMode === Mode.INACTIVE
        ? inactiveMessages
        : inputMode === Mode.ACTIVE
        ? activeMessages
        : breakMessages
    setMessage(
      selectedMessages[Math.floor(Math.random() * selectedMessages.length)]
    )
    setTimeRemaining(inputTime)
    setBackgroundColor(inputColor)
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
    <div className={settings.darkMode ? "dark" : ""}>
      <div
        className={`w-full h-screen ${backgroundColor} border-4 border-white dark:bg-raisin dark:border-eerie ${
          mode === Mode.ACTIVE
            ? "dark:text-red-500"
            : mode === Mode.INACTIVE
            ? "dark:text-yellow-500"
            : "dark:text-green-500"
        } border-solid flex flex-col transition-colors ease-in-out duration-700`}
      >
        <Navbar
          setIsSettingsVisible={setIsSettingsVisible}
          settings={settings}
          setSettings={setSettings}
        />
        <div className="m-auto">
          <div className="w-full h-3/4 flex flex-col justify-center gap-8 items-center text-center font-cabin">
            <h1 className="text-5xl font-bold text-white dark:text-inherit">
              {message}
            </h1>
            <h1 className="text-8xl font-bold text-white dark:text-inherit">
              {getTimeString(timeRemaining)}
            </h1>
            <div className="flex flex-col gap-4 items-center w-72">
              <button
                className="timer-button text-2xl w-full"
                onClick={() => setIsTimeRunning((prev) => !prev)}
              >
                {isTimeRunning ? "Pause" : "Start"}
              </button>
              <div className="flex gap-4 w-full justify-center">
                <button
                  disabled={mode === Mode.INACTIVE}
                  className="timer-button w-full"
                  onClick={() =>
                    setTimeRemaining((current: number) => current + 60)
                  }
                >
                  +1:00
                </button>
                <button
                  disabled={mode === Mode.INACTIVE}
                  className="timer-button w-full"
                  onClick={() => {
                    changeToMode(
                      Mode.INACTIVE,
                      settings.readyTimer,
                      "bg-yellow-500"
                    )
                    setIsTimeRunning(false)
                  }}
                >
                  Stop
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TODO: Refactor dark mode code */}
        <SettingsPopup
          visible={isSettingsVisible}
          setVisible={setIsSettingsVisible}
        >
          <div className="flex justify-between border-b-2 py-4">
            <div>
              <h1 className="">Set Focus Time (secs)</h1>
              <p className="text-sm text-black/60 dark:text-white/60">
                Default = 1500s
              </p>
              <p className="text-sm text-black/60 dark:text-white/60">
                Timer must be stopped before applying
              </p>
            </div>
            <input
              disabled={isTimeRunning}
              className="bg-red-300 setting-input"
              type="text"
              name="activeTimer"
              value={settings.activeTimer}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between border-b-2 py-4">
            <div>
              <h1 className="">Set Break Time (secs)</h1>
              <p className="text-sm text-black/60 dark:text-white/60">
                Default = 300s
              </p>
              <p className="text-sm text-black/60 dark:text-white/60">
                Timer must be stopped before applying
              </p>
            </div>
            <input
              disabled={isTimeRunning}
              className="bg-green-300 setting-input"
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
          <div className="flex flex-col text-right justify-end py-4"> 
            <p className="font-cabin text-sm">Created by <a href="https://ianluong.github.io" target="_blank" className="underline decoration-dotted" rel="noreferrer">Ian Luong</a></p>
          </div>
        </SettingsPopup>
      </div>
    </div>
  )
}

export default App
