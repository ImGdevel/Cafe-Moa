package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequestDTO {
    private Long cafeId;
    private Long userId;
    private int seatNumber;
    private LocalDateTime  startTime;
    private LocalDateTime endTime;
}
