package com.JobOs.Profile_Service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@RestController
@RequestMapping("/api/prestataires")
public class PrestataireController {

    @Autowired
    private PrestataireService prestataireService;

    @PostMapping
    public ResponseEntity<Prestataire> createPrestataire(@RequestBody Prestataire prestataire) {
        return ResponseEntity.ok(prestataireService.createPrestataire(prestataire));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prestataire> getPrestataire(@PathVariable Long id) {
        return prestataireService.getPrestataireById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Prestataire> getAllPrestataires() {
        return prestataireService.getAllPrestataires();
    }

@PutMapping("/{id}")
public ResponseEntity<?> updateProfile(
    @PathVariable Long id,
   @RequestPart(value = "name", required = false) String name,
    @RequestPart(value = "email", required = false) String email,
    @RequestPart(value = "city", required = false) String city,
    @RequestPart(value = "birthDate", required = false) String birthDate,
    @RequestPart(value = "skills", required = false) String skills,
    @RequestPart(value = "languages", required = false) String languages,
    @RequestPart(value = "description", required = false) String description,
    @RequestPart(value = "portfolio", required = false) String portfolio,
    @RequestPart(value = "price", required = false) String price,
    @RequestPart(value = "file", required = false) MultipartFile file
) {
    System.out.println("Requête reçue pour ID: " + id); // Log pour débogage
    System.out.println("Données reçues: name=" + name + ", email=" + email + ", city=" + city + 
                       ", birthDate=" + birthDate + ", skills=" + skills + ", languages=" + languages + 
                       ", description=" + description + ", portfolio=" + portfolio + ", price=" + price);
    Optional<Prestataire> optionalPrestataire = prestataireService.getPrestataireById(id);
    if (optionalPrestataire.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    Prestataire prestataire = optionalPrestataire.get();
    prestataire.setName(name);
    prestataire.setEmail(email);
    prestataire.setCity(city);
    try {
        prestataire.setBirthDate(LocalDate.parse(birthDate, DateTimeFormatter.ofPattern("yyyy-MM-dd")));
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Format de date invalide pour birthDate: " + birthDate);
    }
    prestataire.setSkills(skills);
    prestataire.setLanguages(languages);
    prestataire.setDescription(description);
    prestataire.setPortfolio(portfolio);
    prestataire.setPrice(price);

    if (file != null && !file.isEmpty()) {
        try {
            String uploadDir = "Uploads/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());
            prestataire.setPhotoPath(fileName);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de l’enregistrement du fichier: " + e.getMessage());
        }
    }

    Prestataire updatedPrestataire = prestataireService.updatePrestataire(prestataire);
    return ResponseEntity.ok(updatedPrestataire);
}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrestataire(@PathVariable Long id) {
        prestataireService.deletePrestataire(id);
        return ResponseEntity.noContent().build();
    }
}
