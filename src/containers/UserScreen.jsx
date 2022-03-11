import React from 'react'
import UserInfo from '../components/UserInfo';
import DepositControl from '../components/DepositControl';
import TransferControl from '../components/TransferControl';
import WithdrawControl from '../components/WithdrawControl';

export default function UserScreen() {
  return (
    <section className='user-wrapper'>
      <UserInfo />
      <WithdrawControl displayFeature="enter-acc-no hide" />
      <DepositControl displayFeature="enter-acc-no hide" />
      <TransferControl displayFeature="enter-acc-no hide"/>
    </section>
  );
}