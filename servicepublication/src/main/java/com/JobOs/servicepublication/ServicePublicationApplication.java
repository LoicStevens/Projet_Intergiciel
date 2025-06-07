package com.JobOs.servicepublication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients
@EnableDiscoveryClient
public class ServicePublicationApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServicePublicationApplication.class, args);
	}

}
