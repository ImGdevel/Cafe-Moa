package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public RoleHierarchy roleHierarchy() {

        RoleHierarchyImpl hierarchy = new RoleHierarchyImpl();

        hierarchy.setHierarchy("ROLE_ADMIN > ROLE_MANAGER\n" +
                "ROLE_MANAGER > ROLE_USER");

        return hierarchy;
    }

    @Bean
    public SecurityFilterChain fitterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/", "/login", "/join").permitAll()
                        .requestMatchers("/admin").hasAnyRole("ADMIN")
                        .requestMatchers("/api/**").hasAnyRole("USER")
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-resources/**", "/api/**").permitAll() // 임시 swagger 허용
                        .anyRequest().denyAll()
                ).formLogin((form) -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .permitAll()
                )
                .logout((auth) -> auth.logoutUrl("/logout")
                        .logoutSuccessUrl("/")
                );

        return http.build();
    }

}
