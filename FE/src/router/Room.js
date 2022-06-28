import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { myPlayerId, countAllChat, isReady, roomInf } from '../store/actions/room';
import '../css/room.css';
import CamList from '../components/room/CamList';
import FootBar from '../components/room/FootBar';
import ChatBox from '../components/room/ChatBox';
import VoteBox from '../components/room/VoteBox';
import Axios from 'axios';
import SockJs from 'sockjs-client';
import { over } from 'stompjs';

const sock = new SockJs("https://" + window.location.hostname + ":8080/api/ws");
const stomp = over(sock);
stomp.debug = () => {};

export default function Room() {
  const [nowSide, setSide] = useState("");
  const [nowBox, setBox] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const [voteList, setVoteList] = useState([]);
  const [messageOutput, setMessageOutput] = useState([]);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const account = useSelector((store) => store.account);
  const room = useSelector((store) => store.room);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!account.isLogin) {
      navigate("/account");
    }
  })

  const onClick = (e) => {
    if (nowSide === e) {
      setSide("");
      setBox("");
    } else {
      setSide(e);

      if (e === "chat") {
        setBox(<ChatBox sendMessage={sendMessage} messageOutput={messageOutput} />);
      } else if (e === "quit") {
        Axios
          .delete("https://" + window.location.hostname + ":8080/api/room/out/" + room.myPlayerId)
          .then((res) => {
            dispatch(myPlayerId(""));
            dispatch(countAllChat(true));
            dispatch(isReady(true));
            dispatch(roomInf([]));
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          })
      } else if (e === "vote") {
        Axios
          .get("https://" + window.location.hostname + ":8080/api/room/vote/" + roomId)
          .then((res) => {
            setModalOn(true);
            console.log(res);
            setVoteList(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }

  const _ready = () => {
    stomp.send("/app/game/ready/" + roomId + "/" + account.username, {}, JSON.stringify({type: "player"}));
  }

  const vote = () => {
    stomp.send("/app/room/dead/" + roomId + "/" + account.username, {}, JSON.stringify({type: "dead"}));
  }

  stomp.connect({}, (frame) => {
    console.log("Connected: " + frame);
    stomp.subscribe("/topic/chat/" + roomId, onMessageReceived);
    stomp.send("/app/chat.addUser/" + roomId, {}, JSON.stringify({sender: account.username, type: "JOIN"}));
  })

  const sendMessage = (message) => {
    const messageContent = message.trim();

    if (messageContent && stomp) {
      const chatMessage = {
        sender: account.username,
        content: messageContent,
        type: "CHAT"
      }

      stomp.send("/app/chat.sendMessage/" + roomId, {}, JSON.stringify(chatMessage));
    }
  }

  const onMessageReceived = (payload) => {
    const message = JSON.parse(payload.body);

    if (message.type === "JOIN") {
      message.content = message.sender + " joined!";
    } else if (message.type === "LEAVE") {
      message.content = message.sender + " left!";
    } else if (message.type === "CHAT") {
      messageOutput.push(message);
      dispatch(countAllChat(false));
      setMessageOutput([...messageOutput]);
    } else if (message[0].type === "player") {
      dispatch(isReady(false));
      dispatch(roomInf(message));
    } else if (message[0].type === "dead") {
      console.log(payload, "!");
    }
    console.log(payload, "?");
  }

  return (
    <div className="Room">
      <div className="room-container">
        <CamList />
        <div>
          {nowBox}
        </div>
      </div>
      <FootBar onClick={onClick} _ready={_ready} />
      <VoteBox
        show={modalOn}
        vote={vote}
        voteList={voteList}
        roomId={roomId}
        onHide={() => {
          setSide("");
          setBox("");
          setModalOn(false);
        }} />
    </div>
  );
}
