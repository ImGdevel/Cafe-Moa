package com.example.demo.service.impl;

import com.example.demo.entity.Cafe;
import com.example.demo.entity.Seat;
import com.example.demo.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SeatService {

    @Autowired
    private SeatRepository seatRepository;

    public Seat addSeat(String seatNumber, Long cafeId) {
        Seat seat = new Seat();
        seat.setSeatNumber(seatNumber);

        // Cafe 엔티티 설정
        Cafe cafe = new Cafe();
        cafe.setId(cafeId);
        seat.setCafe(cafe);

        return seatRepository.save(seat);
    }
}