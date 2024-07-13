package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CafeDTO {
    private Long id;
    private String name;
    private double latitude;
    private double longitude;
    private String address;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private int seatCount;
    private String logoImage;
    private String cafeImages;
    private String notice;
    private float averageReviewRating;
    private int reviewCount;
    private int totalVisitors;
    private int currentVisitors;
    private String createdAt;
}
