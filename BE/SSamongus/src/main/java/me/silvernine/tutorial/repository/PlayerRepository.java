package me.silvernine.tutorial.repository;

import me.silvernine.tutorial.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Override
    ArrayList<Player> findAll();

    @Query(value = "SELECT * FROM player WHERE room_id = ?1", nativeQuery = true)
    List<Player> findPlayerByroomid(Long id);

    @Modifying
    @Query(value = "UPDATE player SET JOB = ?1 WHERE player_id = ?2", nativeQuery = true)
    void update_job(String job, Long id);

    @Modifying
    @Query(value = "UPDATE player SET alive = false WHERE room_id = ?1 and username = ?2", nativeQuery = true)
    void deadplayer(Long id, String username);

    @Query(value = "select * from player where count = (select max(count) from player) and room_id = ?1", nativeQuery = true)
    Optional<Player> deadvoteplayer(Long room_id);

    @Modifying
    @Query(value = "UPDATE player SET is_ready = true WHERE room_id = ?1 and username = ?2", nativeQuery = true)
    Object update_true_ready(Long id, String username);

    @Modifying
    @Query(value = "UPDATE player SET is_ready = false WHERE room_id = ?1 and username = ?2", nativeQuery = true)
    Object update_false_ready(Long id, String username);

    @Query(value = "SELECT * FROM player WHERE room_id = ?1 and username = ?2", nativeQuery = true)
    Optional<Player> findPlayerByroomidandusername(Long id, String username);

    @Query(value = "SELECT * FROM player WHERE room_id = ?1 and alive = true", nativeQuery = true)
    List<Player> findPlayerByroomidandAlive(Long id);

    @Modifying
    @Query(value = "UPDATE player SET count = count+1 WHERE room_id = ?1 and username = ?2", nativeQuery = true)
    void update_vote(Long room_id, String username);

    @Query(value = "SELECT * FROM player WHERE alive = true and job = 'mafia'", nativeQuery = true)
    List<Player> mafiaplayer(Long id);

    @Query(value = "SELECT * FROM player WHERE alive = false and job = 'citizen' or job = 'doctor' or job = 'police'", nativeQuery = true)
    List<Player> citizenplayer(Long id);

    @Query(value = "SELECT * FROM player where vote = true", nativeQuery = true)
    List<Player> findPlayerByvote(Long room_id);

    @Modifying
    @Query(value = "UPDATE player SET vote = true WHERE room_id = ?1 and username = ?2", nativeQuery = true)
    void add_vote(Long room_id, String myname);

    @Modifying
    @Query(value = "UPDATE player SET type = 'dead' WHERE room_id = ?1 and username = ?2", nativeQuery = true)
    void typechange(Long id, String username);
}
