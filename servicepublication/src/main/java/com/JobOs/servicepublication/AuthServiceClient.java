package com.JobOs.servicepublication;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.JobOs.servicepublication.dto.UserDto;

@FeignClient(name = "auth-service") 
public interface AuthServiceClient {

    @GetMapping("/api/auth/user/{id}") // adapte le path selon le controller réel de AuthService
    UserDto getUserById(@PathVariable("id") Long id);
}
