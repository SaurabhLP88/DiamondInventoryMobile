import React , { useRef, useState  } from "react"; //useEffect
import { useHistory } from 'react-router-dom';
//import { menuController } from '@ionic/core';

import { IonImg, IonButton, IonHeader, IonToolbar, IonButtons, IonIcon, IonModal, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonTitle, IonList, IonItem } from '@ionic/react';
import { home, apps, close, settingsOutline, personOutline, person, logOutOutline, arrowBack } from "ionicons/icons"; 
import { RiCustomerService2Fill } from 'react-icons/ri';
import { PiCalculatorThin, PiUserSwitchLight } from 'react-icons/pi';

import './TopHeader.css';
import Cookies from 'universal-cookie';
//import { useCategory } from '../../data/categoriesData';
//import { CategoryType } from '../../data/categoriesData';

interface TopHeaderProps {
  pageTitle: string;
}
const cookies = new Cookies();
const TopHeader: React.FC<TopHeaderProps> = ({ pageTitle }) => {

const categories = [
  { 
    name: 'Diamonds', 
    iconUrl: 'assets/images/diamond1.svg', 
    sub: [
        {
        name: 'Diamond Entry',
        iconUrl: 'assets/images/diamond1.svg',
        src: '/diamondEntry'
      }, 
      {
        name: 'Diamond Search',
        iconUrl: 'assets/images/diamond1.svg',
        src: '/diamondSearch'
      }
    ]
  },
  { 
    name: 'Gems', 
    iconUrl: 'assets/images/gem1.svg', 
    sub: [
      {
        name: 'Gem Entry',
        iconUrl: 'assets/images/gem1.svg',
        src: '/gemEntry'
      },
      {
        name: 'Gem Search',
        iconUrl: 'assets/images/gem1.svg',
        src: '/gemSearch'
      }
    ]
  },
  { 
    name: 'Jewels', 
    iconUrl: 'assets/images/jewelry1.svg', 
    sub: [
      {
        name: 'Jewel Entry',
        iconUrl: 'assets/images/jewelry1.svg',
        src: '/jewelEntry'
      },
      {
        name: 'Jewel Search',
        iconUrl: 'assets/images/jewelry1.svg',
        src: '/jewelSearch'
      }
    ]
  },
  { 
    name: 'Watch', 
    iconUrl: 'assets/images/watch1.svg', 
    sub: [
      {
        name: 'Watch Entry',
        iconUrl: 'assets/images/watch1.svg',
        src: '/watchEntry'
      },
      {
        name: 'Watch Search',
        iconUrl: 'assets/images/watch1.svg',
        src: '/watchSearch'
      }
    ]
  },
  { 
    name: 'Accounting', 
    iconUrl: 'assets/images/invoice1.svg', 
    sub: [
      {
        name: 'Invoice',
        iconUrl: 'assets/images/invoice1.svg',
        src: '/jewelEntry'
      },
      {
        name: 'Memo',
        iconUrl: 'assets/images/invoice1.svg',
        src: '/jewelEntry'
      }
    ]
  },
  { 
    name: 'Purchase', 
    iconUrl: 'assets/images/memo12.svg', 
    sub: [
      {
        name: 'Receive In',
        iconUrl: 'assets/images/memo12.svg',
        src: '/jewelEntry'
      },
      {
        name: 'Memo In',
        iconUrl: 'assets/images/memo12.svg',
        src: '/jewelEntry'
      }
    ]
  },
  { 
    name: 'Customer Care', 
    iconComponent: <RiCustomerService2Fill className="icon" />, 
  },
  { 
    name: 'Rapnet', 
    iconComponent: <PiCalculatorThin className="icon" />, 
  },
  { 
    name: 'LA CRM', 
    iconComponent: <PiUserSwitchLight className="icon" />, 
  },
];

const dashboardHistory = useHistory();
const modalModules = useRef<HTMLIonModalElement>(null);  
const dismissModules = () => modalModules.current?.dismiss();
const [moduleShowModal, moduleSetShowModal] = useState(false);
const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
const currentCategory = categories.find(c => c.name === selectedCategory);  
const history = useHistory();
const handleNavigation = (path: string) => {
  dashboardHistory.push(path);
  dismissModules();
};

const handleBack = () => {
  setSelectedCategory(null);
};
const handleLogout = () => {
        //localStorage.removeItem('token'); // Clear the token from localStorage
      // setIsLoggedIn(false);
        sessionStorage.setItem('login_id', '');
      cookies.set('login_id',0, { path: '/' });
      sessionStorage.setItem('verify_code', '');
      cookies.set('verify_code','', { path: '/' });
      sessionStorage.setItem('account_type', '');
      cookies.set('account_type', '', { path: '/' });
      dismissSettings();
        history.push("/");// Redirect to the login page
        
      };

const modalSettings = useRef<HTMLIonModalElement>(null);
const dismissSettings = () => modalSettings.current?.dismiss();
const [settingsShowModal, settingsSetShowModal] = useState(false);  

//const { setCurrentCategory } = useCategory();
//const handleCategoryClick = async (cat: CategoryType) => {  
const handleCategoryClick = (category: string) => {
  //await menuController.enable(true, 'start');
  //const opened = await menuController.open('start'); 
  setSelectedCategory(category);
  //console.log("handleCategoryClick");
  //console.log('open returned:', opened);
};

/*useEffect(() => {
  const opened = () => console.log('ionMenuDidOpen');
  const closed = () => console.log('ionMenuDidClose');
  window.addEventListener('ionMenuDidOpen', opened);
  window.addEventListener('ionMenuDidClose', closed);
  return () => {
    window.removeEventListener('ionMenuDidOpen', opened);
    window.removeEventListener('ionMenuDidClose', closed);
  };
}, []);*/

  return (
    <>
      <IonHeader className="top-header-dashboard">
        <IonToolbar className="top-toolbar transparent-header">

          {/* Logo on the Left */}
          <div className="logo-with-text">
            {/*{isDashboard && (
              <IonImg src="assets/images/diatrac_logo.svg" alt="Diatrac" className="logo" />
            )} */}
            <span className="logo-text"> {pageTitle}</span>
          </div>          

          {/* Icons on the Right */}
          <IonButtons className="top-menus" slot="end">
            <IonButton onClick={() => dashboardHistory.push('/dashboard')}>
              <IonIcon icon={home} />
            </IonButton>        
            <IonButton onClick={() => settingsSetShowModal(true)}>
              <IonIcon icon={person} />
            </IonButton>            
            <IonButton onClick={() => moduleSetShowModal(true)}>
              <IonIcon icon={apps} />
            </IonButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>

      <IonModal id="module-modal" className="common-modal module-modal" ref={modalModules} backdropDismiss={true} isOpen={moduleShowModal} onDidDismiss={() => { moduleSetShowModal(false); setSelectedCategory(null); }}>
        <IonContent scrollY={false} className="no-scroll">
          <IonToolbar>
            {selectedCategory && (
              <IonIcon slot="start" icon={arrowBack} size="large" className="back-icon" onClick={handleBack} />
            )}
            <IonIcon slot="end" icon={close} size="large" className="close-icon" onClick={() => dismissModules()} />
          </IonToolbar>
          <IonGrid className="no-padding">

            {selectedCategory === null ? (
              <>
                {Array.from({ length: Math.ceil(categories.length / 3) }).map((_, rowIndex) => (
                  <IonRow key={rowIndex}>
                    {categories.slice(rowIndex * 3, rowIndex * 3 + 3).map((cat) => (
                      <IonCol key={cat.name} onClick={() => handleCategoryClick(cat.name)}className="module-item"> {/* onClick={() => openPanel(cat)} onClick={() => } console.log("Clicked:", cat.name); handleCategoryClick(cat); */}
                        <div className="icon-box">
                          {cat.iconComponent ? (
                            cat.iconComponent
                          ) : (
                            <IonImg src={cat.iconUrl} alt={cat.name} className="icon" />
                          )}
                        </div>                          
                        <IonLabel>{cat.name}</IonLabel>
                      </IonCol>
                    ))}
                  </IonRow>
                ))}
              </>
            ) : (
              <>
                <IonRow className="module-icons">
                  {currentCategory?.sub && currentCategory.sub.map((sub, index) => (
                    <IonCol key={index} className="module-item" onClick={() => { {/*console.log("Clicked:", sub.name);*/} handleNavigation(sub.src); }}>
                      <div className="icon-box"><IonImg src={sub.iconUrl} alt={sub.name} className="icon" /></div>
                      <IonLabel>{sub.name}</IonLabel>
                    </IonCol>
                  ))}
                </IonRow>
              </>
            )}

          </IonGrid>
        </IonContent>
      </IonModal>      

      <IonModal id="settings-modal" className="common-modal settings-modal" ref={modalSettings} backdropDismiss={true} isOpen={settingsShowModal} onDidDismiss={() => settingsSetShowModal(false)}>
        <IonContent scrollY={false} className="no-scroll">
          <IonToolbar>
            <IonTitle>Settings</IonTitle>
            <IonIcon slot="end" icon={close} size="large" className="close-icon" onClick={() => dismissSettings()} />
          </IonToolbar>
          <IonList>
            <IonItem button>
              <IonIcon icon={settingsOutline} slot="start" className="icon-start" />
              <IonLabel>Admin</IonLabel>
              {/*<IonIcon icon={chevronForwardOutline} slot="end" className="icon-arrow" />*/}
            </IonItem>

            <IonItem button>
              <IonIcon icon={personOutline} slot="start" className="icon-start" />
              <IonLabel>Profile</IonLabel>
              {/*<IonIcon icon={chevronForwardOutline} slot="end" className="icon-arrow" />*/}
            </IonItem>

            <IonItem button onClick={handleLogout}>
              <IonIcon icon={logOutOutline} slot="start" className="icon-start" />
              <IonLabel>Logout</IonLabel>
              {/*<IonIcon icon={chevronForwardOutline} slot="end" className="icon-arrow" />*/}
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>  

    </>
  );
};

export default TopHeader;
