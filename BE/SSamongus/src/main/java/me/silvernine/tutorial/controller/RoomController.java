package me.silvernine.tutorial.controller;

import lombok.extern.slf4j.Slf4j;
import me.silvernine.tutorial.dto.RoomDto;
import me.silvernine.tutorial.entity.Player;
import me.silvernine.tutorial.entity.Room;
import me.silvernine.tutorial.repository.PlayerRepository;
import me.silvernine.tutorial.repository.RoomRepository;
import me.silvernine.tutorial.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Random;

@Slf4j
@RestController
@RequestMapping("/api")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @GetMapping("/room/index")
    public List<Room> index() { return roomRepository.findAll();}

    @GetMapping("/room/refresh/{id}")
    public List<Player> refresh(@PathVariable Long id) {
        return playerRepository.findPlayerByroomid(id);}

    @PostMapping("/room/{username}/{id}")
    public ResponseEntity<Player> enter(@PathVariable String username, @PathVariable Long id) {
        Player entered = roomService.enter(username, id);

        return (entered != null)?
                ResponseEntity.status(HttpStatus.CREATED).body(entered):
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PostMapping("/room/create/{username}")
    public ResponseEntity<Room> create(@PathVariable String username, @RequestBody RoomDto dto){
        dto.setHost(username);
        Room created = roomService.create(dto);
        System.out.println(created);

        return (created != null)?
                ResponseEntity.status(HttpStatus.CREATED).body(created):
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("/room/delete/{id}")
    public ResponseEntity<Room> delete(@PathVariable Long id){
        Room deleted = roomService.delete(id);
        return (deleted != null)? ResponseEntity.status(HttpStatus.OK).build():
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
}