import React, { useEffect, useMemo, useRef, useState } from 'react'

import "./TrafficLightStyle.css"

export const TrafficLight = () => {
  const [switchRedLight, setSwitchRedLight] = useState(false);
  const [switchYellowLight, setSwitchYellowLight] = useState(false);
  const [switchGreenLight, setSwitchGreenLight] = useState(false);
  const [switchBlueLight, setSwitchBlueLight] = useState(false);
  const [showLight, setShowLight] = useState(false);
  const [autoLightOn, setAutoLightOn] = useState(false);
  const [indexFuntions, setIndexFuntions] = useState(0);
  const timing = useRef();

  const funtionList = useMemo(()=>{
    const functionsLight = [setSwitchRedLight, setSwitchYellowLight, setSwitchGreenLight];
    
    if (showLight){
      functionsLight.push(setSwitchBlueLight);
    }
    return functionsLight;
  },[showLight]);

  useEffect(()=>{
    setSwitchRedLight(false);
    setSwitchYellowLight(false);
    setSwitchGreenLight(false);
    setSwitchBlueLight(false);

    if (!autoLightOn) return;

    
    funtionList[indexFuntions](true);
    timing.current = setTimeout(()=>{
      setIndexFuntions((prev) => prev===funtionList.length-1? 0 : prev+1);
    },3000);
  },[autoLightOn, indexFuntions]);
  
  const turnOnRedLight = () =>{
    setSwitchRedLight((prev) =>!prev);
  };
  const turnOnYellowLight = () =>{
    setSwitchYellowLight((prev) =>!prev);
  };
  const turnOnGreenLight = () =>{
    setSwitchGreenLight((prev) =>!prev);
  };
  const turnOnBlueLight = () =>{
    setSwitchBlueLight((prev) =>!prev);
  };


  const showBlueLight = () =>{
    setShowLight((prev) =>!prev);
  };
  const autoSwitchLight = () =>{
    setAutoLightOn((prev) =>!prev);
    
    if (!autoLightOn) {
      clearTimeout(timing.current);
      setIndexFuntions(0);
    }
  };

  return (
    <div className='container'>
      <div className='div_Container gap-2 col-8'>
        
        <div className='trafficLight col-12'>
          <div 
            className={`Light col-8 ${switchRedLight ? 'red_Light_on' : 'red_Light'}`}
            onClick={turnOnRedLight}
            ></div>
          <div
            className={`Light col-8 ${switchYellowLight ? 'yellow_Light_on' : 'yellow_Light'}`}
            onClick={turnOnYellowLight}></div>
          <div
            className={`Light col-8 ${switchGreenLight ? 'green_Light_on' : 'green_Light'}`}
            onClick={turnOnGreenLight}></div>
          <div 
            className={`Light col-8 ${switchBlueLight ? 'purple_Light_on' : 'purple_Light'} ${showLight?'show':'hide'}`}
            onClick={turnOnBlueLight}
            ></div>
        </div>

        <button
          className={`btn btn-${autoLightOn?'danger':'success'} col-12`}
          type='button'
          onClick={autoSwitchLight}>
          <i className={`fa-solid fa-${autoLightOn?'stop':'play'}`}></i>
        </button>

        <button
          className='btn btn-secondary col-12'
          type='button'
          onClick={showBlueLight}>
          {showLight?'Hide Blue Light':'Show Blue Light'}
        </button>
      </div>
    </div>
  )
}
