package me.silvernine.tutorial.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.silvernine.tutorial.entity.Player;
import me.silvernine.tutorial.entity.Room;

import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class RoomDto {
    private Long id;
    String title;
    Boolean game_start;
    String host;
    String day;

    public Room toEntity() {return new Room(id, title, game_start, host, day);}
}
