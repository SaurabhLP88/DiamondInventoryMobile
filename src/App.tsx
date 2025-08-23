import React, { useState, useEffect  } from "react";

import { Route } from 'react-router-dom'; //Redirect
import { IonApp, setupIonicReact, IonRouterOutlet } from '@ionic/react'; //, IonContent, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel

import { IonReactRouter } from '@ionic/react-router';
import { Preferences } from "@capacitor/preferences";

// import { Capacitor } from "@capacitor/core";
// import { Keyboard } from "@capacitor/keyboard";

import SplashScreen from './components/SplashScreen/SplashScreen';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import DiamondEntry from './pages/Diamond/DiamondEntry/DiamondEntry';
import DiamondSearch from './pages/Diamond/DiamondSearch/DiamondSearch';
import JewelEntry from './pages/Jewel/JewelEntry/JewelEntry';
import JewelSearch from './pages/Jewel/JewelSearch/JewelSearch';
import GemEntry from './pages/Gem/GemEntry/GemEntry';
import GemSearch from './pages/Gem/GemSearch/GemSearch';
import WatchEntry from './pages/Watch/WatchEntry/WatchEntry';
import WatchSearch from './pages/Watch/WatchSearch/WatchSearch';

//import Cookies from 'universal-cookie';
//import { CategoryProvider } from './data/categoriesData';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
//import { JSX } from "react/jsx-runtime";


setupIonicReact();



const App: React.FC = () => { 

  //const path = window.location.pathname;
  const [showSplash, setShowSplash] = useState(true);

  /*if (Capacitor.getPlatform() !== "web") {
    Keyboard.setScroll({ isDisabled: false });
  }*/
  
  //React Functional Component
  /*const [, setIsLoggedIn] = React.useState(false);
  const cookies = new Cookies();
  //const storedLoginStatusNew1 = sessionStorage.getItem('login_id');
    //const storedLoginStatus1 = storedLoginStatusNew1?storedLoginStatusNew1:cookies.get('login_id');*/
  useEffect(() => {
    /*const storedLoginStatusNew = sessionStorage.getItem('login_id');
    const storedLoginStatus = storedLoginStatusNew?storedLoginStatusNew:cookies.get('login_id');
    if (storedLoginStatus === '1') {
      setIsLoggedIn(true);
    }*/
    Preferences.set({ key: "darkMode", value: "false" }).then(() => {
      console.log("Dark mode preference saved!");
    });
    
  }, []);
  

  return (
    <IonApp>

      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (             

        <IonReactRouter>
          <IonRouterOutlet>

          {/*<Route exact path="/">
            {storedLoginStatus1 ? <Redirect to="/dashboard" /> : ''  }
          </Route>         

          <Route exact path="/">
            {storedLoginStatus1 ? '' : <Route path="/" exact component={Login} />  }
          </Route>
          */}

          <Route path="/" exact 
          component={() => {
        console.log("Login route triggered");
        return <Login />;
      }}  />  
          {/*<Redirect exact from="*" to="/" />*/}

          <Route path="/dashboard" component={Dashboard} />
          
          <Route path="/diamondEntry" component={DiamondEntry} />
          <Route path="/diamondSearch" component={DiamondSearch} />
          
          <Route path="/jewelEntry" component={JewelEntry} />
          <Route path="/jewelSearch" component={JewelSearch} />

          <Route path="/gemEntry" component={GemEntry} />
          <Route path="/gemSearch" component={GemSearch} />

          <Route path="/watchEntry" component={WatchEntry} />
          <Route path="/watchSearch" component={WatchSearch} />

          </IonRouterOutlet>

        </IonReactRouter>

      )}
    </IonApp>
  );
  
};

export default App;
