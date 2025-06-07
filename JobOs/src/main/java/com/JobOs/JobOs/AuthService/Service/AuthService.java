package com.JobOs.JobOs.AuthService.Service;

import com.JobOs.JobOs.AuthService.Dto.AuthenticationResponse;
import com.JobOs.JobOs.AuthService.Dto.RegisterRequest;
import com.JobOs.JobOs.AuthService.Model.User;
import com.JobOs.JobOs.AuthService.Model.Role;
import com.JobOs.JobOs.AuthService.Repository.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.apache.hc.core5.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder; // Pour crypter les mots de passe
public ResponseEntity<?> register(RegisterRequest registerRequest) {
    if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
        return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body("Email already in use");
    }

    User user = new User();
    user.setName(registerRequest.getName());
    user.setEmail(registerRequest.getEmail());
    user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
    user.setRole(Role.valueOf(registerRequest.getRole()));

    userRepository.save(user);

    Map<String, Object> response = new HashMap<>();
    response.put("id", user.getId());
    response.put("name", user.getName());
    response.put("email", user.getEmail());
    response.put("role", user.getRole().name());

    return ResponseEntity.status(HttpStatus.SC_CREATED).body(response);
}

    @Autowired
private JwtService jwtService;

public AuthenticationResponse login(String identifier, String password) throws Exception {
    Optional<User> userOpt = userRepository.findByEmail(identifier);

    if (userOpt.isEmpty()) {
        userOpt = userRepository.findByName(identifier);
        if (userOpt.isEmpty()) {
            throw new Exception("Invalid credentials");
        }
    }

    User user = userOpt.get();

    if (!passwordEncoder.matches(password, user.getPassword())) {
        throw new Exception("Invalid credentials");
    }

    // ✅ Met à jour le status à "Online"
    user.setStatus("Online");
    userRepository.save(user);

    String token = jwtService.generateToken(user.getName());

    
    user.setPassword(null);

    return new AuthenticationResponse(token, user);
}

public void logout(String username) {
    Optional<User> userOpt = userRepository.findByName(username);
    if (userOpt.isPresent()) {
        User user = userOpt.get();
        user.setStatus("Offline");
        userRepository.save(user);
    }
}
 
@Autowired
private EmailService emailService;
public void forgotPassword(String email) throws Exception {
    Optional<User> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
        throw new Exception("User with this email does not exist");
    }

    User user = userOpt.get();

    // Génère un OTP à 6 chiffres
    String otp = String.format("%06d", new Random().nextInt(999999));

    // Stocke l’OTP avec date d’expiration
    user.setOtp(otp);
    user.setOtpExpiry(LocalDateTime.now().plusMinutes(10));
    userRepository.save(user);

    // Envoie de l’email
    emailService.sendOtpEmail(user.getEmail(), otp);
}


    public boolean verifyOtp(String email, String otp) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return false;
        }

        User user = userOptional.get();

        // Vérifie si l'OTP correspond et n'est pas expiré
        if (user.getOtp() != null &&
            user.getOtp().equals(otp) &&
            user.getOtpExpiry() != null &&
            user.getOtpExpiry().isAfter(LocalDateTime.now())) {

            // On peut même "consommer" l’OTP si tu veux
            user.setOtp(null);
            user.setOtpExpiry(null);
            userRepository.save(user);

            return true;
        }

        return false;
    }

    
    public void resetPassword(String email, String newPassword) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }


}
