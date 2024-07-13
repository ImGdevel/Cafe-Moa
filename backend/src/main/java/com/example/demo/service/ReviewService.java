package com.example.demo.service;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.dto.ReviewDTO;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import com.example.demo.mapper.ReviewMapper;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewMapper reviewMapper;

    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        // Validate author existence
        User author = userRepository.findById(reviewDTO.getAuthorId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + reviewDTO.getAuthorId()));

        // Create Review entity
        Review review = Review.builder()
                .rating(reviewDTO.getRating())
                .content(reviewDTO.getContent())
                .author(author)
                .build();

        // Save Review entity
        review = reviewRepository.save(review);

        // Map to DTO and return
        return reviewMapper.toDto(review);
    }

    @Transactional(readOnly = true)
    public ReviewDTO getReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        return reviewMapper.toDto(review);
    }

    @Transactional
    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        reviewRepository.delete(review);
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getAllReviews() {
        List<Review> review = reviewRepository.findAll();
        return review.stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

}
