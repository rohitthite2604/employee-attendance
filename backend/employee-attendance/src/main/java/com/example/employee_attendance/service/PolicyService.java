package com.example.employee_attendance.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.employee_attendance.model.Policy;
import com.example.employee_attendance.repository.PolicyRepository;

@Service
public class PolicyService {

    @Autowired
    private PolicyRepository policyRepository;

    public Policy createPolicy(Policy policy) {
        return policyRepository.save(policy);
    }

    public List<Map<String, Object>> getAllPolicies() {
    return policyRepository.findAll().stream()
            .map(p -> {
                Map<String, Object> policyMap = new HashMap<>();
                policyMap.put("policyId", p.getPolicyId());
                policyMap.put("policyType", p.getPolicyType());
                policyMap.put("content", p.getContent());
                return policyMap;
            })
            .collect(Collectors.toList());
}

    public Policy getPolicyById(Long policyId) {
        return policyRepository.findById(policyId)
                .orElseThrow(() -> new NoSuchElementException("Policy not found with id: " + policyId));
    
}

public Policy updatePolicy(Long policyId, Policy updatedPolicy){
    Optional<Policy> existingPolicy = policyRepository.findById(policyId);
    if(existingPolicy.isPresent()){
        Policy policy = existingPolicy.get();
        policy.setPolicyType(updatedPolicy.getPolicyType());
        policy.setContent(updatedPolicy.getContent());
        return policyRepository.save(policy);
    } else {
        throw new NoSuchElementException("Policy not found with id: " + policyId);
    }
}

public void deletePolicy(Long policyId) {
    if (!policyRepository.existsById(policyId)) {
        throw new NoSuchElementException("Policy not found with id: " + policyId);
    }
    policyRepository.deleteById(policyId);

}

}
