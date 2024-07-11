package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class ReservationRequestDTO {
    private Long cafeId;
    private Long seatId;
    private Long customerId;
    private Timestamp reservationTime;
}
