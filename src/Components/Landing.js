import React, {useEffect, useState} from 'react';
import OverAllStatus from './OverAllStatus';
import CountryWise from './CountryWise';

export default function Landing(props) {
  const currentScreen = props.currentScreen;
  const countrySelection = props.countrySelection;
  console.log("Landing");
  console.log(countrySelection[0]);
  if(currentScreen === 0){
    return (
      <div >
          <OverAllStatus />
      </div>
    );
  }
  else if(currentScreen === 1){
    return (
      <div >
          <CountryWise countrySelection={countrySelection}/>
      </div>
    );    
  }
}
