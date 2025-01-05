package com.example.riskassessment.repository;

import com.example.riskassessment.model.RiskData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RiskDataRepository extends JpaRepository<RiskData, Long> {
}
