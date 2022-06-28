import React from 'react';
import { Button } from 'react-bootstrap';

export default function RoomListItem({ rooms, joinRoom }) {
    return (
        <div className="row justify-content-around">
            {rooms.map((room) => {
                return (
                    <div
                        key={room.room_id}
                        className="room-box-item d-flex flex-column text-center col-3"
                        >
                        <h1>{room.title}</h1>
                        <Button
                            variant="secondary"
                            className="mt-auto mb-3 mx-3"
                            onClick={() => {
                                joinRoom(room.room_id);
                            }}>
                            Join
                        </Button>
                    </div>
                );
            })}
        </div>
    );
}
