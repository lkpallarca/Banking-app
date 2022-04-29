import React from 'react' 
import {v4 as uuidv4} from 'uuid';
import { getLoggedUser } from '../storage/storage';
import './../css/index.css';

export default function History({ displayState, closeState, historyMessage, accessingUser }) {
  const loggedUser = getLoggedUser()
  const modifiedHistory = historyMessage.filter(history => history.accNum === loggedUser)

  return (
    <div className={displayState}>
      <div className="history-modal-container">
        <div className="history-modal-content">
          <div className="close-alert-container" onClick={()=> closeState()}>
           X
          </div>
          {accessingUser === 'admin' ?
            <div className="modal-message">
              {historyMessage.map((history) =>{
                return (
                  <div key={uuidv4()}>
                    {history.history}
                  </div>
                )
              })}
            </div> :
            <div className="modal-message">
              {modifiedHistory?.map((history) =>{
                return (
                  <div key={uuidv4()}>
                    {history.history}
                  </div>
                )
              })}
            </div>
          }
        </div>
      </div>
    </div>
  );
}
