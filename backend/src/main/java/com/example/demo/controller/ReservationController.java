package com.example.demo.controller;

import com.example.demo.dto.ReservationDTO;
import com.example.demo.dto.ReservationRequestDTO;
import com.example.demo.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.format.annotation.DateTimeFormat.ISO;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping
    public ResponseEntity<ReservationDTO> requestReservation(@RequestBody ReservationRequestDTO reservationRequestDTO) {
        ReservationDTO createdReservation = reservationService.requestReservation(reservationRequestDTO);
        return ResponseEntity.ok(createdReservation);
    }

    @GetMapping("/cafe-reservations")
    public ResponseEntity<List<ReservationDTO>> getReservationsByCafeIdAndDate(
            @RequestParam Long cafeId, @RequestParam @DateTimeFormat(iso = ISO.DATE_TIME) LocalDateTime date) {
        List<ReservationDTO> reservations = reservationService.getReservationsByCafeIdAndDate(cafeId, date);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDTO> getReservation(@PathVariable Long id) {
        ReservationDTO reservation = reservationService.getReservation(id);
        return ResponseEntity.ok(reservation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        List<ReservationDTO> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(reservations);
    }
}
