import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { IonImg, IonContent, IonItem, IonInput, IonButton, IonText, IonRow, IonCol } from '@ionic/react';
import './TwoStepVerification.css';


interface VerificationProps { 
  onBack: () => void;
  onVerifySuccess: () => void;
}

const TwoStepVerification: React.FC<VerificationProps> = ({ onBack, onVerifySuccess }) => {

  const [error, setError] = useState("");
  const correctCode = "0000";

  const codeRef = useRef<HTMLIonInputElement>(null);

  const handleVerify = (e: React.FormEvent) => {

    e.preventDefault(); // prevent page reload

    const code = codeRef.current?.value?.toString().trim();

    if (code === correctCode) {
      setError("");
      onVerifySuccess();
    } else {
      setError("Invalid veriffication code !!!");
    }
  };

  return (
    <div id="access-container">

      <div className="logo-client-container">
        <IonImg src="/src/assets/images/client_logo.svg" alt="Client Logo" className="logo-client" />
      </div>

      <h1 className="login-heading"> Two-Step Verification</h1>
      <p className="login-sub-heading"> Check your email for verification code.</p>

      <IonContent scrollY={false} className="no-scroll verify-content" style={{ "--background": "transparent", "--overflow": "visible" }}>
        <div className="login-wrap">

          <form onSubmit={handleVerify}>

          {/* Verification Input */}
          <IonItem className="no-padding-item">
            <IonInput label="Your Verification Code" labelPlacement="floating" fill="solid" placeholder="Enter your code" type="number" value={correctCode} ref={codeRef} required />
          </IonItem>

          {error && <IonText color="danger" className="error-text">{error}</IonText>}

          <IonRow>
            <IonCol><IonButton expand="full" fill="clear" onClick={onBack} className="button-grad-grey ion-margin-top" style={{ "--ion-margin": "10px" }}> Go Back </IonButton></IonCol>
            <IonCol><IonButton type="submit" expand="full" className="button-grad ion-margin-top" style={{ "--ion-margin": "10px" }}> Verify </IonButton></IonCol>            
          </IonRow>

          </form>
          
        </div>
      </IonContent>
      
    </div>
  );
};

export default TwoStepVerification;
