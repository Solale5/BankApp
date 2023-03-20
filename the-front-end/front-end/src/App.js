import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { Route, Routes } from "react-router-dom";
import FindAtm from "./pages/findatm/findatm";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findatm" element={<FindAtm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
