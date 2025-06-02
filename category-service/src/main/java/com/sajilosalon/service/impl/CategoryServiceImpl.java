package com.sajilosalon.service.impl;

import com.sajilosalon.dto.SalonDTO;
import com.sajilosalon.modal.Category;
import com.sajilosalon.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    
    @Override
    public Category saveCategory(Category category, SalonDTO salonDTO) {
        return null;
    }

    @Override
    public List<Category> getAllCategoriesBySalon(Long id) {
        return List.of();
    }

    @Override
    public Category getCategoryById(Long id) {
        return null;
    }

    @Override
    public void deleteCategoryById(Long id) {

    }
}
