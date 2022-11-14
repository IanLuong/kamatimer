import {
  faGear,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface NavbarProps {
  setIsSettingsVisible: (input: boolean) => void
  settings: settingsObject
  setSettings: (input: Object) => void
}

interface settingsObject {
  isMuted: boolean
  readyTimer: number
  activeTimer: number
  breakTimer: number
  darkMode: boolean
}

export default function Navbar(props: NavbarProps) {
  function toggleMute() {
    props.setSettings((prevSettings: settingsObject) => ({
      ...prevSettings,
      isMuted: !prevSettings.isMuted,
    }))
  }

  return (
    <div className="w-full p-4 text-white dark:text-inherit border-b-4 dark:bg-eerie">
      <nav className="max-w-5xl mx-auto flex justify-between items-center">
        <div>
          <button onClick={toggleMute}>
            <FontAwesomeIcon
              className="navbar-icon w-10 dark:text-inherit"
              icon={props.settings.isMuted ? faVolumeMute : faVolumeUp}
            />
          </button>
        </div>
        <h4 className="font-dynapuff text-4xl md:text-5xl font-medium">
          KamaTimer
        </h4>
        <div>
          <button onClick={() => props.setIsSettingsVisible(true)}>
            <FontAwesomeIcon
              className="navbar-icon dark:text-inherit"
              icon={faGear}
            />
          </button>
        </div>
      </nav>
    </div>
  )
}
