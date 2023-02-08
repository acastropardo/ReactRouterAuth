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
import TextField from "@mui/material/TextField";
import Label from "@mui/icons-material/Label";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

var rows = [];

export const OrdenesVentaGestionPage = () => {
  //rows = leerOrdenes();
  //console.log("rows "+JSON.stringify(rows))

  function handleSearch() {
    //...
    console.log(textFieldValue);
    filtrarOrdenes(textFieldValue);
  }

  function handleChange(value) {
    //...
    console.log(value);
    setFechaDocumento(value);
  }

  function handleTipoServicioChange(event) {
    //...
    console.log(event.target.value);
    setAge(event.target.value);
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
        getPost(response.data);
        //var ordenesLista = response.data;
        console.log("ordenes de venta " + JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });

    //return ordenesLista;
  }

  function leerTipoServicio() {
    client
      .service("tipo-servicio")
      .find()
      .then((response) => {
        getTipoSrv(response.data);
        //var ordenesLista = response.data;
        console.log("combo tipo servicio " + JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  }

  const [tipoSrv, getTipoSrv] = useState([]);
  const [tipoServicio, getTipoServicio] = useState('');
  const [fechaDocumento, setFechaDocumento] = useState("2021-10-10");
  const [age, setAge] = useState("");

  useEffect(() => {
    leerTipoServicio();
  }, []);

  return (
    <Paper>
      <h1>Gestión Ordenes de Venta</h1>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="lblTipoServicio"
          id="tipo_servicio"
          value={tipoServicio}
          label="Tipo Servicio"
          onChange={handleTipoServicioChange}
        >
          {tipoSrv.map((row) => ( <MenuItem value={row.id}>{row.descripcion}</MenuItem> ))}

        </Select>
        <TextField
          id="outlined-basic"
          label="Detalle Servicio"
          variant="outlined"
          size="medium"
        />
        {/* <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" /> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <MobileDatePicker
              label="Fecha documento"
              inputFormat="YYYY-MM-DD"
              value={fechaDocumento}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </FormControl>
    </Paper>
  );
};
