import React, { useEffect } from 'react';
import { IonImg, IonSpinner } from '@ionic/react'; //IonText,
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
        <IonImg src="./src/assets/images/calcdiamond-01.svg" alt="CalcDiamond" className="splash-logo" />
        <IonSpinner name="crescent" className="splash-spinner" />
    </div>
  );
};

export default SplashScreen;
