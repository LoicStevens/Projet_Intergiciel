package com.JobOs.JobOs.AuthService.Model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incrément en BDD
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // CLIENT ou PRESTATAIRE

    @Column(name = "status")
    private String status = "Offline"; // Par défaut
    private String otp  ;
    private LocalDateTime otpExpiry;


}
