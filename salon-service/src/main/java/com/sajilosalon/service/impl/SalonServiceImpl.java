package com.sajilosalon.service.impl;

import com.sajilosalon.modal.Salon;
import com.sajilosalon.payload.dto.SalonDTO;
import com.sajilosalon.payload.dto.UserDTO;
import com.sajilosalon.repository.SalonRepository;
import com.sajilosalon.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SalonServiceImpl implements SalonService {


    private final SalonRepository salonRepository;

    @Override
    public Salon createSalon(SalonDTO req, UserDTO user) {
        Salon salon = new Salon();


        salon.setName(req.getName());
        salon.setAddress(req.getAddress());
        salon.setEmail(req.getEmail());
        salon.setCity(req.getCity());
        salon.setImages(req.getImages());
        salon.setOwnerId(user.getId());
        salon.setOpenTime(req.getOpenTime());
        salon.setCloseTime(req.getCloseTime());
        salon.setPhoneNumber(req.getPhoneNumber());


        return salonRepository.save(salon);
    }

    @Override
    public Salon updateSalon(SalonDTO salon, UserDTO user, Long salonId) throws Exception {

        Salon existingSalon = salonRepository.findById(salonId).orElse(null);
        if(existingSalon != null && salon.getOwnerId().equals(user.getId())) {
            existingSalon.setCity(salon.getCity());
            existingSalon.setName(salon.getName());
            existingSalon.setAddress(salon.getAddress());
            existingSalon.setEmail(salon.getEmail());
            existingSalon.setImages(salon.getImages());
            existingSalon.setOpenTime(salon.getOpenTime());
            existingSalon.setCloseTime(salon.getCloseTime());
            existingSalon.setPhoneNumber(salon.getPhoneNumber());
            existingSalon.setOwnerId(salon.getOwnerId());

        }
       throw new Exception("salon not exist");
    }

    @Override
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    @Override
    public Salon getSalonById(Long salonId) throws Exception {
        Salon salon = salonRepository.findById(salonId).orElse(null);
        if(salon == null) {
            throw new Exception("salon not exist");
        }
        return salon;
    }

    @Override
    public Salon getSalonByOwnerId(Long ownerId) {
      return salonRepository.findByOwnerId(ownerId);
    }

    @Override
    public List<Salon> searchSalonByCity(String city) {
        return salonRepository.searchSalons(city) ;
    }
}
