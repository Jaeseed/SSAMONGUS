import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function SignupForm({ Show }) {
    const [details, setDetails] = useState({username: "", nickname: "", password: "", password_confirm: ""});

    const submitHandler = (e) => {
        e.preventDefault();

        Axios
            .post("https://" + window.location.hostname + ":8080/api/signup", {
                username: details.username,
                nickname: details.nickname,
                password: details.password
            })
            .then((res) => {
                alert("Signup Success!");
                Show();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const formStyle = {
        margin: 150,
        width: 600
    }

    return (
        <Form style={formStyle} onSubmit={submitHandler} className="container">
            <Form.Group className="d-flex row gap-2 form-inner">
                <h2>Signup</h2>
                <div className="col-5">
                    <Form.Label className="label">Username</Form.Label>
                    <Form.Control
                        type="text" autoComplete="off" required
                        placeholder="Enter Username."
                        onChange={(e) => setDetails({...details, username: e.target.value})}
                        className="form-group"
                        value={details.username} />
                </div>
                <div className="col-5 offset-1">
                    <Form.Label className="label">Nickname</Form.Label>
                    <Form.Control
                        type="text" autoComplete="off" required
                        placeholder="Enter Nickname."
                        onChange={(e) => setDetails({...details, nickname: e.target.value})}
                        className="form-group"
                        value={details.nickname} />
                </div>
                <div className="col-5">
                    <Form.Label className="label">Password</Form.Label>
                    <Form.Control
                        type="password" autoComplete="off" required
                        placeholder="Enter Password."
                        onChange={(e) => setDetails({...details, password: e.target.value})}
                        className="form-group"
                        value={details.password} />
                </div>
                <div className="col-5 offset-1">
                    <Form.Label className="label">Password Confirmation</Form.Label>
                    <Form.Control
                        type="password" autoComplete="off" required
                        placeholder="Confirm Password."
                        onChange={(e) => setDetails({...details, password_confirm: e.target.value})}
                        className="form-group"
                        value={details.password_confirm} />
                </div>
                <Button type="submit" size="lg" className="col-5 offset-3">
                    SIGNUP
                </Button>
                <Button type="button" size="lg" className="col-5 offset-3" onClick={() => Show()}>
                    BACK
                </Button>
            </Form.Group>
        </Form>
    )
}
