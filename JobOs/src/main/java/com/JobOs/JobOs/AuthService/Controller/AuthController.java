package com.JobOs.JobOs.AuthService.Controller;

import com.JobOs.JobOs.AuthService.Dto.AuthenticationResponse;
import com.JobOs.JobOs.AuthService.Dto.LoginRequest;
 
import com.JobOs.JobOs.AuthService.Dto.OtpRequest;
import com.JobOs.JobOs.AuthService.Dto.RegisterRequest;
import com.JobOs.JobOs.AuthService.Dto.ResetPasswordRequest;
import com.JobOs.JobOs.AuthService.Dto.UserDto;
import com.JobOs.JobOs.AuthService.Model.User;
import com.JobOs.JobOs.AuthService.Repository.UserRepository;
import com.JobOs.JobOs.AuthService.Service.AuthService;

 

import java.util.Map;
import java.util.Optional;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

   @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
    return authService.register(registerRequest);
}

    
    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    try {
        AuthenticationResponse response = authService.login(request.getIdentifier(), request.getPassword());
        return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }
}

@PostMapping("/logout")
public ResponseEntity<String> logout(@RequestParam String username) {
    authService.logout(username);
    return ResponseEntity.ok("User logged out");
}
  
private final UserRepository userRepository;

    // Injection via constructeur
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

 @GetMapping("/user/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);  // méthode d'instance
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            UserDto dto = new UserDto(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
            );
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }


 @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            authService.forgotPassword(email);
            return ResponseEntity.ok("OTP sent to your email");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest request) {
        boolean isValid = authService.verifyOtp(request.getEmail(), request.getOtp());

        if (isValid) {
            return ResponseEntity.ok(Collections.singletonMap("message", "OTP verified successfully"));
        } else {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Collections.singletonMap("message", "Invalid or expired OTP"));
        }
    }
    

     @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.getEmail(), request.getNewPassword());
        return ResponseEntity.ok(Collections.singletonMap("message", "Password successfully reset."));
    }


}
