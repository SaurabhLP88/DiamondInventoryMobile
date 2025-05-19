
import { ReactElement } from "react";
import { IonTabBar, IonTabButton, IonLabel } from '@ionic/react';

import './BottomNavs.css';

interface TabItem {
    tab: string;
    href: string;
    icon: ReactElement;
    label: string;
}

interface BottomTabsProps {
    tabs: TabItem[];
    className?: string;
}

const BottomNavigation: React.FC<BottomTabsProps> = ({ tabs, className = "" }) => {

  return (

    /*<IonTabBar className="fixed-tabs" slot="bottom">
        <IonTabButton tab="home" href="/home">
            <PiListNumbers className="icon" />
            <IonLabel>Num. All</IonLabel>
        </IonTabButton>
        <IonTabButton tab="search" href="/search">
            <GoHistory className="icon" />
            <IonLabel>History</IonLabel>
        </IonTabButton>
        <IonTabButton tab="add" href="/add">
            <GrTag className="icon" />
            <IonLabel>Print Tag</IonLabel>
        </IonTabButton>
        <IonTabButton tab="likes" href="/likes">
            <PiScroll className="icon" />
            <IonLabel>Print Label</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
            <GrCertificate className="icon" />
            <IonLabel>Print Cert.</IonLabel>
        </IonTabButton>
      </IonTabBar>*/

    <IonTabBar className={`fixed-tabs ${className}`} slot="bottom">
        {tabs.map((item) => (
        <IonTabButton key={item.tab} tab={item.tab} href={item.href}>
            {item.icon}
            <IonLabel>{item.label}</IonLabel>
        </IonTabButton>
        ))}
    </IonTabBar>

  );
};

export default BottomNavigation;
