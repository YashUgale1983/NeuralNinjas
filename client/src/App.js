import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loginpage from "./scenes/loginpage";
import Homepage from "./scenes/homepage";
// import MySlots from "./scenes/mySlots";
// import MyAppointments from "./scenes/myAppointments";
// import Profile from "./scenes/profile";
import Signuppage from "./scenes/signuppage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/signup" element={<Signuppage />} />
          <Route path="/home" element={<Homepage />} />
          {/* <Route path="/mySlots" element={<MySlots />} /> */}
          {/* <Route path="/myAppointments" element={<MyAppointments />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default App;
