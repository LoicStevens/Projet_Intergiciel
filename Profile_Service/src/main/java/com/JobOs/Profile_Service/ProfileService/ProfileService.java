package com.JobOs.Profile_Service.ProfileService;

import org.springframework.stereotype.Service;


@Service
public class ProfileService {

    private final UserClient userClient;

    public ProfileService(UserClient userClient) {
        this.userClient = userClient;
    }

    public boolean isUserValid(String email) {
        return Boolean.TRUE.equals(userClient.userExists(email));
    }
}