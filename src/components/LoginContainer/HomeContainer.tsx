import { SetStateAction, useState} from "react";
import { IonImg, IonContent, IonItem, IonInput, IonButton, IonText } from '@ionic/react';
import './LoginContainer.css';
import axios from "axios";
import Cookies from 'universal-cookie';

interface ContainerProps { 
  onAccountSuccess: () => void;
}

const HomeContainer: React.FC<ContainerProps> = ({ onAccountSuccess }) => {
    const cookies = new Cookies();

  const [account, setAccount] = useState("");
  
  const [error, setError] = useState("");

 
  const handleAccont = () => {   
    
    
    const loginData = {
      account: account,
     
    };
    console.log(account);
   // alert('https://'+account+'.diatrac.in/');
    const api = axios.create({
      baseURL: 'https://'+account+'.diatrac.in/', 
      });
    
    api.post("/checkAccount.php?act=check", loginData)
      .then((res) => {
        if(res.data!='Invalid'){
        //history.push("/dashboard/" + email);
        setError(""); // Clear error
        onAccountSuccess();
        sessionStorage.setItem('account_type', res.data);
        cookies.set('account_type', res.data, { path: '/' });

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

      

      <h1 className="login-heading">Access Your Account</h1>

      {/* <IonContent fullscreen className="no-scroll login-content">*/}
        <div className="login-wrap">
          {/* Email Input */}
          <IonItem className="no-padding-item">
            <IonInput label="Account Name" labelPlacement="floating" fill="solid" placeholder="Enter your Account Name" type="text" value={account} onIonInput={(e: any) => setAccount(e.target.value)}  required />
          </IonItem>

          
          {error && <IonText color="danger" className="error-text">{error}</IonText>}

          {/* Sign In Button */}
          <IonButton expand="full" className="button-grad ion-margin-top" onClick={handleAccont} style={{ "--ion-margin": "25px" }}>
            Submit
          </IonButton>
        </div>
      {/* </IonContent>*/}
      
    </div>
  );
};

export default HomeContainer;
