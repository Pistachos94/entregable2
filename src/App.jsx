import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import Weather from '../Modules/Weather'
import '../css/style.css'
function App() {

  return (
    <div className="App disflex colorViolet">
      <Weather/>
    </div>
  )
}

export default App
