package com.sajilosalon.mapper;

import com.sajilosalon.modal.Salon;
import com.sajilosalon.payload.dto.SalonDTO;

public class SalonMapper {
    public static SalonDTO mapToSalonDTO(Salon salon) {
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setId(salon.getId());
        salonDTO.setName(salon.getName());
        salonDTO.setAddress(salon.getAddress());
        salonDTO.setCity(salon.getCity());
        salonDTO.setImages(salon.getImages());
        salonDTO.setPhoneNumber(salon.getPhoneNumber());
        salonDTO.setOwnerId(salon.getOwnerId());
        salonDTO.setOpenTime(salon.getOpenTime());
        salonDTO.setCloseTime(salon.getCloseTime());
salonDTO.setEmail(salon.getEmail());
        return salonDTO;
    }
}
