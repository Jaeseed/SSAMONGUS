import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../css/account.css';
import LoginForm from '../components/account/LoginForm';
import SignupForm from '../components/account/SignupForm';

export default function Account() {
  const [loginShow, setLoginShow] = useState(true);
  const navigate = useNavigate();
  const account = useSelector((store) => store.account);

  const Show = () => {
    if (loginShow) {
      setLoginShow(false);
    } else {
      setLoginShow(true);
    }
  }

  useEffect(() => {
    if (account.isLogin) {
      navigate("/");
    }
  })

  return (
    <div className="Account">
      <h1 className="fixed-top text-center text-light m-5">Ssamong us</h1>
      {(loginShow) ? (
        <LoginForm Show={Show} />
      ) : (
        <SignupForm Show={Show} />
      )}
    </div>
  );
}
