
import React, { useState, useRef } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonList, IonItem, IonLabel, IonInput, IonItemDivider, IonSelect, IonSelectOption, IonPopover, IonDatetime, IonImg, IonTextarea, IonThumbnail, IonButtons } from '@ionic/react';
import { HexColorPicker } from "react-colorful";

import { chevronBack, chevronForward, calendarOutline, informationCircleOutline, removeOutline, addOutline } from "ionicons/icons";
import { PiHandshake } from "react-icons/pi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoHistory } from "react-icons/go";
import { GrTag } from "react-icons/gr";

import TopHeader from '../../../components/TopHeader/TopHeader';
import BottomNavigation from '../../../components/BottomNavs/BottomNavs';
import './GemEntry.css';

const GemEntry: React.FC = () => {

   const gemEntryTabs = [
    { tab: "home", href: "/home", icon: <AiOutlineFileAdd className="icon" />, label: "New" },
    { tab: "search", href: "/search", icon: <RiDeleteBin6Line className="icon" />, label: "Delete" },
    { tab: "add", href: "/add", icon: <PiHandshake className="icon" />, label: "Partnership" },
    { tab: "likes", href: "/likes", icon: <GoHistory className="icon" />, label: "History" },
    { tab: "profile", href: "/profile", icon: <GrTag className="icon" />, label: "Print Tag" }
  ];

  const steps = [
    "Gem Identification",
    "Qty & Custom Fields",
    "Informations",
    "Layout and Desc",
    "Upload Media"
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
    { title: 'Gem Image', description: 'Add your Gem Image here' },
    { title: 'Stone Image', description: 'Add your Stone image here' },
    { title: '360 Image', description: 'Add the 360 Image' },
    { title: 'Upload Video', description: 'Add your Video here' },
  ];

  const uploadCount = uploadBoxes.length; // how many upload sections you want
  const [previews, setPreviews] = useState<(File | null)[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  const [selectedValuesTreatment, setSelectedValuesTreatment] = useState<string[]>([]);

  return (
    <IonPage className="gem-entry bg-gradient">

        {/* Header */}
        <TopHeader pageTitle="Gem Entry" />

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
          
          <div className={`step-content ${direction}`}>
            {currentStep === 0 && (
                
              <IonList className='entry-content'>
                <IonItem>
                  <IonLabel position="fixed">Stone#</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Lab Report</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Gem Type</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>                

                <IonItemDivider className="entry-divider"></IonItemDivider>

                <IonItem>
                  <IonLabel  position="fixed">Shape</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel  position="fixed">Cut</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Color</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Color Code</IonLabel>
                  <IonInput placeholder="-" />
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
                  <IonLabel position="fixed">Carat <IonIcon icon={informationCircleOutline} /></IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel  position="fixed">Size</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Quantity <IonIcon icon={informationCircleOutline} /></IonLabel>
                  <IonButtons>                    
                    <IonButton onClick={() => setNumberInput(numberInput > 0 ? numberInput - 1 : 0)}><IonIcon icon={removeOutline} /></IonButton>
                    <IonInput  value={numberInput}  type="number" onIonInput={e => setNumberInput(parseInt(e.detail.value!, 10) || 0)} className="number-input" />
                    <IonButton onClick={() => setNumberInput(numberInput + 1)}><IonIcon icon={addOutline} /></IonButton>
                  </IonButtons>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Ct. / Stone</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Cost / Ct.</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Original Cost / Ct.</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Code</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Total Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Markup % <IonIcon icon={informationCircleOutline} /></IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Sell Price / Ct. <IonIcon icon={informationCircleOutline} /></IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Total Sell Price <IonIcon icon={informationCircleOutline} /></IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Retail Markup</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Retail Price</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Selection Price</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Min. Price</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

              </IonList>
            )}

            {currentStep === 1 && (
              <IonList className='entry-content'>

                <IonItem>
                  <IonLabel position="fixed">Country of Origin</IonLabel>
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
                  <IonLabel position="fixed">Measurement</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Miscellaneous</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Matching Stone</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <div style={{position: "relative"}}>
                  {showPicker && (
                    <div className="picker-dropdown">
                      <HexColorPicker color={colorPalette} onChange={handleColorChange} />
                      <IonButton expand="block" size="small" onClick={applyColor} className="apply-btn"> Apply Color </IonButton>
                    </div>
                  )}
                </div>                
                <IonItem>
                  <IonLabel  position="fixed">Pantone Color</IonLabel>
                  <IonInput
                    value={colorPalette}
                    ref={inputRef}
                    onClick={handleInputClick}
                    onIonInput={(e) => setColorPalette(e.detail.value!)}
                    className="color-input"
                  />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="fixed">RFID</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Treatment</IonLabel>                  
                  <IonSelect
                    multiple={true}            // Enable multiple selection
                    placeholder="Select"
                    interface="popover"
                    className="corner-select"
                    value={selectedValuesTreatment}     // Controlled value (array)
                    onIonChange={(e) => setSelectedValuesTreatment(e.detail.value)} // Update state
                  >
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Custom Fields</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>
                
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
               
              </IonList>
            )}

            {currentStep === 2 && (
              <IonList className='entry-content'>

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Purchase Information</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>    

                <IonItem>
                  <IonLabel position="fixed">Vendor</IonLabel>
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

                <IonItem id="cert-trigger" className="date-picker-area" ref={triggerRef}>
                  <IonLabel position="fixed">Purchase Date</IonLabel>
                  <IonInput placeholder="Select date" value={selectedDatePurchase} readonly={true} />
                  <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarPurchase(true)} />
                </IonItem>
                <IonPopover isOpen={showCalendarPurchase} trigger="cert-trigger" onDidDismiss={() => setShowCalendarPurchase(false)} showBackdrop={false} side="bottom" alignment="center">
                  <IonDatetime
                    presentation="date"
                    className="calendar-sm"
                    onIonChange={(e) => {
                      const value = e.detail.value;
                      if (typeof value === 'string') {
                        setSelectedDatePurchase(value);
                        setShowCalendarPurchase(false);
                      }
                    }}
                  />
                </IonPopover>  

                <IonItem>
                  <IonLabel position="fixed">Lot#</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Certificate Information</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>   

                <IonItem>
                  <IonLabel position="fixed">Certificate #</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem id="cert-trigger" className="date-picker-area" ref={triggerRef}>
                  <IonLabel position="fixed">Cert. Date</IonLabel>
                  <IonInput placeholder="Select date" value={selectedDateCert} readonly={true} />
                  <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendarCert(true)} />
                </IonItem>
                <IonPopover isOpen={showCalendarCert} trigger="cert-trigger" onDidDismiss={() => setShowCalendarCert(false)} showBackdrop={false} side="bottom" alignment="center">
                  <IonDatetime
                    presentation="date"
                    className="calendar-sm"
                    onIonChange={(e) => {
                      const value = e.detail.value;
                      if (typeof value === 'string') {
                        setSelectedDateCert(value);
                        setShowCalendarCert(false);
                      }
                    }}
                  />
                </IonPopover>
                <IonItem>
                  <IonLabel position="fixed">Expenses</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Cert. Comments</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Invoice Information</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>  

                <IonItem>
                  <IonLabel position="fixed">Customer</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Invoice#</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Date</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Sold By</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>
                
              </IonList>
            )}     

            {currentStep === 3 && (
              <IonList className='entry-content'>

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Layout</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>   

                <IonItem>
                  <IonLabel position="fixed">Layout#</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Total Carats</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Ave. Cost / Ct</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Total Ave. / Ct</IonLabel>
                  <IonInput placeholder="-" />                  
                </IonItem>                              

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Descriptions</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>    

                <IonItem className="label-top-align">
                  <IonLabel position="fixed">Notes</IonLabel>
                  <IonTextarea placeholder="-" />
                </IonItem>
                <IonItem className="label-top-align">
                  <IonLabel position="fixed">Description</IonLabel>
                  <IonTextarea placeholder="-" />
                </IonItem>  
                <IonItem className="label-top-align">
                  <IonLabel position="fixed">Short Description</IonLabel>
                  <IonTextarea placeholder="-" />
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
                            <video className="preview-video" controls width="100%" key={URL.createObjectURL(previews[index])}>
                              <source src={URL.createObjectURL(previews[index])} type={previews[index]?.type} />
                              Your browser does not support the video tag.
                            </video>
                          ) : previews[index] && previews[index].type.startsWith('image') ? (
                            <IonImg src={previewUrls[index]} className="preview-img" />
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
                            onChange={(e) => handleFileChange(e, index)}
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
                <IonButton onClick={nextStep}>Save & Next</IonButton> {/* disabled={currentStep !== steps.length - 1} */}
              </IonCol>

            </IonRow>
          </IonGrid>

        </IonContent>

        {/* Bottom Navigation */}
        <BottomNavigation tabs={gemEntryTabs} />

    </IonPage>

  );
};

export default GemEntry;
