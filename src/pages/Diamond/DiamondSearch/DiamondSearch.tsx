
import { useRef, useState , useEffect} from "react";
import { IonPage, IonContent, IonButton, IonIcon, IonCheckbox, IonCol, IonRow, IonModal, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonItemDivider, IonSegment, IonSegmentButton, IonGrid, IonSelect, IonSelectOption, IonRadio, IonInput  } from '@ionic/react';
import { pencilOutline, eyeOutline, chevronBack, chevronForward, optionsOutline, closeOutline, addOutline, close } from "ionicons/icons";
import { PiListNumbers, PiScroll } from "react-icons/pi";
import { GoHistory } from "react-icons/go";
import { GrTag, GrCertificate } from "react-icons/gr";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import TopHeader from '../../../components/TopHeader/TopHeader';
import BottomNavigation from '../../../components/BottomNavs/BottomNavs';
import './DiamondSearch.css';
import { useForm, Controller } from "react-hook-form";


const columnNames = [
  "Stone", "Qty", "Shape", "Carat", "Memo", "CaratOnHand", "Color", "Clarity", "Cut", "Polish", "Symm.",
  "Fluor.", "Measur.", "Depth", "Table", "Girdle", "Culet", "Cert.", "Lab", "RAP", "Cost/PC", "%Sell",
  "-RAP", "Total Cost", "Sell P/C", "Total Sale", "Markup%", "Margin%"
];

const OptionsDefault = [
  "On-Hand", "On-Memo", "Sold", "Mounted", "Committed", "Memo-in", "Matching", "No Memo-In"
];
const optionsCertified = [
  "Any Cert.", "No Cert.", "AGS", "EGL", "GIA", "Globien", "HRD", "IGI", "Matching"
];
const optionsTreatment = [
  "CE", "COL", "CVD", "HPHT", "IRR", "LD", "N", "OT"
];


const DiamondSearch: React.FC = () => {

  
  
  const [formData, setFormData] = useState({});

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmitnew = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
    //console.log(selectedButtons); // Log all form data
    //console.log(selectedValue);
    // Process form data, e.g., send it to an API

    try {
      const response = await axios.post('https://'+account+'.diatrac.in/checkAccount.php?act=getdiamonds', formData);
      console.log('Data sent successfully:', response.data);
      const new_jsonData = response.data;//await response.data.json();
      setData(new_jsonData);
      // Handle success (e.g., display a success message, redirect)
    } catch (error) {
      console.error('Error sending data:', error);
      // Handle error (e.g., display an error message)
    }

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

  const diamondSearchTabs = [
    { tab: "home", href: "/home", icon: <PiListNumbers className="icon" />, label: "Num. All" },
    { tab: "search", href: "/search", icon: <GoHistory className="icon" />, label: "History" },
    { tab: "add", href: "/add", icon: <GrTag className="icon" />, label: "Print Tag" },
    { tab: "likes", href: "/likes", icon: <PiScroll className="icon" />, label: "Print Label" },
    { tab: "profile", href: "/profile", icon: <GrCertificate className="icon" />, label: "Print Cert." }
  ];
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
 const handleSelectChange = (event) => {
   setSelectedValue(event.detail.value);
   
 };

  useEffect(() => {


    const fetchData_new =axios
    .get('https://'+account+'.diatrac.in/checkAccount.php?act=getshape')
    .then((response) => {
      setData_shape(response.data);
        setLoading(false);
    })
    .catch((err) => {
        setError(err.message);
        setLoading(false);
    });

 
    const fetchData_color =axios
    .get('https://'+account+'.diatrac.in/checkAccount.php?act=getcolor')
    .then((response) => {
      setData_color(response.data);
        setLoading(false);
    })
    .catch((err) => {
        setError(err.message);
        setLoading(false);
    });

    
    const fetchData_clarity =axios
    .get('https://'+account+'.diatrac.in/checkAccount.php?act=getclarity')
    .then((response) => {
      setData_clarity(response.data);
        setLoading(false);
    })
    .catch((err) => {
        setError(err.message);
        setLoading(false);
    });


    const fetchData = async () => {
      try {
        const response = await fetch('https://'+account+'.diatrac.in/checkAccount.php?act=getdiamonds');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (e) {
        setError("");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const  TotalQTY = data.reduce((totalquantity, meal) => totalquantity + parseInt(meal.Qty, 10), 0);
  const  TotalCarat = data.reduce((totalCara, meal) => totalCara + parseInt(meal.Carat, 10), 0);
  const  TotSellPrice = data.reduce((totalPrice, meal) => totalPrice + parseInt(meal.TotSellPrice, 10), 0);
  const formattedTotalCarat = new Intl.NumberFormat('en-US').format(TotalCarat);
  const formattedCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(TotSellPrice);
  if (loading) {
    return <IonContent><p>Loading...</p></IonContent>;
  }

  if (error) {
    return <IonContent><p>Error: {error}</p></IonContent>;
  }
  
  
  
  
    

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
                  {data.map(prod => (
                    <tr key={prod.StoneNumber}>
                      <td><IonCheckbox className="circle-checkbox" /></td>
                      
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
                      <td><IonIcon icon={pencilOutline} className="action-icon" /></td>
                      <td><IonIcon icon={eyeOutline} className="action-icon" /></td>
                    </tr>
                  ))}
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

        </IonContent>

        {/* Bottom Navigation */}
        <BottomNavigation tabs={diamondSearchTabs} />

        <IonModal id="filter-modal" className="full-modal filter-modal" ref={modalFilter} backdropDismiss={true} isOpen={filterShowModal} onDidDismiss={() => filterSetShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Filters ( 5 selected )</IonTitle>
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
            <IonItem>
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
            <IonItemDivider />
            <IonItem>
              <div className="select-container">
                <IonLabel className="tabs-title">Shape</IonLabel>
                <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="shape" value={formData.shape || ''}
      onIonChange={handleChange} multiple={true}>
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
                  <IonCol>
                  <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="from_color" value={formData.from_color || ''}
      onIonChange={handleChange} >
                {colordata.map(color => (
                  <IonSelectOption value={color.Code}>{color.Code}</IonSelectOption>
                ))}
                </IonSelect>
                  </IonCol>
                  <IonCol>
                  <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="to_color" value={formData.to_color || ''}
      onIonChange={handleChange} >
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
      onIonChange={handleChange} >
                {claritydata.map(clarity => (
                  <IonSelectOption value={clarity.Code}>{clarity.Code}</IonSelectOption>
                ))}
                </IonSelect>
                  </IonCol>
                  <IonCol size="5">
                  <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="to_clarity" value={formData.to_clarity || ''}
      onIonChange={handleChange} >
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
                            <IonRadio slot="start" className="rounded-radio" name={`lab[${index}]`} value={optionsCertified[index]} onClick={handleChange}/>
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
                            <IonRadio slot="start" className="rounded-radio" name={`treat[${index}]`} value={optionsTreatment[index]} onClick={handleChange}/>
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
                  <IonSelect placeholder="Select Price" interface="popover" className="corner-select" name="price" value={formData.price || ''}
      onIonChange={handleChange}>
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
      onIonChange={handleChange}>
                    <IonSelectOption value="available">Available</IonSelectOption>
                    <IonSelectOption value="sold">Sold</IonSelectOption>
                    {/* <IonSelectOption value="pending">Pending</IonSelectOption> */}
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
                      <IonRadio slot="start" className="rounded-radio" name="archive" value="1" onClick={handleChange} />
                      <IonLabel>Archive</IonLabel>
                    </IonItem>
                  </IonCol>
                  <IonCol size="4" className="ion-text-center">
                    <IonItem lines="none">
                      <IonRadio slot="start" className="rounded-radio" name="archive" value="2" onClick={handleChange} />
                      <IonLabel>Unarchive</IonLabel>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            <IonItemDivider />
            {/* <IonItem>
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
            </IonItem> */}
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


<div className="modal-footer">
            <IonButton className="modal-close" fill="outline" onClick={() => dismissModules()}>
              Close
            </IonButton>
            <IonButton className="modal-show"  type="submit">
              Show Results (200)
            </IonButton>
          </div>
            </form>
          </IonContent>

          

        </IonModal>

    </IonPage>

  );
};

export default DiamondSearch;
