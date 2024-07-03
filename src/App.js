import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Main from './pages/main/Main';
import Table from './pages/table/Table';
import Stock from './pages/stock/Stock';
import Sales from './pages/sales/Sales';
import Menu from './pages/menu/Menu';
import Login from './pages/login/Login';
import Order from './pages/order/Order';
import { ThemeProvider } from '@mui/material/styles';
import { baseTheme } from './assets/global/Theme-variable';
import FullLayout from './layout/FullLayout';

function App() {
  const theme = baseTheme;

  const [login, setLogin] = useState('inactive');

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            {localStorage.length <= 0 ? (
              <Route path='/' element={<Login setLogin={setLogin}/>} />
            ) : (
              <Route path='/' element={<FullLayout setLogin={setLogin}/>}>
              <Route index element={<Main />} />
              <Route path='menu' element={<Menu />} />
              <Route path='table' element={<Table />} />
              <Route path='stock' element={<Stock />} />
              <Route path='sales' element={<Sales />} />
              <Route path='order' element={<Order />} />
            </Route>
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
