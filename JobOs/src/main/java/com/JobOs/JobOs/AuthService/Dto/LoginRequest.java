package com.JobOs.JobOs.AuthService.Dto;

public class LoginRequest {
    private String identifier; // email ou name
    private String password;

    // Getters et Setters
    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
