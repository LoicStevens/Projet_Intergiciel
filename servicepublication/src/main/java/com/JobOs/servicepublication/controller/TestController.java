package com.JobOs.servicepublication.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.JobOs.servicepublication.AuthServiceClient;
import com.JobOs.servicepublication.dto.UserDto;
import org.springframework.web.bind.annotation.PathVariable;
@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private AuthServiceClient authServiceClient;

    @GetMapping("/user/{id}")
    public UserDto testGetUser(@PathVariable Long id) {
        return authServiceClient.getUserById(id);
    }
}
