import React, { useEffect } from 'react';
import { IonImg, IonSpinner } from '@ionic/react'; //IonText,
import './SplashScreen.css';
import logo from "@/assets/images/calcdiamond-01.svg";

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000); // Show splash for 2 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
        <IonImg src={logo} alt="CalcDiamond" className="splash-logo" />
        <IonSpinner name="crescent" className="splash-spinner" />
    </div>
  );
};

export default SplashScreen;
