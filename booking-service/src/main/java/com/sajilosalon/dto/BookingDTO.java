package com.sajilosalon.dto;

import com.sajilosalon.domain.BookingStatus;
import jakarta.persistence.ElementCollection;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;

@Data
public class BookingDTO {

//call object instead of id when implement feignclient
    private Long id;
    private Long salonId;
    private Long customerId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;


    private Set<Long> serviceIds;

    private BookingStatus status = BookingStatus.PENDING;

}
