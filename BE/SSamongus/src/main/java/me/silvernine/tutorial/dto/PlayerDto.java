package me.silvernine.tutorial.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.silvernine.tutorial.entity.Player;
import me.silvernine.tutorial.entity.Room;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class PlayerDto {
    Boolean is_start;

    String username;

    Boolean alive;

    String job;

    String type;

    Long count;

    Room room_id;

}
