import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import FullEvent from './components/FullEvent';
import Home from './components/Home';
import NewEventCreation from './components/NewEventCreation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/events"  element={<Home />}/>
        <Route path="/create" element={<NewEventCreation />} />  
        <Route path="/events/:name"  element={<FullEvent />}/>
      </Routes>
    </div>
  );
}

export default App;
