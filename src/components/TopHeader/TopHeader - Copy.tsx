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
  
  const modalModules = useRef<HTMLIonModalElement>(null);  
  const dismissModules = () => modalModules.current?.dismiss();
  const [moduleShowModal, moduleSetShowModal] = useState(false);

  const modalSettings = useRef<HTMLIonModalElement>(null);
  const dismissSettings = () => modalSettings.current?.dismiss();
  const [settingsShowModal, settingsSetShowModal] = useState(false);

  const modalDiamond = useRef<HTMLIonModalElement>(null);
  const dismissDiamond = () => modalDiamond.current?.dismiss();
  const [diamondShowModal, diamondSetShowModal] = useState(false);

  const modalJewel = useRef<HTMLIonModalElement>(null);
  const dismissJewel = () => modalJewel.current?.dismiss();
  const [jewelShowModal, jewelSetShowModal] = useState(false);

  const dashboardHistory = useHistory();  
  const locationDashboard = useLocation();

  const getBottomValue = () => {
    if (locationDashboard.pathname === "/dashboard") {
      return "15px";
    } else if (locationDashboard.pathname === "/diamondEntry") {
      return "140px";
    } else {
      return "160px";
    }
  };

  const diamondSearchModule = () => {
    dashboardHistory.push('/diamondSearch');
    dismissDiamond();
  };
  const diamondEntryModule = () => {
    dashboardHistory.push('/diamondEntry');
    dismissDiamond();
  };

  const jewelSearchModule = () => {
    dashboardHistory.push('/jewelSearch');
    dismissJewel();
  };
  const jewelEntryModule = () => {
    dashboardHistory.push('/jewelEntry');
    dismissJewel();
  };

  useEffect(() => {
    if (diamondShowModal) {
      moduleSetShowModal(false);
    }
    if (jewelShowModal) {
      moduleSetShowModal(false);
    }
  }, [diamondShowModal, jewelShowModal]); 
  

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
            <IonIcon slot="start" icon={arrowBack} size="large" className="back-icon" onClick={() => dismissModules()} />
            <IonIcon slot="end" icon={close} size="large" className="close-icon" onClick={() => dismissModules()} />
          </IonToolbar>
          <IonGrid className="no-padding">

            <IonRow className="module-icons">
              <IonCol className="module-item" onClick={() => diamondSetShowModal(true)}>
                <div className="icon-box"><IonImg src="/src/assets/images/diamond1.svg" alt="Diamonds" className="icon" /></div>
                <IonLabel>Diamonds</IonLabel>
              </IonCol>
              <IonCol className="module-item">
                <div className="icon-box"><IonImg src="/src/assets/images/gem1.svg" alt="Gems" className="icon" /></div>
                <IonLabel>Gems</IonLabel>
              </IonCol>
              <IonCol className="module-item" onClick={() => jewelSetShowModal(true)}>
                <div className="icon-box"><IonImg src="/src/assets/images/jewelry1.svg" alt="Jewelry" className="icon" /></div>
                <IonLabel>Jewels</IonLabel>
              </IonCol>
            </IonRow>

            <IonRow className="module-icons">
              <IonCol className="module-item">
                <div className="icon-box"><IonImg src="/src/assets/images/watch1.svg" alt="Watches" className="icon" /></div>
                <IonLabel>Watch</IonLabel>
              </IonCol>
              <IonCol className="module-item">
                <div className="icon-box"><IonImg src="/src/assets/images/invoice1.svg" alt="Accounting" className="icon" /></div>
                <IonLabel>Accounting</IonLabel>
              </IonCol>
              <IonCol className="module-item">
                <div className="icon-box"><IonImg src="/src/assets/images/memo12.svg" alt="Purchase" className="icon" /></div>
                <IonLabel>Purchase</IonLabel>
              </IonCol>
            </IonRow>

            <IonRow className="module-icons">
              <IonCol className="module-item">
                <div className="icon-box"><RiCustomerService2Fill className="icon" /></div>
                <IonLabel>Customer Care</IonLabel>
              </IonCol>
              <IonCol className="module-item">
                <div className="icon-box"><PiCalculatorThin className="icon" /></div>
                <IonLabel>Rapnet</IonLabel>
              </IonCol>
              <IonCol className="module-item">
                <div className="icon-box"><PiUserSwitchLight className="icon" /></div>
                <IonLabel>LA CRM</IonLabel>
              </IonCol>
            </IonRow>

          </IonGrid>
        </IonContent>
      </IonModal>

      <IonModal id="diamond-modal" className="common-modal module-modal" ref={modalDiamond} backdropDismiss={true} isOpen={diamondShowModal} onDidDismiss={() => diamondSetShowModal(false)}>
        <IonContent scrollY={false} className="no-scroll">
          <IonToolbar>
            <IonIcon slot="end" icon={close} size="large" className="close-icon" onClick={() => dismissDiamond()} />
          </IonToolbar>
          <IonGrid className="no-padding">

            <IonRow className="module-icons">
              <IonCol className="module-item" onClick={diamondEntryModule}>
                <div className="icon-box"><IonImg src="/src/assets/images/diamond1.svg" alt="Diamond Entry" className="icon" /></div>
                <IonLabel>Diamond Entry</IonLabel>
              </IonCol>
              <IonCol className="module-item" onClick={diamondSearchModule}>
                <div className="icon-box"><IonImg src="/src/assets/images/gem1.svg" alt="Diamond Search" className="icon" /></div>
                <IonLabel>Diamond Search</IonLabel>
              </IonCol>
            </IonRow>

          </IonGrid>
        </IonContent>
      </IonModal>

      <IonModal id="jewel-modal" className="common-modal module-modal" ref={modalJewel} backdropDismiss={true} isOpen={jewelShowModal} onDidDismiss={() => jewelSetShowModal(false)}>
        <IonContent scrollY={false} className="no-scroll">
          <IonToolbar>
            <IonIcon slot="end" icon={close} size="large" className="close-icon" onClick={() => dismissJewel()} />
          </IonToolbar>
          <IonGrid className="no-padding">

            <IonRow className="module-icons">
              <IonCol className="module-item" onClick={jewelEntryModule}>
                <div className="icon-box"><IonImg src="/src/assets/images/diamond1.svg" alt="Jewel Entry" className="icon" /></div>
                <IonLabel>Jewel Entry</IonLabel>
              </IonCol>
              <IonCol className="module-item" onClick={jewelSearchModule}>
                <div className="icon-box"><IonImg src="/src/assets/images/gem1.svg" alt="Jewel Search" className="icon" /></div>
                <IonLabel>Jewel Search</IonLabel>
              </IonCol>
            </IonRow>

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
