package com.JobOs.JobOs.AuthService.Dto;

public class OtpPasswordResetRequest {
    private String email;
    private String otpCode;
    private String newPassword;

    // Getters et setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getOtpCode() { return otpCode; }
    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
