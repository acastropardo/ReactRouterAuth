import * as React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import client from "../feathers";
import { useState, useEffect } from "react";
import SearchBar from "@mkyy/mui-search-bar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "cliente",
    headerName: "Cliente",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row["cliente.nombres"] || ""}  ${
        params.row["cliente.apellidos"] || ""
      }`,
    // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: "detalle_visita", headerName: "Detalle visita", width: 130 },
  { field: "fecha_documento", headerName: "Fecha documento", width: 130 },
  { field: "fecha_visita", headerName: "Fecha visita", width: 130 },
  { field: "agendar", headerName: "Agenda visita", width: 130 },
];

export const OrdenesVentaPage = () => {
  //rows = leerOrdenes();
  //console.log("rows "+JSON.stringify(rows))

  function handleTableRowSelection(event) {
    var rowData = event.row;

    setSelectedRow(rowData.id);
    console.log("selected row " + rowData.id);
  }

  function handleSearch() {
    //...
    //console.log(textFieldValue);
    filtrarOrdenes(textFieldValue);
  }

  function filtrarOrdenes(filtro) {
    //var ordenesLista = [];

    client
      .service("orden-venta")
      .find({
        query: {
          id: {
            $in: [filtro],
          },
        },
      })
      .then((response) => {
        getOrdenesVenta(response.data);
        //var ordenesLista = response.data;
        //console.log("ordenes de venta " + JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });

    //return ordenesLista;
  }

  function leerOrdenes() {
    //var ordenesLista = [];

    client
      .service("orden-venta")
      .find()
      .then((response) => {
        getOrdenesVenta(response.data);
        //var ordenesLista = response.data;
        //console.log("ordenes de venta " + JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });

    //return ordenesLista;
  }
  const [ordenesVenta, getOrdenesVenta] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const navigate = useNavigate();
  
  const handleAgregar = (event) => {
    event.preventDefault();

    let path = "";
    path = "/dashboard/ordenes-venta-gestion/:" + "0";
    navigate(path);
  };

  const handleEditar = (event) => {
    event.preventDefault();

    let path = "";

    if (selectedRow != null) {
      path = "/dashboard/ordenes-venta-gestion/:" + selectedRow;
      navigate(path);
    }
  };

  useEffect(() => {
    leerOrdenes();
  }, []);

  return (
    <TableContainer component={Paper}>
      <h1>Ordenes de Venta</h1>
      <SearchBar
        value={textFieldValue}
        onChange={(newValue) => setTextFieldValue(newValue)}
        onSearch={handleSearch}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={ordenesVenta}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          //checkboxSelection
          onRowClick={handleTableRowSelection}
        />
      </div>
      <Button
        id="agregar"
        type="submit"
        endIcon={<AddIcon />}
        variant="contained"
        onClick={handleAgregar}
      >
        Agregar
      </Button>
      &nbsp;
      <Button
        id="editar"
        type="submit"
        endIcon={<EditIcon />}
        variant="contained"
        onClick={handleEditar}
      >
        Editar
      </Button>
    </TableContainer>
  );
};
