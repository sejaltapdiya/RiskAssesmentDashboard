package com.example.riskassessment.service;

import com.example.riskassessment.model.RiskData;
import com.example.riskassessment.repository.RiskDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiskDataService {
    @Autowired
    private RiskDataRepository repository;

    public List<RiskData> getAllRiskData() {
        List<RiskData> data = repository.findAll();
        System.out.println("Fetched RiskData." );
        return data;
    }


    public RiskData getRiskDataById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public RiskData saveRiskData(RiskData data) {
        return repository.save(data);
    }

    public RiskData updateRiskData(Long id, RiskData updatedData) {
        return repository.findById(id)
                .map(data -> {
                    data.setGender(updatedData.getGender());
                    data.setIncome(updatedData.getIncome());
                    data.setLoanPurpose(updatedData.getLoanPurpose());
                    data.setLoanAmount(updatedData.getLoanAmount());
                    data.setAge(updatedData.getAge());
                    data.setCreditScore(updatedData.getCreditScore());
                    return repository.save(data);
                }).orElseThrow(() -> new RuntimeException("Data not found"));
    }

    public void deleteRiskData(Long id) {
        repository.deleteById(id);
    }
}
