import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/main.css';
import RoomList from '../components/main/RoomList';
import SideBar from '../components/main/SideBar';

export default function Main() {
  const navigate = useNavigate();
  const account = useSelector((store) => store.account);

  useEffect(() => {
    if (!account.isLogin) {
      navigate("/account");
    }
  })

  return (
    <div className="Main container">
      <SideBar className="d-flex" style={{position: 'fixed', right: 0, top: 0}} />
      <h1 className="text-center m-5">　　　Ssamong us</h1>
      <RoomList />
    </div>
  );
}
