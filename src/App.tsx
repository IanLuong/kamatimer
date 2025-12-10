import { inactiveMessages, activeMessages, breakMessages } from "./messages"
import React, { useEffect, useState } from "react"
import useSound from "use-sound"
import Navbar from "./components/Navbar"
import SettingsPopup from "./components/SettingsPopup"

import { getTimeString } from "./utils/timeUtils"
import { getDefaultSettings, Settings } from "./utils/settingsUtils"

import { Analytics } from "@vercel/analytics/react"

const bellSfx = require("./sounds/bell.mp3")
const tickSfx = require("./sounds/tick.mp3")

//TODO: Refactor and simplify mode switching code
enum Mode {
  INACTIVE,
  ACTIVE,
  BREAK,
}

function App() {
  //Checks if settings are in local storage, otherwise get default
  const [settings, setSettings] = useState<Settings>(
    JSON.parse(localStorage.getItem("settings")!) || getDefaultSettings()
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

      if (
        settings.audioLevel === 2 ||
        (settings.audioLevel === 1 && timeRemaining < 10)
      ) {
        playTick()
      }

      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      if (!(settings.audioLevel === 0)) {
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

  return (
    <>
      <div className={settings.darkMode ? "dark" : ""}>
        <div
          className={`w-full h-screen min-h-[650px] ${backgroundColor} dark:bg-raisin dark:border-eerie ${
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
            mode={mode}
          />
          <main className="m-auto">
            <div className="w-full h-3/4 flex flex-col justify-center gap-8 items-center text-center font-cabin">
              <h1 className="text-5xl font-bold text-white dark:text-inherit">
                {message}
              </h1>
              <h1 className="text-8xl font-bold text-white dark:text-inherit font- tabular-nums">
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
          </main>
          {/* TODO: Refactor dark mode code */}
          {/* TODO: Refactor settings into separate file */}
          <SettingsPopup
            visible={isSettingsVisible}
            setVisible={setIsSettingsVisible}
            settings={settings}
            setSettings={setSettings}
            isTimeRunning={isTimeRunning}
          />
        </div>
      </div>
      <Analytics />
    </>
  )
}

export default App
