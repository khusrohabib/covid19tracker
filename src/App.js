import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './Components/NavBar'
import Landing from './Components/Landing';
import FooterBar from './Components/FooterBar'
function App() {
  const tabSelection = useState(0);
  const countrySelection = useState("AF");

  return (
    <div>
      <NavBar countrySelection={countrySelection}/>
      <Landing currentScreen={tabSelection[0]} countrySelection={countrySelection}/>
      <FooterBar tabSelection={tabSelection}/>
    </div>
  );
}

export default App;
