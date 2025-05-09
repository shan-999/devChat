import Home from './Pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login';


import { PrivetRoutes } from './Componets/privetRoutes/privetRoute';

import { useDispatch } from 'react-redux';
import { checkTocken } from './Store/slice/auth';
import { useEffect } from 'react';
import { AppDispatch } from './Store/store';

const App = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  
  useEffect(() => {
    dispatch(checkTocken())
  },[])


  return (
    <BrowserRouter>

          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/sign-up' element={<LoginPage />} />

            <Route element={<PrivetRoutes />}>
              <Route path='/' element={<Home />} />
            </Route>

          </Routes>

    </BrowserRouter>
  )
}

export default App
