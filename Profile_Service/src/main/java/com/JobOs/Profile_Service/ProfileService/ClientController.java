package com.JobOs.Profile_Service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

    @RestController
    @RequestMapping("/api/clients")
    public class ClientController {

    @Autowired
    private ClientService clientService;

    @PostMapping
    public ResponseEntity<?> createClient(@RequestBody Client client) {
        if (client.getId() == null) {
            return ResponseEntity.badRequest().body("L'ID doit être fourni pour créer un client.");
        }
    
        if (clientService.getClientById(client.getId()).isPresent()) {
            return ResponseEntity.status(409).body("Un client avec cet ID existe déjà.");
        }
    
        Client savedClient = clientService.createClient(client);
        return ResponseEntity.ok(savedClient);
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable Long id) {
        return clientService.getClientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {
        return ResponseEntity.ok(clientService.updateClient(id, updatedClient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
    
}
