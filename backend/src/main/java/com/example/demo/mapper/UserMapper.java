package com.example.demo.mapper;

import com.example.demo.dto.UserDTO;
import com.example.demo.entity.User;
import org.springframework.stereotype.Component;


@Component
public class UserMapper {
    public UserDTO toDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .uid(user.getUid())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public User toEntity(UserDTO userDTO) {
        return User.builder()
                .id(userDTO.getId())
                .uid(userDTO.getUid())
                .name(userDTO.getName())
                .email(userDTO.getEmail())
                .role(userDTO.getRole())
                .build();
    }
}
