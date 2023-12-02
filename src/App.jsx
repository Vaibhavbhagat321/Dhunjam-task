import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import AdminDashboard from "./pages/adminDashboard";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  const [user, setUser] = useState({});
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate replace to="login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<AdminDashboard user={user} />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#030303",
          },
        }}
      />
    </div>
  );
}

export default App;
