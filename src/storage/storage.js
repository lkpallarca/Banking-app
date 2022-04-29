import React from 'react'

export const storeAccessingUser = (info) => {
  localStorage.setItem("loggedUser", JSON.stringify(info))
}

export const updateStoredUserInfo = (info) => {
  localStorage.setItem('users', JSON.stringify(info))
}

export const updateStoredHistory = (history) => {
  localStorage.setItem('history', JSON.stringify(history))
}

export const getLoggedUser = () => {
  return JSON.parse(localStorage.getItem('loggedUser'))
}

export const getStoredUsers = () => {
  return JSON.parse(localStorage.getItem('users'))
}

export const getStoredHistory = () => {
  return JSON.parse(localStorage.getItem('history'))
}