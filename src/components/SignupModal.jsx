import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!agreeToTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    console.log('Signup data:', signupData);
    // Handle signup logic here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md mx-4 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-white text-2xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-400">Join us for premium grooming services</p>
        </div>

        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="Sajilo"
                value={signupData.firstName}
                onChange={(e) => setSignupData({...signupData, firstName: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Sewa"
                value={signupData.lastName}
                onChange={(e) => setSignupData({...signupData, lastName: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="sajilosewa@gmail.com"
              value={signupData.email}
              onChange={(e) => setSignupData({...signupData, email: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+977 9841000000"
              value={signupData.phone}
              onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={signupData.password}
                onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-4 h-4 bg-gray-700 border border-gray-600 rounded focus:ring-orange-500 focus:ring-2 mt-1"
              required
            />
            <span className="text-white text-sm">
              I agree to the{' '}
              <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="text-orange-500 hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
            </span>
          </div>

          {/* Create Account Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Create Account
          </button>

          {/* Sign In Link */}
          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-orange-500 hover:text-orange-400 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;