package me.silvernine.tutorial.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.silvernine.tutorial.dto.MessageDto;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Table(name = "player")
@Entity
@Data
@Builder
@NoArgsConstructor
@DynamicInsert
@AllArgsConstructor
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    public Long player_id;

    @Column
    @ColumnDefault("false")
    public Boolean is_ready;

    @Column
    public String username;

    @Column
    public Boolean alive;

    @Column
    public String job;

    @Column
    private String type;


    @Column
    private Long count;

    @Column
    private boolean vote;

    @JoinColumn(name = "room_id")
    @ManyToOne
    Room room;

    public String gettype(){return type;};
}
