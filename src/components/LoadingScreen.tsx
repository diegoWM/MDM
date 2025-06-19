import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC<{ onLoadingComplete: () => void }> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const cannabisImages = [
    'https://images.pexels.com/photos/1466335/pexels-photo-1466335.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/1466336/pexels-photo-1466336.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    'https://images.pexels.com/photos/7667726/pexels-photo-7667726.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Change background image every 1 second
    const imageInterval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % cannabisImages.length);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(imageInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div 
      className="fixed inset-0 bg-gray-900 flex items-center justify-center transition-all duration-1000 z-50"
      style={{
        backgroundImage: `url('${cannabisImages[currentImage]}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm"></div>
      
      {/* Loading content */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl shadow-2xl mb-6 mx-auto">
            <div className="text-white text-4xl font-bold">🌿</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">WeedMe MDM</h1>
          <p className="text-green-400 text-lg font-medium">Master Data Management</p>
        </div>

        {/* Loading bar */}
        <div className="w-80 mx-auto">
          <div className="bg-gray-700/50 rounded-full h-2 mb-4 backdrop-blur-sm border border-gray-600">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300 ease-out shadow-lg shadow-green-500/30"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-gray-300 text-sm">
            Loading cannabis data management platform... {progress}%
          </p>
        </div>

        {/* Floating cannabis leaves animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400/20 text-2xl animate-bounce"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + i * 0.3}s`
              }}
            >
              🌿
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;