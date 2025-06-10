import type { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary ${className}`}
      {...props}
    />
  );
}
