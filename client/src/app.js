import React from 'react'
import Register from './screens/Register'
import image from './assets/logo.png';
import './App.css';

export default function App() {
  
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-7 my-auto">
          <div className='col-md-8'>
            <img className="img-fluid w-100 h-50" src={image} alt=""/>
          </div>
        </div>
        <div className="col-md-5">
            <Register />
        </div>
      </div>
    </div>
  )
}
