import { useRef, useState} from "react";
import { useHistory } from 'react-router-dom';
import { IonPage, IonImg, IonButton, IonIcon, IonContent, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonPopover  } from '@ionic/react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { arrowForwardCircleOutline, calendarOutline, filter  } from "ionicons/icons"; 
import { GrChatOption } from 'react-icons/gr';
import { SiTeamviewer, SiAnydesk } from 'react-icons/si';
import { FaHandsHelping } from 'react-icons/fa';

import { motion, AnimatePresence } from "framer-motion";
import TopHeader from '../../components/TopHeader/TopHeader';
import './Dashboard.css';

const Dashboard: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const triggerRef = useRef(null);

  const [selectedDatePur, setSelectedDatePur] = useState('');
  const [showCalendarPur, setShowCalendarPur] = useState(false);
  const triggerRefPur = useRef(null);

  const pieData = [
    { name: 'Diamonds', value: 400 },
    { name: 'Gems', value: 300 },
    { name: 'Watches', value: 300 },
];

  const barData = [
    { name: 'Jan', uv: 400, pv: 240 },
    { name: 'Feb', uv: 300, pv: 139 },
    { name: 'Mar', uv: 200, pv: 980 },
    { name: 'Apr', uv: 278, pv: 390 },
  ];
  const COLORS = ['#1e1671', '#00C49F', '#FFBB28'];

  const [isOpen, setIsOpen] = useState(false);
  
  
  return (
    <IonPage className="bg-gradient">

      {/* Header */}
      <TopHeader pageTitle="Dashboard" />

      {/* Page Content */}
      <IonContent scrollY={true} className="no-scroll ion-padding bg-white text-black rounded-content">
        
        {/* Inventory Section */}
        <IonCard className="inventory-box">
          <IonCardHeader className="inventory-header">
            <IonCardTitle className="inventory-title">Inventory</IonCardTitle>
            <IonButton fill="clear" size="small" className="show-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Show Less" : "Show More"} <IonIcon icon={arrowForwardCircleOutline} className="show-icon" />
            </IonButton>
          </IonCardHeader>
          <IonGrid className="no-padding">
            <IonRow className="inventory-icons">
              <IonCol className="inventory-item">
                <div className="icon-box"><IonImg src="/src/assets/images/diamond1.svg" alt="Diamonds" className="icon" /></div>
                <IonLabel>Diamonds</IonLabel>
              </IonCol>

              <IonCol className="inventory-item">
                <div className="icon-box"><IonImg src="/src/assets/images/gem1.svg" alt="Gems" className="icon" /></div>
                <IonLabel>Gems</IonLabel>
              </IonCol>

              <IonCol className="inventory-item">
                <div className="icon-box"><IonImg src="/src/assets/images/jewelry1.svg" alt="Jewelry" className="icon" /></div>
                <IonLabel>Jewelry</IonLabel>
              </IonCol>

              <IonCol className="inventory-item">
                <div className="icon-box"><IonImg src="/src/assets/images/watch1.svg" alt="Watches" className="icon" /></div>
                <IonLabel>Watches</IonLabel>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>

        <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="collapsible-box"
              >

            {/* Accounting Section */}
            <IonCard className="inventory-box">
              <IonCardHeader className="inventory-header">
                <IonCardTitle className="inventory-title">Accounting</IonCardTitle>
                <IonButton fill="clear" size="small" className="show-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Show Less" : "Show More"} <IonIcon icon={arrowForwardCircleOutline} className="show-icon" />
                </IonButton>
              </IonCardHeader>
              <IonGrid className="no-padding">
                <IonRow className="inventory-icons">
                  <IonCol className="inventory-item">
                    <div className="icon-box"><IonImg src="/src/assets/images/quote1.svg" alt="Quotes" className="icon" /></div>
                    <IonLabel>Quotes</IonLabel>
                  </IonCol>

                  <IonCol className="inventory-item">
                    <div className="icon-box"><IonImg src="/src/assets/images/memo1.svg" alt="Memos" className="icon" /></div>
                    <IonLabel>Memos</IonLabel>
                  </IonCol>

                  <IonCol className="inventory-item">
                    <div className="icon-box"><IonImg src="/src/assets/images/invoice1.svg" alt="Invoices" className="icon" /></div>
                    <IonLabel>Invoices</IonLabel>
                  </IonCol>

                  <IonCol className="inventory-item">
                    <div className="icon-box"><IonImg src="/src/assets/images/payments1.svg" alt="Payments" className="icon" /></div>
                    <IonLabel>Payments</IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            {/* Purchasing Section */}
            <IonCard className="inventory-box">
              <IonCardHeader className="inventory-header">
                <IonCardTitle className="inventory-title">Purchasing</IonCardTitle>
                <IonButton fill="clear" size="small" className="show-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Show Less" : "Show More"} <IonIcon icon={arrowForwardCircleOutline} className="show-icon" />
                </IonButton>
              </IonCardHeader>
              <IonGrid className="no-padding">
                <IonRow className="inventory-icons">
                  <IonCol className="inventory-item">
                    <div className="icon-box"><IonImg src="/src/assets/images/memo12.svg" alt="Memo In" className="icon" /></div>
                    <IonLabel>Memo In</IonLabel>
                  </IonCol>

                  <IonCol className="inventory-item">
                    <div className="icon-box"><IonImg src="/src/assets/images/receiving1.svg" alt="Receive In" className="icon" /></div>
                    <IonLabel>Receive In</IonLabel>
                  </IonCol>

                  <IonCol className="inventory-item">
                    <div className="icon-box"><IonImg src="/src/assets/images/expenses1.svg" alt="Expenses" className="icon" /></div>
                    <IonLabel>Expenses</IonLabel>
                  </IonCol>

                  <IonCol className="inventory-item">
                    <div className="icon-box"><IonImg src="/src/assets/images/bank_register1.svg" alt="Bank Register" className="icon" /></div>
                    <IonLabel>Bank Register</IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>

            {/* Tools Section */}
            <IonCard className="inventory-box">
              <IonCardHeader className="inventory-header">
                <IonCardTitle className="inventory-title">Tools</IonCardTitle>
                <IonButton fill="clear" size="small" className="show-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Show Less" : "Show More"} <IonIcon icon={arrowForwardCircleOutline} className="show-icon" />
                </IonButton>
              </IonCardHeader>
              <IonGrid className="no-padding">
                <IonRow className="inventory-icons">
                  <IonCol className="inventory-item">
                    <div className="icon-box"><GrChatOption className="icon" /></div>
                    <IonLabel>Live Chat</IonLabel>
                  </IonCol>

                  <IonCol className="inventory-item">
                    <div className="icon-box"><SiTeamviewer className="icon" /></div>
                    <IonLabel>Teamviewer</IonLabel>
                  </IonCol>

                  <IonCol className="inventory-item">
                    <div className="icon-box"><FaHandsHelping className="icon" /></div>
                    <IonLabel>Help</IonLabel>
                  </IonCol>

                  <IonCol className="inventory-item">
                    <div className="icon-box"><SiAnydesk className="icon" /></div>
                    <IonLabel>AnyDesk</IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCard>
            </motion.div>
            )}
        </AnimatePresence>

        {/* Monthly Sales Section */}
        <div className="sales-box">
          
          <IonRow className="sales-header">
            
            <IonCol size="4">
              <h4 className="sales-title">Monthly Sales</h4>
            </IonCol>

            <IonCol size="8" className="sales-controls ion-text-right">
              <IonSelect placeholder="Select" interface="popover" value="week" className="control-select">
                <IonSelectOption value="week">Last 1 week</IonSelectOption>
                <IonSelectOption value="month">Last 1 month</IonSelectOption>
                <IonSelectOption value="months">Last 6 months</IonSelectOption>
                <IonSelectOption value="year">Last 1 year</IonSelectOption>
              </IonSelect>

              <div id="sales-trigger" className="date-picker-box" ref={triggerRef}>
                <input type="text" placeholder="Select date" value={selectedDate} readOnly />
                <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendar(true)} />
              </div>
              <IonPopover isOpen={showCalendar} trigger="sales-trigger" onDidDismiss={() => setShowCalendar(false)} showBackdrop={false} side="bottom" alignment="center">
                <IonDatetime
                  presentation="date"
                  onIonChange={(e) => {
                    const value = e.detail.value;
                    if (typeof value === 'string') {
                      setSelectedDate(value);
                      setShowCalendar(false);
                    }
                  }}
                />
              </IonPopover>

              <IonIcon icon={filter} size="large" className="filter-icon" />
            </IonCol>
          </IonRow>
          
          <IonCard className="card-box">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uv" fill="#1e1671" />
                <Bar dataKey="pv" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </IonCard>

        </div>

        {/* Monthly purchase Section */}
        <div className="sales-box">
          
          <IonRow className="sales-header">
            
            <IonCol size="4">
              <h4 className="sales-title">Monthly Purchase</h4>
            </IonCol>

            <IonCol size="8" className="sales-controls ion-text-right">
              <IonSelect placeholder="Select" interface="popover" value="week" className="control-select">
                <IonSelectOption value="week">Last 1 week</IonSelectOption>
                <IonSelectOption value="month">Last 1 month</IonSelectOption>
                <IonSelectOption value="months">Last 6 months</IonSelectOption>
                <IonSelectOption value="year">Last 1 year</IonSelectOption>
              </IonSelect>

              <div id="purchase-trigger" className="date-picker-box" ref={triggerRefPur}>
                <input type="text" placeholder="Select date" value={selectedDatePur} readOnly />
                <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarPur(true)} />
              </div>
              <IonPopover isOpen={showCalendarPur} trigger="purchase-trigger" onDidDismiss={() => setShowCalendarPur(false)} showBackdrop={false} side="bottom" alignment="center">
                <IonDatetime
                  presentation="date"
                  onIonChange={(e) => {
                    const value = e.detail.value;
                    if (typeof value === 'string') {
                      setSelectedDatePur(value);
                      setShowCalendarPur(false);
                    }
                  }}
                />
              </IonPopover>

              <IonIcon icon={filter} size="large" className="filter-icon" />
            </IonCol>
          </IonRow>

          <IonCard className="card-box">

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0px' }}>
              <div style={{ fontSize: '12px' }}>
                <p style={{ margin: '0 0 15px' }}>Increase : <span style={{ fontWeight: 600 }}>$456.8</span></p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
                  {pieData.map((item, index) => (
                    <li key={item.name} style={{ marginBottom: '0.5rem', color: COLORS[index] }}>
                      ● {item.name}
                    </li>
                  ))}
                </ul>
                <p style={{ margin: 0 }}>Monthy Purchase Increase By : <span style={{ fontWeight: 600 }}>+50%</span></p>  : 
              </div>

              <PieChart width={200} height={150}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

          </IonCard>

        </div>
      </IonContent>

    </IonPage>

  );
};

export default Dashboard;
