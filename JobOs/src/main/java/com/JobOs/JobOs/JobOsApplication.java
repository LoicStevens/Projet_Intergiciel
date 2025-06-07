package com.JobOs.JobOs;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;







@SpringBootApplication

@EnableFeignClients

public class JobOsApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobOsApplication.class, args);
	}

}
