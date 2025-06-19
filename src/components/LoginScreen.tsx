import React, { useState } from 'react';
import { Shield, AlertTriangle, Chrome } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setError(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 flex items-center justify-center relative"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/1466335/pexels-photo-1466335.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/85 backdrop-blur-sm"></div>
      
      {/* Login content */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-2xl mb-6 mx-auto">
              <div className="text-white text-3xl font-bold">🌿</div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">WeedMe MDM</h1>
            <p className="text-green-400 text-lg font-medium mb-4">Master Data Management</p>
            
            {/* Admin Access Notice */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-amber-400 mb-2">
                <Shield className="h-5 w-5" />
                <span className="font-semibold">Admin Access Required</span>
              </div>
              <p className="text-amber-300 text-sm">
                This system requires administrator privileges. Please sign in with your authorized Google account.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 text-red-400 mb-1">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Access Denied</span>
              </div>
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            ) : (
              <Chrome className="h-5 w-5" />
            )}
            <span>
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </span>
          </button>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              Secure authentication powered by Google
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Only authorized administrators can access this system
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;