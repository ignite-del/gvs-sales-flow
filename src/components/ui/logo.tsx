
import React from 'react';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

const Logo = ({ size = 'md', variant = 'full', className }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const subTextSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  if (variant === 'icon') {
    return (
      <div className={cn("p-2 bg-blue-600 rounded-lg", className)}>
        <Building2 className={cn(sizeClasses[size], "text-white")} />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={cn("", className)}>
        <h1 className={cn(textSizeClasses[size], "font-bold text-gray-900")}>GVS</h1>
        <p className={cn(subTextSizeClasses[size], "text-gray-600")}>Sales Platform</p>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div className="p-2 bg-blue-600 rounded-lg">
        <Building2 className={cn(sizeClasses[size], "text-white")} />
      </div>
      <div>
        <h1 className={cn(textSizeClasses[size], "font-bold text-gray-900")}>GVS</h1>
        <p className={cn(subTextSizeClasses[size], "text-gray-600")}>Sales Platform</p>
      </div>
    </div>
  );
};

export default Logo;
