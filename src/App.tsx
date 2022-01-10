import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Event from './components/Event';
import Home from './components/Home';
import NewEventCreation from './components/NewEventCreation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={<Home />}/>
        <Route path="/new-event" element={<NewEventCreation />} />  
        <Route path="/events/name"  element={<Event />}/>

        
      </Routes>
    </div>
  );
}

export default App;
