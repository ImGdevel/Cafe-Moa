package com.example.demo.dto;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CafeDTO {
    private Long id;
    private String name;
    private String address;
    private String logoPath;

}
