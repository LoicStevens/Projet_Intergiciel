package com.JobOs.JobOs.AuthService.Dto;


import lombok.Data;
 

@Data
public class ResetPasswordRequest {
    private String email;
    private String newPassword;

}
