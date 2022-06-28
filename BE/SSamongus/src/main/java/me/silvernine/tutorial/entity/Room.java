package me.silvernine.tutorial.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Table(name = "room")
@Entity
@Data
@Builder
@NoArgsConstructor
@DynamicInsert
@AllArgsConstructor
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long room_id;

    @Column
    public String title;

    @Column
    public Boolean game_start;

    @Column
    public String host;

    @Column
    public String day;
}