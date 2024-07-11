package com.example.demo;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.dto.ReservationRequestDTO;
import com.example.demo.entity.Cafe;
import com.example.demo.repository.CafeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
public class CafeReservationIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private CafeRepository cafeRepository;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void testCafeReservationFlow() throws Exception {
        // Cafe 데이터 준비
        Cafe cafe = new Cafe();
        cafe.setName("Test Cafe");
        cafe.setAddress("123 Test St, Test City");
        cafeRepository.save(cafe);

        // Customer 데이터 준비
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setName("John Doe");
        customerDTO.setEmail("john.doe@example.com");

        // Seat 데이터 준비 (생략)

        // 예약 데이터 준비
        ReservationRequestDTO reservationRequestDTO = new ReservationRequestDTO();
        reservationRequestDTO.setCafeId(cafe.getId()); // 위에서 저장한 cafe의 ID 사용
        reservationRequestDTO.setSeatId(1L); // 예약할 좌석 ID
        reservationRequestDTO.setCustomerId(customerDTO.getId()); // 고객의 ID
        reservationRequestDTO.setReservationTime(Timestamp.valueOf(LocalDateTime.now().plusHours(1)));

        // 예약 생성 요청
        ResultActions resultActions = mockMvc.perform(MockMvcRequestBuilders.post("/reservations/create")
                .param("cafeId", String.valueOf(reservationRequestDTO.getCafeId()))
                .param("seatId", String.valueOf(reservationRequestDTO.getSeatId()))
                .param("customerId", String.valueOf(reservationRequestDTO.getCustomerId()))
                .param("reservationTime", reservationRequestDTO.getReservationTime().toString())
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        // 결과 확인
        resultActions.andExpect(MockMvcResultMatchers.status().isOk())
                .andDo(print());
    }
}
