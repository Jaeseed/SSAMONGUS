package me.silvernine.tutorial.service;

import lombok.extern.slf4j.Slf4j;
import me.silvernine.tutorial.entity.Player;
import me.silvernine.tutorial.entity.Room;
import me.silvernine.tutorial.repository.PlayerRepository;
import me.silvernine.tutorial.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class GameService {
    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private RoomRepository roomRepository;

    public Player delete(Long id){
        Player target = playerRepository.findById(id).orElse(null);

        if (target == null){
            return null;
        }

        playerRepository.delete(target);
        return target;
    }

//    public List<Player> vote_list(Long id) {
//        return ;
//    }

    @Transactional // 현재 요청준 사람으로 투표 만들기
    public void vote_action(Long room_id, String username, String myname) {
        playerRepository.update_vote(room_id, username);
        playerRepository.add_vote(room_id, myname);
    }

    @Transactional
    public String deadplayer(Long room_id){
        System.out.println("#######################%%%################");
        Optional<Player> player = playerRepository.deadvoteplayer(room_id);
        System.out.println(player);
        System.out.println("#######################################");
        System.out.println(player.get().username);
        playerRepository.deadplayer(room_id, player.get().username);
        return player.get().username;
    }

    @Transactional
    public int endgame(Long id) {
        List<Player> mafiaplayer = playerRepository.mafiaplayer(id);
        List<Player> citizenplayer = playerRepository.citizenplayer(id);

        System.out.println(mafiaplayer);
        System.out.println(citizenplayer);

        if(mafiaplayer.size() >= citizenplayer.size()){
            Optional<Room> room = roomRepository.endgame(id);
            return 1;
        }
        if(mafiaplayer.size() == 0) {
            Optional<Room> room = roomRepository.endgame(id);
            return 2;
        }
        return 0;
    }
}
