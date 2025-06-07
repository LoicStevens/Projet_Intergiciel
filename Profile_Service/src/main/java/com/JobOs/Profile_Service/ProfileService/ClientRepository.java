package com.JobOs.Profile_Service.ProfileService;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ClientRepository extends JpaRepository<Client, Long> {
    // Vous pouvez ajouter des méthodes personnalisées si nécessaire
}
