import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function CreateRoom({ show, onHide, vote, voteList, roomId }) {
    const [selectOne, setSelectOne] = useState("");
    const account = useSelector((store) => store.account);

    const select = () => {
        if (selectOne) {
            if (window.confirm("Really..?")) {
                Axios
                    .post("https://" + window.location.hostname
                        + ":8080/api/room/vote/" + roomId
                        + "/" + selectOne + "/" + account.username)
                    .then((res) => {
                        console.log(res);
                        vote();
                        onHide();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                alert("Vote must need!");
            }
        } else {
            alert("Vote must need!");
        }

        setSelectOne("");
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Vote
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                {voteList.map((list, index) => (
                    <div key={index} className="mb-3">
                        <Form.Check 
                            type="radio"
                            id={list.player_id}
                            label={list.username}
                            name="vote"
                            onChange={(e) => {setSelectOne(e.target.id)}} />
                    </div>
                ))}
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button size="lg" onClick={select}>Select</Button>
                <Button size="lg" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
