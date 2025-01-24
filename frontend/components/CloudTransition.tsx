/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState } from 'react';
import cloudImagebottom from "@/assets/cloudbottom.png";
import cloudImagetop from "@/assets/cloudtop.png";

interface CloudLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const CloudLink: React.FC<CloudLinkProps> = ({ 
  href, 
  children, 
  onClick, 
  className = '' 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsAnimating(true);
    
    if (onClick) {
      onClick();
    }

    setTimeout(() => {
      setIsAnimating(false);
      window.location.href = href;
    }, 2000);
  };

  return (
    <div className="relative inline-block">
      <a 
        href={href} 
        onClick={handleClick}
        className={`relative z-30 ${className}`}
      >
        {children}
      </a>
      {isAnimating && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <img 
            src={cloudImagetop.src} 
            alt="Top Cloud" 
            className="absolute top-[-50%] left-0 w-full h-auto animate-cloud-top z-50"
          />
          <img 
            src={cloudImagebottom.src} 
            alt="Bottom Cloud" 
            className="absolute bottom-[-50%] left-0 w-full h-auto animate-cloud-bottom z-50"
          />
        </div>
      )}
    </div>
  );
};

export default CloudLink;