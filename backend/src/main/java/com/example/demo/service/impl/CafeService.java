package com.example.demo.service.impl;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.entity.Cafe;
import com.example.demo.repository.CafeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class CafeService {

    @Autowired
    private CafeRepository cafeRepository;

    public Cafe saveLogoPath(Long cafeId, String logoPath) {
        Cafe cafe = cafeRepository.findById(cafeId).orElseThrow(() -> new ResourceNotFoundException("Cafe not found"));
        cafe.setLogoPath(logoPath);
        return cafeRepository.save(cafe);
    }

    public Resource loadLogo(Long cafeId) throws MalformedURLException {
        Cafe cafe = cafeRepository.findById(cafeId).orElseThrow(() -> new ResourceNotFoundException("Cafe not found"));
        Path file = Paths.get(cafe.getLogoPath());
        return new UrlResource(file.toUri());
    }
}
