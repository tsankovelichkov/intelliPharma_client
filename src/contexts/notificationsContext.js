import React, { useContext, useState } from 'react'

const NotificationStatusContext = React.createContext()
const ActivateNotificationContext = React.createContext()
const DeactivateNotificationContext = React.createContext()

export function useNotificationStatus(){
  return useContext(NotificationStatusContext)
}

export function useActivateNotification(){
  return useContext(ActivateNotificationContext)
}

export function useDeactivateNotification(){
  return useContext(DeactivateNotificationContext)
}

export const NotificationProvider = ({ children }) => {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [operationType,setOperationType] = useState()
  const [message,setMessage] = useState()

  function activateNotification(type,message) {
    setOperationType(type)
    setNotificationStatus(true)
    setMessage(message)
  }

  function deactivateNotification(){
    setNotificationStatus(false)
    setMessage(undefined)
  }

  return (
    <NotificationStatusContext.Provider value={{notificationStatus,operationType,message}}>
      <DeactivateNotificationContext.Provider value={deactivateNotification}>
      <ActivateNotificationContext.Provider value = {activateNotification}>
        {children}
      </ActivateNotificationContext.Provider>
      </DeactivateNotificationContext.Provider>
    </NotificationStatusContext.Provider>
  )
}