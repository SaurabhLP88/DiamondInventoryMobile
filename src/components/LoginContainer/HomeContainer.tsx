import {  useState, useRef} from "react"; 
import {  IonItem, IonInput, IonButton, IonText } from '@ionic/react'; //IonImg, IonContent,
import './LoginContainer.css';

interface ContainerProps { 
  onAccountSuccess: () => void;
}

const HomeContainer: React.FC<ContainerProps> = ({ onAccountSuccess }) => {

  // const [accountName, setAccountName] = useState("");  
  const [error, setError] = useState("");
  const correctAccount = "ftp";

  const inputRef = useRef<HTMLIonInputElement>(null);
 
  const handleAccount = (e: React.FormEvent) => {   
    e.preventDefault(); // prevent page reload

    const enteredName = inputRef.current?.value?.toString().trim().toLowerCase();

    if (enteredName === correctAccount) {
      setError("");
      onAccountSuccess();
    } else {
      setError("Invalid account name !!!");
    }               
  };


  return (
    <div id="access-container">

      <h1 className="login-heading">Access Your Account</h1>

      <form onSubmit={handleAccount}>

      {/* <IonContent fullscreen className="no-scroll login-content">*/}
        <div className="login-wrap">
          {/* Email Input */}
          <IonItem className="no-padding-item">
            <IonInput label="Account Name" labelPlacement="floating" fill="solid" placeholder="Enter your Account Name" type="text" value={correctAccount} ref={inputRef} required />
          </IonItem>

          
          {error && <IonText color="danger" className="error-text">{error}</IonText>}

          {/* Sign In Button */}
          <IonButton type="submit" expand="full" className="button-grad ion-margin-top" style={{ "--ion-margin": "25px" }}> {/* onClick={handleAccount} */}
            Submit
          </IonButton>
        </div>
      {/* </IonContent>*/}

      </form>
      
    </div>
  );
};

export default HomeContainer;
