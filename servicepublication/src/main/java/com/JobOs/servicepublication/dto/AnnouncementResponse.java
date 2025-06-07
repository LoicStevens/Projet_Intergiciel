package com.JobOs.servicepublication.dto;

import com.JobOs.servicepublication.model.ProjectType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class AnnouncementResponse {

    private Long id;
    private Long clientId;
    private String title;
    private String description;
    private double price;
    private String location;
    private ProjectType projectType;

    private List<String> skills;  
    private String imagePath;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
