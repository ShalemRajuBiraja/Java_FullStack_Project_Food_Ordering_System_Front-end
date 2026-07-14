import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./components/ProtectedRoutes";

import Home from "./pages/Home";
import ManagePassword from "./pages/ManagePassword";
import ManageAddress from "./pages/ManageAddress";
import AdminLogin from "./components/AdminLogin";
import Cart from "./pages/Cart";



const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Protected routes */}
          <Route path="/reset-password" element={ <ProtectedRoutes> <ManagePassword /> </ProtectedRoutes>} />
          <Route path="/manage-address" element={ <ProtectedRoutes>  <ManageAddress /> </ProtectedRoutes>} />
          <Route path="/adminlogin" element={ <ProtectedRoutes>  <AdminLogin /> </ProtectedRoutes>} />
          <Route path="/cart" element={ <ProtectedRoutes>  <Cart /> </ProtectedRoutes>} />


        </Routes>
      </main>
      <Footer />
       <ToastContainer
        position="top-center"
        autoClose={750}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;