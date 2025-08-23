
import React, { useState, useEffect, useRef } from 'react';
import { IonPage, IonContent,  IonGrid, IonRow, IonCol, IonButton, IonIcon, IonList, IonItem, IonLabel, IonInput, IonItemDivider, IonSelect, IonSelectOption, IonButtons, IonThumbnail, IonPopover, IonDatetime, IonCheckbox, IonImg, IonModal, IonHeader, IonToolbar, IonTitle, useIonAlert, InputChangeEventDetail } from "@ionic/react"; //IonLoading,
import type { IonInputCustomEvent } from "@ionic/core";
import { HexColorPicker } from "react-colorful";
import { useSwipeable } from 'react-swipeable';

import { addOutline, chevronBack, chevronForward, informationCircleOutline, removeOutline, calendarOutline, closeOutline } from "ionicons/icons";
import { PiHandshake } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoHistory } from "react-icons/go";
import { GrTag } from "react-icons/gr";

import TopHeader from '../../../components/TopHeader/TopHeader';
import BottomNavigation from '../../../components/BottomNavs/BottomNavs';
import './DiamondEntry.css';
/*import Cookies from 'universal-cookie';

interface FormData {
  profit: string;
  markup: string;
  margin: string;
  stoneRadio: string | null;
}*/

interface Intensity {
  Code: string;
  FancyColorIntensity: string;
}
interface Modifier {
  Code: string;
  ModifierColor: string;
}
interface Dominant {
  Code: string;
  DominantColor: string;
}

type Vendor = {
  vendor_id: string;
  vendor_name: string;
};

type CodeItem = {
  Code: string;
};

type FluorescenceItem = {
  Fluorescence: string;
};

interface Lab {
  Code: string;
}

interface Shape {
  Code: string;
  ShapeDescription: string;
}

interface Color {
  Code: string;
}

interface Clarity {
  Code: string;
}

interface SizeOption {
  Size: string;
}

const DiamondEntry: React.FC = () => {  

  const diamondEntryTabs = [
    //{ tab: "home", href: "/home", icon: <AiOutlineFileAdd className="icon" />, label: "New" },    
    { tab: "add", href: "/add", icon: <PiHandshake className="icon" />, label: "Partnership" },
    { tab: "likes", href: "/likes", icon: <GoHistory className="icon" />, label: "History" },
    { tab: "profile", href: "/profile", icon: <GrTag className="icon" />, label: "Print Tag" },
    { tab: "search", href: "/search", icon: <RiDeleteBin6Line className="icon" />, label: "Delete" },
  ];

  const steps = [
    "Stone Identification",
    "Physical Attributes",
    "Certificate Information",
    "Price & Cost",
    "Upload Image"
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection("next");
      setCurrentStep(prev => prev + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 0) {
      setDirection("prev");
      setCurrentStep(prev => prev - 1);
    }
  };
  const goToStep = (index: number) => {
    if (index > currentStep) setDirection("next");
    else if (index < currentStep) setDirection("prev");
    setCurrentStep(index);
  };
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextStep(),
    onSwipedRight: () => prevStep(),
    trackMouse: true // optional: enables swipe on desktop with mouse
  });


  const [numberInput, setNumberInput] = useState(0);

  const [colorPalette, setColorPalette] = useState("#ff0000");
  const [tempColor, setTempColor] = useState(colorPalette);
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef<HTMLIonInputElement>(null);
  const handleInputClick = () => {
    setShowPicker(!showPicker);
  };
  const handleColorChange = (newColor: string) => {
    setTempColor(newColor);
    setFormData((prev) => ({ ...prev, pantoneColor: newColor }));
  };
  const applyColor = () => {
    setColorPalette(tempColor);
    setShowPicker(false);
  };

  const [selectedDateCert, setSelectedDateCert] = useState('');
  const [showCalendarCert, setShowCalendarCert] = useState(false);
  const [selectedDatePurchase, setSelectedDatePurchase] = useState('');
  const [showCalendarPurchase, setShowCalendarPurchase] = useState(false);
  const triggerRef = useRef(null);

  const optionsDefault = [
    "N", "LD", "IRR", "CE", "COL", "HPHT", "CVD"
  ];

  const uploadBoxes = [
    { title: 'Certificate Image', description: 'Add your Certificate here' },
    { title: 'Jewelry Image', description: 'Add your Jewelry image here' },
    { title: 'Stone Image', description: 'Add your Stone Image here' },
    { title: 'Upload 360° Image', description: 'Here add the 360° Image of Stone' },
    { title: 'Upload Video', description: 'Add your Video here' },
  ];

  // const uploadCount = uploadBoxes.length; // how many upload sections you want

  const [profit] = useState<string>("");
  const [markup] = useState<string>("");
  const [margin] = useState<string>("");
  const [totsellprice] = useState<string>("");
  const [costcodedata] = useState<string>("");
  const [handCost] = useState<string>("");
  
  const [costcarat] = useState<string>("");
    

  const [previews, setPreviews] = useState<(File | null)[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [intensitydata, setIntensitydata] = useState<Intensity[]>([]);
  const [modifier1data, setModifier1data] = useState<Modifier[]>([]);
  const [dominantdata, setDominantdata] = useState<Dominant[]>([]);

  const [vendordata] = useState<Vendor[]>([]);

  const [girdledata] = useState<CodeItem[]>([]);
  const [culetdata] = useState<CodeItem[]>([]);
  const [polishdata] = useState<CodeItem[]>([]);
  const [symmetrydata] = useState<CodeItem[]>([]);
  const [fluorescenedata] = useState<FluorescenceItem[]>([]);
  const [sizedata] = useState<SizeOption[]>([
    { Size: "Small" },
    { Size: "Medium" },
    { Size: "Large" }
  ]);

  const [labdata] = useState<Lab[]>([]);
  const [shapedata] = useState<Shape[]>([]);
  const [colordata] = useState<Color[]>([]);
  const [claritydata] = useState<Clarity[]>([]);

  useEffect(() => {
    setDominantdata([
      { Code: "D", DominantColor: "Colorless" },
      { Code: "E", DominantColor: "Near Colorless" },
      { Code: "F", DominantColor: "Faint Yellow" },
    ]);
    setModifier1data([
      { Code: "M1", ModifierColor: "Brown" },
      { Code: "M2", ModifierColor: "Yellow" },
      { Code: "M3", ModifierColor: "Gray" },
    ]);
    setIntensitydata([
      { Code: "FI1", FancyColorIntensity: "Faint" },
      { Code: "FI2", FancyColorIntensity: "Light" },
      { Code: "FI3", FancyColorIntensity: "Intense" },
    ]);
  }, []);

  const openFilePicker = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newPreviews = [...previews];
    newPreviews[index] = file;
    setPreviews(newPreviews);

    const newUrls = [...previewUrls];
    newUrls[index] = URL.createObjectURL(file);
    setPreviewUrls(newUrls);
  };

  const [formData, setFormData] = useState({

    // Dropdowns
    stoneNo: '',
    lab: '',
    shape: '',
    clarity: '',
    fancyColor: '',
    pair: '',
    size: '',
    stoneRadio: '',
    bgm: '',
    eyeClean: '',
    girdle: '',
    culet: '',
    polish: '',
    symmetry: '',
    fluorescene: '',
    vendor: '',

    // Text Inputs
    carat: '',
    certificateNo: '',
    color: '',
    measurement: '',
    cut: '',
    Qty: '',
    matchingStone: '',
    depth: '',
    table: '',
    crownOne: '',
    crownTwo: '',
    pavillionOne: '',
    pavillionTwo: '',
    growthType: '',
    keySymbol: '',
    expenses: '',
    certComments: '',
    billNo: '',
    lotNo: '',
    customer: '',
    expires: '',
    lastImportCost: '',
    costCarat: '',
    handCost: '',
    costOffRap: '',
    rapPrice: '',
    sellPriceCarat: '',
    sellOffRap: '',
    totalSellPrice: '',
    code: '',
    totalCost: '',
    profit: '',
    markup: '',
    margin: '',
    // Dates
    purchaseDate: '',
    certDate: '',

    // Checkbox
    treatment: [] as string[],

    // File Inputs
    files: [] as (File | null)[],

    // Color Inputs
    pantoneColor: '',
    totsellprice: "",
    costcodedata: "",
    costcarat: ""
  });


  /* const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cookies = new Cookies();
  const account_type = sessionStorage.getItem('account_type');
 const account = account_type ? account_type : cookies.get('account_type');
  const [loading, setLoading] = useState(true);
  const [customerdata, setData_customer] = useState([]);
  const [modifier2data, setData_modifier2] = useState([]);
  const [fancycodedata, setData_fancycode] = useState([]);*/
  const [totalCost] = useState([]);

  /*const [error, setError] = useState("");
  const [data, setData] = useState([]);*/
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading] = useState(false);

  const handleIonChange = (event: IonInputCustomEvent<InputChangeEventDetail>) => {
    const value = event.detail.value || "";
    setInputValue(value);
    setFormData({ ...formData, stoneNo: value });
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLIonInputElement>) => {
    console.log("Key pressed:", event.key);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSuggestions([]);
    setInputValue(suggestion);
  };

  //const input = document.getElementById("sellPriceCarat") as HTMLInputElement | null;
  //const sell = input?.value ? Number(input.value) : Number(formData.sellPriceCarat);
  const [, setData_totsellprice] = useState<number>(0);
  const [, setData_profit] = useState<string>("0");
  const [, setData_markup] = useState<string>("0");
  const [, setData_margin] = useState<string>("0");
  

const call_sellprice = async () => {
  try {
    const cartat = Number(formData.carat);

    const input = document.getElementById("sellPriceCarat") as HTMLInputElement | null;
    const sell = input?.value ? Number(input.value) : Number(formData.sellPriceCarat);

    const totalsellP = Math.round(Number(cartat) * Number(sell));
    setData_totsellprice(totalsellP);

    const cost = Number(totalCost);

    const profit = totalsellP - cost;
    setData_profit(profit.toFixed(2));

    const markupvar = ((totalsellP - cost) / cost) * 100;
    setData_markup(markupvar.toFixed(2));

    const margin1 = ((totalsellP - cost) / totalsellP) * 100;
    setData_margin(margin1.toFixed(2));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

  
  
  /*const [showAlert, setShowAlert] = useState(false);
  const [result, setResult] = useState('');*/

  const handleSubmitnew = (e: React.MouseEvent<HTMLIonButtonElement> | undefined) => {
  e?.preventDefault();
  console.log("Form submitted!");
};


  const [intensityValue, setintensityValue] = useState('');
  const [modifier1Value, setmodifier1Value] = useState('');
  const [modifier2Value, setmodifier2Value] = useState('');
  const [dominantValue, setdominantValue] = useState('');

  const handleintenseChange = (e: any) => {
    setintensityValue(e.detail.value!);
    console.log('Selected value:', e.detail.value); // You can perform other actions here
  };
  const handlemodifier1Change = (e: any) => {
    setmodifier1Value(e.detail.value);
    console.log('Selected value:', e.detail.value); // You can perform other actions here
  };
  const handlemodifier2Change = (e: any) => {
    setmodifier2Value(e.detail.value);
    console.log('Selected value:', e.detail.value); // You can perform other actions here
  };
  const handledominantChange = (e: any) => {
    setdominantValue(e.detail.value);
    console.log('Selected value:', e.detail.value); // You can perform other actions here
  };

  const modalFancy = useRef<HTMLIonModalElement>(null);
  const dismissFancy = () => modalFancy.current?.dismiss();
  const [fancyShowModal, fancySetShowModal] = useState(false);

  const [presentCarat] = useIonAlert();

  const modalQty = useRef<HTMLIonModalElement>(null);
  const dismissQty = () => modalQty.current?.dismiss();
  const [qtyShowModal, qtySetShowModal] = useState(false);

  const modalSellPrice = useRef<HTMLIonModalElement>(null);
  const dismissSellPrice = () => modalSellPrice.current?.dismiss();
  const [sellPriceShowModal, sellPriceSetShowModal] = useState(false);

  const modalExpenses = useRef<HTMLIonModalElement>(null);
  const dismissExpenses = () => modalExpenses.current?.dismiss();
  const [expensesShowModal, expensesSetShowModal] = useState(false);

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
    const columnNames = [
      "Expenses Type", "Amount",	"Date",	"Vendor"
    ];
    const sampleData = Array(5).fill({});

  return (
    <IonPage className="diamond-entry bg-gradient">

      {/* Header */}
      <TopHeader pageTitle="Diamond Entry" />

      {/* Page Content */}
      <IonContent scrollY={false} className="no-scroll ion-padding bg-white text-black rounded-content">

        <IonGrid className='entry-header'>
          <IonRow className="ion-align-items-center">
            <IonCol size="2">
              <IonButton fill="clear" onClick={prevStep} disabled={currentStep === 0}>
                <IonIcon icon={chevronBack} />
              </IonButton>
            </IonCol>

            <IonCol size="8" className="ion-text-center">
              <h2 className="entry-title">{steps[currentStep]}</h2>
            </IonCol>

            <IonCol size="2" className="ion-text-right">
              <IonButton fill="clear" onClick={nextStep} disabled={currentStep === steps.length - 1}>
                <IonIcon icon={chevronForward} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        <div {...swipeHandlers} className={`step-content ${direction} `}>
          {currentStep === 0 && (

            <IonList className='entry-content'>

              <IonItem className='autocomplete-item'>
                <IonLabel position="fixed">Stone#</IonLabel>
                <IonInput className="autocomplete-input" value={inputValue || formData.stoneNo} onIonChange={handleIonChange} onKeyUp={handleKeyUp}/>
                {isLoading && <div>Loading...</div>}
              </IonItem>

              {suggestions.length > 0 && (
                <IonList className="autocomplete-list">
                  {suggestions.map((suggestion) => (
                    <IonItem key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion}
                    </IonItem>
                  ))}
                </IonList>
              )}

              <IonItem>
                <IonLabel position="fixed">Carat <IonIcon icon={informationCircleOutline} onClick={() => presentCarat({header: 'Average Carat Weight', message: formData.carat  ? formData.carat  : '-', buttons: ['OK'], })} className='cursor-pointer' /></IonLabel>
                <IonInput placeholder="Enter Carat" value={formData.carat} onIonChange={(e) => setFormData({ ...formData, carat: e.detail.value! })} />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Lab</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.lab} placeholder="Select Lab" onIonChange={(e) => setFormData({ ...formData, lab: e.detail.value })}>
                  {labdata.map(lab => (
                    <IonSelectOption value={lab.Code}>{lab.Code}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Certificate#</IonLabel>
                <IonInput placeholder="Enter Certificate#" value={formData.certificateNo} onIonChange={(e) => setFormData({ ...formData, certificateNo: e.detail.value! })} />
                <IonThumbnail className="thumb-img" slot="end">
                  <img src="assets/images/egl_usa.jpg" alt="Certificate Client" />
                </IonThumbnail>
              </IonItem>

              <IonItemDivider className="entry-divider"></IonItemDivider>

              <IonItem>
                <IonLabel position="fixed">Shape</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.shape} placeholder="Select Shape" onIonChange={(e) => setFormData({ ...formData, shape: e.detail.value })}>
                  {shapedata.map(shape => (
                    <IonSelectOption value={shape.Code}>{shape.ShapeDescription}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Color</IonLabel>
                <IonSelect placeholder="Select an option" interface="popover" className="rounded-select" name="from_color" value={formData.color }
                 onIonChange={(e) => setFormData({ ...formData, color: e.detail.value })} >
                  {colordata.map(color => (
                    <IonSelectOption value={color.Code}>{color.Code}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Clarity</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.clarity} placeholder="Select Clarity" onIonChange={(e) => setFormData({ ...formData, clarity: e.detail.value })}>
                  {claritydata.map(clarity => (
                    <IonSelectOption value={clarity.Code}>{clarity.Code}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Measurement</IonLabel>
                <IonInput placeholder="Enter Measurement" value={formData.measurement} onIonChange={(e) => setFormData({ ...formData, measurement: e.detail.value! })} />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Cut</IonLabel>
                <IonInput placeholder="Enter Cut" value={formData.cut} onIonChange={(e) => setFormData({ ...formData, cut: e.detail.value! })} />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Fancy Color <IonIcon icon={informationCircleOutline} onClick={() => fancySetShowModal(true)} className='cursor-pointer' /></IonLabel>
                {/*  <IonSelect interface="popover" className="corner-select" value={formData.fancyColor}  placeholder="Select Fancy Color"  onIonChange={(e) => setFormData({ ...formData, fancyColor: e.detail.value })}>
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect> */}
                <IonInput placeholder="Enter fancyColor" value={intensityValue + modifier1Value + modifier2Value + dominantValue || formData.fancyColor} onIonChange={(e) => setFormData({ ...formData, fancyColor: e.detail.value! })} />
              </IonItem>

              {/* <IonItem>
                  <IonLabel position="fixed">Code</IonLabel>
                  <IonInput placeholder="Enter Code" value={formData.code} onIonChange={(e) => setFormData({ ...formData, code: e.detail.value! })} />
                </IonItem> */}

              {/* <IonItem>
                  <IonLabel position="fixed">Pair</IonLabel>
                  <IonSelect interface="popover" className="corner-select" value={formData.pair}  placeholder="Select Pair"  onIonChange={(e) => setFormData({ ...formData, pair: e.detail.value })}>
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem> */}

              <IonItem>
                <IonLabel position="fixed">Size</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.size} placeholder="Select Size" onIonChange={(e) => setFormData({ ...formData, size: e.detail.value })}>
                  {sizedata.map(size => (
                    <IonSelectOption value={size.Size}>{size.Size}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Quantity <IonIcon icon={informationCircleOutline}  onClick={() => qtySetShowModal(true)} className='cursor-pointer' /></IonLabel>
                <IonButtons>
                  <IonButton onClick={() => setNumberInput(numberInput > 0 ? numberInput - 1 : 0)}><IonIcon icon={removeOutline} /></IonButton>
                  <IonInput value={numberInput || formData.Qty} type="number" onIonInput={e => setNumberInput(parseInt(e.detail.value!, 10) || 0)} className="number-input" />
                  <IonButton onClick={() => setNumberInput(numberInput + 1)}><IonIcon icon={addOutline} /></IonButton>
                </IonButtons>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Matching Stone</IonLabel>
                <IonInput placeholder="Enter Matching Stone" value={formData.matchingStone} onIonChange={(e) => setFormData({ ...formData, matchingStone: e.detail.value! })} />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Stone Ratio</IonLabel>

                <IonInput placeholder="Enter Stone Ratio " 
                value={formData.stoneRadio ?? ""}
                onIonChange={(e) =>
                  setFormData({ ...formData, stoneRadio: e.detail.value as string })
                } />
              </IonItem>

              <div style={{ position: "relative" }}>
                {showPicker && (
                  <div className="picker-dropdown">
                    <HexColorPicker color={colorPalette} onChange={handleColorChange} />
                    <IonButton expand="block" size="small" onClick={applyColor} className="apply-btn"> Apply Color </IonButton>
                  </div>
                )}
              </div>
              <IonItem>
                <IonLabel position="fixed">Pantone Color</IonLabel>
                <IonInput
                  value={colorPalette}
                  ref={inputRef}
                  onClick={handleInputClick}
                  onIonInput={(e) => setColorPalette(e.detail.value!)}
                  className="color-input"
                />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">BGM</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.bgm} placeholder="Select BGM" onIonChange={(e) => setFormData({ ...formData, bgm: e.detail.value })}>
                  <IonSelectOption value="Yes">Yes</IonSelectOption>
                  <IonSelectOption value="No">No </IonSelectOption>

                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Eye Clean</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.eyeClean} placeholder="Select Eye Clean" onIonChange={(e) => setFormData({ ...formData, eyeClean: e.detail.value })}>
                  <IonSelectOption value="Yes">Yes</IonSelectOption>
                  <IonSelectOption value="No">No </IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
          )}

          {currentStep === 1 && (
            <IonList className='entry-content'>
              <IonItem>
                <IonLabel position="fixed">Depth %</IonLabel>
                <IonInput placeholder="Enter Depth %" value={formData.depth} onIonChange={(e) => setFormData({ ...formData, depth: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Table %</IonLabel>
                <IonInput placeholder="Enter Table %" value={formData.table} onIonChange={(e) => setFormData({ ...formData, table: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Crown A</IonLabel>
                <IonInput placeholder="Enter Crown A 1" value={formData.crownOne} onIonChange={(e) => setFormData({ ...formData, crownOne: e.detail.value! })} />
                <span className="input-separator-text">-- H --</span>
                <IonInput placeholder="Enter Crown A 2" value={formData.crownTwo} onIonChange={(e) => setFormData({ ...formData, crownTwo: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Pavillion A</IonLabel>
                <IonInput placeholder="Enter Pavillion A 1" value={formData.pavillionOne} onIonChange={(e) => setFormData({ ...formData, pavillionOne: e.detail.value! })} />
                <span className="input-separator-text">-- H --</span>
                <IonInput placeholder="Enter Pavillion A 2" value={formData.pavillionTwo} onIonChange={(e) => setFormData({ ...formData, pavillionTwo: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Girdle</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.girdle} placeholder="Select Girdle" onIonChange={(e) => setFormData({ ...formData, girdle: e.detail.value })}>
                  {girdledata.map(girdle => (
                    <IonSelectOption value={girdle.Code}>{girdle.Code}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Culet</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.culet} placeholder="Select Culet" onIonChange={(e) => setFormData({ ...formData, culet: e.detail.value })}>
                  {culetdata.map(culet => (
                    <IonSelectOption value={culet.Code}>{culet.Code}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Polish</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.polish} placeholder="Select Polish" onIonChange={(e) => setFormData({ ...formData, polish: e.detail.value })}>
                  {polishdata.map(polish => (
                    <IonSelectOption value={polish.Code}>{polish.Code}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Symmetry</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.symmetry} placeholder="Select Symmetry" onIonChange={(e) => setFormData({ ...formData, symmetry: e.detail.value })}>
                  {symmetrydata.map(symm => (
                    <IonSelectOption value={symm.Code}>{symm.Code}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Fluorescene</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.fluorescene} placeholder="Select Fluorescene" onIonChange={(e) => setFormData({ ...formData, fluorescene: e.detail.value })}>
                  {fluorescenedata.map(flur => (
                    <IonSelectOption value={flur.Fluorescence}>{flur.Fluorescence}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              {/* <IonItem>
                  <IonLabel position="fixed">Growth Type</IonLabel>
                  <IonInput placeholder="Enter Growth Type" value={formData.growthType} onIonChange={(e) => setFormData({ ...formData, growthType: e.detail.value! })} />
                </IonItem> */}
              <IonItem>
                <IonLabel position="fixed">Key To Symbol</IonLabel>
                <IonInput placeholder="Enter Key To Symbol" value={formData.keySymbol} onIonChange={(e) => setFormData({ ...formData, keySymbol: e.detail.value! })} />
              </IonItem>

            </IonList>
          )}

          {currentStep === 2 && (
            <IonList className='entry-content'>
              <IonItem id="cert-trigger" className="date-picker-area" ref={triggerRef}>
                <IonLabel position="fixed">Cert. Date</IonLabel>
                <IonInput placeholder="Select date" value={selectedDateCert || formData.certDate} readonly={true} />
                <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarCert(true)} />
              </IonItem>
              <IonPopover isOpen={showCalendarCert} trigger="cert-trigger" onDidDismiss={() => setShowCalendarCert(false)} showBackdrop={false} side="bottom" alignment="center">
                <IonDatetime
                  presentation="date"
                  className="calendar-sm"
                  value={formData.certDate}
                  onIonChange={(e) => {
                    const value = e.detail.value;
                    if (typeof value === 'string') {
                      setSelectedDateCert(value);
                      setShowCalendarCert(false);
                      setFormData({ ...formData, certDate: value });
                    }
                  }}
                />
              </IonPopover>

              <IonItem>
                <IonLabel position="fixed">Expenses <IonIcon icon={informationCircleOutline}  onClick={() => expensesSetShowModal(true)} className='cursor-pointer' /></IonLabel>
                <IonInput placeholder="Enter Expenses" value={formData.expenses} onIonChange={(e) => setFormData({ ...formData, expenses: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Cert. Comments</IonLabel>
                <IonInput placeholder="Enter Cert. Comments" value={formData.certComments} onIonChange={(e) => setFormData({ ...formData, certComments: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed" className="label-top-align">Treatment</IonLabel>
                <IonGrid className="checkbox-grid">
                  {[0, 1, 2].map((row) => (
                    <IonRow key={row}>
                      {[0, 1, 2].map((col) => {
                        const index = row * 3 + col;
                        if (index >= 7) return null;
                        if (index >= 8) return null;
                        return (
                          <IonCol key={col} size="4" className="ion-text-center">
                            <IonItem lines="none">
                              <IonCheckbox
                                slot="start"
                                className="rounded-checkbox"
                                checked={formData.treatment.includes(optionsDefault[index])}
                                onIonChange={(e) => {
                                  const isChecked = e.detail.checked;
                                  const updatedOptions = isChecked
                                    ? [...formData.treatment, optionsDefault[index]]
                                    : formData.treatment.filter((item) => item !== optionsDefault[index]);

                                  setFormData({ ...formData, treatment: updatedOptions });
                                }}
                              />

                              <IonLabel>{optionsDefault[index]}</IonLabel>
                            </IonItem>
                          </IonCol>
                        );
                      })}
                    </IonRow>
                  ))}
                </IonGrid>
              </IonItem>
              <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Purchase Information</h2></IonItem>
              <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>
              <IonItem>
                <IonLabel position="fixed">Vendor</IonLabel>
                <IonSelect interface="popover" className="corner-select" value={formData.vendor} placeholder="Select Vendor" onIonChange={(e) => setFormData({ ...formData, vendor: e.detail.value })}>
                  {vendordata.map(vendor => (
                    <IonSelectOption value={vendor.vendor_id}>{vendor.vendor_name}</IonSelectOption>
                  ))}

                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Bill #</IonLabel>
                <IonInput placeholder="Enter Bill #" value={formData.billNo} onIonChange={(e) => setFormData({ ...formData, billNo: e.detail.value! })} />
                <IonButton className="button-view">View</IonButton>
              </IonItem>
              <IonItem id="purchase-trigger" className="date-picker-area" ref={triggerRef}>
                <IonLabel position="fixed">Purchase Date</IonLabel>
                <IonInput placeholder="Select Purchase Date" value={selectedDatePurchase} readonly={true} />
                <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarPurchase(true)} />
              </IonItem>
              <IonPopover isOpen={showCalendarPurchase} trigger="purchase-trigger" onDidDismiss={() => setShowCalendarPurchase(false)} showBackdrop={false} side="bottom" alignment="center">
                <IonDatetime
                  presentation="date"
                  className="calendar-sm"
                  value={formData.purchaseDate}
                  onIonChange={(e) => {
                    const value = e.detail.value;
                    if (typeof value === 'string') {
                      setSelectedDatePurchase(value);
                      setShowCalendarPurchase(false);
                      setFormData({ ...formData, purchaseDate: value });
                    }
                  }}
                />
              </IonPopover>

              <IonItem>
                <IonLabel position="fixed">Lot #</IonLabel>
                <IonInput placeholder="Enter Lot #" value={formData.lotNo} onIonChange={(e) => setFormData({ ...formData, lotNo: e.detail.value! })} />
              </IonItem>
              <IonItem className="no-mb">
                <h2 className="entry-subtitle">On Hold</h2>
                <IonButton className="button-view" style={{ marginLeft: 'auto' }}>View</IonButton>
              </IonItem>
              <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>
              {/* <IonItem>
                  <IonLabel position="fixed">Customer</IonLabel>
                  <IonInput placeholder="Enter Customer" value={formData.customer} onIonChange={(e) => setFormData({ ...formData, customer: e.detail.value! })} />
                </IonItem> */}
              <IonItem>
                <IonLabel position="fixed">Expires</IonLabel>
                <IonInput placeholder="Enter Expires" value={formData.expires} onIonChange={(e) => setFormData({ ...formData, expires: e.detail.value! })} />
              </IonItem>
            </IonList>
          )}

          {currentStep === 3 && (
            <IonList className='entry-content'>
              <IonItem>
                <IonLabel position="fixed">Last Import Cost</IonLabel>
                <IonInput placeholder="Enter Last Import Cost" value={0 || formData.lastImportCost} onIonChange={(e) => setFormData({ ...formData, lastImportCost: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Cost / CT</IonLabel>
                <IonInput placeholder="Enter Cost / CT" id='costCarat' value={costcarat || formData.costCarat} onIonChange={(e) => setFormData({ ...formData, costCarat: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Cost Code</IonLabel>
                <IonInput placeholder="Enter Code" readonly={true} value={costcodedata || formData.code} onIonChange={(e) => setFormData({ ...formData, code: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">On Hand Cost</IonLabel>
                <IonInput placeholder="Enter On Hand Cost" value={handCost || formData.handCost} onIonChange={(e) => setFormData({ ...formData, handCost: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Total Cost</IonLabel>
                <IonInput placeholder="Enter Total Cost" 
                value={formData.totalCost || ""} 
                onIonChange={(e) =>
                  setFormData({ ...formData, totalCost: e.detail.value! })
                }
                />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Cost % off RAP</IonLabel>
                <IonInput placeholder="Enter Cost % off RAP" value={formData.costOffRap} onIonChange={(e) => setFormData({ ...formData, costOffRap: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">RAP Price</IonLabel>
                <IonInput placeholder="Enter RAP Price" value={formData.rapPrice} onIonChange={(e) => setFormData({ ...formData, rapPrice: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Sell Price / CT  <IonIcon icon={informationCircleOutline}  onClick={() => sellPriceSetShowModal(true)} className='cursor-pointer' /></IonLabel>
                <IonInput placeholder="Enter Sell Price / CT" id="sellPriceCarat" value={formData.sellPriceCarat} 
                onIonChange={(e) =>
                  setFormData({ ...formData, sellPriceCarat: e.detail.value ?? "" })
                }
                onChange={() => {
                  call_sellprice();
                }}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Sell % off RAP <IonIcon icon={informationCircleOutline}  onClick={() => sellPriceSetShowModal(true)} className='cursor-pointer' /></IonLabel>
                <IonInput placeholder="Enter Sell % off RAP" value={formData.sellOffRap} onIonChange={(e) => setFormData({ ...formData, sellOffRap: e.detail.value! })} />
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Total Sell Price <IonIcon icon={informationCircleOutline}  onClick={() => sellPriceSetShowModal(true)} className='cursor-pointer' /></IonLabel>
                <IonInput placeholder="Enter Total Sell Price" value={totsellprice || formData.totalSellPrice} onIonChange={(e) => setFormData({ ...formData, totalSellPrice: e.detail.value! })} />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Profit</IonLabel>
                <IonInput placeholder="" value={profit || formData.profit} onIonChange={(e) => setFormData({ ...formData, profit: e.detail.value! })} />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Markup</IonLabel>
                <IonInput placeholder="" value={markup || formData.markup} onIonChange={(e) => setFormData({ ...formData, markup: e.detail.value! })} />
              </IonItem>

              <IonItem>
                <IonLabel position="fixed">Margin</IonLabel>
                <IonInput placeholder="" value={margin || formData.margin} onIonChange={(e) => setFormData({ ...formData, margin: e.detail.value! })} />
              </IonItem>
            </IonList>
          )}

          {currentStep === 4 && (
            <IonList className='entry-content'>

              <>
                {uploadBoxes.map((box, index) => (
                  <React.Fragment key={index}>
                    <IonItem className="upload-title">
                      <div className="upload-title-inner">
                        <h2 className="entry-subtitle">{index + 1}. {box.title}</h2>
                        <p className="entry-paragraph">{box.description}</p>
                      </div>
                    </IonItem>

                    <IonItem className="upload-area">
                      <div className="upload-box">
                        <IonLabel className="upload-text">Upload your file</IonLabel>

                        {previews[index] && previews[index].type.startsWith('video') ? (
                          <video className="preview-video" controls width="100%">
                            <source src={previewUrls[index] || URL.createObjectURL(previews[index])} type={previews[index]?.type} />
                            Your browser does not support the video tag.
                          </video>
                        ) : previews[index] && previews[index].type.startsWith('pdf') ? (
                          <a href={previewUrls[index]} target='_blank'><IonImg src="assets/images/pdf.png" className="preview-img" /></a>
                        ) : previews[index] && previews[index].type.startsWith('image') ? (
                          <a href={previewUrls[index]} target='_blank'><IonImg src={previewUrls[index]} className="preview-img" /></a>
                        ) : null}

                        <IonButton onClick={() => openFilePicker(index)} className="upload-btn">
                          {previews[index] ? 'Replace' : 'Upload'}
                        </IonButton>

                        <input
                          type="file"
                          accept="image/*,video/*"
                          hidden
                          ref={(el: HTMLInputElement | null) => {
                            fileInputRefs.current[index] = el;
                          }}
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;

                            // Save to formData or call handler
                            if (file) {
                              // If using formData:
                              setFormData(prev => {
                                const updatedFiles = [...prev.files]; // assuming it's an array
                                updatedFiles[index] = file;
                                return { ...prev, files: updatedFiles };
                              });

                              // Or call your existing handler:
                              handleFileChange(e, index);
                            }
                          }}
                        />
                      </div>
                    </IonItem>
                  </React.Fragment>
                ))}
              </>


            </IonList>
          )}
        </div>
        <IonGrid class='entry-footer'>
          <IonRow className="ion-align-items-center ion-justify-content-between button-row">

            <IonCol size="auto">
              <div className="nav-dots">

                {steps.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${currentStep === index ? "active" : ""}`}
                    onClick={() => goToStep(index)}
                  />
                ))}
              </div>
            </IonCol>

            <IonCol size="auto">
              <IonButton onClick={(e) => handleSubmitnew(e)}>Save & Next</IonButton> {/* disabled={currentStep === steps.length - 1} */}
            </IonCol>

          </IonRow>
        </IonGrid>

      </IonContent>

      {/* Bottom Navigation */}
      <BottomNavigation tabs={diamondEntryTabs} />

      <IonModal id="fancyColorModal" className="full-filter-modal filter-modal" ref={modalFancy} backdropDismiss={true} isOpen={fancyShowModal} onDidDismiss={() => fancySetShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Fancy Color </IonTitle>
            <IonIcon icon={closeOutline} onClick={() => dismissFancy()} slot="end" />
          </IonToolbar>
        </IonHeader>
        <IonContent scrollY={true}>
          <IonList className="line-separator">
            <IonItem>
              <IonList className='select-content'>
                <IonItem>
                  <IonLabel position="fixed">Intensity</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select" value={intensityValue} onIonChange={handleintenseChange}>
                    <IonSelectOption > </IonSelectOption>
                    {intensitydata.map(intensity => (
                      <IonSelectOption value={intensity.Code}>{intensity.FancyColorIntensity}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Modifier 1</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select" value={modifier1Value} onIonChange={handlemodifier1Change}>
                    <IonSelectOption > </IonSelectOption>
                    {modifier1data.map(mod => (
                      <IonSelectOption value={mod.Code}>{mod.ModifierColor}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Modifier 2</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select" value={modifier2Value} onIonChange={handlemodifier2Change}>
                    <IonSelectOption > </IonSelectOption>
                    {modifier1data.map(mod => (
                      <IonSelectOption value={mod.Code}>{mod.ModifierColor}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Dominant Color</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select" value={dominantValue} onIonChange={handledominantChange}>
                    <IonSelectOption > </IonSelectOption>
                    {dominantdata.map(dominant => (
                      <IonSelectOption value={dominant.Code}>{dominant.DominantColor}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Code</IonLabel>
                  <IonInput placeholder="-" value={intensityValue + modifier1Value + modifier2Value + dominantValue} />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Notes</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
              </IonList>
            </IonItem>
          </IonList>
          <div className="modal-footer">
            <IonButton className="modal-close" fill="outline" onClick={() => dismissFancy()}>
              Clear
            </IonButton>
            <IonButton className="modal-show" type="submit" onClick={() => dismissFancy()}>
              Submit
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonModal id="qtyColorModal" className="full-filter-modal filter-modal" ref={modalQty} backdropDismiss={true} isOpen={qtyShowModal} onDidDismiss={() => qtySetShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Quantity </IonTitle>
            <IonIcon icon={closeOutline} onClick={() => dismissQty()} slot="end" />
          </IonToolbar>
        </IonHeader>
        <IonContent scrollY={true}>
          <IonList className="line-separator">
            <IonItem>
              <IonList className='select-content'>
                <IonItem>
                  <IonLabel position="fixed">Stone#</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption >1 </IonSelectOption>
                    <IonSelectOption >2 </IonSelectOption>
                    <IonSelectOption >3 </IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem id="qty-date-trigger" className="date-picker-area" ref={triggerRef}>
                  <IonLabel position="fixed">Date</IonLabel>
                  <IonInput placeholder="Select date" value="" readonly={true} />
                  <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarCert(true)} />
                </IonItem>
                <IonPopover isOpen={showCalendarCert} trigger="qty-date-trigger" onDidDismiss={() => setShowCalendarCert(false)} showBackdrop={false} side="bottom" alignment="center">
                  <IonDatetime
                    presentation="date"
                    className="calendar-sm"
                    onIonChange={(e) => {
                      const value = e.detail.value;
                      if (typeof value === 'string') {
                        setSelectedDateCert(value);
                        setShowCalendarCert(false);
                        setFormData({ ...formData, certDate: value });
                      }
                    }}
                  />
                </IonPopover>
                
                <IonItem>
                  <IonLabel position="fixed">Reference</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonGrid className="fromTo-table">
                    {/* Table Header */}
                    <IonRow className="table-header">
                      <IonCol size="3"></IonCol>
                      <IonCol size="3" className="header-label">On Hand</IonCol>
                      <IonCol size="3" className="header-label">Adjust</IonCol>
                      <IonCol size="3" className="header-label">New</IonCol>
                    </IonRow>

                    {/* Stock# Row */}
                    <IonRow>
                      <IonCol size="3" className="row-label">Carat</IonCol>
                      <IonCol size="3">
                        <IonInput type="text" name="caratOnhand" />
                      </IonCol>
                      <IonCol size="3">
                        <IonInput type="text" name="caratAdjust" />
                      </IonCol>
                      <IonCol size="3">
                        <IonInput type="text" name="caratNew" />
                      </IonCol>
                    </IonRow>

                    {/* Weight Row */}
                    <IonRow>
                      <IonCol size="3" className="row-label">Qty</IonCol>
                      <IonCol size="3">
                        <IonInput type="text" name="qtyOnhand" />
                      </IonCol>
                      <IonCol size="3">
                        <IonInput type="text" name="qtyAdjust" />
                      </IonCol>
                      <IonCol size="3">
                        <IonInput type="text" name="qtyNew" />
                      </IonCol>
                    </IonRow>

                  </IonGrid>
                              
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Reason to Adjust</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

              </IonList>
            </IonItem>
          </IonList>
          <div className="modal-footer">
            <IonButton className="modal-close" fill="outline" onClick={() => dismissQty()}>
              Clear
            </IonButton>
            <IonButton className="modal-show" type="submit" onClick={() => dismissQty()}>
              Submit
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonModal id="sellPriceModal" className="full-filter-modal filter-modal" ref={modalSellPrice} backdropDismiss={true} isOpen={sellPriceShowModal} onDidDismiss={() => sellPriceSetShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Sell Price Chart</IonTitle>
            <IonIcon icon={closeOutline} onClick={() => dismissSellPrice()} slot="end" />
          </IonToolbar>
        </IonHeader>
        <IonContent scrollY={true}>
          <IonList className="line-separator">
            <IonItem>
              <IonList className='select-content'>                

                <IonItem>
                  <IonGrid className="fromTo-table">
                    {/* Table Header */}
                    <IonRow className="table-header">
                      <IonCol size="3"></IonCol>
                      <IonCol size="3" className="header-label">Price P/C</IonCol>
                      <IonCol size="3" className="header-label">%Off Rap Price</IonCol>
                      <IonCol size="3" className="header-label">Total Price</IonCol>
                    </IonRow>

                    {/* Stock# Row */}
                    <IonRow>
                      <IonCol size="3" className="row-label">SP 1</IonCol>
                      <IonCol size="3">
                        <IonInput type="text" />
                      </IonCol>
                      <IonCol size="3">
                        <IonInput type="text" />
                      </IonCol>
                      <IonCol size="3">
                        <IonInput type="text" />
                      </IonCol>
                    </IonRow>

                    {/* Weight Row */}
                    <IonRow>
                      <IonCol size="3" className="row-label">SP 1</IonCol>
                      <IonCol size="3">
                        <IonInput type="text" />
                      </IonCol>
                      <IonCol size="3">
                        <IonInput type="text" />
                      </IonCol>
                      <IonCol size="3">
                        <IonInput type="text" />
                      </IonCol>
                    </IonRow>

                  </IonGrid>
                              
                </IonItem>


              </IonList>
            </IonItem>
          </IonList>
          <div className="modal-footer">
            <IonButton className="modal-close" fill="outline" onClick={() => dismissSellPrice()}>
              Clear
            </IonButton>
            <IonButton className="modal-show" type="submit" onClick={() => dismissSellPrice()}>
              Submit
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

      <IonModal id="expensesModal" className="full-filter-modal filter-modal" ref={modalExpenses} backdropDismiss={true} isOpen={expensesShowModal} onDidDismiss={() => expensesSetShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Additional Expense Selection</IonTitle>
            <IonIcon icon={closeOutline} onClick={() => dismissExpenses()} slot="end" />
          </IonToolbar>
        </IonHeader>
        <IonContent scrollY={true}>
          <IonList className="line-separator">
            <IonItem>
              <IonList className='select-content'>                

                <IonItem>
                  <IonLabel position="fixed">Original Cost/Carat</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Cost %Off Rap Price</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

              </IonList>
            </IonItem>
            <IonItem>
              <div className="scroll-wrapper table-scroll">                          
                <div className="table-header">
                  <IonButton fill="clear" onClick={() => scroll("left")} className="scroll-arrow left">
                    <IonIcon icon={chevronBack} />
                  </IonButton>
                  <IonButton fill="clear" onClick={() => scroll("right")} className="scroll-arrow right">
                    <IonIcon icon={chevronForward} />
                  </IonButton>
                </div>
                <div className="table-container" ref={scrollRef}>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        {columnNames.map((name, idx) => (
                          <th key={idx}>{name}</th>
                        ))}                        
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.map((_, rowIndex) => (
                        <tr key={rowIndex}>
                          {columnNames.map((_, colIndex) => (
                            <td key={colIndex}>—</td>
                          ))}                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>                
                
              </div>
            </IonItem>
          </IonList>
          <div className="modal-footer">
            <IonButton className="modal-close" fill="outline" onClick={() => dismissExpenses()}>
              Print
            </IonButton>
            <IonButton className="modal-show" type="submit" onClick={() => dismissExpenses()}>
              Ok
            </IonButton>
          </div>
        </IonContent>
      </IonModal>

    </IonPage>

  );
};

export default DiamondEntry;
