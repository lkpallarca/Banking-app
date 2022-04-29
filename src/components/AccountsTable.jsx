import React from 'react'
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { updateStoredUserInfo } from '../storage/storage';

export default function AccountsTable({ passedUserInfo, setPassedUserInfo }) {
  function deleteUser(acc) {
    const newUsers = passedUserInfo.filter((users)=> users.accNum !== acc)
    setPassedUserInfo(newUsers)
    updateStoredUserInfo(newUsers)
  }

  return (
    <>
      <div id='accounts-table-wrapper'>
        <div className='account-table-data'>
          <div className='account-table-account-no'>
            <div className='table-title'>Account No.</div>
            {passedUserInfo.map(({ accNum }) =>{
                return (
                  <div key={uuidv4()}>
                    {accNum}
                  </div>
                )
              })}
          </div>
          <div className='account-table-account-name'>
            <div className='table-title'>Account Name</div>
            {passedUserInfo.map(({ lname, fname, mname }) =>{
                return (
                  <div key={uuidv4()}>
                    {lname} {fname} {mname}
                  </div>
                )
              })}
          </div>
          <div className='account-table-account-category'>
            <div className='table-title'>Account Category</div>
            {passedUserInfo.map(({ acccateg }) =>{
                return (
                  <div key={uuidv4()}>
                    {acccateg}
                  </div>
                )
              })}
          </div>
          <div className='account-table-account-type'>
            <div className='table-title'>Account Type</div>
            {passedUserInfo.map(({ acctype }) =>{
                return (
                  <div key={uuidv4()}>
                    {acctype}
                  </div>
                )
              })}
          </div>
          <div className='account-table-account-balance'>
            <div className='table-title'>Balance</div>
            {passedUserInfo.map(({ balance }) =>{
                return (
                  <div key={uuidv4()}>
                    ₱ {balance}
                  </div>
                )
              })}
          </div>
          <div className='account-table-account-delete'>
            <div className='table-title'>Delete</div>
            {passedUserInfo.map(({ accNum }) =>{
                  if(accNum) {
                    return (
                      <div key={uuidv4()} className="deleteBtn">
                        <FontAwesomeIcon icon={faTrashCan} onClick={()=> deleteUser(accNum)}/>
                      </div>
                    )
                  }
                })}
          </div>
        </div>
      </div>
    </>
  );
}
