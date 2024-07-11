package com.example.demo.controller;

import com.example.demo.dto.JoinDTO;
import com.example.demo.service.JoinService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class JoinController {

    @Autowired
    private JoinService joinService;
    private final Logger LOGGER = LoggerFactory.getLogger(JoinController.class);

    @GetMapping("/join")
    public String joinP() {

        return "join";
    }


    @PostMapping("/join")
    public String joinProcess(JoinDTO joinDTO) {

        LOGGER.info(joinDTO.getUsername());
        joinService.joinProcess(joinDTO);


        return "redirect:/login";
    }
}
