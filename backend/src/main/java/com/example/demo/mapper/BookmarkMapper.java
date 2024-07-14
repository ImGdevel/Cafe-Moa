package com.example.demo.mapper;

import com.example.demo.dto.BookmarkDTO;
import com.example.demo.entity.Bookmark;
import com.example.demo.entity.Cafe;
import com.example.demo.entity.User;
import org.springframework.stereotype.Component;

@Component
public class BookmarkMapper {

    public BookmarkDTO toDto(Bookmark bookmark) {
        if (bookmark == null) {
            return null;
        }

        return BookmarkDTO.builder()
                .id(bookmark.getId())
                .userId(bookmark.getUser().getId())
                .cafeId(bookmark.getCafe().getId())
                .build();
    }

    public Bookmark toEntity(BookmarkDTO bookmarkDTO) {
        if (bookmarkDTO == null) {
            return null;
        }

        Bookmark bookmark = new Bookmark();
        bookmark.setId(bookmarkDTO.getId());

        // Set User entity
        User user = new User();
        user.setId(bookmarkDTO.getUserId());
        bookmark.setUser(user);

        // Set Cafe entity
        Cafe cafe = new Cafe();
        cafe.setId(bookmarkDTO.getCafeId());
        bookmark.setCafe(cafe);

        return bookmark;
    }
}
