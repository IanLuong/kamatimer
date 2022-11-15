export interface Settings {
  audioLevel: number
  readyTimer: number
  activeTimer: number
  breakTimer: number
  darkMode: boolean
}

export function getDefaultSettings(): Settings {
  return {
    audioLevel: 1,
    readyTimer: 5,
    activeTimer: 1500,
    breakTimer: 300,
    darkMode:
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false,
  }
}
