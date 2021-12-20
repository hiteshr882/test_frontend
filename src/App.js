import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";

import Header from "./components/header";
import Upload from "./components/upload";

function App() {
  return (
    <>
      <Header />
      <Upload />

      <ToastContainer autoClose={2000} />
    </>
  );
}

export default App;
