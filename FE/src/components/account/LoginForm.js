import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/account';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function LoginForm({ Show }) {
    const [details, setDetails] = useState({username: "", password: ""});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        Axios
            .post("https://" + window.location.hostname + ":8080/api/authenticate", {
                username: details.username,
                password: details.password
            })
            .then((res) => {
                alert("Login Success!");
                dispatch(login(details.username, res.data.token));
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const formStyle = {
        margin: 150
    }

    return (
        <Form style={formStyle} onSubmit={submitHandler}>
            <Form.Group className="d-grid gap-2 form-inner">
                <h2>Login</h2>
                <Form.Label className="label">Username</Form.Label>
                <Form.Control
                    type="text" autoComplete="off" required
                    placeholder="Enter Username."
                    onChange={(e) => setDetails({...details, username: e.target.value})}
                    className="form-group"
                    value={details.username} />
                <Form.Label className="label">Password</Form.Label>
                <Form.Control
                    type="password" autoComplete="off" required
                    placeholder="Enter Password."
                    onChange={(e) => setDetails({...details, password: e.target.value})}
                    className="form-group"
                    value={details.password} />
                <Button type="submit" variant="primary" size="lg">
                    LOGIN
                </Button>
                <Button type="button" variant="success" size="lg" onClick={() => Show()}>
                    SIGNUP
                </Button>
            </Form.Group>
        </Form>
    )
}
