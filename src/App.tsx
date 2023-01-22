import React from 'react';
import { Counter } from '../counter/Counter';
import { Breeds } from './breeds/Breeds';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Breeds />
      </header>
    </div>
  );
}

export default App;
