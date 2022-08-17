interface SettingsProps {
  visible: boolean
  setVisible: (input: boolean) => void
  children?: React.ReactNode
}

export default function SettingsPopup(props: SettingsProps) {
  return props.visible ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 flex justify-center items-center">
      <div className="relative p-8 mx-4 w-full max-w-lg bg-white">
        <div className="w-full flex justify-between items-center pb-4">
          <h1 className="text-xl font-bold">Settings</h1>
          <button
            className="text-xl font-bold"
            onClick={() => props.setVisible(false)}
          >
            X
          </button>
        </div>
        {props.children}
      </div>
    </div>
  ) : (
    <div></div>
  )
}
