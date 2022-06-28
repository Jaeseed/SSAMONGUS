package me.silvernine.tutorial.service;

import lombok.extern.slf4j.Slf4j;
import me.silvernine.tutorial.dto.RoomDto;
import me.silvernine.tutorial.entity.Player;
import me.silvernine.tutorial.entity.Room;
import me.silvernine.tutorial.entity.User;
import me.silvernine.tutorial.repository.PlayerRepository;
import me.silvernine.tutorial.repository.RoomRepository;
import me.silvernine.tutorial.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PlayerRepository playerRepository;

    private UserRepository userRepository;

    private UserService userService;

//    public List<Player> refresh(Long id) { return playerRepository.findAll();}

    @Transactional
    public Boolean start(@PathVariable Long id){
        List<Player> players = playerRepository.findPlayerByroomid(id);
        boolean room_state = true;
        for(int i=0; i< players.size(); i++){
            if(!players.get(i).is_ready){
                room_state = false;
            };
        };
        if (room_state){
            roomRepository.start(id);
        }
        return null;
    }

    public Player enter(@PathVariable String username, Long id){

        Room room = roomRepository.findById(id)
                .orElseThrow(()->new IllegalMonitorStateException("방이 없습니다"));

        List<Player> players = playerRepository.findPlayerByroomid(id);
        System.out.println(players.size());
        if(players.size()>=8){
            System.out.println("############################################################");
            return null;
        }

        log.info(room.toString());
        Player player = Player.builder()
                .is_ready(false)
                .alive(true)
                .username(username)
                .job("")
                .count(0L)
                .type("player")
                .room(room)
                .build();


        log.info(player.toString());
        return playerRepository.save(player);
    }

    public Room create(RoomDto dto){
        Room room = Room.builder()
                .title(dto.getTitle())
                .game_start(false)
                .host(dto.getHost())
                .day("sun")
                .build();
        if (room.getRoom_id() != null)
            return null;
        return roomRepository.save(room);
    }

    public Room delete(Long id){
        Room target = roomRepository.findById(id).orElse(null);

        if (target == null){
            return null;
        }

        roomRepository.delete(target);
        return target;
    }

    @Transactional
    public List<Room> createRooms(List<RoomDto> dtos){
        List<Room> roomList = dtos.stream().map(dto->dto.toEntity()).collect(Collectors.toList());

        roomList.stream().forEach(room -> roomRepository.save(room));

        roomRepository.findById(-1L).orElseThrow(()
                ->new IllegalMonitorStateException("방생성 실패"));

        return roomList;
    }
}
