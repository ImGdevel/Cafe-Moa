package com.example.demo.repository;

import com.example.demo.entity.Bookmark;
import com.example.demo.entity.Review;
import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByUserId(Long userId);
}
