package com.example.demo.mapper;


import com.example.demo.dto.PostDTO;
import com.example.demo.entity.Post;

public class PostMapper {

    private PostMapper() {
        // 인스턴스 생성 방지
    }

    public static PostDTO toDTO(Post post) {
        return PostDTO.builder()
                .id(post.getId())
                .user(post.getUser())
                .title(post.getTitle())
                .content(post.getContent())
                .build();
    }

    public static Post toEntity(PostDTO postDTO) {
        return Post.builder()
                .id(postDTO.getId())
                .user(postDTO.getUser())
                .title(postDTO.getTitle())
                .content(postDTO.getContent())
                .build();
    }
}
