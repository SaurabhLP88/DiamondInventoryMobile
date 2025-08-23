import { useState} from "react";
import { IonContent, IonFooter, IonPage, IonRouterLink, IonToolbar, IonImg, IonText} from '@ionic/react'; //IonIcon
import LoginContainer from "../../components/LoginContainer/LoginContainer";
import TwoStepVerification from "../../components/TwoStepVerification/TwoStepVerification";
import HomeContainer from "../../components/LoginContainer/HomeContainer";
import './Login.css';
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
 
  const [step, setStep] = useState<"home" | "login" | "verify">("home");
  const history = useHistory();

  return (
    <IonPage>
      
      <IonContent scrollY={false} className="no-scroll bg-gradient">

        <div className="ion-padding">
          {/* Logo */}
          <div className="logo-container">
            <IonImg src="./src/assets/images/calcdiamond-01.svg" alt="CalcDiamond" className="logo" />
          </div>

          {/* Welcome Text */}
          <IonText className="welcome-text">
            <h1>Welcome To CalcDiamond</h1>
          </IonText>
        </div>
       
       
        <div id="login-container" className="loginContain ion-padding">
            {step === "home" && (
              <HomeContainer onAccountSuccess={() => setStep("login")} /> 
            )}

            {step === "login" && (
              <LoginContainer onBack={() => setStep("home")}  onLoginSuccess={() => setStep("verify")} />
            )}

            {step === "verify" && (
              <TwoStepVerification onBack={() => setStep("login")} onVerifySuccess={() => history.push("/dashboard")}
              />
            )}


            {/*
            {!showVerification ? (
              
              <>
                <LoginContainer onLoginSuccess={() => setShowVerification(true)} /> 
              </>
            ) : (
              <>
                <TwoStepVerification onBack={() => setShowVerification(false)} onVerifySuccess={() => setDashboardVisible(true)}  />
              </>
            )}
              */}


      </div>

      </IonContent>

      <IonFooter className="ion-no-border">
        <IonToolbar className="footer-toolbar">
        <p>
          By using CalcDiamond, you agree to the  <IonRouterLink className="custom-link1" routerLink="/terms">Terms</IonRouterLink> and <IonRouterLink className="custom-link1" routerLink="/privacy-policy">Privacy Policy</IonRouterLink>.
        </p>
        </IonToolbar>
      </IonFooter>

    </IonPage>
  );
};

export default Login;
