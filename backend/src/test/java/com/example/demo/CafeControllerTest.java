package com.example.demo;

import com.example.demo.controller.CafeController;
import com.example.demo.dto.CafeDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CafeController.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CafeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateCafe() throws Exception {
        // Given
        CafeDTO cafeDTO = new CafeDTO();
        cafeDTO.setName("Test Cafe");
        cafeDTO.setAddress("123 Test St, Test City");
        cafeDTO.setLogoPath("/path/to/logo.png");

        // When
        ResultActions result = mockMvc.perform(post("/cafes/create")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(cafeDTO)));

        // Then
        result.andExpect(status().isOk());
    }
}
