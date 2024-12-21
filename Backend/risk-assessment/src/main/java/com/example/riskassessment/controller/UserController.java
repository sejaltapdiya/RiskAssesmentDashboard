package com.example.riskassessment.controller;

import com.example.riskassessment.config.JwtGeneratorValidator;
import com.example.riskassessment.dto.UserDTO;
import com.example.riskassessment.model.User;
import com.example.riskassessment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    JwtGeneratorValidator jwtGenVal;

    @Autowired
    BCryptPasswordEncoder bcCryptPasswordEncoder;

    @Autowired
    UserService userService;

    @Autowired
    AuthenticationManager authManager;  // Inject AuthenticationManager

    @PostMapping("/registration")
    public ResponseEntity<Object> registerUser(@RequestBody UserDTO userDto) {
        User user = userService.save(userDto);
        if (user == null) {
            return generateResponse("Not able to save user ", HttpStatus.BAD_REQUEST, userDto);
        } else {
            return generateResponse("User saved successfully : " + user.getId(), HttpStatus.OK, user);
        }
    }

    @GetMapping("/genToken")
    public String generateJwtToken(@RequestBody UserDTO userDto) throws Exception {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUserName(), userDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtGenVal.generateToken(authentication);
    }

    @GetMapping("/welcomeAdmin")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String welcomeAdmin() {
        return "WelcomeAdmin";
    }

    @GetMapping("/welcomeUser")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public String welcomeUser() {
        return "WelcomeUSER";
    }

    private ResponseEntity<Object> generateResponse(String message, HttpStatus status, Object responseObj) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", message);
        map.put("Status", status.value());
        map.put("data", responseObj);
        return new ResponseEntity<>(map, status);
    }
}
