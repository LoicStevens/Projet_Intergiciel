package com.JobOs.SearchService.feign;

import com.JobOs.SearchService.dto.AnnouncementResponse;
import com.JobOs.SearchService.model.ProjectType;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "service-publication")
public interface AnnouncementClient {

    @GetMapping("/api/announcements/search")
    List<AnnouncementResponse> searchAnnouncements(
            @RequestParam(required = false) String skill,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) ProjectType projectType
    );
}
