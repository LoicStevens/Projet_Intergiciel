package com.JobOs.servicepublication.repository;

import com.JobOs.servicepublication.model.Announcement;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long>, JpaSpecificationExecutor<Announcement> {
      List<Announcement> findByClientId(Long clientId);
}
