import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import client from "../feathers";
import { useState, useEffect } from "react";
import SearchBar from "@mkyy/mui-search-bar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'cliente',
    headerName: 'Cliente',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row["cliente.nombres"] || ''}  ${params.row["cliente.apellidos"] || ''}`,
     // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'detalle_visita', headerName: 'Detalle visita', width: 130 },
  { field: 'fecha_documento', headerName: 'Fecha documento', width: 130 },
  { field: 'fecha_visita', headerName: 'Fecha visita', width: 130 },

];

export const OrdenesVentaPage = () => {
  //rows = leerOrdenes();
  //console.log("rows "+JSON.stringify(rows))

  function handleTableRowSelection(event, rowData) {
    console.log("handleTableRowSelection " + rowData);
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

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    let path = "/dashboard/ordenes-venta-gestion/:" + "1";
    navigate(path);
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
          checkboxSelection
        />
      </div>
    </TableContainer>

    /*     <TableContainer component={Paper}>
      <h1>Ordenes de Venta</h1>
      <SearchBar
        value={textFieldValue}
        onChange={(newValue) => setTextFieldValue(newValue)}
        onSearch={handleSearch}
      />
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
        layout="fixed"
      >
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Detalle visita</TableCell>
            <TableCell align="right">Cliente</TableCell>
            <TableCell align="right">Fecha visita</TableCell>
            <TableCell align="right">Fecha documento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordenesVenta.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.detalle_visita}</TableCell>
              <TableCell align="right">
                {row["cliente.nombres"]} {row["cliente.apellidos"]}
              </TableCell>
              <TableCell align="right">{row.fecha_visita}</TableCell>
              <TableCell align="right">{row.fecha_documento}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
        Agregar Orden de Venta
      </Button>
    </TableContainer> */
  );
};
