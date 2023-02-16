import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";
import { React }  from "react";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Clientes", path: "clientes" },
          { label: "Ordenes de Venta", path: "ordenes-venta" }
        ]}
      />
      {outlet}
    </div>
  );
};
