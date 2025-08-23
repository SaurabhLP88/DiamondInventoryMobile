
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
