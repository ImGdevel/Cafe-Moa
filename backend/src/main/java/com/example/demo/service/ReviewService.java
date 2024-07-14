package com.example.demo.service;


import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.dto.ReviewDTO;
import com.example.demo.entity.Cafe;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import com.example.demo.mapper.ReviewMapper;
import com.example.demo.repository.CafeRepository;
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
    private CafeRepository cafeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewMapper reviewMapper;

    @Transactional
    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        Cafe cafe = cafeRepository.findById(reviewDTO.getCafeId())
                .orElseThrow(() -> new ResourceNotFoundException("Cafe not found with id: " + reviewDTO.getCafeId()));

        User user = userRepository.findById(reviewDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + reviewDTO.getUserId()));

        Review review = Review.builder()
                .cafe(cafe)
                .author(user)
                .content(reviewDTO.getContent())
                .rating(reviewDTO.getRating())
                .build();

        review = reviewRepository.save(review);

        return reviewMapper.toDto(review);
    }

    @Transactional
    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        reviewRepository.delete(review);
    }

    @Transactional(readOnly = true)
    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
        return reviewMapper.toDto(review);
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByCafeId(Long cafeId) {
        List<Review> reviews = reviewRepository.findByCafeId(cafeId);
        return reviews.stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getReviewsByUserId(Long userId) {
        List<Review> reviews = reviewRepository.findByAuthorId(userId);
        return reviews.stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ReviewDTO> getAllReviews() {
        List<Review> reviews = reviewRepository.findAll();
        return reviews.stream()
                .map(reviewMapper::toDto)
                .collect(Collectors.toList());
    }
}
