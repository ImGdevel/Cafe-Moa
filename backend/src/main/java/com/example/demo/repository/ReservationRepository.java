package com.example.demo.repository;

import com.example.demo.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query("SELECT r FROM Reservation r WHERE r.cafe.id = :cafeId AND r.startTime >= :startTime")
    List<Reservation> findReservationsByCafeIdAndDate(@Param("cafeId") Long cafeId, @Param("startTime") LocalDateTime startTime);
}
