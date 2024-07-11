package com.example.demo.service.impl;

import com.example.demo.dto.JoinDTO;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.JoinService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JoinServiceImpl implements JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public JoinServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }


    public void joinProcess(JoinDTO joinDTO) {

        boolean isUser = userRepository.existsByUsername(joinDTO.getUsername());
        if (isUser) {
            return;
        }

        User data = User.builder()
                .username(joinDTO.getUsername())
                .password(bCryptPasswordEncoder.encode(joinDTO.getPassword()))
                .role("ROLE_USER")
                .build();

        userRepository.save(data);
    }
}
