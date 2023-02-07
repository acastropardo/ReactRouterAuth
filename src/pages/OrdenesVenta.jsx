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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

var rows = [];

/* var rows = [
   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
   createData('Eclair', 262, 16.0, 24, 6.0),
   createData('Cupcake', 305, 3.7, 67, 4.3),
   createData('Gingerbread', 356, 16.0, 49, 3.9),
 ];
*/

export const OrdenesVentaPage = () => {
  //rows = leerOrdenes();
  //console.log("rows "+JSON.stringify(rows))

  function handleSearch() {
    //...
    console.log(textFieldValue);
  };


  function leerOrdenes() {
    //var ordenesLista = [];

    client
      .service("orden-venta")
      .find()
      .then((response) => {
        getPost(response.data);
        //var ordenesLista = response.data;
        console.log("ordenes de venta " + JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });

    //return ordenesLista;
  }
  const [post, getPost] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState("Barra de búsqueda");

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
          {post.map((row) => (
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
    </TableContainer>
  );
};
