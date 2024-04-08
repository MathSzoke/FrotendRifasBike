import React from 'react';
import './LoadingSpinner.css'

export function LoadingSpinner({size})
{
    return (
      <div className="text-center">
        <div className="spinner-border" style={{ height: `${size}rem`, width: `${size}rem` }} role="status"></div>
      </div>
    );
}