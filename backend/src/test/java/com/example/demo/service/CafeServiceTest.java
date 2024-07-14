package com.example.demo.service;

import com.example.demo.dto.CafeDTO;
import com.example.demo.entity.Cafe;
import com.example.demo.mapper.CafeMapper;
import com.example.demo.repository.CafeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CafeServiceTest {

    @Mock
    private CafeRepository cafeRepository;

    @Mock
    private CafeMapper cafeMapper;

    @InjectMocks
    private CafeService cafeService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createMultipleCafesAndGetAll() {
        List<CafeDTO> cafesToCreate = Arrays.asList(
                new CafeDTO(null, "Cafe 1", 37.123, 127.123, "Address 1", LocalTime.of(8, 0), LocalTime.of(22, 0), 50, "logo1.png", null, "Notice 1", 4.5f, 10, 100, 5, null),
                new CafeDTO(null, "Cafe 2", 37.124, 127.124, "Address 2", LocalTime.of(8, 0), LocalTime.of(22, 0), 60, "logo2.png", null, "Notice 2", 4.6f, 15, 150, 10, null),
                new CafeDTO(null, "Cafe 3", 37.125, 127.125, "Address 3", LocalTime.of(8, 0), LocalTime.of(22, 0), 70, "logo3.png", null, "Notice 3", 4.7f, 20, 200, 15, null),
                new CafeDTO(null, "Cafe 4", 37.126, 127.126, "Address 4", LocalTime.of(8, 0), LocalTime.of(22, 0), 80, "logo4.png", null, "Notice 4", 4.8f, 25, 250, 20, null),
                new CafeDTO(null, "Cafe 5", 37.127, 127.127, "Address 5", LocalTime.of(8, 0), LocalTime.of(22, 0), 90, "logo5.png", null, "Notice 5", 4.9f, 30, 300, 25, null)
        );

        // Create and verify cafes
        for (CafeDTO cafeDTO : cafesToCreate) {
            Cafe cafe = new Cafe();
            when(cafeMapper.toEntity(cafeDTO)).thenReturn(cafe);
            when(cafeRepository.save(cafe)).thenReturn(cafe);
            when(cafeMapper.toDto(cafe)).thenReturn(cafeDTO);

            CafeDTO createdCafe = cafeService.createCafe(cafeDTO);
            assertEquals(cafeDTO, createdCafe);
        }

        // Get all cafes from the service
        List<CafeDTO> allCafes = cafeService.getAllCafes();


    }
}
