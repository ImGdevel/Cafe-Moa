package com.example.demo.mapper;

import com.example.demo.dto.ReservationDTO;
import com.example.demo.dto.ReservationRequestDTO;
import com.example.demo.entity.Cafe;
import com.example.demo.entity.Reservation;
import com.example.demo.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ReservationMapper {

    public ReservationDTO toDto(Reservation reservation) {
        if (reservation == null) {
            return null;
        }

        return ReservationDTO.builder()
                .id(reservation.getId())
                .cafeId(reservation.getCafe().getId())
                .userId(reservation.getUser().getId())
                .seatNumber(reservation.getSeatNumber())
                .startTime(reservation.getStartTime())
                .endTime(reservation.getEndTime())
                .build();
    }

    public Reservation toEntity(ReservationRequestDTO reservationRequestDTO) {
        if (reservationRequestDTO == null) {
            return null;
        }

        Reservation reservation = new Reservation();
        reservation.setSeatNumber(reservationRequestDTO.getSeatNumber());
        reservation.setStartTime(reservationRequestDTO.getStartTime());
        reservation.setEndTime(reservationRequestDTO.getEndTime());

        // Set Cafe entity
        Cafe cafe = new Cafe();
        cafe.setId(reservationRequestDTO.getCafeId());
        reservation.setCafe(cafe);

        // Set User entity
        User user = new User();
        user.setId(reservationRequestDTO.getUserId());
        reservation.setUser(user);

        return reservation;
    }
}
