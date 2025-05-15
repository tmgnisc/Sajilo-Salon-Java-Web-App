package com.sajilosalon.controller;


import com.sajilosalon.exception.UserException;
import com.sajilosalon.modal.User;
import com.sajilosalon.repository.UserRepository;
import com.sajilosalon.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/api/users")
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }


    @GetMapping("/api/users/{userId}")
    public User getUserById(@PathVariable("userId") Long id) throws Exception {

    }

    @PutMapping("/api/users/{id}")
    public User updateUser(@RequestBody User user, @PathVariable Long id) throws Exception {


    }


    @DeleteMapping("/api/users/{id}")
    public String deleteUserById(@PathVariable Long id) throws Exception {

    }
}
