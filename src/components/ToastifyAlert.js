import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const ToastifyAlert = () => {
  return (
    <ToastContainer
      position="top-center"
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnHover
    />
  );
};

export default ToastifyAlert;
