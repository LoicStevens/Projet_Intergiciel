package com.JobOs.Profile_Service.ProfileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PrestataireService {

    @Autowired
    private PrestataireRepository prestataireRepository;

    public Prestataire createPrestataire(Prestataire prestataire) {
        return prestataireRepository.save(prestataire);
    }

    public Optional<Prestataire> getPrestataireById(Long id) {
        return prestataireRepository.findById(id);
    }

    public List<Prestataire> getAllPrestataires() {
        return prestataireRepository.findAll();
    }

   public Prestataire updatePrestataire(Prestataire prestataire) {
    return prestataireRepository.save(prestataire);
}

    public void deletePrestataire(Long id) {
        prestataireRepository.deleteById(id);
    }
}
