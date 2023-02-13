import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { HomePage } from "./pages/Home";
import { ClientesPage } from "./pages/Clientes";
import { OrdenesVentaPage } from "./pages/OrdenesVenta";
import { OrdenesVentaGestionPage } from "./pages/OrdenesVentaGestion";
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
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="ordenes-venta" element={<OrdenesVentaPage />} />
        <Route path="ordenes-venta-gestion/:orderId" element={<OrdenesVentaGestionPage />} />
      </Route>
    </Routes>
  );
}
