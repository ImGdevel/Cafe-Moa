package com.example.demo.controller;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.entity.Cafe;
import com.example.demo.repository.CafeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/cafes")
public class CafeController {

    private final Path rootLocation = Paths.get("upload-dir");

    @Autowired
    private CafeRepository cafeRepository;



    @PostMapping("/{id}/uploadLogo")
    public ResponseEntity<String> handleFileUpload(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }
            String filename = file.getOriginalFilename();
            Path destinationFile = rootLocation.resolve(
                            Paths.get(filename))
                    .normalize().toAbsolutePath();

            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);

            // 이미지 경로를 Cafe 테이블에 저장
            Cafe cafe = cafeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cafe not found"));
            cafe.setLogoPath(destinationFile.toString());
            cafeRepository.save(cafe);

            return ResponseEntity.ok("File uploaded successfully: " + filename);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    @GetMapping("/{id}/logo")
    public ResponseEntity<Resource> serveFile(@PathVariable Long id) {
        try {
            Cafe cafe = cafeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Cafe not found"));
            Path file = Paths.get(cafe.getLogoPath());
            Resource resource = new UrlResource(file.toUri());

            return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=\"" + resource.getFilename() + "\"").body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
