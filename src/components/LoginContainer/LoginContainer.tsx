import { useState, useRef } from "react";
import { IonImg,  IonItem, IonInput, IonButton, IonText, IonIcon } from '@ionic/react'; //IonContent,
import './LoginContainer.css';
//import { useHistory } from "react-router-dom";
import { eye, eyeOff } from 'ionicons/icons';
// 

interface ContainerProps { 
  onLoginSuccess: () => void;
  onBack: () => void;
}

const LoginContainer: React.FC<ContainerProps> = ({ onLoginSuccess, onBack }) => {

  /*const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");*/
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  //const [password, setPassword] = useState('');

  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const correctEmail = "test@test.com";
  const correctPassword = "12345";

  const handleSignIn = (e: React.FormEvent) => {

    e.preventDefault();

    const email = emailRef.current?.value?.toString().trim();
    const password = passwordRef.current?.value?.toString().trim();

    if (email === correctEmail && password === correctPassword) {
      setError(""); // Clear error
      onLoginSuccess(); // Navigate to verification or home

      //console.log("Email:", email);
      //console.log("Password:", password);
      //alert(`Signing in with:\nEmail: ${email}\nPassword: ${password}`);
    } else {
      setError("Invalid email or password!");
    }
  };

  return (

    <div id="access-container">

      <div className="logo-client-container">
        <IonImg src="/src/assets/images/client_logo.svg" alt="Client Logo" className="logo-client" />
      </div>

      <h1 className="login-heading">Access Your Account</h1>
      
      <form onSubmit={handleSignIn}>
      {/*<IonContent scrollY={false} className="no-scroll login-content" style={{ "--background": "transparent", "--overflow": "visible" }}> */}
        <div className="login-wrap">
          {/* Email Input */}
          <IonItem className="no-padding-item">
            <IonInput label="E-mail" id="email" labelPlacement="floating" fill="solid" placeholder="Enter your e-mail" type="email" value={correctEmail} ref={emailRef} required />
          </IonItem>

          {/* Password Input */}
          <IonItem className="no-padding-item">
            <IonInput label="Password" id="pass" labelPlacement="floating" fill="solid" placeholder="Enter your password" type={showPassword ? 'text' : 'password'} value={correctPassword} ref={passwordRef} required />
          <IonButton fill="clear" onClick={togglePasswordVisibility}>
        <IonIcon icon={showPassword ? eyeOff : eye} />
      </IonButton>
          </IonItem>

          {error && <IonText color="danger" className="error-text">{error}</IonText>}

          {/* Sign In Button */}
          <IonButton type="submit" expand="full" className="button-grad ion-margin-top" style={{ "--ion-margin": "25px" }}> {/* onClick={handleSignIn} */}
            Sign In
          </IonButton>

          <IonButton expand="full" className="button-grad-grey ion-margin-top" onClick={onBack} style={{ "--ion-margin": "25px" }}>
            Back
          </IonButton>
        </div>
      {/* </IonContent> */}
      </form>
      
    </div>
  );
};

export default LoginContainer;
