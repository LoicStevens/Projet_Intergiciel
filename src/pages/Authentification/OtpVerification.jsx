


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTime, setResendTime] = useState(30);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');


  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && !otp[index]) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (resendTime > 0) {
        setResendTime((prev) => prev - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [resendTime]);

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the full 6-digit OTP.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/auth/verify-otp', {
        email: email,
        otp: otpCode,
      });

      if (response.status === 200) {
        navigate('/resetPassword');
      }
    } catch (err) {
      setError('Invalid or expired OTP.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
        <div className="flex justify-center mb-6">
          <img src="logo.png" alt="JobOs" className="h-12" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">OTP Verification</h2>
        <p className="text-gray-600 mb-4">
          A One-Time Password (OTP) has been sent to <strong>{email}</strong>.
        </p>

        <div className="flex justify-center mb-4 space-x-2">
          {otp.map((data, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className="w-10 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-green text-lg"
            />
          ))}
        </div>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <button
          onClick={handleVerifyOtp}
          className="w-full py-2 bg-custom-green text-white rounded-md hover:bg-green-700 focus:outline-none"
        >
          Verify OTP
        </button>

        <p className="text-gray-600 mt-6">
          Resend OTP in {resendTime > 0 ? `00:${resendTime.toString().padStart(2, '0')}` : '00:00'}
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;

