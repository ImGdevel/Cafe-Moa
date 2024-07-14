package com.example.demo.mapper;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.entity.Cafe;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;

public class ReviewMapper {

    public ReviewDTO toDto(Review review) {
        if (review == null) {
            return null;
        }

        return ReviewDTO.builder()
                .id(review.getId())
                .cafeId(review.getCafe().getId())
                .userId(review.getAuthor().getId())
                .content(review.getContent())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt())
                .build();
    }

    public Review toEntity(ReviewDTO reviewDTO) {
        if (reviewDTO == null) {
            return null;
        }

        Review review = new Review();
        review.setContent(reviewDTO.getContent());
        review.setRating(reviewDTO.getRating());

        // Set Cafe entity
        Cafe cafe = new Cafe();
        cafe.setId(reviewDTO.getCafeId());
        review.setCafe(cafe);

        // Set User entity
        User user = new User();
        user.setId(reviewDTO.getUserId());
        review.setAuthor(user);

        return review;
    }
}
