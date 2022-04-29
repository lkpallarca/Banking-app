import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { getLoggedUser, getStoredUsers } from '../storage/storage'

export default function ChildBalance({ increment }) {
  const [hasChildren, setHasChildren] = useState(false)
  const userInfo = getStoredUsers()
  const loggedUser = getLoggedUser()
  const [childData, setChildData] = useState({})
  const [childBalances, setChildBalances] = useState([])

  useEffect(() => {
    let childAccNum = []
    let childName = []
    userInfo.forEach(each => {
      if(each.parentAcc === loggedUser) {
        childAccNum.push(each.accNum)
        childName.push(`${each.lname} ${each.fname} ${each.mname}`)
        setChildData({
          childAccounts: childAccNum,
          childNames: childName,
        })
        setHasChildren(true);
      }
    })
  }, [])

  useEffect(() => {
    if(increment < 2) return
    const children = userInfo.filter(each => each.parentAcc === loggedUser)
    let accumulate = []
    children.forEach(each => {
      accumulate.push(each.balance)
    })
    setChildBalances(accumulate)
  }, [increment])
  

  return (
    <>
      {hasChildren === false ?
        <div className='user-info-wrapper'>You currently have no Child Account/s connected</div> :
         <>
         <div className='user-info-wrapper'>
           <div className='user-child-info-title'>Connected Child Accounts</div>
           <div className='user-child-info'>
             <div className='account-table-account-no'>
             <div className='table-title'>Child Acc No.</div>
               {childData.childAccounts?.map(acc =>{
                 return (
                 <div key={uuidv4()}>
                   {acc}
                 </div>
                 )
                 })} 
              </div>
              <div className='account-table-account-name'>
              <div className='table-title'>Child Name</div>
                {childData.childNames?.map(name =>{
                  return (
                  <div key={uuidv4()}>
                   {name}
                 </div>
                 )
                 })} 
              </div>
              <div className='account-table-account-balance'>
              <div className='table-title'>Child Balance</div>
                {childBalances?.map(balance =>{
                  return (
                  <div key={uuidv4()}>
                   {balance}
                 </div>
                 )
                 })} 
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}
