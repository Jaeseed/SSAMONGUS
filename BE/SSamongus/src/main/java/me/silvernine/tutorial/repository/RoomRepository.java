package me.silvernine.tutorial.repository;

import me.silvernine.tutorial.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Override
    ArrayList<Room> findAll();

    @Modifying
    @Query(value = "UPDATE room set game_start = true WHERE room_id = ?1", nativeQuery = true)
    void start(Long id);

    @Modifying
    @Query(value = "UPDATE room set game_start = false WHERE room_id = ?1", nativeQuery = true)
    Optional<Room> endgame(Long id);
}
