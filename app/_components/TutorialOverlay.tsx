'use client';
import React, { useState } from 'react';

interface TutorialOverlayProps {}

const TutorialOverlay: React.FC<TutorialOverlayProps> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true); // Initially visible

  const handleClose = () => {
    setIsVisible(false); // Hide overlay on close button click
  };

  const handleSkip = () => {
    setIsVisible(false); // Hide overlay on skip button click
  };

  return (
    isVisible && (
      <div className="tutorial-overlay absolute h-screen w-full bg-black/55 z-99">
        <div className="overlay-content">
          <h2>Welcome to Health Guide!</h2>
          <p>This is a brief tutorial to get you started.</p>
          <div className="button-container">
            <button className="continue-btn" onClick={handleClose}>
              Continue
            </button>
            <button className="skip-btn" onClick={handleSkip}>
              Skip
            </button>
          </div>
        </div>
        <div className="highlight">
          {' '}
          {/* Placeholder for login highlight */}
        </div>
      </div>
    )
  );
};

export default TutorialOverlay;
