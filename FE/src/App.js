import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Account from './router/Account';
import Main from './router/Main';
import Room from './router/Room';
import OpenviduTest from './router/OpenviduTest'
import Axios from 'axios';

// Axios.defaults.withCredentials = true;

export default function App() {
  const account = useSelector((store) => store.account);

  useEffect(() => {
    if (account.token) {
      Axios.defaults.headers.common['Authorization'] = "Bearer " + account.token;
    }
  })

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/account" element={<Account />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/test/:id" element={<OpenviduTest/>}/>
      </Routes>
    </div>
  );
}
