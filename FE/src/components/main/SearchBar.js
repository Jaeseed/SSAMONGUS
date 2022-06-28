import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import CreateRoom from './CreateRoom';

export default function SearchBar({ getRooms, filterRooms, joinRoom }) {
    const [modalOn, setModalOn] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (searchValue.trim()) {
            filterRooms(searchValue);
        }

        setSearchValue("");
    }

    return (
        <Form className="d-flex justify-content-center" onSubmit={submitHandler}>
            <CreateRoom
                show={modalOn}
                onHide={() => setModalOn(false)}
                joinRoom={joinRoom} />
            <Button type="button" variant="primary" size="lg" onClick={() => setModalOn(true)}>
                Create
            </Button>
            <InputGroup>
                <Form.Control
                    type="search"
                    placeholder="Type a search..."
                    size="lg"
                    className="ms-2"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue} />
                <Button className="me-2" type="submit" variant="success">
                        Enter
                </Button>
            </InputGroup>
            <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => {
                    alert("Refresh Rooms!")
                    setSearchValue("");
                    getRooms();
                }}>
                Refresh
            </Button>
        </Form>
    );
}
