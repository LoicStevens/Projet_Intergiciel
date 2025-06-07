


package com.JobOs.JobOs.AuthService.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Your OTP Code");
        message.setText("Hello,\n\nYour OTP code is: " + otp + "\n\nIt expires in 10 minutes.");
        message.setFrom("ton.email@gmail.com");
        mailSender.send(message);
    }
}
   



