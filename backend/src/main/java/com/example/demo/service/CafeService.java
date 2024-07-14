package com.example.demo.service;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.dto.CafeDTO;
import com.example.demo.entity.Cafe;
import com.example.demo.mapper.CafeMapper;
import com.example.demo.repository.CafeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CafeService {
    @Autowired
    private CafeRepository cafeRepository;

    @Autowired
    private CafeMapper cafeMapper;

    @Transactional
    public CafeDTO createCafe(CafeDTO cafeDTO) {
        Cafe cafe = cafeMapper.toEntity(cafeDTO);
        cafe = cafeRepository.save(cafe);
        return cafeMapper.toDto(cafe);
    }

    @Transactional
    public CafeDTO updateCafe(Long id, CafeDTO cafeDTO) {
        Cafe cafe = cafeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cafe not found with id: " + id));

        cafe.setName(cafeDTO.getName());
        cafe.setLatitude(cafeDTO.getLatitude());
        cafe.setLongitude(cafeDTO.getLongitude());
        cafe.setAddress(cafeDTO.getAddress());
        cafe.setOpeningTime(cafeDTO.getOpeningTime());
        cafe.setClosingTime(cafeDTO.getClosingTime());
        cafe.setSeatCount(cafeDTO.getSeatCount());
        cafe.setLogoImage(cafeDTO.getLogoImage());
        cafe.setCafeImages(cafeDTO.getCafeImages());
        cafe.setNotice(cafeDTO.getNotice());
        cafe.setAverageReviewRating(cafeDTO.getAverageReviewRating());
        cafe.setReviewCount(cafeDTO.getReviewCount());
        cafe.setTotalVisitors(cafeDTO.getTotalVisitors());
        cafe.setCurrentVisitors(cafeDTO.getCurrentVisitors());

        cafe = cafeRepository.save(cafe);
        return cafeMapper.toDto(cafe);
    }

    @Transactional(readOnly = true)
    public CafeDTO getCafe(Long id) {
        Cafe cafe = cafeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cafe not found with id: " + id));
        return cafeMapper.toDto(cafe);
    }

    @Transactional(readOnly = true)
    public List<CafeDTO> getCafesNearLocation(double latitude, double longitude, double distanceMeters) {
        double earthRadiusKm = 6371; // Radius of the Earth in kilometers
        double latDegrees = Math.toDegrees(distanceMeters / earthRadiusKm);
        double lonDegrees = latDegrees / Math.cos(Math.toRadians(latitude));

        double latitudeMin = latitude - latDegrees;
        double latitudeMax = latitude + latDegrees;
        double longitudeMin = longitude - lonDegrees;
        double longitudeMax = longitude + lonDegrees;

        List<Cafe> cafes = cafeRepository.findByLatitudeBetweenAndLongitudeBetween(latitudeMin, latitudeMax, longitudeMin, longitudeMax);
        return cafes.stream()
                .map(cafeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteCafe(Long id) {
        Cafe cafe = cafeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cafe not found with id: " + id));
        cafeRepository.delete(cafe);
    }

    @Transactional(readOnly = true)
    public List<CafeDTO> getAllCafes() {
        List<Cafe> cafes = cafeRepository.findAll();
        return cafes.stream()
                .map(cafeMapper::toDto)
                .collect(Collectors.toList());
    }
}
