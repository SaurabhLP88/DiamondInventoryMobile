import { useState} from "react";
import { IonImg, IonContent, IonItem, IonInput, IonButton, IonText } from '@ionic/react';
import './LoginContainer.css';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

// 

interface ContainerProps { 
  onLoginSuccess: () => void;
}

const LoginContainer: React.FC<ContainerProps> = ({ onLoginSuccess }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  // Hardcoded credentials
  const correctEmail = "saurabh";
  const correctPassword = "12345";

  const handleSignIn = () => {   
    const cookies = new Cookies();
    const account_type = sessionStorage.getItem('account_type');
    const stoSessionId = sessionStorage.getItem('login_id');
    const storedSessionId =stoSessionId?stoSessionId:cookies.get('login_id');
    const account =account_type?account_type:cookies.get('account_type');
    const loginData = {
      email: email,
      password: password,
    };
    
    const api = axios.create({
      baseURL: 'https://'+account+'.diatrac.in/', 
      });
    
    api.post("/checkAccount.php?act=loginwith2f", loginData)
      .then((res) => {
        if(res.data!='Invalid'){
        //history.push("/dashboard/" + email);
        setError(""); // Clear error
      onLoginSuccess();
      sessionStorage.setItem('verify_code', res.data);
      cookies.set('verify_code',res.data, { path: '/' });
     history.push("/Login/");
      }
      else{
        setError("Auth failure! Wrong email or password");
      //setIserror(true);
    }
      })
      .catch((error) => {
        setError("Auth failure! Please create an account");
        //setError(true);
      });

     
      
  };

    



  return (
    


    <div id="access-container">

      <div className="logo-client-container">
        <IonImg src="/src/assets/images/client_logo.svg" alt="Client Logo" className="logo-client" />
      </div>

      <h1 className="login-heading">Access Your Account</h1>

      <IonContent scrollY={false} className="no-scroll login-content" style={{ "--background": "transparent", "--overflow": "visible" }}>
        <div className="login-wrap">
          {/* Email Input */}
          <IonItem className="no-padding-item">
            <IonInput label="E-mail" labelPlacement="floating" fill="solid" placeholder="Enter your e-mail" type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
          </IonItem>

          {/* Password Input */}
          <IonItem className="no-padding-item">
            <IonInput label="Password" labelPlacement="floating" fill="solid" placeholder="Enter your password" type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required />
          </IonItem>

          {error && <IonText color="danger" className="error-text">{error}</IonText>}

          {/* Sign In Button */}
          <IonButton expand="full" className="button-grad ion-margin-top" onClick={handleSignIn} style={{ "--ion-margin": "40px" }}>
            Sign In
          </IonButton>
        </div>
      </IonContent>
      
    </div>
  );
};

export default LoginContainer;
