import React,{ useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { UserView } from './routes/UserView';
import LoginForm from './routes/LoginForm';
import { Route, Routes } from 'react-router-dom';
import { NoMatch } from './components/NoMatch';

function App() {
  return (
    <Routes className="App">
      <Route path='/' element={<LoginForm />}/>
      <Route path='*' element={<NoMatch />}/>
    </Routes>
  );
}

export default App;
