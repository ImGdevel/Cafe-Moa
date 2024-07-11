package com.example.demo.dto;


import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeatDTO {
    private Long id;
    private Long cafeId;
    private String seatNumber;

}
