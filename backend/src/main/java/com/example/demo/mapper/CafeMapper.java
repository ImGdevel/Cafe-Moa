package com.example.demo.mapper;

import com.example.demo.dto.CafeDTO;
import com.example.demo.entity.Cafe;
import org.springframework.stereotype.Component;

@Component
public class CafeMapper {
    public CafeDTO toDto(Cafe cafe) {
        return new CafeDTO(
                cafe.getId(),
                cafe.getName(),
                cafe.getLatitude(),
                cafe.getLongitude(),
                cafe.getAddress(),
                cafe.getOpeningTime(),
                cafe.getClosingTime(),
                cafe.getSeatCount(),
                cafe.getLogoImage(),
                cafe.getCafeImages(),
                cafe.getNotice(),
                cafe.getAverageReviewRating(),
                cafe.getReviewCount(),
                cafe.getTotalVisitors(),
                cafe.getCurrentVisitors(),
                cafe.getCreatedAt()
        );
    }

    public Cafe toEntity(CafeDTO cafeDTO) {
        return Cafe.builder()
                .id(cafeDTO.getId())
                .name(cafeDTO.getName())
                .latitude(cafeDTO.getLatitude())
                .longitude(cafeDTO.getLongitude())
                .address(cafeDTO.getAddress())
                .openingTime(cafeDTO.getOpeningTime())
                .closingTime(cafeDTO.getClosingTime())
                .seatCount(cafeDTO.getSeatCount())
                .logoImage(cafeDTO.getLogoImage())
                .cafeImages(cafeDTO.getCafeImages())
                .notice(cafeDTO.getNotice())
                .averageReviewRating(cafeDTO.getAverageReviewRating())
                .reviewCount(cafeDTO.getReviewCount())
                .totalVisitors(cafeDTO.getTotalVisitors())
                .currentVisitors(cafeDTO.getCurrentVisitors())
                .createdAt(cafeDTO.getCreatedAt())
                .build();
    }
}
