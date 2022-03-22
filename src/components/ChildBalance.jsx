import React from 'react'
import {v4 as uuidv4} from 'uuid'

export default function ChildBalance({ passedChildAccNum, passedChildName, passedChildBalance, ifHasChildren }) {


  return (
    <>
      {ifHasChildren === false ?
        <div className='user-info-wrapper'>You currently have no Child Account/s connected</div> :
         <>
         <div className='user-info-wrapper'>Connected Child Accounts</div>
         <div className='account-table-account-no'>
           <div className='table-title'>Child Account No.</div>
           {passedChildAccNum.map((acc) =>{
               return (
                 <div key={uuidv4()}>
                   {acc}
                 </div>
               )
             })} 
         </div>
         <div className='account-table-account-name'>
           <div className='table-title'>Child Name</div>
           {passedChildName.map((name) =>{
               return (
                 <div key={uuidv4()}>
                   {name}
                 </div>
               )
             })} 
         </div>
         <div className='account-table-account-balance'>
           <div className='table-title'>Child Balance</div>
           {passedChildBalance.map((balance) =>{
               return (
                 <div key={uuidv4()}>
                   {balance}
                 </div>
               )
             })} 
         </div>
       </>
      }
    </>
  )
}