package com.sajilosalon.controller;

import com.sajilosalon.modal.Salon;
import com.sajilosalon.payload.dto.SalonDTO;
import com.sajilosalon.payload.dto.UserDTO;
import com.sajilosalon.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/salons")
@RequiredArgsConstructor
public class SalonController {

    private final SalonService salonService;
    public ResponseEntity<SalonDTO> createSalon(@RequestBody SalonDTO salonDTO) {

        UserDTO userDTO = new UserDTO();
        userDTO.setId(1L );
        Salon salon = salonService.createSalon(salonDTO, userDTO);
        return  null;
    }
}
