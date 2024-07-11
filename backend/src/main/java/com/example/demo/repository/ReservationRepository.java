package com.example.demo.repository;

import com.example.demo.entity.Cafe;
import com.example.demo.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCafeAndReservationTimeBetween(Cafe cafe, Timestamp startTime, Timestamp endTime);
}
