import { useState} from "react";
import { useHistory } from "react-router-dom";
import { IonImg, IonContent, IonItem, IonInput, IonButton, IonText, IonRow, IonCol } from '@ionic/react';
import './TwoStepVerification.css';
import axios from "axios";
import Cookies from 'universal-cookie';


interface VerificationProps { 
  onBack: () => void;
  onVerifySuccess: () => void;
}

const TwoStepVerification: React.FC<VerificationProps> = ({ onBack, onVerifySuccess }) => {
 const cookies = new Cookies();
  const history = useHistory(); // ✅ Initialize history object
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const correctCode = "0000";
  const get_verifycode = sessionStorage.getItem('verify_code');
  const new_verifycode = get_verifycode?get_verifycode:cookies.get('verify_code');

  const handleVerify = () => {
    
    const loginData = {
      code: new_verifycode,
    
    };
    const account_type = sessionStorage.getItem('account_type');
    const account =account_type?account_type:cookies.get('account_type');
    const api = axios.create({
      baseURL: 'https://'+account+'.diatrac.in/', 
      });
    
    api.post("/checkAccount.php?act=verifyUser", loginData)
      .then((res) => {
        if(res.data!='Invalid'){
        //history.push("/dashboard/" + email);
        setError(""); // Clear error
      
      sessionStorage.setItem('login_id', '1');
      cookies.set('login_id',1, { path: '/' });
      history.push("/dashboard");
      }
      else{
        setError("Auth failure! Wrong Veification Code");
      //setIserror(true);
    }
      })
      .catch((error) => {
        setError("Auth failure! Wrong Veification Code");
        //setError(true);
      });



    

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

          {/* Verification Input */}
          <IonItem className="no-padding-item">
            <IonInput label="Your Verification Code" labelPlacement="floating" fill="solid" placeholder="Enter your code" type="number" onIonChange={(e) => setCode(e.detail.value!)} required />
          </IonItem>

          {error && <IonText color="danger" className="error-text">{error}</IonText>}

          <IonRow>
            <IonCol><IonButton expand="full" fill="clear" onClick={onBack} className="button-grad-grey ion-margin-top" style={{ "--ion-margin": "10px" }}> Go Back </IonButton></IonCol>
            <IonCol><IonButton expand="full" onClick={handleVerify} className="button-grad ion-margin-top" style={{ "--ion-margin": "10px" }}> Verify </IonButton></IonCol>            
          </IonRow>
          
        </div>
      </IonContent>
      
    </div>
  );
};

export default TwoStepVerification;
