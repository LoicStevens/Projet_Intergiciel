package com.JobOs.servicepublication.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long clientId;

    private String title;

    @Column(length = 1000)
    private String description;

    private double price;

    private String location;

    @Enumerated(EnumType.STRING)
    private ProjectType projectType;

    @ElementCollection
    @CollectionTable(name = "announcement_skills", joinColumns = @JoinColumn(name = "announcement_id"))
    @Column(name = "skill", length = 100)
    private List<String> skills;

    private String imagePath; // New field to store the image path or URL

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}