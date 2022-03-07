import getTimePeriods from './getTimePeriods'

/**
 * @param {Object} periods Return value from getTimePeriods
 * @param excludePeriods Key list for the object values of that exclude the periods
 * @return {string} '14h 3m 4s'
 */
const formatTimePeriod = (periods: ReturnType<typeof getTimePeriods>, excludePeriods = []) => {
  const textArr = []

  Object.keys(periods).forEach((period) => {
    if (periods[period] > 0 && !excludePeriods.includes(period)) {
      textArr.push(`${periods[period]}${period.substr(0, 1)}`)
    }
  })

  if (textArr.length === 0) {
    return null
  }

  return textArr.join(' ')
}

export function getFormattedDateFromTimeStamp(seconds: number) {
  const date = new Date(seconds*1000)
  const yy = date.getFullYear()
  const mm = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1 
  const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${dd}/${mm}/${yy}`
}

export function getTimeFromTimeStamp(seconds: number) {
  const today = new Date(seconds*1000)
  const hh = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
  const mm = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
  const ss = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds()
  
  return `${hh}:${mm}:${ss}`;
}

export default formatTimePeriod
