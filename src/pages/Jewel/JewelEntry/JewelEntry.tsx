
import React, { useState, useRef } from 'react';
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonList, IonItem, IonLabel, IonInput, IonItemDivider, IonSelect, IonSelectOption, IonButtons, IonThumbnail, IonPopover, IonDatetime, IonCheckbox, IonImg } from '@ionic/react';
import { HexColorPicker } from "react-colorful";

import { addOutline, chevronBack, chevronForward, informationCircleOutline, removeOutline, calendarOutline } from "ionicons/icons";
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

  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
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

  return (
    <IonPage className="bg-gradient">

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
                  <IonLabel position="fixed">Stone#</IonLabel>
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
                  <IonLabel position="fixed">Lab</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Certificate#</IonLabel>
                  <IonInput placeholder="-" />
                  <IonThumbnail className="thumb-img" slot="end">
                    <img src="/src/assets/images/egl_usa.jpg" alt="Certificate Client" />
                  </IonThumbnail>
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
                  <IonLabel position="fixed">Color</IonLabel>
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
                  <IonLabel position="fixed">Measurement</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel  position="fixed">Cut</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Fancy Color <IonIcon icon={informationCircleOutline} /></IonLabel>
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
                  <IonLabel position="fixed">Pair</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
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
                  <IonLabel position="fixed">Matching Stone</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Stone Radio</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
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
                  <IonLabel position="fixed">BGM</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Eye Clean</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
            )}

            {currentStep === 1 && (
              <IonList className='entry-content'>
                <IonItem>
                  <IonLabel position="fixed">Depth %</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Table %</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Crown A</IonLabel>
                  <IonInput placeholder="-" />
                  <span className="input-separator-text">-- H --</span>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Pavillion A</IonLabel>
                  <IonInput placeholder="-" />
                  <span className="input-separator-text">-- H --</span>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Girdle</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Culet</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Polish</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Symmetry</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Fluorescene</IonLabel>
                  <IonSelect placeholder="Select" interface="popover" className="corner-select">
                    <IonSelectOption value="opt1">Option 1</IonSelectOption>
                    <IonSelectOption value="opt2">Option 2</IonSelectOption>
                    <IonSelectOption value="opt3">Option 3</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Growth Type</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Key To Symbol</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
               
              </IonList>
            )}            

            {currentStep === 2 && (
              <IonList className='entry-content'>
                <IonItem id="cert-trigger" className="date-picker-area" ref={triggerRef}>
                  <IonLabel position="fixed">Cert. Date</IonLabel>
                  <IonInput placeholder="Select date" value={selectedDate} readonly={true} />
                  <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendar(true)} />
                </IonItem>
                <IonPopover isOpen={showCalendar} trigger="cert-trigger" onDidDismiss={() => setShowCalendar(false)} showBackdrop={false} side="bottom" alignment="center">
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
                <IonItem>
                  <IonLabel position="fixed">Expenses</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Cert. Comments</IonLabel>
                  <IonInput placeholder="-" />
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
                  <IonLabel position="fixed">Bill #</IonLabel>
                  <IonInput placeholder="-" />
                  <IonButton className="button-view">View</IonButton>
                </IonItem>                
                <IonItem id="purchase-trigger" className="date-picker-area" ref={triggerRef}>
                  <IonLabel position="fixed">Purchase Date</IonLabel>
                  <IonInput placeholder="Select date" value={selectedDate} readonly={true} />
                  <IonIcon size="large" icon={calendarOutline} onClick={() => setShowCalendar(true)} />
                </IonItem>
                <IonPopover isOpen={showCalendar} trigger="purchase-trigger" onDidDismiss={() => setShowCalendar(false)} showBackdrop={false} side="bottom" alignment="center">
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
                <IonItem>
                  <IonLabel position="fixed">LOT #</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem className="no-mb">
                  <h2 className="entry-subtitle">On Hold</h2>
                  <IonButton className="button-view" style={{ marginLeft: 'auto' }}>View</IonButton>
                </IonItem>
                <IonItemDivider className="entry-divider" style={{ marginTop: '5px' }}></IonItemDivider>
                <IonItem>
                  <IonLabel position="fixed">Customer</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Expires</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
              </IonList>
            )}

            {currentStep === 3 && (
              <IonList className='entry-content'>
                <IonItem>
                  <IonLabel position="fixed">Last Import Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Cost / CT</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">On Hand Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Total Cost</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Cost % off RAP</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">RAP Price</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Sell Price / CT</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Sell % off RAP</IonLabel>
                  <IonInput placeholder="-" />
                </IonItem>
                <IonItem>
                  <IonLabel position="fixed">Total Sell Price</IonLabel>
                  <IonInput placeholder="-" />
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


                {/*

                  

                <IonItem className="upload-title">
                  <div className="upload-title-inner">
                    <h2 className="entry-subtitle">Certificate Image</h2>
                    <p className="entry-paragraph">Add your Certificate here</p>
                  </div>
                </IonItem>
                <IonItem className="upload-area">
                  <div className="upload-box">
                    <IonLabel className="upload-text">Upload your file</IonLabel>

                    {imagePreview && <IonImg src={imagePreview} className="preview-img" />}

                    <IonButton onClick={openFilePicker} className="upload-btn">
                      {imagePreview ? 'Replace' : 'Upload'}
                    </IonButton>

                    <input
                      type="file"
                      accept="image/*,video/*"
                      ref={fileInputRef}
                      hidden
                      onChange={handleFileChange}
                    />
                  </div>
                </IonItem>
                <IonItem className="upload-title">
                  <div className="upload-title-inner">
                    <h2 className="entry-subtitle">Jewelry Image</h2>
                    <p className="entry-paragraph">Add your Jewelry here</p>
                  </div>
                </IonItem>
                <IonItem></IonItem>
                <IonItem className="upload-title">
                  <div className="upload-title-inner">
                    <h2 className="entry-subtitle">Stone Image</h2>
                    <p className="entry-paragraph">Add your Stone here</p>
                  </div>
                </IonItem>
                <IonItem></IonItem>
                <IonItem className="upload-title">
                  <div className="upload-title-inner">
                    <h2 className="entry-subtitle">Upload 360° Image</h2>
                    <p className="entry-paragraph">Here add the 360° Image of Stone</p>
                  </div>
                </IonItem>
                <IonItem></IonItem>
                <IonItem className="upload-title">
                  <div className="upload-title-inner">
                    <h2 className="entry-subtitle">Upload Video</h2>
                    <p className="entry-paragraph">Add Video</p>
                  </div>
                </IonItem>
                <IonItem></IonItem>
                */}

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
                <IonButton onClick={nextStep} disabled={currentStep === steps.length - 1}>Save & Next</IonButton>
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
