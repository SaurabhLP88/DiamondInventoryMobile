
import { useRef, useState } from "react";
import { IonPage, IonContent, IonButton, IonIcon, IonCheckbox, IonCol, IonRow, IonModal, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonItemDivider, IonGrid, IonSelect, IonSelectOption, IonInput, IonPopover, IonDatetime, IonRadio  } from '@ionic/react';
import { pencilOutline, eyeOutline, chevronBack, chevronForward, optionsOutline, closeOutline, calendarOutline } from "ionicons/icons"; //addOutline, close,
import { PiListNumbers, PiScroll } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { GrTag, GrCertificate } from "react-icons/gr";

import TopHeader from '../../../components/TopHeader/TopHeader';
import BottomNavigation from '../../../components/BottomNavs/BottomNavs';
import './WatchSearch.css';

const columnNames = [
  "SKU#", "Style", "Vendor Style", "Qty", "Group", "Category", "Metal", "Description", "On Memo", "Sell $", "Partnership"
];

/*const optionsDefault = [
  "On-Hand", "On-Memo", "Sold", "Mounted", "Committed", "Memo-in", "Matching", "No Memo-In"
];
const optionsCertified = [
  "Any Cert.", "No Cert.", "AGS", "EGL", "GIA", "Globien", "HRD", "IGI", "Matching"
];
const optionsTreatment = [
  "CE", "COL", "CVD", "HPHT", "IRR", "LD", "N", "OT"
];*/


const WatchSearch: React.FC = () => {

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const sampleData = Array(50).fill({});

  const modalFilter = useRef<HTMLIonModalElement>(null);  
  const dismissModules = () => modalFilter.current?.dismiss();
  const [filterShowModal, filterSetShowModal] = useState(false);

  /*const [activeTab, setActiveTab] = useState('tab1');

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  
  const toggleButton = (label: string) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  const buttons = ['All', 'Individual Stones', 'Parcel Stones'];*/

  const watchSearchTabs = [
    { tab: "home", href: "/home", icon: <PiListNumbers className="icon" />, label: "Num. All" },
    { tab: "search", href: "/search", icon: <GoHistory className="icon" />, label: "History" },
    { tab: "add", href: "/add", icon: <GrTag className="icon" />, label: "Print Tag" },
    { tab: "likes", href: "/likes", icon: <PiScroll className="icon" />, label: "Print Label" },
    { tab: "profile", href: "/profile", icon: <GrCertificate className="icon" />, label: "Print Cert." }
  ];

  const [selectedDateFrom, setSelectedDateFrom] = useState('');
  const [showCalendarFrom, setShowCalendarFrom] = useState(false);

  const [selectedDateTo, setSelectedDateTo] = useState('');
  const [showCalendarTo, setShowCalendarTo] = useState(false);

  return (
    <IonPage className="watch-search bg-gradient">

        {/* Header */}
        <TopHeader pageTitle="Watch Search" />

        {/* Page Content */}
        <IonContent scrollY={true} className="no-scroll ion-padding bg-white text-black rounded-content">
          <div className="scroll-wrapper">
            
            <div className="table-header">
              <IonButton fill="clear" className="filter-button" onClick={() => filterSetShowModal(true)}>
                <IonIcon icon={optionsOutline} slot="icon-only" /> 
                <span className="filter-text">Filter</span>
              </IonButton>
            </div>
            <div className="table-container" ref={scrollRef}>
              <table className="custom-table fixed-cols">
                <thead>
                  <tr>
                    <th></th>
                    {columnNames.map((name, idx) => (
                      <th key={idx}>{name}</th>
                    ))}
                    <th>
                      <IonButton fill="clear" onClick={() => scroll("left")} className="scroll-arrow left">
                        <IonIcon icon={chevronBack} />
                      </IonButton>
                    </th>
                    <th>
                    <IonButton fill="clear" onClick={() => scroll("right")} className="scroll-arrow right">
                      <IonIcon icon={chevronForward} />
                    </IonButton>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      <td><IonCheckbox className="circle-checkbox" /></td>
                      {columnNames.map((_, colIndex) => (
                        <td key={colIndex}>—</td>
                      ))}
                      <td><IonIcon icon={pencilOutline} className="action-icon" /></td>
                      <td><IonIcon icon={eyeOutline} className="action-icon" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <IonRow>
                <IonCol size="4">Total Records <span>400,115</span> </IonCol>
                <IonCol size="8" className="text-right"> 
                  <IonButton fill="clear" className="view-total-btn">
                    View Totals
                  </IonButton>
                </IonCol>
              </IonRow>

            </div>
            
          </div>

        </IonContent>

        {/* Bottom Navigation */}
        <BottomNavigation tabs={watchSearchTabs} />

        <IonModal id="watchSearchModal" className="full-filter-modal filter-modal" ref={modalFilter} backdropDismiss={true} isOpen={filterShowModal} onDidDismiss={() => filterSetShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Filters ( 5 selected )</IonTitle>
              <IonIcon icon={closeOutline} onClick={() => dismissModules()} slot="end" />
            </IonToolbar>
          </IonHeader>
          <IonContent scrollY={true}>  
          
            <IonList className="line-separator">
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Search By</IonLabel>
                    
                  <IonList className='select-content'>
                    <IonItem>
                      <IonLabel position="fixed">Style#</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">SKU#</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Group</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Category</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Sub Category</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Metal</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Bill#</IonLabel>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Vendor</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Vendor Style</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Vendor Style</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Sell Price</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Cost Price</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Customer</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
              </div>
              </IonItem>
              <IonItemDivider />
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Stone Weights</IonLabel>
                    
                  <IonList className='select-content'>                    
                    <IonItem>
                      <IonLabel position="fixed">Total</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Center</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>
                    
                  </IonList>
              </div>
              </IonItem>
              <IonItemDivider />
              
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Memo Date</IonLabel>
                  <IonRow className="dropdown-row">
                    <IonCol size="6" className="dropdown-col">
                      <IonLabel className="dropdown-label">From</IonLabel>
                      <div className="date-input" id="memoDateFrom-trigger">
                        <IonInput placeholder="Select date" value={selectedDateFrom} readonly={true} />
                        <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarFrom(true)} />
                      </div>
                      <IonPopover isOpen={showCalendarFrom} trigger="memoDateFrom-trigger" onDidDismiss={() => setShowCalendarFrom(false)} showBackdrop={false} side="bottom" alignment="center">
                        <IonDatetime
                          presentation="date"
                          className="calendar-sm"
                          onIonChange={(e) => {
                            const value = e.detail.value;
                            if (typeof value === 'string') {
                              setSelectedDateFrom(value);
                              setShowCalendarFrom(false);
                            }
                          }}
                        />
                      </IonPopover>
                    </IonCol>

                    <IonCol size="6" className="dropdown-col">
                      <IonLabel className="dropdown-label">From</IonLabel>
                      <div className="date-input" id="memoDateTo-trigger">
                        <IonInput placeholder="Select date" value={selectedDateTo} readonly={true} />
                        <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarTo(true)} />
                      </div>
                      <IonPopover isOpen={showCalendarTo} trigger="memoDateTo-trigger" onDidDismiss={() => setShowCalendarTo(false)} showBackdrop={false} side="bottom" alignment="center">
                        <IonDatetime
                          presentation="date"
                          className="calendar-sm"
                          onIonChange={(e) => {
                            const value = e.detail.value;
                            if (typeof value === 'string') {
                              setSelectedDateTo(value);
                              setShowCalendarTo(false);
                            }
                          }}
                        />
                      </IonPopover>
                    </IonCol>

                  </IonRow>
                </div>
              </IonItem>

              <IonItemDivider />              
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Purchase Date</IonLabel>
                  <IonRow className="dropdown-row">
                    <IonCol size="6" className="dropdown-col">
                      <IonLabel className="dropdown-label">From</IonLabel>
                      <div className="date-input" id="purchaseDateFrom-trigger">
                        <IonInput placeholder="Select date" value={selectedDateFrom} readonly={true} />
                        <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarFrom(true)} />
                      </div>
                      <IonPopover isOpen={showCalendarFrom} trigger="purchaseDateFrom-trigger" onDidDismiss={() => setShowCalendarFrom(false)} showBackdrop={false} side="bottom" alignment="center">
                        <IonDatetime
                          presentation="date"
                          className="calendar-sm"
                          onIonChange={(e) => {
                            const value = e.detail.value;
                            if (typeof value === 'string') {
                              setSelectedDateFrom(value);
                              setShowCalendarFrom(false);
                            }
                          }}
                        />
                      </IonPopover>
                    </IonCol>

                    <IonCol size="6" className="dropdown-col">
                      <IonLabel className="dropdown-label">From</IonLabel>
                      <div className="date-input" id="purchaseDateTo-trigger">
                        <IonInput placeholder="Select date" value={selectedDateTo} readonly={true} />
                        <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarTo(true)} />
                      </div>
                      <IonPopover isOpen={showCalendarTo} trigger="purchaseDateTo-trigger" onDidDismiss={() => setShowCalendarTo(false)} showBackdrop={false} side="bottom" alignment="center">
                        <IonDatetime
                          presentation="date"
                          className="calendar-sm"
                          onIonChange={(e) => {
                            const value = e.detail.value;
                            if (typeof value === 'string') {
                              setSelectedDateTo(value);
                              setShowCalendarTo(false);
                            }
                          }}
                        />
                      </IonPopover>
                    </IonCol>

                  </IonRow>
                </div>
              </IonItem>

              <IonItemDivider />
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Memo In</IonLabel>
                  <IonGrid className="checkbox-grid">
                    <IonRow>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonRadio slot="start" className="rounded-radio" />
                          <IonLabel>Yes</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonRadio slot="start" className="rounded-radio" />
                          <IonLabel>No</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonRadio slot="start" className="rounded-radio" />
                          <IonLabel>Any</IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </IonItem>

              <IonItemDivider />
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">On Hold</IonLabel>
                  <IonGrid className="checkbox-grid">
                    <IonRow>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonRadio slot="start" className="rounded-radio" />
                          <IonLabel>Yes</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonRadio slot="start" className="rounded-radio" />
                          <IonLabel>No</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonRadio slot="start" className="rounded-radio" />
                          <IonLabel>Any</IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </IonItem>              

              <IonItemDivider />              
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Stones T. Price</IonLabel>
                  <IonList className='select-content'>                    
                    <IonItem>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>                    
                  </IonList>
                </div>
              </IonItem>

              <IonItemDivider />
              <IonItem>
                <div className="select-container">                    
                  <IonList className='select-content'>
                    <IonItem>
                      <IonLabel position="fixed">In House Location</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>                    
                  </IonList>
              </div>
              </IonItem>

              <IonItemDivider />
              <IonItem>
                <div className="select-container">                    
                  <IonList className='select-content'>
                    <IonItem>
                      <IonLabel position="fixed">Price</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>             
                    <IonItem>
                      <IonLabel position="fixed">Code</IonLabel>
                      <IonInput placeholder="-" />
                    </IonItem>   
                    <IonItem>
                      <IonLabel position="fixed">Returned to Vendor</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>   
                    <IonItem>
                      <IonLabel position="fixed">Filter</IonLabel>
                      <IonInput placeholder="-" />
                    </IonItem>        
                  </IonList>
              </div>
              </IonItem>

              <IonItemDivider />
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Custom Fields</IonLabel>


                  <IonList className='select-content'>
                    <IonItem>
                      <IonLabel position="fixed">Custom Field 1</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
    
                    <IonItem>
                      <IonLabel position="fixed">Custom Field 2</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
    
                    <IonItem>
                      <IonLabel position="fixed">Custom Field 3</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
    
                    <IonItem>
                      <IonLabel position="fixed">Custom Field 4</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
    
                    <IonItem>
                      <IonLabel position="fixed">Custom Field 5</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
    
                    <IonItem>
                      <IonLabel position="fixed">Custom Field 6</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
    
                    <IonItem>
                      <IonLabel position="fixed">Custom Field 7</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
    
                    <IonItem>
                      <IonLabel position="fixed">Custom Field 8</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>  
                  </IonList>



                  
                </div>
              </IonItem>
              <IonItemDivider />
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Select</IonLabel>
                  <IonGrid className="checkbox-grid">
                    <IonRow>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonCheckbox slot="start" className="rounded-checkbox" />
                          <IonLabel>On Memo</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonCheckbox slot="start" className="rounded-checkbox" />
                          <IonLabel>Sold Out</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonCheckbox slot="start" className="rounded-checkbox" />
                          <IonLabel>On Hand</IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </IonItem>
              <IonItemDivider />
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Sort Fields</IonLabel>
                    <IonGrid className="desc-table">
                      
                      <IonRow>
                        <IonCol size="1">1</IonCol>
                        <IonCol size="8">
                          <IonSelect placeholder="Select" interface="popover" className="corner-select">
                            <IonSelectOption value="opt1">Option 1</IonSelectOption>
                            <IonSelectOption value="opt2">Option 2</IonSelectOption>
                            <IonSelectOption value="opt3">Option 3</IonSelectOption>
                          </IonSelect>
                        </IonCol>
                        <IonCol size="1">
                          <IonCheckbox className="rounded-checkbox2" />
                        </IonCol>
                        <IonCol size="2" className="desc-label">Desc</IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol size="1">2</IonCol>
                        <IonCol size="8">
                          <IonSelect placeholder="Select" interface="popover" className="corner-select">
                            <IonSelectOption value="opt1">Option 1</IonSelectOption>
                            <IonSelectOption value="opt2">Option 2</IonSelectOption>
                            <IonSelectOption value="opt3">Option 3</IonSelectOption>
                          </IonSelect>
                        </IonCol>
                        <IonCol size="1">
                          <IonCheckbox className="rounded-checkbox2" />
                        </IonCol>
                        <IonCol size="2" className="desc-label">Desc</IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol size="1">3</IonCol>
                        <IonCol size="8">
                          <IonSelect placeholder="Select" interface="popover" className="corner-select">
                            <IonSelectOption value="opt1">Option 1</IonSelectOption>
                            <IonSelectOption value="opt2">Option 2</IonSelectOption>
                            <IonSelectOption value="opt3">Option 3</IonSelectOption>
                          </IonSelect>
                        </IonCol>
                        <IonCol size="1">
                          <IonCheckbox className="rounded-checkbox2" />
                        </IonCol>
                        <IonCol size="2" className="desc-label">Desc</IonCol>
                      </IonRow>

                      <IonRow>
                        <IonCol size="12" className="text-right"> 
                          <IonButton fill="clear" className="view-total-btn">Sort</IonButton>
                        </IonCol>                       
                      </IonRow>

                    </IonGrid> 

                </div>
              </IonItem>
            </IonList>
            
          </IonContent>

          <div className="modal-footer">
            <IonButton className="modal-close" fill="outline" onClick={() => dismissModules()}>
              Clear
            </IonButton>
            <IonButton className="modal-show" onClick={() => console.log("Show results clicked")}>
              Show Results (200)
            </IonButton>
          </div>

        </IonModal>

    </IonPage>

  );
};

export default WatchSearch;
