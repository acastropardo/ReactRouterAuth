import * as React from "react";

import Paper from "@mui/material/Paper";
import client from "../feathers";
import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

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
    getTipoServicio(event.target.value);
  }

  function handlePersonalChange(event){
    console.log(event.target.value);
    getTecnico(event.target.value);
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

  function leerPersonal() {
    client
      .service("personal")
      .find()
      .then((response) => {
        getPersonal(response.data);
        //var ordenesLista = response.data;
        console.log("combo personal " + JSON.stringify(response.data));
      });
  }

  var todayDate = new Date().toISOString().slice(0, 10);
  const [tipoSrv, getTipoSrv] = useState([]);
  const [personal, getPersonal] = useState([]);
  const [tipoServicio, getTipoServicio, setTipoServicio] = useState("");
  const [tecnico, getTecnico] = useState("");
  const [fechaDocumento, setFechaDocumento] = useState(todayDate);
  const [fechaVisita, setFechaVisita] = useState(todayDate);

  useEffect(() => {
    leerTipoServicio();
    leerPersonal();
  }, []);

  return (
    <Paper>
      <h1>Gestión Ordenes de Venta</h1>
      <FormControl fullWidth>
        <InputLabel id="simpleLabelTipoServicio">Tipo Servicio</InputLabel>
        <Select
          labelId="lblTipoServicio"
          id="tipo_servicio"
          value={tipoServicio}
          label="Tipo Servicio"
          onChange={handleTipoServicioChange}
        >
          {tipoSrv.map((row) => (
            <MenuItem value={row.id}>{row.descripcion}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Detalle Servicio"
        variant="outlined"
        size="medium"
      />

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
      <FormControl fullWidth>
        <InputLabel id="simpleLabelTecnico">Personal Tecnico</InputLabel>
        <Select
          id="selPersonalTecnico"
          label="Personal Tecnico"
          variant="outlined"
          size="medium"
          value={tecnico}
          onChange={handlePersonalChange}
        >
          {personal.map((row) => (
            <MenuItem value={row.id}>{row.nombres} {row.apellidos}</MenuItem>
          ))}
        </Select>
        
        <FormControlLabel enabled control={<Switch />} label="Agendar visita" />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <MobileDatePicker
            label="Fecha visita"
            inputFormat="YYYY-MM-DD"
            value={fechaVisita}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      </FormControl>
    </Paper>
  );
};
