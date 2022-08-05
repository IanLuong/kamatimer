interface SettingsProps {
  visible: boolean
  setVisible: Function
  children: any
}

export default function Settings(props: SettingsProps) {
  return props.visible ? (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/30 flex justify-center items-center">
      <div className="relative p-8 w-full max-w-lg bg-white font-cabin">
        <div className="w-full flex justify-between items-center pb-4">
          <h1 className="text-lg font-bold">Settings</h1>
          <button
            className=""
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
