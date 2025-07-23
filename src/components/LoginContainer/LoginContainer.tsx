import { useState} from "react";
import { IonImg, IonContent, IonItem, IonInput, IonButton, IonText, IonIcon } from '@ionic/react';
import './LoginContainer.css';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import { Storage } from '@ionic/storage';
import { eye, eyeOff } from 'ionicons/icons';
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
  //const correctEmail = "saurabh";
  //const correctPassword = "12345";
const [showPassword, setShowPassword] = useState(false);
  //const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {   
    const cookies = new Cookies();
    const account_type = sessionStorage.getItem('account_type');
    const stoSessionId = sessionStorage.getItem('login_id');
    const storedSessionId =stoSessionId?stoSessionId:cookies.get('login_id');
    const account =account_type?account_type:cookies.get('account_type');
    const newemail=email?email:document.getElementById('email').value;
    const newpass=password?password:document.getElementById('pass').value;
    const loginData = {
      email: newemail,
      password: newpass,
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
        setError("Auth failure! Wrong email or password1");
      //setIserror(true);
    }
      })
      .catch((error) => {
        setError("Auth failure! Please create an account2");
        //setError(true);
      });

     
      
  };

    



  return (
    


    <div id="access-container">

      <div className="logo-client-container">
        <IonImg src="/src/assets/images/client_logo.svg" alt="Client Logo" className="logo-client" />
      </div>

      <h1 className="login-heading">Access Your Account</h1>

      {/*<IonContent scrollY={false} className="no-scroll login-content" style={{ "--background": "transparent", "--overflow": "visible" }}> */}
        <div className="login-wrap">
          {/* Email Input */}
          <IonItem className="no-padding-item">
            <IonInput label="E-mail" id="email" labelPlacement="floating" fill="solid" placeholder="Enter your e-mail" type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
          </IonItem>

          {/* Password Input */}
          <IonItem className="no-padding-item">
            <IonInput label="Password" id="pass" labelPlacement="floating" fill="solid" placeholder="Enter your password" type={showPassword ? 'text' : 'password'} value={password} onIonChange={(e) => setPassword(e.detail.value!)} required />
          <IonButton fill="clear" onClick={togglePasswordVisibility}>
        <IonIcon icon={showPassword ? eyeOff : eye} />
      </IonButton>
          </IonItem>

          {error && <IonText color="danger" className="error-text">{error}</IonText>}

          {/* Sign In Button */}
          <IonButton expand="full" className="button-grad ion-margin-top" onClick={handleSignIn} style={{ "--ion-margin": "25px" }}>
            Sign In
          </IonButton>
        </div>
      {/* </IonContent> */}
      
    </div>
  );
};

export default LoginContainer;
