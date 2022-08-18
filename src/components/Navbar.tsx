// import { faGithub } from "@fortawesome/free-brands-svg-icons"
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
    <nav className="w-full p-4 flex justify-between items-center text-white dark:text-inherit">
      <button onClick={toggleMute}>
        <FontAwesomeIcon
          className="navbar-icon w-10 dark:text-inherit"
          icon={props.settings.isMuted ? faVolumeMute : faVolumeUp}
        />
      </button>
      <h4 className="font-dynapuff text-4xl md:text-5xl font-medium">
        KamaTimer
      </h4>
      {/* <FontAwesomeIcon
          className="text-5xl text-gray-800 cursor-pointer mx-auto"
          icon={faGithub}
        /> */}
      <button onClick={() => props.setIsSettingsVisible(true)}>
        <FontAwesomeIcon className="navbar-icon dark:text-inherit" icon={faGear} />
      </button>
    </nav>
  )
}
