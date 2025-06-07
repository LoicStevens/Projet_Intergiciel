package com.JobOs.servicepublication.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import com.JobOs.servicepublication.model.ProjectType;

import java.util.List;

@Data
public class AnnouncementRequest {
    private Long clientId;
    private String title;
    private String description;
    private double price;
    private String location;
    private ProjectType projectType;
    private List<String> skills;
    private MultipartFile file; // For the image upload
}