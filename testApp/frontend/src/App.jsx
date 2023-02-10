import React from 'react';
import { Route, Routes  } from "react-router-dom";

import './App.css';
import LoginForm from './features/auth/LoginForm'
import { NoMatch } from './NoMatch';
import DashboardPage from './features/dashboard/DashboardPage';

function App() {

  return (
    <Routes className="App">
      <Route path='home' element={<DashboardPage />}/>
      <Route path='/' element={<LoginForm />}/>
      <Route path='*' element={<NoMatch />}/>
    </Routes>
  );
}

export default App;
