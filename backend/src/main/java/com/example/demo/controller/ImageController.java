package com.example.demo.controller;

import com.example.demo.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.core.io.UrlResource;
import java.nio.file.Paths;
import java.nio.file.Path;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final Path rootLocation = Paths.get("uploaded-images");

    @PostMapping
    public String uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if (!Files.exists(rootLocation)) {
                Files.createDirectories(rootLocation);
            }
            Path destinationFile = this.rootLocation.resolve(
                            Paths.get(file.getOriginalFilename()))
                    .normalize()
                    .toAbsolutePath();

            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                // This is a security check
                throw new RuntimeException("Cannot store file outside current directory.");
            }

            Files.copy(file.getInputStream(), destinationFile, StandardCopyOption.REPLACE_EXISTING);
            return "File uploaded successfully: " + file.getOriginalFilename();
        } catch (Exception e) {
            e.printStackTrace(); // 디버그용 로그 추가
            throw new RuntimeException("FAIL!");
        }
    }

    @GetMapping("/{filename}")
    @ResponseBody
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            return ResponseEntity.ok().body(resource);
        } catch (Exception e) {
            e.printStackTrace(); // 디버그용 로그 추가
            return ResponseEntity.notFound().build();
        }
    }
}