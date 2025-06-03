package com.sajilosalon.controller;

import com.sajilosalon.dto.CategoryDTO;
import com.sajilosalon.dto.SalonDTO;
import com.sajilosalon.dto.ServiceDTO;
import com.sajilosalon.modal.ServiceOffering;
import com.sajilosalon.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/service-offering/salon-owner")
public class SalonServiceOfferingController {
    private  final ServiceOfferingService serviceOfferingService;


    @PostMapping
    public ResponseEntity<ServiceOffering> createService(@RequestBody ServiceDTO serviceDTO
           ) {
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setId(1L);
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(serviceDTO.getCategory());
        ServiceOffering serviceOfferings = serviceOfferingService.createService(salonDTO, serviceDTO, categoryDTO);
        return ResponseEntity.ok(serviceOfferings);


    }

    @PostMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateService(@PathVariable Long id,@RequestBody ServiceOffering serviceOffering
    ) throws Exception {

        ServiceOffering serviceOfferings = serviceOfferingService.updateService(id, serviceOffering);
        return ResponseEntity.ok(serviceOfferings);


    }
}
