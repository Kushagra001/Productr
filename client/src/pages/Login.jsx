import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import runnerImg from '../assets/runner.jpg';
import bgImg from '../assets/background.png';

const Login = () => {
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

   // 'email' or 'otp'
   const [step, setStep] = useState('email');
   const [email, setEmail] = useState('');
   // Array for 6 digits (Backend generates 6)
   const [otp, setOtp] = useState(['', '', '', '', '', '']);
   const [timer, setTimer] = useState(20);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');

   // Toggle between Login and Signup
   const [isSignup, setIsSignup] = useState(false);

   // Refs for OTP inputs to handle auto-focus
   const inputsRef = useRef([]);

   // Timer Logic
   useEffect(() => {
      let interval;
      if (step === 'otp' && timer > 0) {
         interval = setInterval(() => {
            setTimer((prev) => prev - 1);
         }, 1000);
      }
      return () => clearInterval(interval);
   }, [step, timer]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      const endpoint = isSignup
         ? `${API_URL}/api/auth/signup`
         : `${API_URL}/api/auth/login`;

      try {
         await axios.post(endpoint, { email });
         setStep('otp');
         setTimer(60);
         setOtp(['', '', '', '', '', '']);
      } catch (err) {
         setError(err.response?.data?.error || 'Failed to request OTP');
      } finally {
         setLoading(false);
      }
   };

   const handleOtpChange = (index, value) => {
      if (isNaN(value)) return;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
         inputsRef.current[index + 1].focus();
      }
   };

   const handleKeyDown = (index, e) => {
      if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
         inputsRef.current[index - 1].focus();
      }
   };

   const navigate = useNavigate();

   const handleVerifyOtp = async () => {
      const code = otp.join('');
      if (code.length !== 6) {
         setError('Please enter a valid 6-digit OTP');
         return;
      }

      setLoading(true);
      setError('');
      try {
         const res = await axios.post(`${API_URL}/api/auth/verify`, { email, otp: code });
         localStorage.setItem('user', JSON.stringify(res.data.user));
         localStorage.setItem('token', res.data.userId);
         navigate('/');
      } catch (err) {
         setError(err.response?.data?.error || 'Invalid OTP');
      } finally {
         setLoading(false);
      }
   };

   const handleResend = async () => {
      if (timer === 0) {
         try {
            const endpoint = isSignup
               ? `${API_URL}/api/auth/signup`
               : `${API_URL}/api/auth/login`;
            await axios.post(endpoint, { email });
            setTimer(60);
            setError('');
         } catch (err) {
            setError('Failed to resend OTP');
         }
      }
   };

   return (
      <div className="flex flex-col md:flex-row min-h-screen w-screen bg-white overflow-hidden font-['Inter'] fixed inset-0 z-50">

         {/* Left Section - Visual/Brand */}
         <div className="w-full md:w-[55%] relative hidden md:flex items-center justify-center p-4 h-full">
            {/* Background Container - Rounded */}
            <div className="absolute inset-4 rounded-[40px] overflow-hidden">
               {/* Abstract Background */}
               <img
                  src={bgImg}
                  alt="Background"
                  className="w-full h-full object-cover"
               />

               {/* Logo */}
               {/* Logo */}
               <div className="absolute top-8 left-8 z-20 flex flex-row items-center gap-[8px]">
                  <span style={{ fontFamily: 'AvertaStd-Black, sans-serif', fontSize: '24px', lineHeight: '30px', fontWeight: 900, color: '#071074' }}>
                     Productr
                  </span>
                  <img src="/logo_icon.png" alt="Productr Icon" className="w-[26.66px] h-[26.64px]" />
               </div>

               {/* Floating Card */}
               <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[312px] h-[480px] rounded-[48px] overflow-hidden shadow-2xl z-10"
                  style={{
                     boxShadow: '0px 8px 34px 0px rgba(0, 0, 0, 0.32)',
                     background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(153,153,153,0.1) 100%)',
                     padding: '2px', // Simulating border width
                  }}
               >
                  <div className="w-full h-full rounded-[46px] overflow-hidden relative bg-black">
                     <img
                        src={runnerImg}
                        alt="Runner"
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute bottom-8 left-0 w-full text-center px-4">
                        <h2 className="text-white text-2xl font-bold leading-tight drop-shadow-md">Uplist your<br />product to market</h2>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Section - Login Form */}
         <div className="flex-1 w-full md:w-[45%] flex flex-col items-center justify-center p-8 lg:p-16 h-full bg-white">
            <div className="w-full max-w-[400px]">
               <h1 className="text-[24px] font-semibold text-[#111652] mb-8 leading-[100%] tracking-[0%] text-center md:text-left">
                  {isSignup ? 'Create your Productr Account' : 'Login to your Productr Account'}
               </h1>
               {error && <p className="text-red-500 text-sm font-bold text-center mb-4">{error}</p>}

               {step === 'email' ? (
                  // EMAIL FORM
                  <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                     <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email</label>
                        <input
                           type="text"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           placeholder="Enter your email"
                           className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-700 transition-colors bg-white text-gray-900"
                        />
                     </div>

                     <button type="submit" disabled={loading} className="w-full bg-[#111652] disabled:bg-gray-400 text-white py-3 rounded-lg font-bold hover:bg-[#0d1040] transition-colors mt-2 cursor-pointer">
                        {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Login')}
                     </button>
                  </form>
               ) : (
                  // OTP FORM
                  <div className="flex flex-col gap-5">
                     <div>
                        <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">Enter OTP</label>
                        <div className="flex gap-3 justify-between">
                           {otp.map((digit, index) => (
                              <input
                                 key={index}
                                 ref={(el) => (inputsRef.current[index] = el)}
                                 type="text"
                                 maxLength={1}
                                 value={digit}
                                 onChange={(e) => handleOtpChange(index, e.target.value)}
                                 onKeyDown={(e) => handleKeyDown(index, e)}
                                 className="w-10 h-10 sm:w-12 sm:h-12 border border-gray-300 rounded-lg text-center text-lg font-bold focus:outline-none focus:border-[#111652] transition-colors bg-white text-gray-900"
                              />
                           ))}
                        </div>
                     </div>

                     <button
                        onClick={handleVerifyOtp} disabled={loading}
                        className="w-full bg-[#111652] disabled:bg-gray-400 text-white py-3 rounded-lg font-bold hover:bg-[#0d1040] transition-colors mt-4 cursor-pointer"
                     >
                        {loading ? 'Verifying...' : 'Enter your OTP'}
                     </button>

                     <p className="text-center text-sm text-gray-400 mt-2">
                        Didnt receive OTP ? <span
                           onClick={handleResend}
                           className={`font-bold ${timer === 0 ? 'text-[#111652] cursor-pointer hover:underline' : 'text-[#111652] opacity-50 cursor-not-allowed'}`}
                        >
                           {timer > 0 ? `Resend in ${timer}s` : 'Resend'}
                        </span>
                     </p>
                  </div>
               )}
            </div>

            {/* Footer / Signup Link (Only show on Email step usually, but keeping layout consistent) */}
            {step === 'email' && (
               <div className="mt-20 w-full max-w-[400px] border border-gray-100 rounded-xl p-6 text-center shadow-sm bg-white">
                  <p className="text-gray-400 text-sm">
                     {isSignup ? 'Already have an Account?' : "Don't have a Productr Account"} <span className="text-transparent">.</span>
                     <button
                        onClick={() => {
                           setIsSignup(!isSignup);
                           setStep('email');
                           setEmail('');
                           setError('');
                        }}
                        className="text-[#111652] font-bold hover:underline cursor-pointer"
                     >
                        {isSignup ? 'Login Here' : 'SignUp Here'}
                     </button>
                  </p>
               </div>
            )}
         </div>
      </div>
   );
};

export default Login;
