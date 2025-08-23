
import React, { useState, useRef } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonList, IonItem, IonLabel, IonInput, IonItemDivider, IonSelect, IonSelectOption, IonPopover, IonDatetime, IonImg, IonTextarea } from '@ionic/react';

import { chevronBack, chevronForward, calendarOutline } from "ionicons/icons";
import { PiHandshake } from "react-icons/pi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoHistory } from "react-icons/go";
import { GrTag } from "react-icons/gr";

import TopHeader from '../../../components/TopHeader/TopHeader';
import BottomNavigation from '../../../components/BottomNavs/BottomNavs';
import './JewelEntry.css';

const JewelEntry: React.FC = () => {

   const jewelEntryTabs = [
    { tab: "home", href: "/home", icon: <AiOutlineFileAdd className="icon" />, label: "New" },
    { tab: "search", href: "/search", icon: <RiDeleteBin6Line className="icon" />, label: "Delete" },
    { tab: "add", href: "/add", icon: <PiHandshake className="icon" />, label: "Partnership" },
    { tab: "likes", href: "/likes", icon: <GoHistory className="icon" />, label: "History" },
    { tab: "profile", href: "/profile", icon: <GrTag className="icon" />, label: "Print Tag" }
  ];

  const steps = [
    "Jewelry Identification",
    "Qty & Custom Fields",
    "Price & Cost",
    "Certificate Information",
    "Search Results",
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

  /*const [numberInput, setNumberInput] = useState(0);

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
  };*/

  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const triggerRef = useRef(null);

  /*const optionsDefault = [
    "N", "LD", "IRR", "CE", "COL", "HPHT", "CVD"
  ];*/

  const uploadBoxes = [
    { title: 'Stone Certificate', description: 'Add your Stone Certificate here' },
    { title: 'Stone Image', description: 'Add your Stone image here' },
    { title: 'Jewelry Certificate', description: 'Add your Jewelry Certificate here' },
    { title: 'Jewelry Image', description: 'Add the Jewelry Image' },
    { title: 'Upload Video', description: 'Add your Video here' },
  ];

  // const uploadCount = uploadBoxes.length; // how many upload sections you want
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
    "Stone Type", "Shape", "Color", "Fancy", "Clarify", "Lab", "Cert#", "Qty", "Wt", "Size", "Cost / Ct", "Total", "Center", "Treatment", "Stone#",
  ];
  const sampleData = Array(50).fill({});

  return (
    <IonPage className="jewel-entry bg-gradient">

        {/* Header */}
        <TopHeader pageTitle="Jewel Entry" />

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
                  <IonLabel position="fixed">Record#</IonLabel>
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
                  <IonLabel position="fixed">Stock#</IonLabel>
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
                  <IonLabel position="fixed">Metal Wt.</IonLabel>
                  <IonInput placeholder="-" />
                  <span className="input-separator-text">-</span>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Metal Cost</IonLabel>
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
                  <IonLabel position="fixed">Vendor Stock#</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Jewelry Expenses</IonLabel>
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

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Current Metal Prices / 10 Gram</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>

                <IonItem>
                  <IonLabel position="fixed">Gold</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Platinum</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Silver</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

              </IonList>
            )}

            {currentStep === 1 && (
              <IonList className='entry-content'>

                <IonItem>
                  <IonLabel position="fixed">Quantity</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Qty on Memo</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Qty Sold</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Qty on Hand</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Memo Qty</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Billed Qty</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Committed Qty</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Transfered Qty to Sales Person </IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">On Hand Qty </IonLabel>
                  <IonInput placeholder="-" />
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
            )}

            {currentStep === 2 && (
              <IonList className='entry-content'>
                <IonItem>
                  <IonLabel position="fixed">T. Metal Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Diamond Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Gem Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Labor Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Current Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Adjust Cost</IonLabel>
                  <IonInput placeholder="-" />
                  <span className="input-separator-text">-</span>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Total Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Code</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Sell Price</IonLabel>
                  <IonInput placeholder="-" />
                  <span className="input-separator-text">M %</span>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Tag Price</IonLabel>
                  <IonInput placeholder="-" />
                  <span className="input-separator-text">M %</span>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Mounting Sell Price</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                
                <IonItem>
                  <IonLabel position="fixed">Profit</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
              </IonList>
            )}     

            {currentStep === 3 && (
              <IonList className='entry-content'>

                <IonItem>
                  <IonLabel position="fixed">In House Location</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Memo In #</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem id="cert-trigger" className="date-picker-area" ref={triggerRef}>
                  <IonLabel position="fixed">Purchase Date</IonLabel>
                  <IonInput placeholder="Select date" value={selectedDate} readonly={true} />
                  <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendar(true)} />
                </IonItem>
                <IonPopover isOpen={showCalendar} trigger="cert-trigger" onDidDismiss={() => setShowCalendar(false)} showBackdrop={false} side="bottom" alignment="center">
                  <IonDatetime
                    presentation="date"
                    className="calendar-sm"
                    onIonChange={(e) => {
                      const value = e.detail.value;
                      if (typeof value === 'string') {
                        setSelectedDate(value);
                        setShowCalendar(false);
                      }
                    }}
                  />
                </IonPopover>

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Total Diamond Weight</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>

                <IonItem>
                  <IonLabel position="fixed">Qty</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Weight</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Total Gem Weight</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>

                <IonItem>
                  <IonLabel position="fixed">Qty</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Weight</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem className="ion-text-center no-mb"><h2 className="entry-subtitle">Total Carats</h2></IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>

                <IonItem>
                  <IonLabel position="fixed">Center Stone</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Tag Dia CT	</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Tag Gem CT</IonLabel>
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
                <IonItem className="label-top-align">
                  <IonLabel position="fixed">Short Description 2</IonLabel>
                  <IonTextarea placeholder="-" />
                </IonItem>
                
              </IonList>
            )}

            {currentStep === 4 && (
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
            )}

            {currentStep === 5 && (
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
        <BottomNavigation tabs={jewelEntryTabs} />

    </IonPage>

  );
};

export default JewelEntry;
