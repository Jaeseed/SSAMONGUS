import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { useState, useEffect } from 'react';
import UserVideoComponent from '../components/openvidu_test/UserVideoComponents';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';


export default function OpenviduTest () {
    const { id } = useParams();
    const username = useSelector((store) => store.account.username);
    const [openviduInfo, setOpenviduInfo] = useState({
        mySessionId: id,
        myUserName: username,
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
    });
    let OV = new OpenVidu();
    const deleteSubscriber = (streamManager)  => {
        let subscribers = openviduInfo.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            setOpenviduInfo({
                ...openviduInfo,
                subscribers: subscribers
            });
        }
    }
    const onbeforeunload = () => {
        leaveSession();
    }
    const createSession = (sessionId) => {
        return new Promise((resolve, reject) => {
            var data = JSON.stringify({ customSessionId: sessionId });
            axios
                .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('CREATE SESION', response);
                    resolve(response.data.id);
                })
                .catch((response) => {
                    var error = Object.assign({}, response);
                    if (error?.response?.status === 409) {
                        resolve(sessionId);
                    } else {
                        console.log(error);
                        console.warn(
                            'No connection to OpenVidu Server. This may be a certificate error at ' +
                            OPENVIDU_SERVER_URL,
                        );
                        if (
                            window.confirm(
                                'No connection to OpenVidu Server. This may be a certificate error at "' +
                                OPENVIDU_SERVER_URL +
                                '"\n\nClick OK to navigate and accept it. ' +
                                'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                                OPENVIDU_SERVER_URL +
                                '"',
                            )
                        ) {
                            window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                        }
                    }
                });
        });
    }

    const createToken = (sessionId) => {
        return new Promise((resolve, reject) => {
            var data = {};
            axios
                .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                    headers: {
                        Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log('TOKEN', response);
                    resolve(response.data.token);
                })
                .catch((error) => reject(error));
        });
    }
    const getToken = () => {
        return createSession(openviduInfo.mySessionId).then((sessionId) => createToken(sessionId));
    }
    const joinSession = () => {
        window.addEventListener('beforeunload', onbeforeunload);
        let session_ = OV.initSession()
        setOpenviduInfo({
            ...openviduInfo,
            session: session_
        });

        session_.on('steamCreated', (event) => {
            const subscriber = session_.subscribe(event.stream, undefined);
            const subscribers = openviduInfo.subscribers;
            subscribers.push(subscriber);
            setOpenviduInfo({
                ...openviduInfo,
                subscribers: subscribers,
            });
        })

        session_.on('streamDestroyed' , (event) => {
            deleteSubscriber(event.stream.streamManager)
        })

        getToken().then((token) => {
            session_
                .connect(
                    token,
                    { clientData: openviduInfo.myUserName },
                )
                .then(() => {
                    let publisher = OV.initPublisher(undefined, {
                        audioSource: undefined, // The source of audio. If undefined default microphone
                        videoSource: undefined, // The source of video. If undefined default webcam
                        publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                        publishVideo: true, // Whether you want to start publishing with your video enabled or not
                        resolution: '480x320', // The resolution of your video
                        frameRate: 30, // The frame rate of your video
                        insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                        mirror: true, // Whether to mirror your local video or not
                    });
                    session_.publish(publisher);
                    setOpenviduInfo({
                        ...openviduInfo,
                        mainStreamManager: publisher,
                        publisher: publisher
                    });
                })
                .catch((error) => {
                    console.log('There was an error connecting to the session:', error.code, error.message);
                });
            });

    }
    useEffect(() => {
        if (openviduInfo.session === undefined) {
            joinSession()
        }
    });
    const leaveSession = () => {
        window.removeEventListener('beforeunload', onbeforeunload);
        const mySession = openviduInfo.session;

        if (mySession) {
            mySession.disconnect();
        }

        OV = null;
        setOpenviduInfo({
            ...openviduInfo,
            session: undefined,
            subscribers: [],
            mySessionId: id,
            myUserName: username,
            mainStreamManager: undefined,
            publisher: undefined
        });
    }

    const handleChangeSessionId = (e) => {
        setOpenviduInfo({
            ...openviduInfo,
            mySessionId: e.target.value,
        });
    }

    const handleChangeUserName = (e) => {
        setOpenviduInfo({
            ...openviduInfo,
            myUserName: e.target.value,
        });
    }

    const handleMainVideoStream = (stream) => {
        if (openviduInfo.mainStreamManager !== stream) {
            setOpenviduInfo({
                ...openviduInfo,
                mainStreamManager: stream
            });
        }
    }
    const mySessionId = openviduInfo.mySessionId;
    const myUserName = openviduInfo.myUserName;

    return (
        <div className="container">
            {openviduInfo.session !== undefined ? (
                <div id="session">
                    <div id="session-header">
                        <h1 id="session-title">{mySessionId}</h1>
                        <input
                            className="btn btn-large btn-danger"
                            type="button"
                            id="buttonLeaveSession"
                            onClick={leaveSession}
                            value="Leave session"
                        />
                    </div>

                    {openviduInfo.mainStreamManager !== undefined ? (
                        <div id="main-video" className="col-md-6">
                            <UserVideoComponent streamManager={openviduInfo.mainStreamManager} />
                        </div>
                    ) : null}
                    <div id="video-container" className="col-md-6">
                        {openviduInfo.publisher !== undefined ? (
                            <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(openviduInfo.publisher)}>
                                <UserVideoComponent
                                    streamManager={openviduInfo.publisher} />
                            </div>
                        ) : null}
                        {openviduInfo.subscribers.map((sub, i) => (
                            <div key={i} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                                <UserVideoComponent streamManager={sub} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );

    /**
     * --------------------------
     * SERVER-SIDE RESPONSIBILITY
     * --------------------------
     * These methods retrieve the mandatory user token from OpenVidu Server.
     * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
     * the API REST, openvidu-java-client or openvidu-node-client):
     *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
     *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
     *   3) The Connection.token must be consumed in Session.connect() method
     */
}