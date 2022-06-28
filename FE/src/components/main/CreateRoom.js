import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function CreateRoom({ show, onHide, joinRoom }) {
    const [roomName, setRoomName] = useState({title: ""});
    const account = useSelector((store) => store.account);

    const create = () => {
        if (roomName.title) {
            Axios
                .post("https://" + window.location.hostname + ":8080/api/room/create/" + account.username, {
                    title: roomName.title
                })
                .then((res) => {
                    alert("Create Success!");
                    joinRoom(res.data.room_id);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            alert("Roomname must need!");
        }
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
                    Create Room
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Roomname</Form.Label>
                    <Form.Control
                        type="text" autoComplete="off" required
                        placeholder="Enter Roomname."
                        onChange={(e) => setRoomName({title: e.target.value})}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                create();
                            }
                        }}
                        value={roomName.username} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button size="lg" onClick={create}>Create</Button>
                <Button size="lg" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
