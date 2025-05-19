
import { useRef, useState } from "react";
import { IonPage, IonContent, IonButton, IonIcon, IonCheckbox, IonCol, IonRow, IonModal, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonItemDivider, IonSegment, IonSegmentButton, IonGrid, IonSelect, IonSelectOption, IonRadio, IonInput  } from '@ionic/react';
import { pencilOutline, eyeOutline, chevronBack, chevronForward, optionsOutline, closeOutline, addOutline, close } from "ionicons/icons";
import { PiListNumbers, PiScroll } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { GrTag, GrCertificate } from "react-icons/gr";

import TopHeader from '../../../components/TopHeader/TopHeader';
import BottomNavigation from '../../../components/BottomNavs/BottomNavs';
import './JewelSearch.css';

const columnNames = [
  "Stone", "Qty", "Shape", "Carat", "Memo", "On Memo To", "Color", "Clarity", "Cut", "Polish", "Symm.",
  "Fluor.", "Measur.", "Depth", "Table", "Girdle", "Culet", "Cert.", "Lab", "RAP", "Cost/PC", "%Sell",
  "-RAP", "Total Cost", "Sell P/C", "Total Sale", "Markup%", "Margin%"
];

const optionsDefault = [
  "On-Hand", "On-Memo", "Sold", "Mounted", "Committed", "Memo-in", "Matching", "No Memo-In"
];
const optionsCertified = [
  "Any Cert.", "No Cert.", "AGS", "EGL", "GIA", "Globien", "HRD", "IGI", "Matching"
];
const optionsTreatment = [
  "CE", "COL", "CVD", "HPHT", "IRR", "LD", "N", "OT"
];


const JewelSearch: React.FC = () => {

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

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const toggleButton = (label: string) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };
  const buttons = ['All', 'Individual Stones', 'Parcel Stones'];

  const jewelSearchTabs = [
    { tab: "home", href: "/home", icon: <PiListNumbers className="icon" />, label: "Num. All" },
    { tab: "search", href: "/search", icon: <GoHistory className="icon" />, label: "History" },
    { tab: "add", href: "/add", icon: <GrTag className="icon" />, label: "Print Tag" },
    { tab: "likes", href: "/likes", icon: <PiScroll className="icon" />, label: "Print Label" },
    { tab: "profile", href: "/profile", icon: <GrCertificate className="icon" />, label: "Print Cert." }
  ];
  

  return (
    <IonPage className="bg-gradient">

        {/* Header */}
        <TopHeader pageTitle="Jewel Search" />

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
              <table className="custom-table">
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
                <IonCol size="4">Total Quantity <span>22</span> </IonCol>
                <IonCol size="4">Total Carats <span>40.56</span> </IonCol>
                <IonCol size="4">Total Price <span>$400,115.65</span> </IonCol>
              </IonRow>

            </div>
            
          </div>

        </IonContent>

        {/* Bottom Navigation */}
        <BottomNavigation tabs={jewelSearchTabs} />

        <IonModal id="filter-modal" className="full-modal filter-modal" ref={modalFilter} backdropDismiss={true} isOpen={filterShowModal} onDidDismiss={() => filterSetShowModal(false)}>
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
              <IonGrid className="checkbox-grid">
                {[0, 1, 2].map((row) => (
                  <IonRow key={row}>
                    {[0, 1, 2].map((col) => {
                      const index = row * 3 + col;
                      if (index >= 8) return null;
                      return (
                        <IonCol key={col} size="4" className="ion-text-center">
                          <IonItem lines="none">
                            <IonCheckbox slot="start" className="rounded-checkbox" />
                            <IonLabel>{optionsDefault[index]}</IonLabel>
                          </IonItem>
                        </IonCol>
                      );
                    })}
                  </IonRow>
                ))}
              </IonGrid>
            </IonItem>
            <IonItemDivider />
            <IonItem>
              <div className="select-container">
                <IonLabel className="tabs-title">Type</IonLabel>
                  <div className="toggle-buttons">
                    {buttons.map((label) => (
                      <IonButton
                        key={label}
                        onClick={() => toggleButton(label)}
                        className={`toggle-btn ${selectedButtons.includes(label) ? 'selected' : ''}`}
                      >
                      <IonIcon
                        slot="start"
                        icon={selectedButtons.includes(label) ? close : addOutline}
                      />
                      {label}
                    </IonButton>
                  ))}
                </div>
            </div>
            </IonItem>
            <IonItemDivider />
            <IonItem>
              <div className="select-container">
                <IonLabel className="tabs-title">Shape</IonLabel>
                <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" >
                  <IonSelectOption value="option1">Option 1</IonSelectOption>
                  <IonSelectOption value="option2">Option 2</IonSelectOption>
                  <IonSelectOption value="option3">Option 3</IonSelectOption>
                </IonSelect>
              </div>
            </IonItem>
            <IonItemDivider />
            <IonItem>
              <IonGrid className="fromTo-table">
                {/* Table Header */}
                <IonRow className="table-header">
                  <IonCol size="2"></IonCol>
                  <IonCol size="5" className="header-label">From</IonCol>
                  <IonCol size="5" className="header-label">To</IonCol>
                </IonRow>

                {/* Stock# Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Stock#</IonCol>
                  <IonCol size="5">
                    <IonInput type="text" />
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="text" />
                  </IonCol>
                </IonRow>

                {/* Weight Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Weight</IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                </IonRow>

                {/* Size Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Size</IonCol>
                  <IonCol size="5">
                    <IonInput type="text" />
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="text" />
                  </IonCol>
                </IonRow>

                {/* Color Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Color</IonCol>
                  <IonCol>
                    <IonInput type="text" />
                  </IonCol>
                  <IonCol>
                    <IonInput type="text" />
                  </IonCol>
                </IonRow>

                {/* Clarity Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Clarity</IonCol>
                  <IonCol size="5">
                    <IonInput type="text" />
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="text" />
                  </IonCol>
                </IonRow>

                {/* Depth Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Depth</IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                </IonRow>
              </IonGrid>
                          
            </IonItem>
            <IonItemDivider />
            <IonItem>
            <div className="select-container">
              <IonLabel className="tabs-title">Certified</IonLabel>

              <IonGrid className="checkbox-grid">
                {[0, 1, 2].map((row) => (
                  <IonRow key={row}>
                    {[0, 1, 2].map((col) => {
                      const index = row * 3 + col;
                      return (
                        <IonCol key={col} size="4" className="ion-text-center">
                          <IonItem lines="none">
                            <IonRadio slot="start" className="rounded-radio" />
                            <IonLabel>{optionsCertified[index]}</IonLabel>
                          </IonItem>
                        </IonCol>
                      );
                    })}
                  </IonRow>
                ))}
              </IonGrid>
              </div>
            </IonItem>
            <IonItemDivider />
            <IonItem>
            <div className="select-container">
              <IonLabel className="tabs-title">Treatment</IonLabel>

              <IonGrid className="checkbox-grid">
                {[0, 1, 2].map((row) => (
                  <IonRow key={row}>
                    {[0, 1, 2].map((col) => {
                      const index = row * 3 + col;
                      if (index >= 8) return null;
                      return (
                        <IonCol key={col} size="4" className="ion-text-center">
                          <IonItem lines="none">
                            <IonRadio slot="start" className="rounded-radio" />
                            <IonLabel>{optionsTreatment[index]}</IonLabel>
                          </IonItem>
                        </IonCol>
                      );
                    })}
                  </IonRow>
                ))}
              </IonGrid>
              </div>
            </IonItem>
            <IonItemDivider />
            <IonItem>
              <IonRow className="dropdown-row">
                <IonCol size="6" className="dropdown-col">
                  <IonLabel className="dropdown-label">Price</IonLabel>
                  <IonSelect placeholder="Select Price" interface="popover" className="corner-select">
                    <IonSelectOption value="low">Low</IonSelectOption>
                    <IonSelectOption value="medium">Medium</IonSelectOption>
                    <IonSelectOption value="high">High</IonSelectOption>
                  </IonSelect>
                </IonCol>

                <IonCol size="6" className="dropdown-col">
                  <IonLabel className="dropdown-label">Status</IonLabel>
                  <IonSelect placeholder="Select Status" interface="popover" className="corner-select">
                    <IonSelectOption value="available">Available</IonSelectOption>
                    <IonSelectOption value="sold">Sold</IonSelectOption>
                    <IonSelectOption value="pending">Pending</IonSelectOption>
                  </IonSelect>
                </IonCol>
              </IonRow>
            </IonItem>
            <IonItemDivider />
            <IonItem>
              <IonGrid className="checkbox-grid">
                <IonRow>
                  <IonCol size="4" className="ion-text-center">
                    <IonItem lines="none">
                      <IonRadio slot="start" className="rounded-radio" />
                      <IonLabel>Archive</IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol size="4" className="ion-text-center">
                    <IonItem lines="none">
                      <IonRadio slot="start" className="rounded-radio" />
                      <IonLabel>Unarchive</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
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
                      <IonCol size="1">4</IonCol>
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
                  </IonGrid> 

              </div>
            </IonItem>
          </IonList>
          )}

        {activeTab === 'tab2' && (
          <div>
            <h2>Content for Tab 2</h2>
            <p>This is the second tab's content.</p>
          </div>
        )}

        {activeTab === 'tab3' && (
          <div>
            <h2>Content for Tab 3</h2>
            <p>This is the third tab's content.</p>
          </div>
        )}

            
          </IonContent>

          <div className="modal-footer">
            <IonButton className="modal-close" fill="outline" onClick={() => dismissModules()}>
              Close
            </IonButton>
            <IonButton className="modal-show" onClick={() => console.log("Show results clicked")}>
              Show Results (200)
            </IonButton>
          </div>

        </IonModal>

    </IonPage>

  );
};

export default JewelSearch;
