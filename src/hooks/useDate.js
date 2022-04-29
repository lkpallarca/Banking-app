import React from 'react'

export default function useDate(user) {
  const today = new Date()
  const hrs24 = today.getHours()
  const date = new Date().toLocaleString().split(',')[0]
  const hours = new Date().getHours()
  var mins = new Date().getMinutes()
  mins = mins > 9 ? mins : '0' + mins
  const time = `${date} ${hours}:${mins}`

  function getDate(h, user = 'Admin') {
    if (h < 12) {
      return `Good Morning, ${user}`
    } else if (h <= 18) {
      return `Good Afternoon, ${user}`
    } else {
      return `Good Evening, ${user}`
    }
  }

  const displayDate = getDate(hrs24, user)

  return { displayDate, time }
}
