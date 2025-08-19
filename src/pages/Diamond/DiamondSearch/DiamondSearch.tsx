
import { useRef, useState , useEffect, constructor} from "react";
import { IonPage, IonContent,IonAlert, IonButton,IonLoading, IonIcon, IonCheckbox, IonCol, IonRow, IonModal, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonItemDivider, IonSegment, IonSegmentButton, IonGrid, IonSelect, IonSelectOption, IonRadio, IonInput, IonRadioGroup, IonText  } from '@ionic/react';
import { pencilOutline, eyeOutline, chevronBack, chevronForward, optionsOutline, closeOutline, addOutline, close } from "ionicons/icons";
import { PiListNumbers, PiScroll } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { GrTag, GrCertificate } from "react-icons/gr";
import { View, Button } from 'react-native';
import axios from "axios";
import Cookies from 'universal-cookie';
import { useForm, Controller } from "react-hook-form";

import TopHeader from '../../../components/TopHeader/TopHeader';
import BottomNavigation from '../../../components/BottomNavs/BottomNavs';
import './DiamondSearch.css';
import { IonSpinner } from '@ionic/react';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';

  
const columnNames = [
  "Stone", "Qty", "Shape", "Carat", "Memo", "CaratOnHand", "Color", "Clarity", "Cut", "Polish", "Symm.",
  "Fluor.", "Measur.", "Depth", "Table", "Girdle", "Culet", "Cert.", "Lab", "RAP", "Cost/PC", "%Sell",
  "-RAP", "Total Cost", "Sell P/C", "Total Sale", "Markup%", "Margin%"
]; 

const OptionsDefault = [
  "On-Hand", "On-Memo", "Sold", "Mounted", "Committed", "Memo-in", "Matching", "No Memo-In"
];
const optionsCertified = [
  "Any Cert.",  "AGS", "EGL", "GIA", "Globien", "HRD", "IGI"
];
const optionsTreatment = [
  "CE", "COL", "CVD", "HPHT", "IRR", "LD", "N", "OT"
];


const DiamondSearch: React.FC = () => {  
  
  const [formData, setFormData] = useState({});
  const [archiveStatus, setArchiveStatus] = useState("archive");
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);
  const [selectedCertified, setSelectedCertified] = useState<string>("");
  const [sendCert, setSendCert] = useState<string>("");
  const [network, setNetwork] = useState<string>("");  
  const [exportStatus, setExportStatus] = useState<string>("");
  const [exportOptions, setExportOptions] = useState<string>("");
  const [batchFtp, setBatchFtp] = useState(false);
  const [append, setAppend] = useState(false);
  const [appendSend, setAppendSend] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitnew = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
    //console.log(selectedButtons); // Log all form data
    //console.log(selectedValue);
    // Process form data, e.g., send it to an API
     setLoading(true);
    try {
      
      resetForm();
      // Handle success (e.g., display a success message, redirect)
    } catch (error) {
      console.error('Error sending data:', error);
       setLoading(false);
      // Handle error (e.g., display an error message)
    }

  };

  const resetForm = () => {
    setFormData('');
   
  };

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

  //const sampleData = Array(50).fill({});

  const modalFilter = useRef<HTMLIonModalElement>(null);  
  const dismissModules = () => modalFilter.current?.dismiss();
  const [filterShowModal, filterSetShowModal] = useState(false);

  const [activeTab, setActiveTab] = useState('tab1');

  const modalView = useRef<HTMLIonModalElement>(null);  
  const dismissViewModules = () => modalView.current?.dismiss();
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [isEditDetailsModal, setIsEditDetailsModal] = useState(false);
   const [searchDetails, setData_details] = useState([]);
  /* const searchDetails = [
    { title: "Stone#", value: "10041" },
    { title: "Shape", value: "PR" },
    { title: "On Hand", value: "1" },
    { title: "Color", value: "I" },
    { title: "Clarity", value: "VS1" },
    { title: "Lab", value: "GIA" },
    { title: "Cert#", value: "1169866377" },
    { title: "Rap Price", value: "3500" },
    { title: "Cost/Ct", value: "2982.00" },
    { title: "Cost Code", value: "LJBL" },
    { title: "-Rap Cost", value: "-14.80" },
    { title: "Sell/Ct", value: "1650.00" },
    { title: "-Rap Sell", value: "-52.86" },
    { title: "Total Sell", value: "1551.00" },
    { title: "Qty On Memo", value: "0" },
    { title: "Memo", value: "0.00" },
    { title: "On Memo To	", value: "0" },
    { title: "Sold", value: "0" },
    { title: "Sold to", value: "0" },
    { title: "On Jewelry", value: "0" },
    { title: "Depth", value: "70.1" },
    { title: "Table", value: "71" },
    { title: "Measurements", value: "5.45x5.30x3.72" },
    { title: "Cut", value: "0" },
    { title: "Fluorescence", value: "N" },
    { title: "Symmetry", value: "VG" },
    { title: "Culet", value: "NON" },
    { title: "Girdle", value: "tn-tk-f" },
    { title: "Matching Pair	", value: "0" },
    { title: "Profit$", value: "-1769.08" },
    { title: "Cert. Comments	", value: "0" },
  ];
 */

  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const toggleButton = (label: string) => {
    setSelectedButtons((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
        
    );
    handleChange(event);
  };
  const buttons = ['All', 'Individual Stones', 'Parcel Stones'];

  

  const [shapedata, setData_shape] = useState([]);
  const [colordata, setData_color] = useState([]);
  const [claritydata, setData_clarity] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 const cookies = new Cookies();
 const account_type = sessionStorage.getItem('account_type');
 const account =account_type?account_type:cookies.get('account_type');
 const [selectedValue, setSelectedValue] = useState('');
 const [otherdata, setDataother] = useState('');
 const handleSelectChange = (event) => {
   setSelectedValue(event.detail.value);
   
 };

  const  TotalQTY = data.reduce((totalquantity, meal) => totalquantity + parseInt(meal.Qty, 10), 0);
  const  TotalCarat = data.reduce((totalCara, meal) => totalCara + parseInt(meal.Carat, 10), 0);
  const  TotSellPrice = data.reduce((totalPrice, meal) => totalPrice + parseInt(meal.TotSellPrice, 10), 0);
  const formattedTotalCarat = new Intl.NumberFormat('en-US').format(TotalCarat);
  const formattedCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(TotSellPrice);
  /* if (loading) {
    return <IonContent><p>Loading...</p></IonContent>;
  } */

  if (error) {
    return <IonContent><p>Error: {error}</p></IonContent>;
  }
  
 
  const [checkboxValues, setCheckboxValues] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState('');
  const [webViewUrl, setWebViewUrl] = useState('');

   const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxValues((prev) => ({ ...prev, [name]: checked }));
    };

const [showModal, setShowModal] = useState(false);

  async function openPdf(pdfUrl: string) {
  try {
  const fileOpenerOptions: FileOpenerOptions = {
    filePath: pdfUrl,
    contentType: 'application/pdf',
    openWithDefault: true,
  };
  await FileOpener.open(fileOpenerOptions);
} catch (e) {
  console.log('Error opening file', e);
}
}
  


    const diamondSearchTabs = [
    { tab: "home", href: "/home", icon: <PiListNumbers className="icon" />, label: "Num. All" },
    { tab: "search", href: "/search", icon: <GoHistory className="icon" />, label: "History"  },
    { tab: "add", href: "/add", icon: <GrTag className="icon" />, label: "Print Tag"  },
    { tab: "likes", href: "/likes", icon: <PiScroll className="icon" />, label: "Print Label" },
    { tab: "profile", href: "/profile", icon: <GrCertificate className="icon" />, label: "Print Cert." }
  ];

  return (
    
    <IonPage className="bg-gradient">

        {/* Header */}
        <TopHeader pageTitle="Diamond Search" />

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
                  <>
                  {loading ? (
        <IonLoading
        isOpen={loading}
        onDidDismiss={() => setLoading(false)}
        message={'Loading data...'}
        duration={5000} // Optional: Set a maximum duration
      >
        {/* Optional: You can add more content to the loading overlay */}
      </IonLoading>
      ) : (
                  <>
                  {data.map(prod => (
                    <tr key={prod.StoneNumber}>
                      <td><input type="hidden" name={prod.StoneNumber} id={prod.StoneNumber} value={prod.CertPicture} /><IonCheckbox className="circle-checkbox"  name={prod.StoneNumber} value={prod.StoneNumber} onIonChange={handleCheckboxChange}/></td>
                      
                        <td >{prod.StoneNumber}</td>
                        <td >{prod.Qty}</td>
                        <td >{prod.Shape}</td>
                        <td >{prod.Carat}</td>
                        <td >{prod.QtyOnMemo}</td>
                        <td >{prod.CaratOnHand}</td>
                        <td >{prod.Color}</td>
                        <td >{prod.Clarity}</td>
                        <td >{prod.Cut}</td>
                        <td >{prod.Polish}</td>
                        <td >{prod.Symmetry}</td>
                        <td >{prod.Fluorescence}</td>
                        <td >{prod.Dimension}</td>
                        <td >{prod.Depth}</td>
                        <td >{prod.TablePercen}</td>
                        <td >{prod.Girdle}</td>
                        <td >{prod.Culet}</td>
                        <td >{prod.CertNumber}</td>
                        <td >{prod.Lab}</td>
                        <td >{prod.RapPrice}</td>
                        <td >{prod.CostCt}</td>
                        <td >{prod.filterprice}</td>
                        <td >{prod.PercentRap}</td>
                        <td >{prod.TotCost}</td>
                        <td >{prod.filterprice}</td>
                        <td >{prod.TotSellPrice}</td>
                        <td >{prod.markup}</td>
                        <td >{prod.margin}</td>
                        <td>{/*<IonIcon icon={pencilOutline} className="action-icon" onClick={() => { setIsEditDetailsModal(true); setViewDetailsModal(true); }} />*/}</td> 
                      <td><IonIcon icon={eyeOutline} className="action-icon" onClick={() => {openModal(prod.StoneNumber)}} /></td>
                    </tr>
                  ))}
                   </>
                  )}
                    </>
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <IonRow>
                <IonCol size="4">Total Quantity <span>{TotalQTY}</span> </IonCol>
                <IonCol size="4">Total Carats <span>{ formattedTotalCarat }
               </span> </IonCol>
                <IonCol size="4">Total Price <span>{formattedCurrency}</span> </IonCol>
              </IonRow>

            </div>
            
          </div>
             <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Alert'}
        message={result}
        buttons={['OK']}
      />
          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
       
        <iframe
          src={webViewUrl}
          title="Example Iframe"
          width="100%"
          height="500px"
          frameBorder="0"
           allowFullScreen 
           
           
        />
        
        <IonButton onClick={() => setShowModal(false)}>Close </IonButton>
        <p>&nbsp;

        </p>
      </IonModal>
        </IonContent>

        {/* Bottom Navigation */}
        <BottomNavigation tabs={diamondSearchTabs} />
           
        <IonModal id="diamondSearchModal" className="full-filter-modal filter-modal" ref={modalFilter} backdropDismiss={true} isOpen={filterShowModal} onDidDismiss={() => filterSetShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Filters </IonTitle>
              <IonIcon icon={closeOutline} onClick={() => dismissModules()} slot="end" />
            </IonToolbar>
          </IonHeader>
          <IonContent scrollY={true}>          
          <form onSubmit={handleSubmitnew} >
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
          
          <div className="modal-section">
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
                            <IonCheckbox slot="start" className="rounded-checkbox" name={`sort[${index}]`} value={OptionsDefault[index]} onIonChange={handleChange}
             />
                            <IonLabel>{OptionsDefault[index]}</IonLabel>
                          </IonItem>
                        </IonCol>
                      );
                    })}
                  </IonRow>
                ))}
              </IonGrid>
            </IonItem>
            <IonItemDivider />
            {/*<IonItem>
              <div className="select-container">
                <IonLabel className="tabs-title">Type</IonLabel>
                  <div className="toggle-buttons">
                    {buttons.map((label, index) => (
                      <IonButton
                        key={label}
                        onClick={() => toggleButton(label)}
                        className={`toggle-btn ${selectedButtons.includes(label) ? 'selected' : ''}`}
                        name={`type[${index}]`} value={label} 
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
            <IonItemDivider />*/}
            <IonItem>
              <div className="select-container">
                <IonLabel className="tabs-title">Shape</IonLabel>
                <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="shape" value={formData.shape || ''}
      onChange={handleChange} multiple={true}>
                {shapedata.map(shape => (
                  <IonSelectOption value={shape.Code}>{shape.ShapeDescription}</IonSelectOption>
                ))}
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
                    <IonInput type="text" name="from_stock" value={formData.from_stock || ''} onChange={handleChange}/>
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="text" name="to_stock" value={formData.to_stock || ''} onChange={handleChange}/>
                  </IonCol>
                </IonRow>

                {/* Weight Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Weight</IonCol>
                  <IonCol size="5">
                    <IonInput type="number" name="from_weight" value={formData.from_weight || ''} onChange={handleChange}/>
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="number" name="to_weight" value={formData.to_weight || ''} onChange={handleChange}/>
                  </IonCol>
                </IonRow>

                {/* Size Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Size</IonCol>
                  <IonCol size="5">
                    <IonInput type="text" name="from_size" value={formData.from_size || ''} onChange={handleChange}/>
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="text" name="to_size" value={formData.to_size || ''} onChange={handleChange}/>
                  </IonCol>
                </IonRow>

                {/* Color Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Color</IonCol>
                  <IonCol size="5">
                  <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="from_color" value={formData.from_color || ''}
      onChange={handleChange} >
                {colordata.map(color => (
                  <IonSelectOption value={color.Code}>{color.Code}</IonSelectOption>
                ))}
                </IonSelect>
                  </IonCol>
                  <IonCol size="5">
                  <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="to_color" value={formData.to_color || ''}
      onChange={handleChange} >
                {colordata.map(color => (
                  <IonSelectOption value={color.Code}>{color.Code}</IonSelectOption>
                ))}
                </IonSelect>
                  </IonCol>
                </IonRow>

                {/* Clarity Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Clarity</IonCol>
                  <IonCol size="5">
                  <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="from_clarity" value={formData.from_clarity || ''}
      onChange={handleChange} >
                {claritydata.map(clarity => (
                  <IonSelectOption value={clarity.Code}>{clarity.Code}</IonSelectOption>
                ))}
                </IonSelect>
                  </IonCol>
                  <IonCol size="5">
                  <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="to_clarity" value={formData.to_clarity || ''}
      onChange={handleChange} >
                {claritydata.map(clarity => (
                  <IonSelectOption value={clarity.Code}>{clarity.Code}</IonSelectOption>
                ))}
                </IonSelect>
                  </IonCol>
                </IonRow>

                {/* Depth Row */}
                <IonRow>
                  <IonCol size="2" className="row-label">Depth</IonCol>
                  <IonCol size="5">
                    <IonInput type="number" name="from_depth" value={formData.from_depth || ''} onChange={handleChange}/>
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="number" name="to_depth" value={formData.to_depth || ''} onChange={handleChange}/>
                  </IonCol>
                </IonRow>

                {/* Carat Row */}
                {/* <IonRow>
                  <IonCol size="2" className="row-label">Carat</IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                </IonRow> */}

                {/* Table Row */}
                {/* <IonRow>
                  <IonCol size="2" className="row-label">Table</IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                </IonRow> */}

                {/* Ratio Row */}
                {/* <IonRow>
                  <IonCol size="2" className="row-label">Ratio</IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                  <IonCol size="5">
                    <IonInput type="number" />
                  </IonCol>
                </IonRow> */}

              </IonGrid>
                          
            </IonItem>
            <IonItemDivider />
            <IonItem>
              <div className="select-container">
                <IonLabel className="tabs-title">Certified</IonLabel>
                <IonRadioGroup className="radio-group-style" value={selectedCertified} onIonChange={(e) => setSelectedCertified(e.detail.value)}>
                  <IonGrid className="checkbox-grid">
                    {[0, 1, 2].map((row) => (
                      <IonRow key={row}>
                        {[0, 1, 2].map((col) => {
                          const index = row * 3 + col;
                          if (index >= optionsCertified.length) return null;
                          return (
                            <IonCol key={col} size="4" className="ion-text-center">
                              <IonItem lines="none">
                                <IonCheckbox slot="start" className="rounded-checkbox" value={optionsCertified[index]} />
                               {/*  <IonRadio slot="start" className="rounded-radio" value={optionsCertified[index]} /> */}
                                <IonLabel>{optionsCertified[index]}</IonLabel>
                              </IonItem>
                            </IonCol>
                          );
                        })}
                      </IonRow>
                    ))}
                  </IonGrid>
                </IonRadioGroup>
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
                      if (index >= optionsTreatment.length) return null;

                      const option = optionsTreatment[index];
                      const isChecked = selectedTreatments.includes(option);

                      const handleCheckboxChange = () => {
                        setSelectedTreatments((prevSelected) => {
                          if (isChecked) {
                            return prevSelected.filter(item => item !== option);
                          } else {
                            return [...prevSelected, option];
                          }
                        });
                      };

                      return (
                        <IonCol key={col} size="4" className="ion-text-center">
                          <IonItem lines="none">
                            <IonCheckbox slot="start" className="rounded-checkbox" onIonChange={handleCheckboxChange} checked={isChecked} />
                            <IonLabel>{option}</IonLabel>
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
                  <IonSelect placeholder="Select Price" interface="popover" className="corner-select" name="price" value={formData.price || ''}
      onChange={handleChange}>
                    <IonSelectOption value="SellPrice">Price1</IonSelectOption>
                    <IonSelectOption value="SellPrice2">Price2</IonSelectOption>
                    <IonSelectOption value="SellPrice3">Price3</IonSelectOption>
                    <IonSelectOption value="SellPrice4">Price4</IonSelectOption>
                    <IonSelectOption value="SellPrice5">Price5</IonSelectOption>
                    <IonSelectOption value="SellPrice6">Price6</IonSelectOption>
                    <IonSelectOption value="SellPrice7">Price7</IonSelectOption>
                  </IonSelect>
                </IonCol>

                <IonCol size="6" className="dropdown-col">
                  <IonLabel className="dropdown-label">Status</IonLabel>
                  <IonSelect placeholder="Select Status" interface="popover" className="corner-select" name="status" value={formData.status || ''}
      onChange={handleChange}>
                    <IonSelectOption value="available">Available</IonSelectOption>
                    <IonSelectOption value="sold">Sold</IonSelectOption>
                    {/* <IonSelectOption value="pending">Pending</IonSelectOption> */}
                  </IonSelect>
                </IonCol>
              </IonRow>
            </IonItem>
            <IonItemDivider />
            <IonItem>
              <IonRadioGroup className="radio-group-style" value={archiveStatus} onIonChange={(e) => setArchiveStatus(e.detail.value)}>
                <IonGrid className="checkbox-grid">
                  <IonRow>
                    <IonCol size="4" className="ion-text-center">
                      <IonItem lines="none">
                        <IonRadio slot="start" className="rounded-radio" value="archive" />
                        <IonLabel>Archive</IonLabel>
                      </IonItem>
                    </IonCol>
                    <IonCol size="4" className="ion-text-center">
                      <IonItem lines="none">
                        <IonRadio slot="start" className="rounded-radio" value="unarchive" />
                        <IonLabel>Unarchive</IonLabel>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonRadioGroup>
            </IonItem>
          </IonList>
          )}

            {activeTab === 'tab2' && (
              <IonList className="line-separator">
                <IonItem>
                  <IonList className='select-content'>                    
                    <IonItem>
                      <IonLabel position="fixed">Vendor</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Customer</IonLabel>
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
                    <IonItem>
                      <IonLabel position="fixed">Memo In</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Memo Misc</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Lot</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Certificate#</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Customer List</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
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
                      <IonLabel position="fixed">Purchase Date</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Memo / Invoice Date</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Total</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonInput placeholder="-" />
                      <span className="input-separator-text">To</span>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">Size</IonLabel>
                      <span className="input-separator-text">From</span>
                      <IonSelect placeholder="From" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                      <span className="input-separator-text">To</span>
                      <IonSelect placeholder="To" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </IonItem>
                <IonItemDivider />
              </IonList>
            )}            


            {activeTab === 'tab3' && (
              <IonList className="line-separator">
                <IonItem>
                  <IonGrid className="checkbox-grid">
                    <IonRow>
                      <IonCol size="4" className="ion-text-center">
                        <IonItem lines="none">
                          <IonCheckbox slot="start" className="rounded-checkbox" checked={batchFtp} onIonChange={(e) => setBatchFtp(e.detail.checked)} />
                          <IonLabel>Batch FTP</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="3" className="ion-text-center">
                        <IonItem lines="none">
                          <IonCheckbox slot="start" className="rounded-checkbox" checked={append} onIonChange={(e) => setAppend(e.detail.checked)} />
                          <IonLabel>Append</IonLabel>
                        </IonItem>
                      </IonCol>
                      <IonCol size="5" className="ion-text-center">
                        <IonItem lines="none">
                          <IonCheckbox slot="start" className="rounded-checkbox" checked={appendSend} onIonChange={(e) => setAppendSend(e.detail.checked)} />
                          <IonLabel>Append & Send</IonLabel>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
                <IonItemDivider />
                <IonItem>
                  <IonList className='select-content'>
                    <IonItem>
                      <IonLabel position="fixed">Key to Symbol</IonLabel>
                      <IonInput placeholder="-" />
                    </IonItem>
                    <IonItem>
                      <IonLabel position="fixed">In House Location</IonLabel>
                      <IonSelect placeholder="Select" interface="popover" className="corner-select">
                        <IonSelectOption value="opt1">Option 1</IonSelectOption>
                        <IonSelectOption value="opt2">Option 2</IonSelectOption>
                        <IonSelectOption value="opt3">Option 3</IonSelectOption>
                      </IonSelect>
                    </IonItem>
                  </IonList>
                </IonItem>
                <IonItemDivider />
                <IonItem>
                  <div className="select-container">
                    <IonLabel className="tabs-title">Status</IonLabel>
                    <IonList className='select-content'>
                      <IonItem>
                        <IonLabel position="fixed">On Memo</IonLabel>
                        <IonInput placeholder="-" />
                      </IonItem>
                      <IonItem>
                        <IonLabel position="fixed">Guaranteed (On Hand)</IonLabel>
                        <IonInput placeholder="-" />
                      </IonItem>
                      <IonItem>
                        <IonLabel position="fixed">Guaranteed Cash</IonLabel>
                        <IonInput placeholder="-" />
                      </IonItem>
                    </IonList>
                    </div>
                </IonItem>
                <IonItemDivider />
                <IonItem>
                  <div className="select-container">
                    <IonLabel className="tabs-title">Send Certificates</IonLabel>
                      <IonRadioGroup className="radio-group-style" value={sendCert} onIonChange={(e) => setSendCert(e.detail.value)}>
                        <IonGrid className="checkbox-grid">
                          <IonRow>
                            <IonCol size="4" className="ion-text-center">
                              <IonItem lines="none">
                                <IonRadio slot="start" className="rounded-radio" value="sendCertYes" />
                                <IonLabel>Yes</IonLabel>
                              </IonItem>
                            </IonCol>
                            <IonCol size="4" className="ion-text-center">
                              <IonItem lines="none">
                                <IonRadio slot="start" className="rounded-radio" value="sendCertNo" />
                                <IonLabel>No</IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonRadioGroup>
                    </div>
                </IonItem>
                <IonItemDivider />
                <IonItem>
                  <div className="select-container">
                    <IonLabel className="tabs-title">Export</IonLabel>
                      <IonRadioGroup className="radio-group-style" value={exportOptions} onIonChange={(e) => setExportOptions(e.detail.value)}>
                        <IonGrid className="checkbox-grid">
                          <IonRow>
                            <IonCol size="4" className="ion-text-center">
                              <IonItem lines="none">
                                <IonRadio slot="start" className="rounded-radio" value="exportOptionsYes" />
                                <IonLabel>Yes</IonLabel>
                              </IonItem>
                            </IonCol>
                            <IonCol size="4" className="ion-text-center">
                              <IonItem lines="none">
                                <IonRadio slot="start" className="rounded-radio" value="exportOptionsNo" />
                                <IonLabel>No</IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonRadioGroup>
                    </div>
                </IonItem>
                <IonItemDivider />
                <IonItem>
                  <div className="select-container">
                    <IonLabel className="tabs-title">Certified Brand</IonLabel>
                    <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="certifiedBrand">
                      <IonSelectOption value="week">Last 1 week</IonSelectOption>
                      <IonSelectOption value="month">Last 1 month</IonSelectOption>
                      <IonSelectOption value="months">Last 6 months</IonSelectOption>
                      <IonSelectOption value="year">Last 1 year</IonSelectOption>
                    </IonSelect>
                  </div>
                </IonItem>
                
                <IonItemDivider />
                <IonItem>
                  <div className="select-container">
                    <IonLabel className="tabs-title">Network</IonLabel>
                      <IonRadioGroup className="radio-group-style" value={network} onIonChange={(e) => setNetwork(e.detail.value)} style={{ marginBottom: '5px' }}>
                        <IonGrid className="checkbox-grid">
                          <IonRow>
                            <IonCol size="4" className="ion-text-center">
                              <IonItem lines="none">
                                <IonRadio slot="start" className="rounded-radio" value="networkYes" />
                                <IonLabel>Yes</IonLabel>
                              </IonItem>
                            </IonCol>
                            <IonCol size="4" className="ion-text-center">
                              <IonItem lines="none">
                                <IonRadio slot="start" className="rounded-radio" value="networkNo" />
                                <IonLabel>No</IonLabel>
                              </IonItem>
                            </IonCol>
                          </IonRow>
                        </IonGrid>
                      </IonRadioGroup>
                      <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="networkSelection">
                        <IonSelectOption value="week">Last 1 week</IonSelectOption>
                        <IonSelectOption value="month">Last 1 month</IonSelectOption>
                        <IonSelectOption value="months">Last 6 months</IonSelectOption>
                        <IonSelectOption value="year">Last 1 year</IonSelectOption>
                      </IonSelect>
                    </div>
                </IonItem>
              </IonList>
            )}
            </div>


            <div className="modal-footer">
              <IonButton className="modal-close" fill="outline" onClick={() => dismissModules()}>
                Clear
              </IonButton>
              <IonButton className="modal-show"  type="submit" onClick={() => dismissModules()}>
                Show Results
              </IonButton>
            </div>
          </form>
        </IonContent>
      </IonModal>

      <IonModal id="viewModal" className="full-filter-modal filter-modal" ref={modalView} backdropDismiss={true} isOpen={viewDetailsModal} onDidDismiss={() => setViewDetailsModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{isEditDetailsModal ? "Edit Diamond" : "Diamond Details"}</IonTitle>
            <IonIcon icon={closeOutline} onClick={() => dismissViewModules()} slot="end" />
          </IonToolbar>
        </IonHeader>
        <IonContent scrollY={true}>
            <IonGrid className='details-grid'>
              {searchDetails.map((item, index) => (
                <IonRow className="" key={index}>
                  <IonCol size="6" className="details-title">{item.title}</IonCol>
                  <IonCol size="6" className="details-value">

                    {isEditDetailsModal ? (
                      <IonInput placeholder="-" value={item.value} />
                    ) : (
                      <IonText>{item.value}</IonText>
                    )}

                  </IonCol>
                </IonRow>
              ))}

              {!isEditDetailsModal && (
                <>
                  <IonRow className="">
                    <IonCol size="12" className="details-title">Certificate</IonCol>
                    <IonCol size="12">
                      <a href={otherdata[1]} target="_blank" rel="noopener noreferrer">
                        View Certificate PDF
                      </a>
                    </IonCol>
                  </IonRow>

                  <IonRow className="">
                    <IonCol size="12" className="details-title">Image</IonCol>
                    <IonCol size="12">
                      <img
                        src={otherdata[0]}
                        alt="Sample"
                        style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
                      />
                    </IonCol>
                  </IonRow>

                  <IonRow className="">
                    <IonCol size="12" className="details-title">Video</IonCol>
                    <IonCol size="12">
                     
                     
                      <video width="100%" controls>
                        <source src={otherdata[2]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </IonCol>
                  </IonRow>
                </>
              )}

            </IonGrid>

              
        </IonContent>
      </IonModal>

    </IonPage>
  
  );
};

export default DiamondSearch;
