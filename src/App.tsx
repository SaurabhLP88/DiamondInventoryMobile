import React, { useState, useEffect } from "react";

import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact, IonContent, IonSplitPane, IonMenu, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Preferences } from "@capacitor/preferences";
import { Keyboard } from '@capacitor/keyboard';

import SplashScreen from './components/SplashScreen/SplashScreen';
import Login from './pages/Login/Login';
import Home from './pages/Login/home';
import Dashboard from './pages/Dashboard/Dashboard';
import DiamondEntry from './pages/Diamond/DiamondEntry/DiamondEntry';
import DiamondSearch from './pages/Diamond/DiamondSearch/DiamondSearch';
import JewelEntry from './pages/Jewel/JewelEntry/JewelEntry';
import JewelSearch from './pages/Jewel/JewelSearch/JewelSearch';
import GemEntry from './pages/Gem/GemEntry/GemEntry';
import GemSearch from './pages/Gem/GemSearch/GemSearch';
import WatchEntry from './pages/Watch/WatchEntry/WatchEntry';
import WatchSearch from './pages/Watch/WatchSearch/WatchSearch';

import Cookies from 'universal-cookie';
import { CategoryProvider } from './data/categoriesData';

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
import { JSX } from "react/jsx-runtime";


setupIonicReact();

const App: React.FC = () => { 

  const path = window.location.pathname;
  const [showSplash, setShowSplash] = useState(true);
  
  //React Functional Component
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

  useEffect(() => {
    // Enable scroll when keyboard opens, globally
    Keyboard.setScroll({ isDisabled: false });
  }, []);

  /*
  // Define pages where menu should be shown
  const menuPages = [
    "/dashboard",
    "/diamondEntry",
    "/diamondSearch",
    "/jewelEntry",
    "/jewelSearch",
    "/gemEntry",
    "/gemSearch",
    "/watchEntry",
    "/watchSearch",
  ];
  const showMenu = menuPages.includes(path);

  type SubCategory = {
    name: string;
    iconUrl: string;
    src: string;
  };
  
  
  type Category =
  | {
      name: string;
      iconUrl: string;
      sub: SubCategory[];
    }
  | {
      name: string;
      iconComponent: JSX.Element;
    };
  const [selectedCategories, setSelectedCategories] = useState<Category | null>(null);
*/
  

  return (
    <IonApp>

      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (             

        <IonReactRouter>

          <Route exact path="/">
            {storedLoginStatus1 ? <Redirect to="/dashboard" /> : ''  }
          </Route>         

          <Route exact path="/">
            {storedLoginStatus1 ? '' : <Route path="/" exact component={Home} />  }
          </Route>

          <Route path="/login" component={Login} />           

          <Route path="/dashboard" component={Dashboard} />
          
          <Route path="/diamondEntry" component={DiamondEntry} />
          <Route path="/diamondSearch" component={DiamondSearch} />
          
          <Route path="/jewelEntry" component={JewelEntry} />
          <Route path="/jewelSearch" component={JewelSearch} />

          <Route path="/gemEntry" component={GemEntry} />
          <Route path="/gemSearch" component={GemSearch} />

          <Route path="/watchEntry" component={WatchEntry} />
          <Route path="/watchSearch" component={WatchSearch} />

          {/* 
          {showMenu ? (
            
            <CategoryProvider>
            <IonSplitPane contentId="main">
              <IonMenu menuId="start" contentId="main" side="start" type="overlay">
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>{selectedCategories?.name}</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonContent>
                 
                  <IonList>
                    {selectedCategories && "sub" in selectedCategories && selectedCategories.sub.map((sub, idx) => (
                      <IonItem key={idx}>
                        <IonLabel>{sub.name}</IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </IonContent>
              </IonMenu>

              <IonRouterOutlet id="main">
                

                <Route exact path="/">
                  {storedLoginStatus1 ? <Redirect to="/dashboard" /> : ''  }
                </Route>                

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
            </IonSplitPane>
            </CategoryProvider>
            
          ) : (
          
            <IonRouterOutlet>

              <Route exact path="/">
                {storedLoginStatus1 ? '' : <Route path="/" exact component={Home} />  }
              </Route>

              <Route path="/login" component={Login} />              

            </IonRouterOutlet>
            
          )}
            */}

        </IonReactRouter>

      )}
    </IonApp>
  );
  
};

export default App;
