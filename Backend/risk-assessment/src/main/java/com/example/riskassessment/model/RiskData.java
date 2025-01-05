package com.example.riskassessment.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "risk_data")
public class RiskData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("age")
    private int age;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("education_level")
    private String educationLevel;

    @JsonProperty("marital_status")
    private String maritalStatus;

    @JsonProperty("income")
    private double income;

    @JsonProperty("credit_score")
    private int creditScore;

    @JsonProperty("loan_amount")
    private double loanAmount;

    @JsonProperty("loan_purpose")
    private String loanPurpose;

    @JsonProperty("employment_status")
    private String employmentStatus;

    @JsonProperty("years_at_current_job")
    private int yearsAtCurrentJob;

    @JsonProperty("payment_history")
    private String paymentHistory;

    @JsonProperty("debt_to_income_ratio")
    private double debtToIncomeRatio;

    @JsonProperty("assets_value")
    private double assetsValue;

    @JsonProperty("number_of_dependents")
    private int numberOfDependents;

    @JsonProperty("city")
    private String city;

    @JsonProperty("state")
    private String state;

    @JsonProperty("country")
    private String country;

    @JsonProperty("previous_defaults")
    private int previousDefaults;

    @JsonProperty("marital_status_change")
    private boolean maritalStatusChange;

    @JsonProperty("risk_rating")
    private String riskRating;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public String getGender() {
        return this.gender;
    }

    public double getIncome() {
        return this.income;
    }

    public String getLoanPurpose(){
        return this.loanPurpose;
    }

    public double getLoanAmount() {
        return this.loanAmount;
    }

    public int getAge() {
        return this.age;
    }

    public int getCreditScore() {
        return this.creditScore;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setIncome(double income) {
        this.income = income;
    }

    public void setLoanPurpose(String loanPurpose) {
        this.loanPurpose = loanPurpose;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setCreditScore(int creditScore) {
        this.creditScore = creditScore;
    }
}
