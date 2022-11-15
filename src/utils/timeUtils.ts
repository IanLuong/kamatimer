export function getTimeString(input: number) {
  const minutes = Math.floor(input / 60)
  const seconds = input - Math.floor(input / 60) * 60

  let timeString = ""
  if (minutes < 10) {
    timeString += "0"
  }
  timeString += `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`

  return timeString
}
