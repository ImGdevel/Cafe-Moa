package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostDTO {

    @Setter
    private Long id;

    @Setter
    private String user;

    @Setter
    private String title;

    @Setter
    private String content;

}
