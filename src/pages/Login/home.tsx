import { useState} from "react";
//import { Redirect, Route } from 'react-router-dom';
import { IonContent, IonFooter, IonPage, IonRouterLink, IonToolbar, IonImg, IonText } from '@ionic/react';
import HomeContainer from "../../components/LoginContainer/HomeContainer";
//import LoginContainer from "../../components/LoginContainer/LoginContainer";
//import TwoStepVerification from "../../components/TwoStepVerification/TwoStepVerification";
//import Dashboard from '../../pages/Dashboard/Dashboard';
import './Login.css';
//import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  //const history = useHistory(); 
  const [showVerification, setShowVerification] = useState(false);
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
            <h1>Welcome To CalcDiamond <br /> <span className="ion-bold-700"></span></h1>
          </IonText>
        </div>

        <div id="login-container" className="ion-padding">
          
          
          {showVerification ? (
            <>
               <HomeContainer onAccountSuccess={() => setShowVerification(true)} /> 
            </>
          ) : (
            <>
             {/*<LoginContainer onLoginSuccess={() => setShowVerification(true)}  />*/}
            </>
          )}
          

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

export default Home;
