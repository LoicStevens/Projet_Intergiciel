package com.JobOs.Profile_Service.ProfileService;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "auth-service") 
public interface UserClient {

    @GetMapping("/api/users/exists")
    Boolean userExists(@RequestParam("email") String email);
}
