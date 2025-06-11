import React, { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', loginData);
    // Handle login logic here
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Handle social login logic here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-white text-2xl font-bold">Sajilo</span>
            <div className="text-orange-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L8 8h8l-4-6zm0 20l4-6H8l4 6z"/>
              </svg>
            </div>
            <span className="text-white text-2xl font-bold">Sewa</span>
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
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
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 bg-gray-700 border border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="text-white text-sm">Remember me</span>
            </label>
            <a href="#" className="text-orange-500 text-sm hover:text-orange-400 transition-colors">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-orange-500 hover:text-orange-400 transition-colors"
            >
              Sign up
            </button>
          </p>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-colors"
            >
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;