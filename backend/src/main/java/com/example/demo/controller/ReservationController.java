package com.example.demo.controller;

import com.example.demo.dto.ReservationDTO;
import com.example.demo.dto.ReservationRequestDTO;
import com.example.demo.service.impl.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/create")
    public ResponseEntity<ReservationDTO> createReservation(@RequestBody ReservationRequestDTO reservationRequest) {
        ReservationDTO reservation = reservationService.createReservation(reservationRequest);
        return ResponseEntity.ok(reservation);
    }

    @GetMapping("/list")
    public ResponseEntity<List<ReservationDTO>> getReservations(
            @RequestParam Long cafeId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Timestamp startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Timestamp endTime) {

        List<ReservationDTO> reservations = reservationService.getReservations(cafeId, startTime, endTime);
        return ResponseEntity.ok(reservations);
    }
}