package me.silvernine.tutorial.controller;

import lombok.extern.slf4j.Slf4j;
import me.silvernine.tutorial.entity.Player;
import me.silvernine.tutorial.entity.Room;
import me.silvernine.tutorial.repository.PlayerRepository;
import me.silvernine.tutorial.repository.RoomRepository;
import me.silvernine.tutorial.service.GameService;
import me.silvernine.tutorial.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Slf4j
@RestController
@RequestMapping("/api")
public class GameController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private GameService gameService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    Random random = new Random();

    @PostMapping("room/start/{id}")
    public Optional<Room> start (@PathVariable Long id){
        roomService.start(id);
        System.out.println(roomRepository.findById(id));
        return roomRepository.findById(id);
    }

    @GetMapping("/room/vote/{id}") // 투표 가능한 인원 찾기
    public List<Player> vote_list (@PathVariable Long id){
        return playerRepository.findPlayerByroomidandAlive(id);
    }

    @PostMapping("/room/vote/{room_id}/{username}/{myname}") // 플레이어에 vote 로 주기
    public void vote_action (@PathVariable Long room_id,@PathVariable String username, @PathVariable String myname){
        gameService.vote_action(room_id, username, myname);
    }

    @Transactional
    @PostMapping("/room/votekill/{room_id}") // 투표로 사람 죽이기
    public Optional<Player> voted_player (@PathVariable Long room_id){
        List<Player> roomplayer = playerRepository.findPlayerByroomidandAlive(room_id);
        List<Player> voteplayer = playerRepository.findPlayerByvote(room_id);
        if(roomplayer.size() == voteplayer.size()) {
            String username = gameService.deadplayer(room_id);
            return playerRepository.findPlayerByroomidandusername(room_id, username);
        }
        return Optional.empty();
    }

    @DeleteMapping("/room/out/{id}")
    public ResponseEntity<Player> out(@PathVariable Long id){
        Player deleted = gameService.delete(id);
        return (deleted != null)? ResponseEntity.status(HttpStatus.OK).build():
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @GetMapping("/room/end/{id}")
    public <Int> int endgame(@PathVariable Long id){
        int i = gameService.endgame(id);
        return i;
    }

    @PostMapping("/game/mafiavote/{room_id}/{player_id}")
    public ResponseEntity<Player> mafiavote(@PathVariable Long room_id, @PathVariable Long player_id){
        return null;
    }

    @Transactional
    @PatchMapping("/game/job/{id}")
    public ResponseEntity<Player> get_job(@PathVariable Long id){
        List<Player> member = playerRepository.findPlayerByroomid(id);
        int number = member.size();
        System.out.println(number);
        int Lotto[] = new int[number];
        for(int k=0; k<Lotto.length; k++){
            Lotto[k] = (int)(Math.random()*number)+1;
            for(int j=0; j<k; j++){
                if(Lotto[k] ==Lotto[j]){
                    k--;
                    break;
                }
            }
        }
        if (number == 4){
            for(int i = 0; i <4; i++) {
                Long member_id = member.get(i).player_id;
                if (Lotto[i] == 1 ){
                    playerRepository.update_job("mafia", member_id);
                }
                else{
                    playerRepository.update_job("citizen", member_id);
                }
            }
        }
        if (number == 5){
            for(int i = 0; i <5; i++) {
                Long member_id = member.get(i).player_id;
                if (Lotto[i] == 1 ){
                    playerRepository.update_job("mafia", member_id);
                }
                else if (Lotto[i] == 2 ){
                    playerRepository.update_job("doctor", member_id);
                }
                else{
                    playerRepository.update_job("citizen", member_id);
                }
            }
        }
        if (number == 6){
            for(int i = 0; i <6; i++) {
                Long member_id = member.get(i).player_id;
                if (Lotto[i] == 1 || Lotto[i] == 2){
                    playerRepository.update_job("mafia", member_id);
                }
                else if (Lotto[i] == 3 ){
                    playerRepository.update_job("doctor", member_id);
                }
                else if (Lotto[i] == 4 ){
                    playerRepository.update_job("police", member_id);
                }
                else{
                    playerRepository.update_job("citizen", member_id);
                }
            }
        }
        if (number == 7){
            for(int i = 0; i <7; i++) {
                Long member_id = member.get(i).player_id;
                if (Lotto[i] == 1 || Lotto[i] == 2){
                    playerRepository.update_job("mafia", member_id);
                }
                else if (Lotto[i] == 3 ){
                    playerRepository.update_job("doctor", member_id);
                }
                else if (Lotto[i] == 4 || Lotto[i] == 5 ){
                    playerRepository.update_job("police", member_id);
                }
                else{
                    playerRepository.update_job("citizen", member_id);
                }
            }
        }
        if (number == 8){
            for(int i = 0; i <8; i++) {
                Long member_id = member.get(i).player_id;
                if (Lotto[i] == 1 || Lotto[i] == 2 || Lotto[i] == 3){
                    playerRepository.update_job("mafia", member_id);
                }
                else if (Lotto[i] == 4 ){
                    playerRepository.update_job("doctor", member_id);
                }
                else if (Lotto[i] == 5 || Lotto[i] == 6 ){
                    playerRepository.update_job("police", member_id);
                }
                else{
                    playerRepository.update_job("citizen", member_id);
                }
            }
        }
        return null;
    }
}
