package com.JobOs.SearchService.controller;

import com.JobOs.SearchService.dto.AnnouncementResponse;
import com.JobOs.SearchService.model.ProjectType;
import com.JobOs.SearchService.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public List<AnnouncementResponse> searchAnnouncements(
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) ProjectType projectType
    ) {
        return searchService.search(skill, location, maxPrice, projectType);
    }
}
