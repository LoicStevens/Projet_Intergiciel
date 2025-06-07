package com.JobOs.servicepublication.controller;

import com.JobOs.servicepublication.dto.AnnouncementRequest;
import com.JobOs.servicepublication.dto.AnnouncementResponse;
import com.JobOs.servicepublication.service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<AnnouncementResponse> createAnnouncement(@ModelAttribute AnnouncementRequest request) {
        try {
            // Handle file upload
            String imagePath = null;
            if (request.getFile() != null && !request.getFile().isEmpty()) {
                String uploadDir = "uploads/";
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                String fileName = System.currentTimeMillis() + "_" + request.getFile().getOriginalFilename();
                Path filePath = Paths.get(uploadDir + fileName);
                Files.write(filePath, request.getFile().getBytes());
                imagePath = filePath.toString();
            }

            // Update request with image path
            AnnouncementResponse response = announcementService.createAnnouncement(request, imagePath);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/client/{clientId}")
public ResponseEntity<List<AnnouncementResponse>> getAnnouncementsByClient(@PathVariable Long clientId) {
    List<AnnouncementResponse> list = announcementService.getAnnouncementsByClient(clientId);
    return ResponseEntity.ok(list);
}

}