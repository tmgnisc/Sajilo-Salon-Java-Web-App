package com.sajilosalon.service;

import com.sajilosalon.exception.UserException;
import com.sajilosalon.modal.User;

import java.util.List;

public interface UserService {

    User createUser(User user);
    User getUserById(Long id) throws UserException;
    List<User> getUsers();
    void deleteUser(Long id) throws UserException;
    User updateUser(Long id,  User user) throws UserException;

}
