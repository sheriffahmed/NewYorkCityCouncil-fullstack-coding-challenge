import React from 'react'
import { useSelector } from 'react-redux'
export const UserView = () => {
    useSelector((state) => state.user)
  return (
    <div>UserView</div>
    
  )
}
