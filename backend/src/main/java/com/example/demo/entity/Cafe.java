package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cafe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private double latitude;

    @NotNull
    private double longitude;

    @NotNull
    private String address;

    @NotNull
    @Column(columnDefinition = "TIME DEFAULT '00:00:00'")
    private LocalTime openingTime = LocalTime.of(0, 0);

    @NotNull
    @Column(columnDefinition = "TIME DEFAULT '00:00:00'")
    private LocalTime closingTime = LocalTime.of(0, 0);

    @NotNull
    @Column(columnDefinition = "INT DEFAULT 0")
    private int seatCount = 0;

    private String logoImage;

    private String cafeImages; // Assuming a comma-separated list of image URLs

    private String notice;

    @NotNull
    @Column(columnDefinition = "FLOAT DEFAULT 0")
    private float averageReviewRating = 0.0f;

    @NotNull
    @Column(columnDefinition = "INT DEFAULT 0")
    private int reviewCount = 0;

    @NotNull
    @Column(columnDefinition = "INT DEFAULT 0")
    private int totalVisitors = 0;

    @NotNull
    @Column(columnDefinition = "INT DEFAULT 0")
    private int currentVisitors = 0;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (openingTime == null) {
            openingTime = LocalTime.of(0, 0);
        }
        if (closingTime == null) {
            closingTime = LocalTime.of(0, 0);
        }
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
