import React, { useState } from 'react'
import CurrencyOptions from './CurrencyOptions';
import AlertModals from './AlertModals';
import './../css/index.css';
import { AccountOptions } from './AccountOptions';
import useDate from '../hooks/useDate';
import { updateStoredHistory, updateStoredUserInfo, getLoggedUser } from '../storage/storage';

export default function DepositControl({ currentUsers, setCurrentUser, passedHistory, setPassedHistory }) {
  const accessingUser = getLoggedUser()
  const [matchedAcc, setAccMatch] = useState(accessingUser);
  const [accLabel, setAccLabel] = useState('Please select Account Number');
  const [depositAmount, setDepositAmount] = useState()
  const [transactionSuccessful, setTransactionSuccessful] = useState(false)
  const [invalidAmount, setInvalidAmount] = useState(false)
  const [currency, setCurrency] = useState(1)
 const { time } = useDate();

  function handleSubmit(e) {
    e.preventDefault()
    if(depositAmount < 100) {
      setInvalidAmount(true)
      e.target.reset()
      resetState()
      return
    }
    const selectedUser = currentUsers.find(acc => acc.accNum === matchedAcc)
    selectedUser.balance += (depositAmount * currency)
    let newHistory = `${selectedUser.lname} ${selectedUser.fname} deposited ₱${(depositAmount * currency)} on ${time}.`
    setPassedHistory([...passedHistory, {accNum: matchedAcc, history: newHistory}])
    setTransactionSuccessful(true)
    setCurrentUser(currentUsers)
    updateStoredHistory([...passedHistory, {accNum: matchedAcc, history: newHistory}])
    updateStoredUserInfo(currentUsers)
    e.target.reset()
    resetState()
  }

  function resetState() {
    setAccMatch(accessingUser)
    setDepositAmount()
    setAccLabel('Please select Account Number')
    setCurrency(1)
  }

  return (
    <section className='deposit-control-wrapper' id='deposit-control-wrapper'>
      <div className='withdraw-deposit-title'>
        Deposit
      </div>
    <form autoComplete='off' onSubmit={handleSubmit}>
      <div className='enter-acc-no'>
      {accessingUser === 'admin' &&
        <AccountOptions passedUserInfo={currentUsers} onSetAccLabel={setAccLabel} selectedAccLabel={accLabel} onSelectAcc={setAccMatch} selectedAcc={matchedAcc}/>
      }
      </div>
      <label htmlFor="amount">Enter an Amount</label>
      <div className='deposit-enter-amount'>
        <CurrencyOptions convertCurr={currency} onConvertCurr={setCurrency}/>
        <input required type="number" name='amount' onChange={(e) => setDepositAmount(Number(e.target.value))}/>
      </div>
      <div className='deposit-triggers'>
        <button>Deposit</button>
        <button type='reset' onClick={resetState}>Reset</button>
      </div>
     </form>
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
    </section>
  );
}
