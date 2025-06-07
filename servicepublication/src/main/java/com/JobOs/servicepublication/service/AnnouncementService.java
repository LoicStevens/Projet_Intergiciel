package com.JobOs.servicepublication.service;

import com.JobOs.servicepublication.AnnouncementMapper.AnnouncementMapper;
import com.JobOs.servicepublication.dto.AnnouncementRequest;
import com.JobOs.servicepublication.dto.AnnouncementResponse;
import com.JobOs.servicepublication.exception.AnnouncementNotFoundException;
import com.JobOs.servicepublication.model.Announcement;
import com.JobOs.servicepublication.model.ProjectType;
import com.JobOs.servicepublication.repository.AnnouncementRepository;
import com.JobOs.servicepublication.spec.AnnouncementSpecification;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    
    
    private final AnnouncementMapper mapper;


    private final AnnouncementRepository announcementRepository;
    private static final Logger logger = LoggerFactory.getLogger(AnnouncementService.class);

    @Transactional
    public AnnouncementResponse createAnnouncement(AnnouncementRequest request, String imagePath) {
        validateRequest(request);
        logger.debug("Valeur des compétences reçues pour création : {}", request.getSkills());

        List<String> skills = request.getSkills();

        Announcement announcement = Announcement.builder()
                .clientId(request.getClientId())
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .location(request.getLocation())
                .projectType(request.getProjectType())
                .skills(skills)
                .imagePath(imagePath)
                .build();

        Announcement savedAnnouncement = announcementRepository.save(announcement);
        logger.info("Annonce créée avec l'ID : {}", savedAnnouncement.getId());
        return mapToResponse(savedAnnouncement);
    }

    @Transactional
    public AnnouncementResponse updateAnnouncement(Long id, AnnouncementRequest request, String imagePath) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new AnnouncementNotFoundException("Annonce avec l'ID " + id + " non trouvée"));

        validateRequest(request);
        logger.debug("Valeur des compétences reçues pour mise à jour ID {} : {}", id, request.getSkills());

        List<String> skills = request.getSkills();

        if (imagePath != null && announcement.getImagePath() != null) {
            deleteFile(announcement.getImagePath());
        }

        announcement.setTitle(request.getTitle());
        announcement.setDescription(request.getDescription());
        announcement.setPrice(request.getPrice());
        announcement.setLocation(request.getLocation());
        announcement.setProjectType(request.getProjectType());
        announcement.setSkills(skills);
        announcement.setImagePath(imagePath);

        Announcement savedAnnouncement = announcementRepository.save(announcement);
        logger.info("Annonce mise à jour avec l'ID : {}", savedAnnouncement.getId());
        return mapToResponse(savedAnnouncement);
    }

    @Transactional
    public void deleteAnnouncement(Long id) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new AnnouncementNotFoundException("Annonce avec l'ID " + id + " non trouvée"));

        if (announcement.getImagePath() != null) {
            deleteFile(announcement.getImagePath());
        }

        announcementRepository.deleteById(id);
        logger.info("Annonce supprimée avec l'ID : {}", id);
    }

    public AnnouncementResponse getAnnouncementById(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("L'ID doit être positif.");
        }
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new AnnouncementNotFoundException("Annonce avec l'ID " + id + " non trouvée"));
        logger.info("Annonce récupérée avec succès pour l'ID : {}", id);
        return mapToResponse(announcement);
    }

    public List<AnnouncementResponse> getAllAnnouncements() {
        return announcementRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AnnouncementResponse> searchAnnouncements(String skill, String location, Double maxPrice, ProjectType projectType) {
        Specification<Announcement> specs = Specification.where(AnnouncementSpecification.hasSkill(skill))
                .and(AnnouncementSpecification.hasLocation(location))
                .and(AnnouncementSpecification.hasMaxPrice(maxPrice))
                .and(AnnouncementSpecification.hasProjectType(projectType));

        return announcementRepository.findAll(specs).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private AnnouncementResponse mapToResponse(Announcement announcement) {
        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .clientId(announcement.getClientId())
                .title(announcement.getTitle())
                .description(announcement.getDescription())
                .price(announcement.getPrice())
                .location(announcement.getLocation())
                .projectType(announcement.getProjectType())
                .skills(announcement.getSkills())
                .imagePath(announcement.getImagePath())
                .createdAt(announcement.getCreatedAt())
                .updatedAt(announcement.getUpdatedAt())
                .build();
    }

    private void validateRequest(AnnouncementRequest request) {
        if (request.getTitle() == null || request.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Le titre ne peut pas être vide.");
        }
        if (request.getDescription() == null || request.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("La description ne peut pas être vide.");
        }
        if (request.getPrice() <= 0) {
            throw new IllegalArgumentException("Le prix doit être positif.");
        }
        if (request.getLocation() == null || request.getLocation().trim().isEmpty()) {
            throw new IllegalArgumentException("La localisation ne peut pas être vide.");
        }
        if (request.getSkills() == null || request.getSkills().isEmpty()) {
            throw new IllegalArgumentException("Les compétences ne peuvent pas être vides.");
        }
        if (request.getClientId() == null || request.getClientId() <= 0) {
            throw new IllegalArgumentException("L'ID du client doit être valide.");
        }
    }

    private void deleteFile(String filePath) {
        try {
            File file = new File(filePath);
            if (file.exists()) {
                if (file.delete()) {
                    logger.info("Fichier supprimé : {}", filePath);
                } else {
                    logger.warn("Échec de la suppression du fichier : {}", filePath);
                }
            }
        } catch (Exception e) {
            logger.error("Erreur lors de la suppression du fichier : {}", filePath, e);
        }
    }

    public List<AnnouncementResponse> getAnnouncementsByClient(Long clientId) {
    return announcementRepository.findByClientId(clientId)
        .stream()
        .map(mapper::mapToResponse)
        .collect(Collectors.toList());
}

}
