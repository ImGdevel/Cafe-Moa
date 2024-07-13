package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private Long id;
    private float rating;
    private LocalDateTime createdAt;
    private Long authorId; // Assuming DTO holds author's ID instead of full User object
    private String content;

    // Getters and setters (with Builder pattern)
}
