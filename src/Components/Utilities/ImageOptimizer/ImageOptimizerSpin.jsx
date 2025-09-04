import React from 'react';
import { Zap } from 'lucide-react';

const ImageOptimizerSpin = ({ caption }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight:'100vh',
    backgroundColor:'var(--primary-background)'
};

  const spinStyle = {
    border: '2px solid var(--button-color)',
    borderTop: '2px solid transparent',
    borderRadius: '50%',
    width: '1.5rem',
    height: '1.5rem',
    padding:'5px',
    animation: 'smooth-spin 1.5s cubic-bezier(0.65, 0.05, 0.36, 1) infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0 15px var(--shadow)',
  };

  const captionStyle = {
    marginTop: '1rem',
    color: 'var(--primary-color)',
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  };

  const zapIconStyle = {
    transform: 'rotate(0deg)',
    transition: 'transform 0.5s ease-in-out',
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @keyframes smooth-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={spinStyle} className="spin-box">
        <Zap size={28} color="var(--button-color)" style={zapIconStyle} />
      </div>
      <div style={captionStyle} className="reload-caption">{caption || "Loading ..."}</div>
    </div>
  );
};

export default ImageOptimizerSpin;
