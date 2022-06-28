import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/account';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

export default function SideBar() {
    const navigate = useNavigate();
    const account = useSelector((store) => store.account);
    const dispatch = useDispatch();

    const _logout = () => {
        alert("Logout Completed...");
        dispatch(logout());
        navigate("/account");
    }

    const withdrawal = () => {
        if (window.confirm("Really..?")) {
            Axios
                .delete("https://" + window.location.hostname + ":8080/api/delete/" + account.username)
                .then((res) => {
                    alert("Withdrawal Completed...");
                    dispatch(logout());
                    navigate("/account");
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            alert("Withdrawal Canceled..!");
        }
    }

    return (
        <aside>
            <h5 className="m-2">Hello, {account.username}!</h5>
            <Button className="ms-2" type="button" variant="secondary" size="sm" onClick={_logout}>Logout</Button>
            <Button className="ms-2" type="button" variant="danger" size="sm" onClick={withdrawal}>Withdrawal</Button>
        </aside>
    );
}
