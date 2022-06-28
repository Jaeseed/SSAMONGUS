import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

export default function FootBar({ onClick, _ready }) {
  const room = useSelector((store) => store.room);

  return (
    <div>
      {(room.isReady) ? (
        <Button className="m-1" size="lg" onClick={() => _ready()}>준비해제</Button>
      ) : (
        <Button className="m-1" size="lg" onClick={() => _ready()}>준비</Button>
      )}
      {/* <Button className="m-1" size="lg" onClick={() => onClick("quit")}>나가기</Button> */}
      <Button className="m-1" size="lg" onClick={() => onClick("chat")}>채팅</Button>
      <Button className="m-1" size="lg" onClick={() => onClick("vote")}>투표</Button>
    </div>
  );
}
