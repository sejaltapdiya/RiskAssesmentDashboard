package com.example.riskassessment.repository;

import com.example.riskassessment.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
        User findByUserName(String username);
}
