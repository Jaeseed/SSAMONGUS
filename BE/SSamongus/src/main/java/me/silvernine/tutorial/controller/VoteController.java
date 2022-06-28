package me.silvernine.tutorial.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
//import me.silvernine.tutorial.entity.Vote;
import me.silvernine.tutorial.entity.Player;
import me.silvernine.tutorial.repository.PlayerRepository;
import me.silvernine.tutorial.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Log4j2
@Controller
@RequiredArgsConstructor
public class VoteController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private VoteService voteService;
//    @MessageMapping("vote/{id}")
//    @SendTo("/topic/vote/{id}")
//    public Vote sendVote(@Payload Vote vote, @DestinationVariable Long id){
//        Vote myvote =
//    }

    @MessageMapping("/game/ready/{id}/{username}")
    @SendTo("/topic/chat/{id}")
    public List<Player> ready(@Payload Player player, @DestinationVariable("id") Long id, @DestinationVariable("username") String username){
        voteService.ready(id, username);
        return playerRepository.findPlayerByroomid(id);
    }

    @Transactional
    @MessageMapping("/room/dead/{id}/{username}")
    @SendTo("/topic/chat/{id}")
    public Optional<Player> dead(@DestinationVariable Long id, @DestinationVariable String username){
        playerRepository.deadplayer(id, username);
        playerRepository.typechange(id, username);
        return playerRepository.findPlayerByroomidandusername(id, username);
    }
}
