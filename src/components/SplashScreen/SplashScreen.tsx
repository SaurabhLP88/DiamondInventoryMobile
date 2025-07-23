import React, { useEffect } from 'react';
import { IonImg, IonText, IonSpinner } from '@ionic/react';
import './SplashScreen.css';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // Show splash for 2 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
        <IonImg src="assets/images/diatrac_logo.svg" alt="Diatrac" className="splash-logo" />
        <IonSpinner name="crescent" className="splash-spinner" />
    </div>
  );
};

export default SplashScreen;
