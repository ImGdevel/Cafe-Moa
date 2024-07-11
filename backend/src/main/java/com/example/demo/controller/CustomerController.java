package com.example.demo.controller;

import com.example.demo.dto.CustomerDTO;
import com.example.demo.service.impl.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping("/create")
    public ResponseEntity<CustomerDTO> createCustomer(
            @RequestParam String name,
            @RequestParam String email) {

        CustomerDTO customer = customerService.createCustomer(name, email);
        return ResponseEntity.ok(customer);
    }
}
