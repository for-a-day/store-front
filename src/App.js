import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Main from './pages/main/Main';
import Table from './pages/table/Table';
import Stock from './pages/stock/Stock';
import Sales from './pages/sales/Sales';
import Login from './pages/login/Login';
import Order from './pages/order/Order';
import Payment from './pages/order/Payment';
import { ThemeProvider } from '@mui/material/styles';
import { baseTheme } from './assets/global/Theme-variable';
import FullLayout from './layout/FullLayout';
import { PopupProvider  } from "./components/popup/PopupContext";

function App() {
  const theme = baseTheme;

  const [login, setLogin] = useState('inactive');

  useEffect(() => {setLogin(localStorage.getItem('token'))}, [login]);

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
        <PopupProvider>
          <Routes>
            {!login ? (
              <Route path='/' element={<Login setLogin={setLogin}/>} />
            ) : (
              <Route path='/' element={<FullLayout setLogin={setLogin}/>}>
              <Route index element={<Main />} />
              <Route path='table' element={<Table />} />
              <Route path='stock' element={<Stock />} />
              <Route path='sales' element={<Sales />} />
              <Route path='order' element={<Order />} />
              <Route path='payment' element={<Payment />} />
            </Route>
            )}
          </Routes>
          </PopupProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
