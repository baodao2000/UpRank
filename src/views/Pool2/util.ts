export const timeDisplay = (seconds: number) => {
  const ySecond = 31536000
  const monthSecond = 2592000
  const y = Math.floor(seconds / ySecond)
  const mo = Math.floor((seconds % ySecond) / monthSecond)
  const d = Math.floor((Math.floor(seconds / ySecond) % monthSecond) / 86400)
  const h = Math.floor((seconds % (3600 * 24)) / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const yDisplay = y > 0 ? `${y} year ` : ''
  const moDisplay = mo > 0 ? `${mo} month ` : ''
  const dDisplay = d > 0 ? `${d} d ` : ''
  const hDisplay = h > 0 ? `${h} h ` : ''
  const mDisplay = m > 0 ? `${m} m ` : ''
  const sDisplay = s > 0 ? `${s} s` : ''
  return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay + sDisplay
}
