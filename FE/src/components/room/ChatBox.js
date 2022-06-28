import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';

export default function ChatBox({ messageOutput, sendMessage }) {
  const [messageInput, setMessageInput] = useState("");
  const scrollRef = useRef();
  const room = useSelector((store) => store.room);

  const scrollToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [room]);

  return (
    <div className="container">
      <h1>ChatBox</h1>
      <div className="container side-box">
        <div className="message-area">
          {messageOutput.map((chat, index) => {
            return (
              <div key={index}>
                <p>【 {chat.sender} 】</p>
                <h6>{chat.content}</h6>
              </div>
            );
          })}
          <div ref={scrollRef}></div>
        </div>
        <Form onSubmit={(e) => {
          e.preventDefault();
          sendMessage(messageInput);
          setMessageInput("");
        }}>
          <Form.Group>
            <InputGroup>
              <Form.Control
                type="text" autoComplete="off" placeholer="Type a message..."
                onChange={(e) => setMessageInput(e.target.value)}
                value={messageInput} />
              <Button type="submit">
                Enter
              </Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
