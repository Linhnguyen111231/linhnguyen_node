import './App.css';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter, useNavigate } from 'react-router-dom'
import Login from './layouts/Admin/Login';
import MasterLayoutsAdmin from './layouts/Admin/MasterLayoutsAdmin';
import MasterLayoutClients from './layouts/Clients/MasterLayoutClients';

import Register from './layouts/Admin/Register';
import axios from 'axios';

import swal from 'sweetalert';
import Loading from './components/Loading';
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})
function App() {
  const [checkAdmin, setCheckAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    axios.get('/api/checkingAuthenticated')
      .then(res => {
        if (res) {
          if (res.data.status === 200) {
            setCheckAdmin(true)
      setLoading(true)

          } 
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          console.log(1);
        }
      })
      setLoading(true)
  }, [])
  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    if (err?.response?.status === 401) {
      <Navigate to='/login' />
    }
    return Promise.reject(err).catch(error => {

    });;
  });
  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 403) // Access Denied
    {
      swal("Forbidden", error.response.data.message, "warning");
      <Navigate to='/403' />

    }
    else if (error.response.status === 404) //Page Not Found
    {
      swal("404 Error", "Url/Page Not Found", "warning");
      <Navigate to='/404' />

    }
    return Promise.reject(error);
  }
  );
  
  if (!loading) {
    return <Loading/>
  }
  else{
  return (

    <Router>
      <Routes>
        {/* <Route path='' element={<MasterLayoutClients/>}/> */}
        <Route path='/login' element={localStorage.getItem('auth_token') && checkAdmin ? <Navigate replace={true} to='/admin/index' /> : (localStorage.getItem('auth_name')? <Navigate replace={true} to='/index' /> : <Login />)} />


        <Route path='/register' element={localStorage.getItem('auth_token') ? <Navigate replace={true} to='/index' /> : <Register />} />
        <Route exact path='register' element={<Register />} />
        
        {checkAdmin ? <Route name="Admin" path='/admin/*' element={<MasterLayoutsAdmin />} /> : ''}
        {!checkAdmin ? <Route name="Client" path='/*' element={<MasterLayoutClients />} /> : ''}

      </Routes>
    </Router>
  );
  }
}

export default App;
