package com.sajilosalon.service;

import com.sajilosalon.modal.Category;
import com.sajilosalon.dto.SalonDTO;

import java.util.List;

public interface CategoryService {

    Category saveCategory(Category category, SalonDTO salonDTO);
    List<Category> getAllCategoriesBySalon(Long id);
    Category getCategoryById(Long id);
    void deleteCategoryById(Long id);
}
