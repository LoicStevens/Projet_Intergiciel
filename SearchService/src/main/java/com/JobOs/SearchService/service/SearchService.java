package com.JobOs.SearchService.service;

import com.JobOs.SearchService.dto.AnnouncementResponse;
import com.JobOs.SearchService.feign.AnnouncementClient;
import com.JobOs.SearchService.model.ProjectType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final AnnouncementClient announcementClient;

    public List<AnnouncementResponse> search(String skill, String location, Double maxPrice, ProjectType projectType) {
        return announcementClient.searchAnnouncements(skill, location, maxPrice, projectType);
    }
}
