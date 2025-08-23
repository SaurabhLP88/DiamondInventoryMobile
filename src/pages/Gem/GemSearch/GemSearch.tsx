
import { useRef, useState } from "react";
import { IonPage, IonContent, IonButton, IonIcon, IonCheckbox, IonCol, IonRow, IonModal, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonItemDivider, IonGrid, IonSelect, IonSelectOption, IonInput,  IonRadio, IonSegment, IonSegmentButton  } from '@ionic/react'; //IonPopover, IonDatetime,
import { pencilOutline, eyeOutline, chevronBack, chevronForward, optionsOutline, closeOutline, } from "ionicons/icons"; //addOutline, close, calendarOutline
import { PiListNumbers, PiScroll } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { GrTag, GrCertificate } from "react-icons/gr";

import TopHeader from '../../../components/TopHeader/TopHeader';
import BottomNavigation from '../../../components/BottomNavs/BottomNavs';
import './GemSearch.css';

const columnNames = [
  "Stock#", "Color", "Clarity", "Total Cost", "Total Sell Price", "Carat On Jewel", "Cert. Comments", "Customer", "Cost / Ct", "Size", "Qty On Jewel", "Treatment", "Color Code", "On Memo"
];

const GemSearch: React.FC = () => {

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

  const [activeTab, setActiveTab] = useState('tab1');

  /*const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const toggleButton = (label: string) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  const buttons = ['All', 'Individual Stones', 'Parcel Stones'];*/

  const jewelSearchTabs = [
    { tab: "home", href: "/home", icon: <PiListNumbers className="icon" />, label: "Num. All" },
    { tab: "search", href: "/search", icon: <GoHistory className="icon" />, label: "History" },
    { tab: "add", href: "/add", icon: <GrTag className="icon" />, label: "Print Tag" },
    { tab: "likes", href: "/likes", icon: <PiScroll className="icon" />, label: "Print Label" },
    { tab: "profile", href: "/profile", icon: <GrCertificate className="icon" />, label: "Print Cert." }
  ];

  /*const [selectedDateFrom, setSelectedDateFrom] = useState('');
  const [showCalendarFrom, setShowCalendarFrom] = useState(false);

  const [selectedDateTo, setSelectedDateTo] = useState('');
  const [showCalendarTo, setShowCalendarTo] = useState(false);*/

  return (
    <IonPage className="gem-search bg-gradient">

        {/* Header */}
        <TopHeader pageTitle="Gem Search" />

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
        <BottomNavigation tabs={jewelSearchTabs} />

        <IonModal id="gemSearchModal" className="full-filter-modal filter-modal" ref={modalFilter} backdropDismiss={true} isOpen={filterShowModal} onDidDismiss={() => filterSetShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Filters ( 5 selected )</IonTitle>
              <IonIcon icon={closeOutline} onClick={() => dismissModules()} slot="end" />
            </IonToolbar>
          </IonHeader>
          <IonContent scrollY={true}>            

            <IonSegment className="tabs-segment" value={activeTab} onIonChange={e => setActiveTab(e.detail.value as string)}>
              <IonSegmentButton value="tab1">
                <IonLabel>Search</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="tab2">
                <IonLabel>Advanced</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="tab3">
                <IonLabel>Export</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            
            {activeTab === 'tab1' && (
            <IonList className="line-separator">
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Search By</IonLabel>
                    
                  <IonList className='select-content'>
                    <IonItem>
                      <IonLabel position="fixed">Gem Stone</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Shape</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Color</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Clarity</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Lab</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Treatment</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    
                    <IonItem>
                      <IonLabel position="fixed">Carat</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Stone#</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Size</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                      <span className="input-separator-text">To</span>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>                    
                    <IonItem>
                      <IonLabel position="fixed">Sell Price</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
              </div>
              </IonItem>
              
            </IonList>
          )}

          {activeTab === 'tab2' && (
            <IonList className="line-separator">
              <IonItem>
                <IonLabel position="fixed">Sell Price</IonLabel>
                <IonSelect placeholder="Select" interface="popover" className="corner-select">
                  <IonSelectOption value="opt1">Option 1</IonSelectOption>
                  <IonSelectOption value="opt2">Option 2</IonSelectOption>
                  <IonSelectOption value="opt3">Option 3</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
          )}

          {activeTab === 'tab3' && (
            <IonList className="line-separator">
              <IonItem>
                <IonLabel position="fixed">Sell Price</IonLabel>
                <IonSelect placeholder="Select" interface="popover" className="corner-select">
                  <IonSelectOption value="opt1">Option 1</IonSelectOption>
                  <IonSelectOption value="opt2">Option 2</IonSelectOption>
                  <IonSelectOption value="opt3">Option 3</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
          )}

          <IonList className="line-separator">
            
              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Stone Status</IonLabel>
                  <IonGrid className="checkbox-grid">
                    <IonRow>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonCheckbox slot="start" className="rounded-checkbox" />
                          <IonLabel>On Hold</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonCheckbox slot="start" className="rounded-checkbox" />
                          <IonLabel>Mounted</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonCheckbox slot="start" className="rounded-checkbox" />
                          <IonLabel>On Memo</IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </div>
              </IonItem>
              <IonItemDivider />

              <IonItem>
                <div className="select-container">
                  <IonLabel className="tabs-title">Reserve</IonLabel>
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
                  <IonLabel className="tabs-title">Sold</IonLabel>
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

export default GemSearch;
