package com.sajilosalon.service;

import com.sajilosalon.modal.Category;
import com.sajilosalon.dto.SalonDTO;


import java.util.Set;

public interface CategoryService {

    Category saveCategory(Category category, SalonDTO salonDTO);
    Set<Category> getAllCategoriesBySalon(Long id);
    Category getCategoryById(Long id) throws Exception;
    void deleteCategoryById(Long id,Long salonId) throws Exception;
}
