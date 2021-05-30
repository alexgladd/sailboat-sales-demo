import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  primary?: boolean;
  link?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function Button({primary = false, link = false, className = '', href, onClick, children}: ButtonProps) {
  const defaultClasses = `py-2 px-4 tracking-wide rounded border-2 border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 shadow transform transition-button hover:shadow-md hover:scale-105 ${primary ? 'bg-yellow-500 text-white font-bold' : 'bg-yellow-50 text-yellow-900'}`;
  
  if (link) {
    return (
      <Link href={href}>
        <a className={`${defaultClasses} ${className}`}>
          {children}
        </a>
      </Link>
    );
  } else {
    return (
      <button type="button" onClick={onClick} className={`${defaultClasses} ${className}`}>
        {children}
      </button>
    );
  }
}
