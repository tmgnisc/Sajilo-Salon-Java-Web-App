package com.sajilosalon.controller;


import com.sajilosalon.dto.*;
import com.sajilosalon.modal.Booking;
import com.sajilosalon.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestParam Long salonId, @RequestBody BookingRequest bookingRequest) throws Exception {
        UserDTO user = new UserDTO();
        user.setId(1L);
        SalonDTO salon = new SalonDTO();
        salon.setId(salonId);
        Set<ServiceDTO> serviceDTOSet = new HashSet<>();
        ServiceDTO serviceDTO = new ServiceDTO();
        //static dto for now
        serviceDTO.setId(1L);
        serviceDTO.setPrice(399);
        serviceDTO.setDuration(45);
        serviceDTO.setName("Hair cut for men");
        serviceDTOSet.add(serviceDTO);

        Booking booking = bookingService.createBooking(bookingRequest, user, salon, serviceDTOSet)

        return ResponseEntity.ok(booking);
    }

    public ResponseEntity<Set<BookingDTO>> getBookingsByCustomer(){

//        UserDTO user = new UserDTO();
//        user.setId(1L);
        List<Booking> bookings= bookingService.getBookingsByCustomer(1L);

    }

}
