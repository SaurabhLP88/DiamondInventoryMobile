import { useState} from "react";
import { IonContent, IonFooter, IonPage, IonRouterLink, IonToolbar, IonImg, IonText, IonIcon } from '@ionic/react';
import LoginContainer from "../../components/LoginContainer/LoginContainer";
import TwoStepVerification from "../../components/TwoStepVerification/TwoStepVerification";
import './Login.css';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

const Login: React.FC = () => {
  const cookies = new Cookies();
  const [showVerification, setShowVerification] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  
  const storedSessionId = sessionStorage.getItem('login_id');
  const newstoreid=storedSessionId?storedSessionId:cookies.get('login_id');
  const verify_code = sessionStorage.getItem('verify_code');
  const new_verificode=verify_code?verify_code:cookies.get('verify_code');
  //alert(verify_code);
const history = useHistory(); 



  return (
    <IonPage>
      
      <IonContent scrollY={false} className="no-scroll bg-gradient">

        <div className="ion-padding">
          {/* Logo */}
          <div className="logo-container">
            <IonImg src="assets/images/diatrac_logo.svg" alt="Diatrac" className="logo" />
          </div>

          {/* Welcome Text */}
          <IonText className="welcome-text">
            <h1>Welcome To DiaTrac Solutions</h1>
          </IonText>
        </div>
       
       
                <div id="login-container" className="ion-padding">


                    {!new_verificode ? (
                      
                      <>
                        <LoginContainer onLoginSuccess={() => setShowVerification(true)} />
                      </>
                    ) : (
                      <>
                        <TwoStepVerification onBack={() => setShowVerification(false)} onVerifySuccess={() => setDashboardVisible(true)}  />
                      </>
                    )}







</div>

      </IonContent>

      <IonFooter className="ion-no-border">
        <IonToolbar className="footer-toolbar">
        <p>
          By using DiaTrac Solutions, you agree to the  <IonRouterLink className="custom-link1" routerLink="/terms">Terms</IonRouterLink> and <IonRouterLink className="custom-link1" routerLink="/privacy-policy">Privacy Policy</IonRouterLink>.
        </p>
        </IonToolbar>
      </IonFooter>

    </IonPage>
  );
};

export default Login;
