import React from "react"
import packageJson from "../../package.json"
import { Settings } from "../utils/settingsUtils"
import { SetStateAction } from "react"
import { Dispatch } from "react"

//TODO: Refactor settings
export interface SettingsPopupProps {
  settings: Settings
  setSettings: Dispatch<SetStateAction<Settings>>
  isTimeRunning: boolean
  visible: boolean
  setVisible: (input: boolean) => void
}

export default function SettingsPopup(props: SettingsPopupProps) {
  function handleSettingsChange(event: any) {
    const { name, value, checked } = event.target
    props.setSettings((prevSettings: Settings) => ({
      ...prevSettings,
      [name]: name === "darkMode" ? checked : parseInt(value),
    }))
  }

  return props.visible ? (
    <section className="fixed top-0 left-0 w-full h-screen bg-black/30 flex justify-center items-center">
      <div className="relative p-8 mx-4 w-full max-w-lg bg-white dark:bg-gunmetal text-black dark:text-white animate-slideUp">
        <div className="w-full flex justify-between items-center pb-4">
          <h1 className="text-xl font-bold">Settings</h1>
          <button
            className="text-xl font-bold"
            onClick={() => props.setVisible(false)}
          >
            X
          </button>
        </div>

        <div className="flex justify-between border-b-2 py-4">
          <div>
            <h1>Set Focus Time</h1>
            <p className="text-sm text-black/60 dark:text-white/60">
              Default = 25 mins
            </p>
            <p className="text-sm text-black/60 dark:text-white/60">
              Timer must be stopped before applying
            </p>
          </div>
          <select
            className="bg-red-300 setting-input w-24"
            value={props.settings.activeTimer}
            name="activeTimer"
            onChange={handleSettingsChange}
          >
            <option value={60}>1 min</option>
            <option value={300}>5 mins</option>
            <option value={600}>10 mins</option>
            <option value={900}>15 mins</option>
            <option value={1200}>20 mins</option>
            <option value={1500}>25 mins</option>
          </select>
        </div>

        <div className="flex justify-between border-b-2 py-4">
          <div>
            <h1>Set Break Time</h1>
            <p className="text-sm text-black/60 dark:text-white/60">
              Default = 5 mins
            </p>
            <p className="text-sm text-black/60 dark:text-white/60">
              Timer must be stopped before applying
            </p>
          </div>
          <select
            className="bg-green-300 setting-input w-24"
            value={props.settings.breakTimer}
            name="breakTimer"
            onChange={handleSettingsChange}
          >
            <option value={60}>1 min</option>
            <option value={300}>5 mins</option>
            <option value={600}>10 mins</option>
            <option value={900}>15 mins</option>
            <option value={1200}>20 mins</option>
            <option value={1500}>25 mins</option>
          </select>
        </div>

        <div className="flex justify-between border-b-2 py-4">
          <h1 className="">Audio</h1>
          <select
            className="setting-input w-36"
            value={props.settings.audioLevel}
            name="audioLevel"
            onChange={handleSettingsChange}
          >
            <option value={0}>Mute</option>
            <option value={1}>Tick Last 10 Secs</option>
            <option value={2}>Always Tick</option>
          </select>
        </div>

        <div className="flex justify-between border-b-2 py-4">
          <h1 className="">Dark Mode</h1>
          <input
            type="checkbox"
            name="darkMode"
            checked={props.settings.darkMode}
            onChange={handleSettingsChange}
          />
        </div>

        <div className="flex justify-between py-4">
          <p className="font-cabin text-sm">{`v${packageJson.version}`}</p>
          <p className="font-cabin text-sm">
            Created by{" "}
            <a
              href="https://ianluong.github.io"
              target="_blank"
              className="underline decoration-dotted"
              rel="noreferrer"
            >
              Ian Luong
            </a>
          </p>
        </div>
      </div>
    </section>
  ) : (
    <div></div>
  )
}
