import React from 'react';
import { ChevronDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface EnvironmentSwitcherProps {
  currentEnvironment: 'production' | 'staging';
  onEnvironmentChange: (env: 'production' | 'staging') => void;
  userRole: 'admin' | 'user';
  pendingChangesCount?: number;
}

const EnvironmentSwitcher: React.FC<EnvironmentSwitcherProps> = ({ 
  currentEnvironment, 
  onEnvironmentChange,
  userRole,
  pendingChangesCount = 0
}) => {
  // Only admins can switch environments
  if (userRole !== 'admin') {
    return null;
  }

  return (
    <div className="relative">
      <select
        value={currentEnvironment}
        onChange={(e) => onEnvironmentChange(e.target.value as 'production' | 'staging')}
        className={`appearance-none px-4 py-2 pr-10 rounded-md font-medium text-sm border transition-colors duration-200 min-w-[140px] ${
          currentEnvironment === 'production'
            ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-lg'
            : 'bg-green-600 hover:bg-green-700 text-white border-green-500'
        }`}
      >
        <option value="staging">🔧 Staging</option>
        <option value="production">🔴 Production</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
      
      {/* Environment Status Indicator */}
      <div className="absolute -bottom-1 -right-1">
        {currentEnvironment === 'production' ? (
          <div className="w-3 h-3 bg-red-400 rounded-full border-2 border-white animate-pulse" title="Live Environment" />
        ) : (
          <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white" title="Safe Environment" />
        )}
      </div>

      {/* Pending Changes Indicator */}
      {currentEnvironment === 'staging' && pendingChangesCount > 0 && (
        <div className="absolute -top-2 -left-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {pendingChangesCount > 9 ? '9+' : pendingChangesCount}
        </div>
      )}
    </div>
  );
};

export default EnvironmentSwitcher;