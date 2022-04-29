import React from 'react'
import ChildBalance from './ChildBalance'
import useDate from '../hooks/useDate'
import { getLoggedUser, getStoredUsers } from '../storage/storage';

export default function UserInfo({ increment }) {
  const selectedUser = getStoredUsers().find(user => user.accNum === getLoggedUser())
  const { displayDate } = useDate(selectedUser.fname);

  return (
    <>
      <div className='user-info-wrapper'>
        <h1>{displayDate}</h1> 
        <h4>{`${selectedUser.lname} ${selectedUser.fname} ${selectedUser.mname}`}</h4>
        <div className='accNum-accCategory'>
          <p>Account Number<br></br>{selectedUser.accNum}</p>
          <p>Account Category<br></br>{selectedUser.acccateg}</p>
          <p>Account Type<br></br>{selectedUser.acctype}</p>
        </div>
      </div>
      <div className='child-container'>
        {selectedUser.acccateg === 'Parent' &&
          <ChildBalance increment={increment}/>
        }
      </div>
    </>
  )
}
