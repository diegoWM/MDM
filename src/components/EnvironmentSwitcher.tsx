import React from 'react';
import { ChevronDown } from 'lucide-react';

interface EnvironmentSwitcherProps {
  currentEnvironment: 'production' | 'staging';
  onEnvironmentChange: (env: 'production' | 'staging') => void;
}

const EnvironmentSwitcher: React.FC<EnvironmentSwitcherProps> = ({ 
  currentEnvironment, 
  onEnvironmentChange 
}) => {
  return (
    <div className="relative">
      <select
        value={currentEnvironment}
        onChange={(e) => onEnvironmentChange(e.target.value as 'production' | 'staging')}
        className={`appearance-none px-3 py-2 pr-8 rounded-lg font-medium text-sm border transition-colors duration-200 ${
          currentEnvironment === 'production'
            ? 'bg-red-600 hover:bg-red-700 text-white border-red-500'
            : 'bg-green-600 hover:bg-green-700 text-white border-green-500'
        }`}
      >
        <option value="staging">Staging</option>
        <option value="production">Production</option>
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
    </div>
  );
};

export default EnvironmentSwitcher;