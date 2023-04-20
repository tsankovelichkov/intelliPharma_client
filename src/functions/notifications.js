import {  toast } from 'react-toastify';

function errorMessage(text) {
    return () => {
        toast.error(text, {
          position: "top-center",
          autoClose: 3700,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
        });
      }
}

function successMessage(text) {
  return () => {
      toast.success(text, {
        position: "top-center",
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
      });
    }
}

export default {
  successMessage,
  errorMessage
}