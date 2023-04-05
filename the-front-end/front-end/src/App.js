import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { Route, Routes } from "react-router-dom";
import FindAtm from "./pages/findatm/findatm";
import AccountPage from "./pages/account/account";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findatm" element={<FindAtm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  );
}

export default App;
