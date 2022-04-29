import './css/index.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './containers/WelcomeScreen';
import AdminScreen from './containers/AdminScreen';
import UserScreen from './containers/UserScreen';

function App() {
  return (
      <div className="App" >
        <Routes>
          <Route path='/' element={<WelcomeScreen />}/>
          <Route path='/admin' element={<AdminScreen />}/>
          <Route path='/user' element={<UserScreen />}/>
        </Routes>
      </div>
  );
}

export default App;
