package com.sajilosalon.repository;

import com.sajilosalon.modal.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SalonRepository extends JpaRepository<Salon, Long> {

    Salon findByOwnerId(Long id);

    @Query(
            "select s from Salon s where"
                    + "(lower(s.city) like lower (contact('%', :keyword, '%') ) OR + "
            + "(lower(s.city) like lower(contact('%', :keyword, '%') ) OR" +
            "(lower(s.address) like lower(contact('%', :keyword, '%') ) )"
    )
    List<Salon> searchSalons(@Param("Keyword") String keyword);
}
