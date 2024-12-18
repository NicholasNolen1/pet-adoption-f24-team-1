package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterService;
import petadoption.api.event.Event;
import petadoption.api.event.EventService;
import petadoption.api.pet.Pet;
import petadoption.api.pet.PetService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://34.133.251.138:3000"})
@RestController
@RequestMapping("/api/adoptioncenters")
public class AdoptionCenterController {

    @Autowired
    private AdoptionCenterService adoptionCenterService;

    @Autowired
    private EventService eventService;  // Add EventService to retrieve events

    @Autowired
    private PetService petService;

    // Existing methods

    @GetMapping
    public ResponseEntity<List<AdoptionCenter>> getAllCenters() {
        return adoptionCenterService.getAllCenters();
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<AdoptionCenter> getAdoptionCenter(@PathVariable Long id) {
        return adoptionCenterService.getAdoptionCenter(id);
    }

    @PostMapping
    public ResponseEntity<AdoptionCenter> addCenter(@RequestBody AdoptionCenter adoptionCenter) {
        return adoptionCenterService.addCenter(adoptionCenter);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdoptionCenter> updateAdoptionCenter(@PathVariable Long id, @RequestBody AdoptionCenter updateCenter) {
        AdoptionCenter existingCenter = adoptionCenterService.getAdoptionCenterById(id);

        if (existingCenter == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        existingCenter.setCenterName(updateCenter.getCenterName());
        existingCenter.setCenterAddress(updateCenter.getCenterAddress());
        existingCenter.setCenterPhone(updateCenter.getCenterPhone());
        existingCenter.setCenterEmail(updateCenter.getCenterEmail());
        existingCenter.setZipCode(updateCenter.getZipCode());
        existingCenter.setCenterImageUrl(updateCenter.getCenterImageUrl());

        AdoptionCenter savedCenter = adoptionCenterService.saveAdoptionCenter(existingCenter);

        return new ResponseEntity<>(savedCenter, HttpStatus.OK);
    }

    // New method to get events for a specific adoption center
    @GetMapping("/{centerId}/events")
    public ResponseEntity<List<Event>> getEventsByAdoptionCenter(@PathVariable Long centerId) {
        // old way we did this with events
//        // Fetch AdoptionCenter using the centerId
//        AdoptionCenter adoptionCenter = adoptionCenterService.getAdoptionCenterById(centerId);
//
//        if (adoptionCenter == null) {
//            return ResponseEntity.notFound().build();  // Return 404 if Adoption Center not found
//        }
//
//        // Get the list of events associated with this adoption center
//        List<Event> events = adoptionCenter.getEvents();
//
//        // Return 200 OK with an empty list if no events are found
//        return ResponseEntity.ok(events);  // This ensures an empty list is returned with 200 OK

        return ResponseEntity.ok(eventService.getAllEventsByAdminId(centerId));

    }

    @GetMapping("/{adoptionCenterId}/pets")
    public ResponseEntity<List<Pet>> getPetsByAdoptionCenter(@PathVariable Long adoptionCenterId) {
        List<Pet> pets = petService.getPetsByAdoptionCenterId(adoptionCenterId);
        if (pets.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(pets);
    }
}