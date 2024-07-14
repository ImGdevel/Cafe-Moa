package com.example.demo.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "[Swagger Title]",
                description = "(Swagger Description)",
                version = "v1"))
@Configuration
public class SwaggerConfig {
}
