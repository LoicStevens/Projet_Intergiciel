package com.JobOs.servicepublication.AnnouncementMapper;
import org.springframework.stereotype.Component;

import com.JobOs.servicepublication.dto.AnnouncementResponse;
import com.JobOs.servicepublication.model.Announcement;

@Component
public class AnnouncementMapper {

    public AnnouncementResponse mapToResponse(Announcement announcement) {
        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .description(announcement.getDescription())
                .price(announcement.getPrice())
                .location(announcement.getLocation())
                .skills(announcement.getSkills())
                .createdAt(announcement.getCreatedAt())
                .build();
    }
}
