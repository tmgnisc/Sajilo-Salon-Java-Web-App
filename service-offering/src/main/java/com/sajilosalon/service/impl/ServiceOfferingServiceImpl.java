package com.sajilosalon.service.impl;

import com.sajilosalon.dto.CategoryDTO;
import com.sajilosalon.dto.SalonDTO;
import com.sajilosalon.dto.ServiceDTO;
import com.sajilosalon.modal.ServiceOffering;
import com.sajilosalon.service.ServiceOfferingService;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ServiceOfferingServiceImpl implements ServiceOfferingService {
    @Override
    public ServiceOffering createService(SalonDTO salonDTO, ServiceDTO serviceDTO, CategoryDTO categoryDTO) {
        return null;
    }

    @Override
    public ServiceOffering updateService(Long serviceId, ServiceOffering service) {
        return null;
    }

    @Override
    public Set<ServiceOffering> getAllServiceBySalonId(Long salonId, Long categoryId) {
        return Set.of();
    }

    @Override
    public Set<ServiceOffering> getServicesByIds(Set<Long> ids) {
        return Set.of();
    }
}
