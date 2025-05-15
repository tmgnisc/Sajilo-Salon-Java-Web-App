package com.sajilosalon.service;

import com.sajilosalon.modal.User;

import java.util.List;

public interface UserService {

    User createUser(User user);
    User getUserById(Long id);
    List<User> getUsers();
    void deleteUser(Long id);
    User updateUser(Long id,  User user);

}
