package com.sajilosalon.service;

import com.sajilosalon.modal.Salon;
import com.sajilosalon.payload.dto.SalonDTO;
import com.sajilosalon.payload.dto.UserDTO;

import java.util.List;


public interface SalonService {

    Salon createSalon(SalonDTO salon, UserDTO user);
    Salon updateSalon(SalonDTO salon, UserDTO user, Long salonId) throws Exception;


    List<Salon> getAllSalons();
    Salon getSalonById(Long salonId) throws Exception;
    Salon getSalonByOwnerId(Long ownerId);
    List<Salon> searchSalonByCity(String city);

}
