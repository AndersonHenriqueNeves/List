import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';

function DashboardDoctor() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token-list')

    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    } else {
      history.push('/')
    }
  }, [])
  return (
    <>
      <Navbar />
    </>
  );
}

export default DashboardDoctor;