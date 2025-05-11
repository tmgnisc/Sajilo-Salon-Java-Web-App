package com.sajilosalon.controller;


import com.sajilosalon.modal.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {


    @GetMapping("/api/users")
    public User getUser() {
        User user = new User();
        user.setEmail("nischal@gmail.com");
        user.setFullName("Nischal");
        user.setPhone("+977 9818255542");
        user.setRole("customer");
        return user;
    }
}
