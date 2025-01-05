package com.example.riskassessment.controller;

import com.example.riskassessment.model.RiskData;
import com.example.riskassessment.service.RiskDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class RiskDataController {
    @Autowired
    private RiskDataService service;

    @GetMapping
    public List<RiskData> getAllData() {
        return service.getAllRiskData();
    }

    @GetMapping("/{id}")
    public RiskData getDataById(@PathVariable Long id) {
        return service.getRiskDataById(id);
    }
    @PostMapping("/{id}")
    public RiskData createRiskData(@RequestBody RiskData data) {
        return service.saveRiskData(data);
    }

    @PutMapping("/{id}")
    public RiskData updateRiskData(@PathVariable Long id, @RequestBody RiskData updatedData) {
        return service.updateRiskData(id, updatedData);
    }

    @DeleteMapping("/{id}")
    public void deleteRiskData(@PathVariable Long id) {
        service.deleteRiskData(id);
    }

}
