import type { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'px-4 py-2 rounded-md font-medium focus:outline-none focus-visible:ring transition-colors duration-150';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary',
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
