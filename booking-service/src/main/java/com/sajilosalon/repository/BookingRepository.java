package com.sajilosalon.repository;

import com.sajilosalon.modal.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findBySalonId(Long salonId);
}
