package com.example.demo.service;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.dto.BookmarkDTO;
import com.example.demo.entity.Bookmark;
import com.example.demo.entity.Cafe;
import com.example.demo.entity.User;
import com.example.demo.mapper.BookmarkMapper;
import com.example.demo.repository.BookmarkRepository;
import com.example.demo.repository.CafeRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookmarkService {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CafeRepository cafeRepository;

    @Autowired
    private BookmarkMapper bookmarkMapper;

    @Transactional
    public BookmarkDTO createBookmark(Long userId, Long cafeId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Cafe cafe = cafeRepository.findById(cafeId)
                .orElseThrow(() -> new ResourceNotFoundException("Cafe not found with id: " + cafeId));

        Bookmark bookmark = Bookmark.builder()
                .user(user)
                .cafe(cafe)
                .build();

        bookmark = bookmarkRepository.save(bookmark);

        return bookmarkMapper.toDto(bookmark);
    }

    @Transactional
    public void deleteBookmark(Long id) {
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bookmark not found with id: " + id));
        bookmarkRepository.delete(bookmark);
    }

    @Transactional(readOnly = true)
    public BookmarkDTO getBookmark(Long id) {
        Bookmark bookmark = bookmarkRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bookmark not found with id: " + id));
        return bookmarkMapper.toDto(bookmark);
    }

    @Transactional(readOnly = true)
    public List<BookmarkDTO> getBookmarksByUserId(Long userId) {
        List<Bookmark> bookmarks = bookmarkRepository.findByUserId(userId);
        return bookmarks.stream()
                .map(bookmarkMapper::toDto)
                .collect(Collectors.toList());
    }
}
