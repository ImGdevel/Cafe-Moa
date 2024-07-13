package com.example.demo.service;

import com.example.demo.entity.Image;
import com.example.demo.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${image.upload.dir}") // application.properties에서 설정된 디렉토리 경로를 가져오기 위한 어노테이션
    private String uploadDir;

    @Autowired
    private ImageRepository imageRepository;

    public void saveImage(MultipartFile file) throws IOException {
        // 파일이 비어있는지 체크
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is empty");
        }

        // 파일을 업로드할 디렉토리 경로 생성
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // 파일의 원본 이름 가져오기
        String originalFileName = file.getOriginalFilename();
        // UUID를 이용해 파일 이름 변환 (중복 방지)
        String fileName = UUID.randomUUID().toString() + "_" + originalFileName;

        // 파일 저장 경로 설정
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        // 파일 경로를 데이터베이스에 저장
        Image image = new Image();
        image.setPath(fileName); // 경로를 저장하거나 원하는 필드 설정

        imageRepository.save(image); // 데이터베이스에 저장
    }
}
