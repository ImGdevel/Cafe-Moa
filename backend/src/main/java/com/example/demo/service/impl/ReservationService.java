package com.example.demo.service.impl;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.dto.ReservationDTO;
import com.example.demo.dto.ReservationRequestDTO;
import com.example.demo.entity.Cafe;
import com.example.demo.entity.Customer;
import com.example.demo.entity.Reservation;
import com.example.demo.entity.Seat;
import com.example.demo.repository.CafeRepository;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.SeatRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CafeRepository cafeRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Transactional
    public ReservationDTO createReservation(ReservationRequestDTO reservationRequest) {
        // Cafe, Seat, Customer 조회
        Cafe cafe = cafeRepository.findById(reservationRequest.getCafeId())
                .orElseThrow(() -> new ResourceNotFoundException("Cafe not found"));
        Seat seat = seatRepository.findById(reservationRequest.getSeatId())
                .orElseThrow(() -> new ResourceNotFoundException("Seat not found"));
        Customer customer = customerRepository.findById(reservationRequest.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        // 예약 생성 및 저장
        Reservation reservation = new Reservation();
        reservation.setCafe(cafe);
        reservation.setSeat(seat);
        reservation.setCustomer(customer);
        reservation.setReservationTime(reservationRequest.getReservationTime());

        reservation = reservationRepository.save(reservation);
        return convertToDTO(reservation);
    }

    public List<ReservationDTO> getReservations(Long cafeId, Timestamp startTime, Timestamp endTime) {
        Cafe cafe = cafeRepository.findById(cafeId)
                .orElseThrow(() -> new ResourceNotFoundException("Cafe not found"));
        List<Reservation> reservations = reservationRepository.findByCafeAndReservationTimeBetween(cafe, startTime, endTime);
        return reservations.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private ReservationDTO convertToDTO(Reservation reservation) {
        ReservationDTO dto = new ReservationDTO();
        dto.setId(reservation.getId());
        dto.setCafeId(reservation.getCafe().getId());
        dto.setSeatId(reservation.getSeat().getId());
        dto.setCustomerId(reservation.getCustomer().getId());
        dto.setCustomerName(reservation.getCustomer().getName());
        dto.setReservationTime(reservation.getReservationTime());
        return dto;
    }
}
