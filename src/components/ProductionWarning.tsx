import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ProductionWarningProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ProductionWarning: React.FC<ProductionWarningProps> = ({ onConfirm, onCancel }) => {
  const [countdown, setCountdown] = useState(5);
  const [canProceed, setCanProceed] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanProceed(true);
    }
  }, [countdown]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 border-2 border-red-500 rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Animated Warning Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500/20 animate-pulse"></div>
          <div className="relative flex items-center space-x-3">
            <div className="animate-bounce">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">⚠️ PRODUCTION ENVIRONMENT</h2>
              <p className="text-red-100 text-sm">You are about to access live data</p>
            </div>
          </div>
        </div>

        {/* Warning Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h3 className="text-red-400 font-semibold mb-2">⚠️ Critical Warning</h3>
              <ul className="text-red-300 text-sm space-y-1">
                <li>• You are accessing LIVE production data</li>
                <li>• Changes will affect real business operations</li>
                <li>• All actions are logged and monitored</li>
                <li>• Unauthorized changes may result in system issues</li>
              </ul>
            </div>

            <div className="bg-gray-700/50 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Before proceeding, ensure:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>✓ You have proper authorization</li>
                <li>✓ You understand the impact of your actions</li>
                <li>✓ You have tested changes in staging first</li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-all duration-200 font-medium"
            >
              <X className="h-4 w-4 inline mr-2" />
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={!canProceed}
              className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                canProceed
                  ? 'bg-red-600 hover:bg-red-500 text-white'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canProceed ? (
                <>
                  <AlertTriangle className="h-4 w-4 inline mr-2" />
                  Enter Production
                </>
              ) : (
                `Wait ${countdown}s...`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionWarning;