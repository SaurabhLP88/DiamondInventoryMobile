import { useRef, useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';

import { IonImg, IonButton, IonHeader, IonToolbar, IonButtons, IonIcon, IonModal, IonContent, IonGrid, IonRow, IonCol, IonLabel, IonTitle, IonList, IonItem } from '@ionic/react';
import { home, apps, close, settingsOutline, personOutline, person, logOutOutline, chevronForwardOutline, arrowBack } from "ionicons/icons"; 
import { RiCustomerService2Fill } from 'react-icons/ri';
import { PiCalculatorThin, PiUserSwitchLight } from 'react-icons/pi';

import './TopHeader.css';

interface TopHeaderProps {
  pageTitle: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ pageTitle }) => {

  const dashboardHistory = useHistory();  
  const locationDashboard = useLocation();
  
  const modalModules = useRef<HTMLIonModalElement>(null);  
  const dismissModules = () => modalModules.current?.dismiss();
  const [moduleShowModal, moduleSetShowModal] = useState(false);

  const modalSettings = useRef<HTMLIonModalElement>(null);
  const dismissSettings = () => modalSettings.current?.dismiss();
  const [settingsShowModal, settingsSetShowModal] = useState(false);  

  const getBottomValue = () => {
    if (locationDashboard.pathname === "/dashboard") {
      return "15px";
    } else if (locationDashboard.pathname === "/diamondEntry") {
      return "140px";
    } else {
      return "160px";
    }
  };

  const handleNavigation = (path: string) => {
    dashboardHistory.push(path);
    dismissModules();
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = [
    { 
      name: 'Diamonds', 
      iconUrl: '/src/assets/images/diamond1.svg', 
      sub: [
        {
          name: 'Diamond Entry',
          iconUrl: '/src/assets/images/diamond1.svg',
          src: '/diamondEntry'
        },
        {
          name: 'Diamond Search',
          iconUrl: '/src/assets/images/diamond1.svg',
          src: '/diamondSearch'
        }
      ]
    },
    { 
      name: 'Gems', 
      iconUrl: '/src/assets/images/gem1.svg', 
      sub: [
        {
          name: 'Gem Entry',
          iconUrl: '/src/assets/images/gem1.svg',
          src: '/jewelEntry'
        },
        {
          name: 'Gem Search',
          iconUrl: '/src/assets/images/gem1.svg',
          src: '/jewelEntry'
        }
      ]
    },
    { 
      name: 'Jewels', 
      iconUrl: '/src/assets/images/jewelry1.svg', 
      sub: [
        {
          name: 'Jewel Entry',
          iconUrl: '/src/assets/images/jewelry1.svg',
          src: '/jewelEntry'
        },
        {
          name: 'Jewel Search',
          iconUrl: '/src/assets/images/jewelry1.svg',
          src: '/jewelSearch'
        }
      ]
    },
    { 
      name: 'Watch', 
      iconUrl: '/src/assets/images/watch1.svg', 
      sub: [
        {
          name: 'Watch Entry',
          iconUrl: '/src/assets/images/watch1.svg',
          src: '/jewelEntry'
        },
        {
          name: 'Watch Search',
          iconUrl: '/src/assets/images/watch1.svg',
          src: '/jewelEntry'
        }
      ]
    },
    { 
      name: 'Accounting', 
      iconUrl: '/src/assets/images/invoice1.svg', 
      sub: [
        {
          name: 'Invoice',
          iconUrl: '/src/assets/images/invoice1.svg',
          src: '/jewelEntry'
        },
        {
          name: 'Memo',
          iconUrl: '/src/assets/images/invoice1.svg',
          src: '/jewelEntry'
        }
      ]
    },
    { 
      name: 'Purchase', 
      iconUrl: '/src/assets/images/memo12.svg', 
      sub: [
        {
          name: 'Receive In',
          iconUrl: '/src/assets/images/memo12.svg',
          src: '/jewelEntry'
        },
        {
          name: 'Memo In',
          iconUrl: '/src/assets/images/memo12.svg',
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
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };
  const handleBack = () => {
    setSelectedCategory(null);
  };
  const currentCategory = categories.find(c => c.name === selectedCategory);  

  return (
    <>
      <IonHeader>
        <IonToolbar className="top-toolbar transparent-header">

          {/* Logo on the Left */}
          <div className="logo-with-text">
            <IonImg src="/src/assets/images/diatrac_logo.svg" alt="Diatrac" className="logo" />
            <span className="logo-text"> &gt; {pageTitle}</span>
          </div>

          {/* Icons on the Right */}
          <IonButtons slot="end">            
            <IonButton onClick={() => moduleSetShowModal(true)}>
              <IonIcon icon={apps} />
            </IonButton>
            <IonButton onClick={() => dashboardHistory.push('/dashboard')}>
              <IonIcon icon={home} />
            </IonButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>

      <IonModal id="module-modal" className="common-modal module-modal" ref={modalModules} backdropDismiss={true} isOpen={moduleShowModal} onDidDismiss={() => moduleSetShowModal(false)}>
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
                      <IonCol key={cat.name} className="module-item" onClick={() => handleCategoryClick(cat.name)}>
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
                    <IonCol key={index} className="module-item" onClick={() => handleNavigation(sub.src)}>
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
              <IonIcon icon={chevronForwardOutline} slot="end" className="icon-arrow" />
            </IonItem>

            <IonItem button>
              <IonIcon icon={personOutline} slot="start" className="icon-start" />
              <IonLabel>Profile</IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" className="icon-arrow" />
            </IonItem>

            <IonItem button>
              <IonIcon icon={logOutOutline} slot="start" className="icon-start" />
              <IonLabel>Logout</IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" className="icon-arrow" />
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>

      <div className="user-icon-fab" onClick={() => settingsSetShowModal(true)} style={{ bottom: getBottomValue() }}>
        <IonIcon icon={person} size="large" />
      </div>

    </>
  );
};

export default TopHeader;
