import {
  faGear,
  faVolumeMute,
  faVolumeUp,
  faVolumeLow,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Settings } from "../utils/settingsUtils"

enum Mode {
  INACTIVE,
  ACTIVE,
  BREAK,
}

interface NavbarProps {
  setIsSettingsVisible: (input: boolean) => void
  settings: Settings
  setSettings: any
  mode: Mode
}

export default function Navbar(props: NavbarProps) {
  function toggleMute() {
    props.setSettings((prevSettings: Settings) => ({
      ...prevSettings,
      audioLevel: (prevSettings.audioLevel % 3) + 1,
    }))
  }

  return (
    <nav
      className={`w-full p-4 text-inherit border-b-4 dark:border-b-gunmetal bg-raisin ${
        props.mode === Mode.ACTIVE
          ? "text-red-500"
          : props.mode === Mode.INACTIVE
          ? "text-yellow-500"
          : "text-green-500"
      }`}
    >
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div>
          <button onClick={toggleMute}>
            <FontAwesomeIcon
              className="navbar-icon w-10 text-inherit"
              //TODO: Refactor icon switching code
              icon={
                props.settings.audioLevel === 1
                  ? faVolumeLow
                  : props.settings.audioLevel === 2
                  ? faVolumeUp
                  : faVolumeMute
              }
            />
          </button>
        </div>
        <h4 className="font-dynapuff text-4xl md:text-5xl font-medium">
          KamaTimer
        </h4>
        <div>
          <button onClick={() => props.setIsSettingsVisible(true)}>
            <FontAwesomeIcon
              className="navbar-icon text-inherit"
              icon={faGear}
            />
          </button>
        </div>
      </div>
    </nav>
  )
}
