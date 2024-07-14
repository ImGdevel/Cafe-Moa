package com.example.demo.mapper;

import com.example.demo.dto.CafeDTO;
import com.example.demo.entity.Cafe;
import org.springframework.stereotype.Component;

@Component
public class CafeMapper {
    public CafeDTO toDto(Cafe cafe) {
        return CafeDTO.builder()
                .id(cafe.getId())
                .name(cafe.getName())
                .latitude(cafe.getLatitude())
                .longitude(cafe.getLongitude())
                .address(cafe.getAddress())
                .openingTime(cafe.getOpeningTime())
                .closingTime(cafe.getClosingTime())
                .seatCount(cafe.getSeatCount())
                .logoImage(cafe.getLogoImage())
                .cafeImages(cafe.getCafeImages())
                .notice(cafe.getNotice())
                .averageReviewRating(cafe.getAverageReviewRating())
                .reviewCount(cafe.getReviewCount())
                .totalVisitors(cafe.getTotalVisitors())
                .currentVisitors(cafe.getCurrentVisitors())
                .build();
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
                .build();
    }
}
