import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { clientesPage } from "./pages/Clientes";
import { ordenesVentaPage } from "./pages/OrdenesVenta";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import "./styles.css";

export default function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="clientes" element={<clientesPage />} />
        <Route path="ordenes-venta" element={<ordenesVentaPage />} />
      </Route>
    </Routes>
  );
}
