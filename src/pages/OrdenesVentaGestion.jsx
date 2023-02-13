import * as React from "react";

import Paper from "@mui/material/Paper";
import client from "../feathers";
import { useState, useEffect } from "react";
import { Routes, Route, useParams } from 'react-router-dom';
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
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
export const OrdenesVentaGestionPage = () => {



  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //console.log("submit data " + JSON.stringify(data));

    agregarOrdenVenta();
  };

  function handleAgendarVisitaChange(event) {
    //console.log(event.target.checked);
    setAgendarVisita(event.target.checked);
    if(event.target.checked===false){
      setFechaVisita(null);
    }
  }

  function handleChangeFechaDocumento(value) {
    //console.log(formatDate(value));
    setFechaDocumento(formatDate(value));

  }

  function handleChangeFechaVisita(value) {
    //console.log(formatDate(value));
    setFechaVisita(formatDate(value));
  }

  function handleTipoServicioChange(event) {
    //...
    //console.log(event.target.value);
    getTipoServicio(event.target.value);
  }

  function handleDescripcionChange(event) {
    //console.log(event.target.value);
    setDescripcion(event.target.value);
  }

  function handlePersonalChange(event) {
    //console.log(event.target.value);
    getTecnico(event.target.value);
  }

  function handleChangeClienteValue(event, value) {
    setClienteValue(value.id);
    //console.log("value " + value.id);
  }

  function handleChangeClienteInput(event, value) {
    setClienteInput(value);
    //console.log("OnInputChange " + value);

  }

  function agregarOrdenVenta() {  
    client
      .service("orden-venta")
      .create({
        descripcion: descripcion,
        detalle_visita: descripcion, 
        clienteId: clienteValue,
        tipo_servicio: tipoServicio,
        tecnico: tecnico,
        fecha_documento: fechaDocumento,
        fecha_visita: fechaVisita,
        agendar_visita: agendarVisita,
        direccion_cliente: "direccion dummy por ahora",
        firma: "dummie por ahora"
      })
      .then((response) => {
        console.log("agregar orden venta " + JSON.stringify(response));
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  }

  function leerClientes() {
    client
      .service("clientes")
      .find()
      .then((response) => {
        setClientes(response.data);
        //console.log("combo clientes " + JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  }

  function leerTipoServicio() {
    client
      .service("tipo-servicio")
      .find()
      .then((response) => {
        getTipoSrv(response.data);
        //console.log("combo tipo servicio " + JSON.stringify(response.data));
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
        //console.log("combo personal " + JSON.stringify(response.data));
      });
  }






  var todayDate = new Date().toISOString().slice(0, 10);
  const [tipoSrv, getTipoSrv] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteValue, setClienteValue] = useState('');
  const [clienteInput, setClienteInput] = useState('');
  const [personal, getPersonal] = useState([]);
  const [tipoServicio, getTipoServicio, setTipoServicio] = useState("");
  const [tecnico, getTecnico] = useState("");
  const [fechaDocumento, setFechaDocumento] = useState(todayDate);
  const [fechaVisita, setFechaVisita] = useState(null);
  const [agendarVisita, setAgendarVisita] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const {params} = useParams();
  

  useEffect(() => {
    console.log("id " + params);
    leerTipoServicio();
    leerPersonal();
    leerClientes();
  }, []);

  return (
    <Paper>
      <h1>Gestión Ordenes de Venta</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Autocomplete
          fullWidth
          onChange={handleChangeClienteValue}
          onInputChange={handleChangeClienteInput}
          id="selector-cliente"
          sx={{ width: 300 }}
          options={clientes}
          autoHighlight
          getOptionLabel={(option) => option.id + " " + option.nombres + " " + option.apellidos}
          renderOption={(props, option) => (
            <Box component="li"  {...props}>
              {option.nombres} ({option.apellidos}) RUT: {option.rut}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione cliente"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
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
          fullWidth
          id="outlined-basic"
          label="Detalle Servicio"
          variant="outlined"
          size="medium"
          onChange={handleDescripcionChange}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <MobileDatePicker
              label="Fecha documento"
              inputFormat="YYYY-MM-DD"
              value={fechaDocumento}
              onChange={handleChangeFechaDocumento}
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

          <FormControlLabel enabled control={<Switch />} label="Agendar visita" onChange={handleAgendarVisitaChange}/>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Fecha visita"
                inputFormat="YYYY-MM-DD"
                value={fechaVisita}
                onChange={handleChangeFechaVisita}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </FormControl>
        <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
          Grabar
        </Button>
      </Box>
    </Paper>
  );
};
