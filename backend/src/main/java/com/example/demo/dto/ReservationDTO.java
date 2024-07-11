package com.example.demo.dto;


import lombok.*;

import java.sql.Timestamp;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
    private Long id;
    private Long cafeId;
    private Long seatId;
    private Long customerId;
    private String customerName;
    private Timestamp reservationTime;

    // Getters and setters
}
