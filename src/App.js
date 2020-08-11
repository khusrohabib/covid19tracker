import React, {useState} from 'react';
import './App.css';
import NavBar from './Components/NavBar'
import Landing from './Components/Landing';
import FooterBar from './Components/FooterBar'
function App() {
  const tabSelection = useState(0);
  const countrySelection = useState("");

  return (
    <div>
      <NavBar countrySelection={countrySelection}/>
      <FooterBar tabSelection={tabSelection}/>
      <Landing currentScreen={tabSelection[0]} countrySelection={countrySelection}/>
    </div>
  );
}

export default App;
