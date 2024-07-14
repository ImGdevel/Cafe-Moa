package com.example.demo.controller;

import com.example.demo.dto.BookmarkDTO;
import com.example.demo.service.BookmarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    @Autowired
    private BookmarkService bookmarkService;

    @PostMapping
    public ResponseEntity<BookmarkDTO> createBookmark(@RequestBody BookmarkDTO bookmarkDTO) {
        BookmarkDTO createdBookmark = bookmarkService.createBookmark(bookmarkDTO.getUserId(), bookmarkDTO.getCafeId());
        return ResponseEntity.ok(createdBookmark);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBookmark(@PathVariable Long id) {
        bookmarkService.deleteBookmark(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookmarkDTO> getBookmark(@PathVariable Long id) {
        BookmarkDTO bookmarkDTO = bookmarkService.getBookmark(id);
        return ResponseEntity.ok(bookmarkDTO);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BookmarkDTO>> getBookmarksByUserId(@PathVariable Long userId) {
        List<BookmarkDTO> bookmarks = bookmarkService.getBookmarksByUserId(userId);
        return ResponseEntity.ok(bookmarks);
    }
}
