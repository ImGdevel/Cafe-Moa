package com.example.demo.service;

import com.example.demo.Exception.ResourceNotFoundException;
import com.example.demo.dto.ReservationDTO;
import com.example.demo.dto.ReservationRequestDTO;
import com.example.demo.entity.Cafe;
import com.example.demo.entity.Reservation;
import com.example.demo.entity.User;
import com.example.demo.mapper.ReservationMapper;
import com.example.demo.repository.CafeRepository;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CafeRepository cafeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReservationMapper reservationMapper;

    @Transactional
    public ReservationDTO requestReservation(ReservationRequestDTO reservationRequestDTO) {
        // Validate cafeId and userId existence
        Cafe cafe = cafeRepository.findById(reservationRequestDTO.getCafeId())
                .orElseThrow(() -> new ResourceNotFoundException("Cafe not found with id: " + reservationRequestDTO.getCafeId()));

        User user = userRepository.findById(reservationRequestDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + reservationRequestDTO.getUserId()));

        // Create Reservation entity
        Reservation reservation = Reservation.builder()
                .cafe(cafe)
                .user(user)
                .seatNumber(reservationRequestDTO.getSeatNumber())
                .startTime(reservationRequestDTO.getStartTime())
                .endTime(reservationRequestDTO.getEndTime())
                .build();

        // Save Reservation entity
        reservation = reservationRepository.save(reservation);

        // Map to DTO and return
        return reservationMapper.toDto(reservation);
    }

    @Transactional(readOnly = true)
    public ReservationDTO getReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        return reservationMapper.toDto(reservation);
    }

    @Transactional(readOnly = true)
    public List<ReservationDTO> getReservationsByCafeIdAndDate(Long cafeId, LocalDateTime date) {
        List<Reservation> reservations = reservationRepository.findReservationsByCafeIdAndDate(cafeId, date);
        return reservations.stream()
                .map(reservationMapper::toDto)
                .collect(Collectors.toList());
    }


    @Transactional
    public void deleteReservation(Long id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + id));
        reservationRepository.delete(reservation);
    }

    @Transactional(readOnly = true)
    public List<ReservationDTO> getAllReservations() {
        List<Reservation> review = reservationRepository.findAll();
        return review.stream()
                .map(reservationMapper::toDto)
                .collect(Collectors.toList());
    }
}
