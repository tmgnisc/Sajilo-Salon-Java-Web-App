package com.sajilosalon.service;

import com.sajilosalon.dto.CategoryDTO;
import com.sajilosalon.dto.SalonDTO;
import com.sajilosalon.dto.ServiceDTO;
import com.sajilosalon.modal.ServiceOffering;

import java.util.List;
import java.util.Set;

public interface ServiceOfferingService {

    ServiceOffering createService(SalonDTO salonDTO, ServiceDTO serviceDTO, CategoryDTO categoryDTO);
    ServiceOffering updateService(Long serviceId, ServiceOffering service);
Set<ServiceOffering> getAllServiceBySalonId(Long salonId, Long categoryId);
Set<ServiceOffering> getServicesByIds(Set<Long> ids);

}
