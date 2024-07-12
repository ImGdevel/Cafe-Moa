package com.example.demo.service;


import com.example.demo.dto.UserDTO;
import com.example.demo.entity.User;
import com.example.demo.mapper.UserMapper;
import com.example.demo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createMultipleUsers() {
        List<UserDTO> usersToCreate = Arrays.asList(
                new UserDTO(null, "uid1", "User 1", "user1@example.com", "ROLE_USER"),
                new UserDTO(null, "uid2", "User 2", "user2@example.com", "ROLE_USER"),
                new UserDTO(null, "uid3", "User 3", "user3@example.com", "ROLE_USER"),
                new UserDTO(null, "uid4", "User 4", "user4@example.com", "ROLE_USER"),
                new UserDTO(null, "uid5", "User 5", "user5@example.com", "ROLE_USER")
        );

        for (UserDTO userDTO : usersToCreate) {
            User user = new User();
            when(userMapper.toEntity(userDTO)).thenReturn(user);
            when(userRepository.save(user)).thenReturn(user);
            when(userMapper.toDto(user)).thenReturn(userDTO);

            UserDTO createdUser = userService.createUser(userDTO);
            assertEquals(userDTO, createdUser);
        }

        verify(userRepository, times(5)).save(any(User.class));
    }
}
