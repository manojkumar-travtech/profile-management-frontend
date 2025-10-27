import React from 'react';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

export interface AddressBlockProps {
  type: string;
  address: string | null;
  badge?: string;
  icon?: LucideIcon;
}

export const AddressBlock: React.FC<AddressBlockProps> = ({
  type,
  address,
  badge,
  icon: Icon
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-500 flex items-center gap-1">
          {Icon && <Icon className="w-3 h-3" />}
          {type}
        </p>
        {badge && (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
            {badge}
          </Badge>
        )}
      </div>
      <p className={`text-sm font-medium ${address ? 'text-gray-900' : 'text-gray-400'}`}>
        {address || 'Not Set'}
      </p>
    </div>
  );
};