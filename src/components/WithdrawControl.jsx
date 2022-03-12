import React from 'react'
import CurrencyOptions from './CurrencyOptions';
import './../css/index.css';

export default function WithdrawControl(props) {
  const { displayFeature } = props;

  return (
    <section className='withdraw-control-wrapper'>
      <div className={displayFeature}>
        <label htmlFor="enter-acc-no">Enter Account No.</label>
        <input type="number" name='enter-acc-no'/>
      </div>
      <div className='withdraw-enter-amount'>
        <label htmlFor="amount">Enter an Amount</label>
        <CurrencyOptions />
        <input type="number" name='amount'/>
      </div>
      <div className='withdraw-triggers'>
        <button>Withdraw</button>
        <button>Reset</button>
      </div>
    </section>
  );
}
