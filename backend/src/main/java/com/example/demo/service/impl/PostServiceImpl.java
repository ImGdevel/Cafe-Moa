package com.example.demo.service.impl;


import com.example.demo.dto.PostDTO;
import com.example.demo.entity.Post;
import com.example.demo.mapper.PostMapper;
import com.example.demo.repository.PostRepository;
import com.example.demo.service.PostService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public PostDTO getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));
        return PostMapper.toDTO(post);
    }

    @Override
    public List<PostDTO> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(PostMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PostDTO createPost(PostDTO postDTO) {
        Post post = PostMapper.toEntity(postDTO);
        Post savedPost = postRepository.save(post);
        return PostMapper.toDTO(savedPost);
    }

    @Override
    @Transactional
    public PostDTO updatePost(Long postId, PostDTO postDTO) {
        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

        existingPost.setTitle(postDTO.getTitle());
        existingPost.setContent(postDTO.getContent());

        Post updatedPost = postRepository.save(existingPost);
        return PostMapper.toDTO(updatedPost);
    }

    @Override
    @Transactional
    public boolean deletePost(Long postId) {
        if (postRepository.existsById(postId)) {
            postRepository.deleteById(postId);
            return true;
        } else {
            return false;
        }
    }
}
