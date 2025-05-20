package com.sajilosalon.service;

import com.sajilosalon.modal.Salon;
import com.sajilosalon.payload.dto.SalonDTO;
import com.sajilosalon.payload.dto.UserDTO;

import java.util.List;


public interface SalonService {

    Salon create(SalonDTO salon, UserDTO user);
    Salon update(SalonDTO salon, UserDTO user, Long salonId);


    List<Salon> getAllSalons();
    Salon getSalonById(Long salonId);
    Salon getSalonByOwnerId(Long ownerId);
    List<Salon> searchSalonByCity(String city);

}
