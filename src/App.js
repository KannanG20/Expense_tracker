import './App.css';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Login from './pages/Login'
import Expenses from './pages/Expenses'
import { useEffect, useState } from 'react';
import AddExpense from './pages/AddExpense';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateExpense from './pages/UpdateExpense';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedRoute ><Expenses/></ProtectedRoute>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create-expense' element={<ProtectedRoute  ><AddExpense/></ProtectedRoute>} />
        <Route path='/update-expense/:id' element={<ProtectedRoute ><UpdateExpense/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
