import { useState} from "react";
import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonFooter, IonPage, IonRouterLink, IonToolbar, IonImg, IonText } from '@ionic/react';
import HomeContainer from "../../components/LoginContainer/HomeContainer";
import LoginContainer from "../../components/LoginContainer/LoginContainer";
import TwoStepVerification from "../../components/TwoStepVerification/TwoStepVerification";
import Dashboard from '../../pages/Dashboard/Dashboard';
import './Login.css';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const cookies = new Cookies();
  const history = useHistory(); 
  const [showVerification, setShowVerification] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const storedSessionId = sessionStorage.getItem('account_type');
    const newstoredseesionid=storedSessionId?storedSessionId:cookies.get('account_type');
  const login_bool = sessionStorage.getItem('login_id');
  const newlogin_bool=login_bool?login_bool:cookies.get('login_id');
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
            <h1>Welcome To DiaTrac Solutions <br /> <span className="ion-bold-700">{storedSessionId}</span></h1>
          </IonText>
        </div>

        <div id="login-container" className="ion-padding">

          {!newstoredseesionid ? (
            <>
               <HomeContainer onAccountSuccess={() => setShowVerification(true)} />
            </>
          ) : (
            <>
             <LoginContainer onLoginSuccess={() => setShowVerification(true)}  />
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

export default Home;
