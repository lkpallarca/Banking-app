import React, { useState, useEffect } from 'react'
import UserExpenses from '../components/UserExpenses'
import DepositControl from '../components/DepositControl';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import TransferControl from '../components/TransferControl';
import WithdrawControl from '../components/WithdrawControl';
import History from '../components/History';
import './../css/index.css';
import UserInfo from '../components/UserInfo';
import { getLoggedUser, getStoredHistory, getStoredUsers, updateStoredHistory, updateStoredUserInfo } from '../storage/storage';

export default function UserScreen() {
  const [userInfo, setUserInfo] = useState([]);
  const [history, setHistory] = useState([])
  const [displayModal, setDisplayModal] = useState('welcome-modal')
  const [displayHistory, setDisplayHistory] = useState(false)
  const [increment, setIncrement] = useState(0)
  const loggedUser = getLoggedUser();
  
  useEffect(()=> {
    setUserInfo(getStoredUsers())
    const getHistory = getStoredHistory()
    if(getHistory) {
      setHistory(getHistory)
    } else {
      updateStoredHistory([])
    }
  }, [])

  useEffect(()=> {
    updateStoredHistory(history);
    setIncrement(increment + 1)
  }, [history])
  
  function renderInfo() {
    setDisplayModal('welcome-modal hide')
  }

  return (
    <section className='user-wrapper'>
      <div className={displayModal}>
        <div className='welcome-container'>
          <div className='welcome-modal-icon'>🎉</div>
          <h1>Welcome on board!</h1>
          <div className='short-desc'>Start saving today</div>
          <button onClick={renderInfo}>Let's Go</button>
        </div>
      </div>
      <div>
      <Navbar />
      </div>
      <div className='user-screen-grid'>
        <div className='grid-one'>
          <div className='historyBtn' onClick={()=> setDisplayHistory(true)}>
            <i className="fa-solid fa-clock-rotate-left"></i>
            View Transaction History
          </div>
          <History
            displayState={displayHistory ? "alert-modal-wrapper show" : "alert-modal-wrapper"}
            closeState={()=> displayHistory ? setDisplayHistory(false) : setDisplayHistory(true)}
            historyMessage={history}
            accessingUser={loggedUser}
          />
          <UserInfo increment={increment}/>
        </div>
        <div className='grid-two'>
        <UserExpenses 
            passedHistory={history}
            setPassedHistory={setHistory}
          />
        <div className='withdraw-deposit'>
          <WithdrawControl 
              currentUsers={userInfo} 
              setCurrentUser={setUserInfo} 
              passedHistory={history}
              setPassedHistory={setHistory}
          />
          <DepositControl 
              currentUsers={userInfo} 
              setCurrentUser={setUserInfo} 
              passedHistory={history}
              setPassedHistory={setHistory}
            />
          </div>
          <div className='transfer-control'>
          <TransferControl 
              currentUsers={userInfo} 
              setCurrentUser={setUserInfo} 
              passedHistory={history}
              setPassedHistory={setHistory}
            />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
