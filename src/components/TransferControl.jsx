import React, { useState, useEffect } from 'react'
import './../css/index.css';
import CurrencyOptions from './CurrencyOptions';
import AlertModals from './AlertModals';
import { AccountOptionsTransferFrom, AccountOptionsTransferTo } from './AccountOptions';
import useDate from '../hooks/useDate';
import { updateStoredHistory, updateStoredUserInfo, getLoggedUser } from '../storage/storage';

export default function TransferControl({ currentUsers, setCurrentUser, passedHistory, setPassedHistory }) {
  const accessingUser = getLoggedUser();
  const [matchedAccFrom, setAccMatchFrom] = useState(accessingUser);
  const [accLabelFrom, setAccLabelFrom] = useState('Please select Sender Account Number');
  const [matchedAccTo, setAccMatchTo] = useState();
  const [accLabelTo, setAccLabelTo] = useState('Please select Receiver Account Number');
  const [transferAmount, setTransferAmount] = useState('0')
  const [notEnoughBalance, setNotEnoughBalance] = useState(false)
  const [receiverNotExist, setReceiverNotExist] = useState(false)
  const [transactionSuccessful, setTransactionSuccessful] = useState(false)
  const [approveTransfer, setApproveTransfer] = useState(true)
  const [correctTransferTo, setCorrectTransferTo] = useState(false)
  const [invalidAmount, setInvalidAmount] = useState(false)
  const [sameAccError, setSameAccError] = useState(false)
  const [currency, setCurrency] = useState(1)
  const { time } = useDate();

  useEffect(() => {
    const selectedUser = currentUsers.find(acc => acc.accNum === matchedAccFrom)
    if(selectedUser?.balance < (transferAmount * currency)) {
      setApproveTransfer(false)
    }
  }, [transferAmount, currency])

  function handleInputTransferTo(e) {
    const selectedUser = currentUsers.find(user => user.accNum === e.target.value)
    if(selectedUser) {
      setCorrectTransferTo(true)
      setAccMatchTo(e.target.value)
    }
  }

  const shortCircuit = (e) => {
    if(transferAmount < 100) {
      setInvalidAmount(true)
      e.target.reset()
      resetState()
      return
    }
    if(correctTransferTo === false) {
      setReceiverNotExist(true)
      e.target.reset()
      resetState()
      return
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const selectedUserFrom = currentUsers.find(acc => acc.accNum === matchedAccFrom)
    const selectedUserTo = currentUsers.find(acc => acc.accNum === matchedAccTo)
    const from = `${selectedUserFrom.lname} ${selectedUserFrom.fname}`
    const to = `${selectedUserTo.lname} ${selectedUserTo.fname}`
    shortCircuit(e);
    if(matchedAccFrom !== matchedAccTo) {
      if(approveTransfer === true) {
        selectedUserFrom.balance -= (transferAmount * currency)
        selectedUserTo.balance += (transferAmount * currency)
        setTransactionSuccessful(true)
        setCurrentUser(currentUsers)
        updateStoredUserInfo(currentUsers)
      } else {
        setNotEnoughBalance(true)
      }
    } else {
      setSameAccError(true)
    }
    let newHistory = `${from} transferred ₱${(transferAmount * currency)} to ${to} on ${time}.`
    let receiverHistory = `${to} received ₱${(transferAmount * currency)} from ${from} on ${time}.`
    setPassedHistory([...passedHistory, {accNum: matchedAccFrom, history: newHistory}, {accNum: matchedAccTo, history: receiverHistory}])
    updateStoredHistory([...passedHistory, {accNum: matchedAccFrom, history: newHistory}, {accNum: matchedAccTo, history: receiverHistory}])
    e.target.reset()
    resetState()
  }

  function resetState() {
    setApproveTransfer(true)
    setAccMatchFrom(accessingUser)
    setAccMatchTo()
    setTransferAmount('0')
    setAccLabelFrom('Please select Sender Account Number')
    setAccLabelTo('Please select Receiver Account Number')
    setCurrency(1)
    setCorrectTransferTo(false)
  }
  
  return (
    <section className='transfer-control-wrapper' id='transfer-control-wrapper'>
      <div className='withdraw-deposit-title'>
        Transfer
      </div>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <div className='transfer-control-container'>
        <div className='enter-acc-no'>
          {accessingUser === 'admin' &&
            <AccountOptionsTransferFrom passedUserInfo={currentUsers} onSetAccLabel={setAccLabelFrom} selectedAccLabel={accLabelFrom} onSelectAcc={setAccMatchFrom} selectedAcc={matchedAccFrom} />
          }
        </div>
        <div className='enter-acc-no'>
          {accessingUser === 'admin' ?
            <AccountOptionsTransferTo setCorrectTransferTo={setCorrectTransferTo} passedUserInfo={currentUsers} onSetAccLabel={setAccLabelTo} selectedAccLabel={accLabelTo} onSelectAcc={setAccMatchTo} selectedAcc={matchedAccTo} /> :
            <>
              <label htmlFor='transfer-to'>Enter Receiver Account No.</label>
              <br></br>
              <input required name='transfer-to' type="text" id='transfer-to' placeholder='account no.' onKeyUp={handleInputTransferTo}></input>
            </>
          }
        </div>
          <label htmlFor="amount">Enter an Amount</label>
        <div className='transfer-enter-amount'>
          <CurrencyOptions convertCurr={currency} onConvertCurr={setCurrency}/> 
          <input required type="number" name='amount' onChange={(e) => setTransferAmount(Number(e.target.value))}/>
        </div>
      </div>
        <div className='transfer-triggers'>
          <button>Transfer</button>
          <button type='reset' onClick={resetState}>Reset</button>
        </div>
      </form>
      <AlertModals
        displayState={notEnoughBalance ? "alert-modal-wrapper show" : "alert-modal-wrapper"}
        closeState={()=> notEnoughBalance ? setNotEnoughBalance(false) : setNotEnoughBalance(true)}
        boldAlert={'OOPS!'}
        message={"Sorry, you don't have enough balance to make this transaction."}
        image={"https://img.icons8.com/cotton/50/000000/error--v4.png"}
      />
      <AlertModals
        displayState={transactionSuccessful ? "alert-modal-wrapper show" : "alert-modal-wrapper"}
        closeState={()=> transactionSuccessful ? setTransactionSuccessful(false) : setTransactionSuccessful(true)}
        boldAlert={'GREAT!'}
        message={"The transaction was successful."}
        image={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADmklEQVRoge2ZTWgWRxjH/5Ok0RgkaUIRLVhoTTBGSUHjB6X21DbQWw8VWvSgnlRayUV6U3oWeqqIoF4EEb96a7WFNGLIRWhLiii2IJooIcZETOtH4q+HfZYsL8mb3dnZNxHyvzxk33n+83t2drKzM9KiFlWIXFHGwBpJWyS1SmqUNCVpRFK/pF7n3GRRfecWUA3sBgYorzvA9pB9BxsRYKWkC5K22aUhSdclDUq6Z9fekdSlaJT+k3RK0hnnXF8ojlwCGoFbdrdvA58BM94koAo4WjJCZ4FlleaeCe60Ad0AGlK0rwLWAQeBYcu9WAnWclCrgUngJdDhkf8uMGrFdBXBmBZkn0FcyOFxOH7EQrJlhbhkEHtyeLSZx98h2bJC9BvE1hwe1cAz4JXvpK/y7TyhZotjvgbOuSlJzxW9Dmp9PEIUEr+hyelTY/GVT3KIQoYtrvA1AJokLZM04Zx74uMRopAHFlfl8Gix+I+vQYhC/rSY+R2S0IcWr/sahCjkhsXNOTw+snjN1yBEIbFHJ1BTtuUMAmo1PSLjAXj8BPTYe+TQbAvFOfId8K15/FIEY1qQmwbhPUeADvP4y9cjxKM1YHFjDo9Oi96F5Bawy+7mXaDbI7/bcgF2FsGYFqQaOG/rpHEg9Sjbd8l4vHoGqotkTQv1uwG1Z8jZYDk38/YfYo7E+s3iVxlyvizJnX8BG+3ujgJvpWjfBDyynA8qwZhawGUD6wGay7RbDvxsba9WkjGVgLeBh3N9aAFrrc0Y8F6IvkPOETnnBhXtY6Xtd8Q5F+TzNmghpjRfePFH2JJQnRZRyFKLT8u0mbC4MAsBVkhaaX+WW8mOKxqVBmB1SIbcspfbHzaJf0rR/lz8MgQ2VYJxLqB24BjwwsBuE21oz5XXzPSu/SRwEni/EsxJiBrgc+BXW2MBTBHtATdm8FkOnLDcWNeAL4A3iixgKXCA6dUqwARwHFifw7cN+AF4mvC9D3wD1IUswBEd4AwmOhoAvgbeDNhPA7A/MdcAhoC9eHx9lprXAz8mjPupwK458DHQl+j3MlDva7YE6DWjEWBHYN40DDsTj1wv0WZFZpPvzeAe0FoAZ1qODcYAcDRrcgvR4c0UsKUgxiw8W43lBdGJcerE7+wOXCmQL5OAq8Z0pPS3ckuUTyxeKgbLS/E546elP8z6Lw14rOigfyHqsXOuKXlhtiPkOkn/VgTJX3XOuWfzDbGoRb0u+h/xDJ/HHlzXCgAAAABJRU5ErkJggg=="}
      />
      <AlertModals
        displayState={invalidAmount ? "alert-modal-wrapper show" : "alert-modal-wrapper"}
        closeState={()=> invalidAmount ? setInvalidAmount(false) : setInvalidAmount(true)}
        boldAlert={'OOPS!'}
        message={"Sorry, the transaction value is invalid."}
        image={"https://img.icons8.com/cotton/50/000000/error--v4.png"}
      />
       <AlertModals
        displayState={sameAccError ? "alert-modal-wrapper show" : "alert-modal-wrapper"}
        closeState={()=> sameAccError ? setSameAccError(false) : setSameAccError(true)}
        boldAlert={'OOPS!'}
        message={"Sorry, you can't select the same account."}
        image={"https://img.icons8.com/cotton/50/000000/error--v4.png"}
      />
      <AlertModals
        displayState={receiverNotExist ? "alert-modal-wrapper show" : "alert-modal-wrapper"}
        closeState={()=> receiverNotExist ? setReceiverNotExist(false) : setReceiverNotExist(true)}
        boldAlert={'OOPS!'}
        message={"Sorry, the receiver account number does not exist."}
        image={"https://img.icons8.com/cotton/50/000000/error--v4.png"}
      />
    </section>
  )
}
