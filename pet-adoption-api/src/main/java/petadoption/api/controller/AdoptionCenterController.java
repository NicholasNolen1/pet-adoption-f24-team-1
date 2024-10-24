package petadoption.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import petadoption.api.adoptioncenter.AdoptionCenter;
import petadoption.api.adoptioncenter.AdoptionCenterService;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:3000", "http://35.238.40.26:3000"})
@RestController
@RequestMapping("/api/adoptioncenters")
public class AdoptionCenterController {

    @Autowired
    private AdoptionCenterService adoptionCenterService;

    @GetMapping
    public ResponseEntity<List<AdoptionCenter>> getAllCenters() {
        return adoptionCenterService.getAllCenters();
    }

    @PostMapping
    public ResponseEntity<AdoptionCenter> addCenter(@RequestBody AdoptionCenter adoptionCenter) {
        return adoptionCenterService.addCenter(adoptionCenter);
    }
}
