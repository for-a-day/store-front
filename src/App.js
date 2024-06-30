import './App.css';
import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import Main from './pages/main/Main';
import Table from './pages/table/Table';
import Stoke from './pages/stoke/Stoke';
import Sales from './pages/sales/Sales';
import Menu from './pages/menu/Menu';
import { ThemeProvider } from '@mui/material/styles';
import {baseTheme} from './assets/global/Theme-variable'
import FullLayout from './layout/FullLayout';

function App() {
  const theme = baseTheme;
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path='/' element={<FullLayout />} >
              <Route path='/' element={<Main />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/table' element={<Table />} />
              <Route path='/stoke' element={<Stoke />} />
              <Route path='/sales' element={<Sales />} />
            </Route>
            
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
