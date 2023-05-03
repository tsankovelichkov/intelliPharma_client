import './App.scss';
import { useEffect } from 'react'

import Header from './general-components/Header/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Products from './pages/Products';
import DashboardMenu from './general-components/DashboardMenu/DashboardMenu';
import { useDeactivateNotification, useNotificationStatus } from './contexts/notificationsContext';
import notifications from './functions/notifications';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  let navigate = useNavigate()
  let { notificationStatus, operationType, message } = useNotificationStatus()
  let deactivateNotification = useDeactivateNotification()

  let successNotify = notifications.successMessage(message)
  let errorNotify = notifications.errorMessage(message)

  useEffect(() => {
    navigate("/products/tracked-products")
  }, [])
  

  useEffect(() => {
    if (notificationStatus == true && operationType == 'SUCCESS') {
      successNotify()
      deactivateNotification()
    } else if (notificationStatus == true && operationType == 'ERROR') {
      errorNotify()
      deactivateNotification()
    }
  }, [notificationStatus])

  return (
    <>
      <ToastContainer />
      <div className="general-app-wrapper">
        <Header />
        <div className='app-main-container'>
          <DashboardMenu />
          <div className='app-info-present-container'>
            <Routes>
              <Route path="/products/*" element={<Products />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
