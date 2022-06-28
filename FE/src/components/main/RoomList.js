import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { myPlayerId } from '../../store/actions/room'; 
import SearchBar from './SearchBar';
import RoomListItem from './RoomListItem';
import Paginations from './Paginations';
import Axios from 'axios';

export default function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [backupRooms, setBackupRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const navigate = useNavigate();
    const account = useSelector((store) => store.account);
    const dispatch = useDispatch();

    const getRooms = () => {
        if (account.token) {
            Axios.defaults.headers.common['Authorization'] = "Bearer " + account.token;
        }

        Axios
            .get("https://" + window.location.hostname + ":8080/api/room/index")
            .then((res) => {
                setRooms(res.data);
                setBackupRooms(res.data);
                console.log("Get Rooms!");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const filterRooms = (searchValue) => {
        const newRooms = [];

        for (let i = 0; i < backupRooms.length; i++) {
            if (backupRooms[i].title.includes(searchValue)) {
                newRooms.push(backupRooms[i]);
            }
        }

        if (newRooms.length) {
            alert("Search Success!");
            setRooms(newRooms);
        } else {
            alert("Search fail...");
        }
    }

    const joinRoom = (id) => {
        Axios
            .post("https://" + window.location.hostname + ":8080/api/room/" + account.username + "/" + id)
            .then((res) => {
                dispatch(myPlayerId(res.data.player_id));
                navigate("/room/" + id);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getRooms();
    }, [])

    const lastRoom = currentPage * pageSize;
    const firstRoom = lastRoom - pageSize;
    const currentRooms = rooms.slice(firstRoom, lastRoom);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="mt-5">
            <SearchBar getRooms={getRooms} filterRooms={filterRooms} joinRoom={joinRoom} />
            <RoomListItem rooms={currentRooms} joinRoom={joinRoom} />
            <Paginations
                pageSize={pageSize}
                totalRooms={rooms.length}
                paginate={paginate}
                currentPage={currentPage} />
        </section>
    );
}
