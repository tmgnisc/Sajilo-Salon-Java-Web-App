package com.sajilosalon.service;

import com.sajilosalon.domain.BookingStatus;
import com.sajilosalon.dto.BookingRequest;
import com.sajilosalon.dto.SalonDTO;
import com.sajilosalon.dto.ServiceDTO;
import com.sajilosalon.dto.UserDTO;
import com.sajilosalon.modal.Booking;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookingService {

    Booking createBooking
            (BookingRequest booking, UserDTO user, SalonDTO salon, Set<ServiceDTO> serviceDTOSet);

    List<Booking> getBookingsByCustomer(Long customerId);
    List<Booking> getBookingsBySalon(Long salonId);
    Booking getBookingById(Long id);
    Booking updateBooking(Long bookingId, BookingStatus status);
    List<Booking> getBookingsByDate(LocalDate date, Long salonId);


}
