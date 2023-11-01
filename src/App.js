import React,{useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Directory from './components/Directory';
import Details from './components/Details';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Directory} />
          <Route exact path="/user/:id" Component={Details} />
        </Routes>
      </Router>
    </>
  )
}

export default App