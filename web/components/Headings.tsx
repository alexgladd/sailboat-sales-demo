import React from 'react';

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
}

export const H2: React.FC<HeadingProps> = ({ children, className = ''}) => (
  <h2 className={`mb-2 text-2xl lg:text-3xl text-yellow-900 font-bold tracking-wide ${className}`}>
    { children }
  </h2>
)
