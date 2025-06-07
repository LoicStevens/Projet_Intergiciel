package com.JobOs.SearchService.dto;

import com.JobOs.SearchService.model.ProjectType;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AnnouncementResponse {
    private Long id;
    private Long clientId;
    private String title;
    private String description;
    private double price;
    private String location;
    private ProjectType projectType;
    private String skills; // ✅ Corrigé ici
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
