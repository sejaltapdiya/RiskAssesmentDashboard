package com.example.riskassessment.service;

import com.example.riskassessment.dto.UserDTO;
import com.example.riskassessment.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User save(UserDTO userRegisteredDTO);
}
