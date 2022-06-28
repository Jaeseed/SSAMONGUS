package me.silvernine.tutorial.service;

import lombok.extern.slf4j.Slf4j;
import me.silvernine.tutorial.entity.Player;
import me.silvernine.tutorial.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Slf4j
@Service
public class VoteService {

    @Autowired
    private PlayerRepository playerRepository;

    @Transactional
    public Object ready(Long id, String username){
        Optional<Player> user_is_ready = playerRepository.findPlayerByroomidandusername(id, username);
        Boolean is_now_ready = user_is_ready.get().is_ready;
        if (is_now_ready) {
            return playerRepository.update_false_ready(id, username);
        }else{
            return playerRepository.update_true_ready(id, username);
        }
    }
}
