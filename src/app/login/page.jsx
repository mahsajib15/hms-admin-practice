'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/components/pages/store/authStore";
import { setTokens } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaRegEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simulate API call for login
    if (email === 'superadmin@superadmin.com' && password === 'password') {
      const accessToken = 'simulated_access_token';
      const refreshToken = 'simulated_refresh_token';
      setTokens(accessToken, refreshToken);
      login(accessToken, refreshToken);
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column */}
      <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-600 mt-4">Organization Management System</h1>
          <p className="mt-4 text-gray-700 max-w-md">
            Welcome to Mohajon, your ultimate solution for comprehensive organizational management. Designed to adapt to a wide range of needs, Mohajon simplifies complex workflows, enhances efficiency, and ensures seamless operations. Whether managing resources, optimizing processes, or delivering exceptional services, Mohajon empowers your organization with tools tailored to drive success in any any environment.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email">Email / Phone</Label>
              <div className="relative mt-1">
                <FaRegEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="email"
                  id="email"
                  placeholder="superadmin@superadmin.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
              Log In
            </Button>
          </form>
          <div className="text-center text-sm text-gray-500 mt-6">
            <p>Powered by mohajon.app</p>
            <p>&copy; mohajon.app | Mohajon</p>
          </div>
        </div>
      </div>
    </div>
  );
}