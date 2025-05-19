import { useEffect } from "react";
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Preferences } from "@capacitor/preferences";

import Login from './pages/Login/Login';
import Home from './pages/Login/home';
import Dashboard from './pages/Dashboard/Dashboard';
import DiamondEntry from "./pages/Diamond/DiamondEntry/DiamondEntry";
import DiamondSearch from './pages/Diamond/DiamondSearch/DiamondSearch';
import JewelEntry from "./pages/Jewel/JewelEntry/JewelEntry";
import JewelSearch from './pages/Jewel/JewelSearch/JewelSearch';
import Cookies from 'universal-cookie';

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
import React from "react";

setupIonicReact();

const App: React.FC = () => { //React Functional Component
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const cookies = new Cookies();
  const storedLoginStatusNew1 = sessionStorage.getItem('login_id');
    const storedLoginStatus1 = storedLoginStatusNew1?storedLoginStatusNew1:cookies.get('login_id');
  useEffect(() => {
    const storedLoginStatusNew = sessionStorage.getItem('login_id');
    const storedLoginStatus = storedLoginStatusNew?storedLoginStatusNew:cookies.get('login_id');
    if (storedLoginStatus === '1') {
      setIsLoggedIn(true);
    }
    Preferences.set({ key: "darkMode", value: "false" }).then(() => {
      console.log("Dark mode preference saved!");
    });
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

        <Route exact path="/">
        {storedLoginStatus1 ? <Redirect to="/dashboard" /> : <Route path="/" exact component={Home} />  }
      </Route>
        {/* <Route path="/" exact component={Home} /> */}
            <Route path="/login" exact component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            
            <Route path="/diamondEntry" component={DiamondEntry} />
            <Route path="/diamondSearch" component={DiamondSearch} />
            
            <Route path="/jewelEntry" component={JewelEntry} />
            <Route path="/jewelSearch" component={JewelSearch} />

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
  
};

export default App;
