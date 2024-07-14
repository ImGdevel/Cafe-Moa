package com.example.demo.controller;

import com.example.demo.dto.CafeDTO;
import com.example.demo.service.CafeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cafes")
public class CafeController {

    @Autowired
    private CafeService cafeService;

    private static final Logger logger = LoggerFactory.getLogger(CafeController.class);


    @PostMapping
    public ResponseEntity<CafeDTO> createCafe(@RequestBody CafeDTO cafeDTO) {
        try {
            CafeDTO createdCafe = cafeService.createCafe(cafeDTO);
            return ResponseEntity.ok(createdCafe);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // 예외 발생 시 500 에러 전송
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CafeDTO> updateCafe(@PathVariable Long id, @RequestBody CafeDTO cafeDTO) {
        CafeDTO updatedCafe = cafeService.updateCafe(id, cafeDTO);
        return ResponseEntity.ok(updatedCafe);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CafeDTO> getCafe(@PathVariable Long id) {
        CafeDTO cafe = cafeService.getCafe(id);
        return ResponseEntity.ok(cafe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCafe(@PathVariable Long id) {
        cafeService.deleteCafe(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<CafeDTO>> getAllCafes() {
        List<CafeDTO> cafes = cafeService.getAllCafes();
        return ResponseEntity.ok(cafes);
    }

    @GetMapping("/near")
    public ResponseEntity<List<CafeDTO>> getCafesNearLocation(
            @RequestParam double longitude,
            @RequestParam double latitude,
            @RequestParam double distanceMeters) {
        List<CafeDTO> cafes = cafeService.getCafesNearLocation(longitude, latitude, distanceMeters * 0.01);
        return ResponseEntity.ok(cafes);
    }
}
