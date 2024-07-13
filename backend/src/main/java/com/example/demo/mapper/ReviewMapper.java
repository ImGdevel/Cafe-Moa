package com.example.demo.mapper;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    public ReviewDTO toDto(Review review) {
        if (review == null) {
            return null;
        }

        return ReviewDTO.builder()
                .id(review.getId())
                .rating(review.getRating())
                .createdAt(review.getCreatedAt())
                .authorId(review.getAuthor().getId()) // Assuming authorId in DTO
                .content(review.getContent())
                .build();
    }

    public Review toEntity(ReviewDTO reviewDTO) {
        if (reviewDTO == null) {
            return null;
        }

        Review review = Review.builder()
                .id(reviewDTO.getId())
                .rating(reviewDTO.getRating())
                .content(reviewDTO.getContent())
                .build();

        // Set author (assuming authorId is provided in DTO)
        User author = new User();
        author.setId(reviewDTO.getAuthorId());
        review.setAuthor(author);

        return review;
    }
}
