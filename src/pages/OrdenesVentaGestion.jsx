import * as React from "react";

import Paper from "@mui/material/Paper";
import client from "../feathers";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
//import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
//import TableContainer from '@mui/material/TableContainer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export const OrdenesVentaGestionPage = () => {
const [detalleOrdenVenta, setDetalleOrdenesVenta] = useState([]);


  function createData(
    num_serie,
    descripcion,
    cantidad,
    fecha_alta,
    fecha_ultima_mantencion,
    observacion_1,
    observacion_2,
    observacion_3,
    monto,
    unidadMedidaId,
    caregoriumId,
    marcaId,
    tipoMaterialId,
    centrosCostoId,
    tipoRequerimientoId,
    ordenVentumId,
    statusOrdenVentumId
  ) {
    return {
      num_serie,
      descripcion,
      cantidad,
      fecha_alta,
      fecha_ultima_mantencion,
      observacion_1,
      observacion_2,
      observacion_3,
      monto,
      unidadMedidaId,
      caregoriumId,
      marcaId,
      tipoMaterialId,
      centrosCostoId,
      tipoRequerimientoId,
      ordenVentumId,
      statusOrdenVentumId,
    };
  }

  let rows = [ ];
   
  
  /*   function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  } */

  const handleClickOpen = () => {
    leerTipoRequerimientos();
    leerCentrosCosto();
    leerUnidadMedida();
    leerCategoria();
    leerMarcas();
    leerTipoMaterial();
    leerStatusOrdenVenta();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(fechaAlta);
  };

  const handleAgregarDetalleOrdenVenta = () => {
    rows = createData(
      numSerie,
      descripcion,
      cantidad,
      fechaAlta,
      fechaUltimaMantencion,
      observacion1,
      observacion2,
      observacion3,
      monto,
      unidadMedidaId,
      categoriaId,
      marcaId,
      tipoMaterialId,
      centroCostoId,
      tipoRequerimientoId,
      orden,
      statusOrdenVentaId
    );

    agregarDetalleOrdenVenta(rows);
    setOpen(false);
  };

  function agregarDetalleOrdenVenta(detalleOrdenVentaRow) {
    detalleOrdenVenta.push(detalleOrdenVentaRow);
  }

  const handleRefrescar = () => {
    console.log("refrescar");
    recargarOrdenVenta(orden);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("grabar");
    if (ordenVentaCargada === false) {
      agregarOrdenVenta();
    } else {
      actualizarOrdenVenta();
    }
  };

  function handleAgendarVisitaChange(event) {
    console.log("agendamiento " + event.target.checked);
    setAgendarVisita(event.target.checked);
    if (event.target.checked === false) {
      setFechaVisita(null);
    }
  }

  function handleChangeClienteValue(event, value) {
    setClienteValue(value.id);
    //console.log("value " + value.id);
  }

  function handleChangeClienteInput(event, value) {
    setClienteInput(value);
    console.log("OnInputChange " + clienteInput);
  }

  function actualizarOrdenVenta() {
    client
      .service("orden-venta")
      .update(orden, {
        descripcion: descripcion,
        detalle_visita: descripcion,
        clienteId: clienteValue,
        tipo_servicio: tipoServicio,
        tecnico: tecnico,
        fecha_documento: fechaDocumento,
        fecha_visita: fechaVisita,
        agendar_visita: agendarVisita,
        direccion_cliente: "direccion dummy por ahora",
        firma: "dummie por ahora",
      })
      .then((response) => {
        console.log("actualizar orden venta " + JSON.stringify(response));
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
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
        firma: "dummie por ahora",
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

  function leerTipoMaterial() {
    client
      .service("tipo-material")
      .find()
      .then((response) => {
        setTipoMaterial(response.data);
        //console.log("combo clientes " + JSON.stringify(response.data));
      });
  }

  function leerUnidadMedida() {
    client
      .service("unidad-medida")
      .find()
      .then((response) => {
        setUnidadMedida(response.data);
        //console.log("combo clientes " + JSON.stringify(response.data));
      });
  }

  function leerTipoRequerimientos() {
    client
      .service("tipo-requerimiento")
      .find()
      .then((response) => {
        setTipoRequerimientos(response.data);
        console.log(
          "combo tipo requerimientos " + JSON.stringify(response.data)
        );
      })
      .catch((e) => {
        console.log(JSON.stringify(e));
      });
  }

  function recargarOrdenVenta(orden) {
    if (orden !== "0") {
      client
        .service("orden-venta")
        .get(orden)
        .then((response) => {
          //console.log("leyendo orden venta " + JSON.stringify(response));
          setOrdenVenta(response);
          setOrdenVentaCargada(true);
          setDescripcion(ordenVenta.detalle_visita);
          setFechaDocumento(ordenVenta.fecha_documento);
          setFechaVisita(ordenVenta.fecha_visita);
          setTipoServicio(ordenVenta.tipoServicioId);
          setTecnico(ordenVenta.personalId);
          setClienteInput(ordenVenta.clienteId);
          setClienteValue(ordenVenta.clienteId);

          if (ordenVenta.agendar === "1") {
            console.log("agendar visita" + ordenVenta.agendar + " - true");
            setAgendarVisita(true);
          } else {
            console.log("agendar visita" + ordenVenta.agendar + " - false");
            setAgendarVisita(true);
          }
        })
        .catch((e) => {
          console.log(JSON.stringify(e));
        });

      //console.log("orden de venta cargada " + JSON.stringify(ordenVenta));
    }
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

  function leerMarcas() {
    client
      .service("marca")
      .find()
      .then((response) => {
        setMarcas(response.data);
        //console.log("combo marca " + JSON.stringify(response.data));
      });
  }

  function leerCategoria() {
    client
      .service("categoria")
      .find()
      .then((response) => {
        setCategoria(response.data);
        //console.log("combo categoria " + JSON.stringify(response.data));
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

  function leerCentrosCosto() {
    client
      .service("centros-costo")
      .find()
      .then((response) => {
        setCentrosCosto(response.data);
        //console.log("combo personal " + JSON.stringify(response.data));
      });
  }

  function leerStatusOrdenVenta(){
    client
    .service("status-orden-venta")
    .find()
    .then((response) => {
      setStatusOrdenVenta(response.data);
      //console.log("combo personal " + JSON.stringify(response.data));
    });
  }

  var todayDate = new Date().toISOString().slice(0, 10);

  const [tipoSrv, getTipoSrv] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [clienteValue, setClienteValue] = useState("");
  const [clienteInput, setClienteInput] = useState("");
  const [personal, getPersonal] = useState([]);
  const [tipoServicio, setTipoServicio] = useState("");
  const [tecnico, setTecnico] = useState("");
  const [fechaDocumento, setFechaDocumento] = useState(todayDate);
  const [fechaVisita, setFechaVisita] = useState(null);
  const [agendarVisita, setAgendarVisita] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [ordenVenta, setOrdenVenta] = useState({});
  const [ordenVentaCargada, setOrdenVentaCargada] = useState(false);
  const [orden, setOrden] = useState("");
  const [open, setOpen] = useState(false);

  const [tipoRequerimientos, setTipoRequerimientos] = useState([]);
  const [centrosCosto, setCentrosCosto] = useState([]);
  const [unidadMedida, setUnidadMedida] = useState([]);
  const [categoria, setCategoria] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tipoMaterial, setTipoMaterial] = useState([]);
  const [statusOrdenVenta, setStatusOrdenVenta] = useState([]);

  const [fechaAlta, setFechaAlta] = useState(todayDate);
  const [fechaUltimaMantencion, setFechaUltimaMantencion] = useState(todayDate);
  const [numSerie, setNumSerie] = useState("");
  const [tipoRequerimientoId, setTipoRequerimientoId] = useState("");
  const [unidadMedidaId, setUnidadMedidaId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [marcaId, setMarcaId] = useState("");
  const [tipoMaterialId, setTipoMaterialId] = useState("");
  const [centroCostoId, setCentroCostoId] = useState("");
  const [observacion1, setObservacion1] = useState("");
  const [observacion2, setObservacion2] = useState("");
  const [observacion3, setObservacion3] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [monto, setMonto] = useState(0);
  const [statusOrdenVentaId, setStatusOrdenVentaId] = useState("");

  let { orderId } = useParams();
  console.log("id recibido " + orderId);
  let ord = "";
  ord = orderId.replace(":", "");
  console.log("id Orden de Venta " + ord);

  useEffect(() => {
    setOrden(ord);
    leerTipoServicio();
    leerPersonal();
    leerClientes();

    leerOrdenVenta(ord);
    function leerOrdenVenta(orden) {
      if (orden !== "0") {
        client
          .service("orden-venta")
          .get(orden)
          .then((response) => {
            //console.log("leyendo orden venta " + JSON.stringify(response));
            setOrdenVenta(response);
            setOrdenVentaCargada(true);
            setDescripcion(response.detalle_visita);
            setFechaDocumento(response.fecha_documento);
            setFechaVisita(response.fecha_visita);
            setTipoServicio(response.tipoServicioId);
            setTecnico(response.personalId);
            setClienteInput(response.clienteId);
            setClienteValue(response.clienteId);

            if (response.agendar === "1") {
              console.log("agendar visita" + response.agendar + " - true");
              setAgendarVisita(true);
            } else {
              console.log("agendar visita" + response.agendar + " - false");
              setAgendarVisita(true);
            }
          })
          .catch((e) => {
            console.log(JSON.stringify(e));
          });

        //console.log("orden de venta cargada " + JSON.stringify(ordenVenta));
      }
    }
    setDetalleOrdenesVenta(rows);
    //setDetalleOrdenVenta(rows);
    //console.log(detalleOrdenVenta);
  }, [ord]);

  return (
    <Paper>
      <h1>Gestión Ordenes de Venta</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Autocomplete
          //value={clienteValue} //no usar se rompe
          fullWidth
          onChange={handleChangeClienteValue}
          onInputChange={handleChangeClienteInput}
          id="selector-cliente"
          sx={{ width: 300 }}
          options={clientes}
          autoHighlight
          getOptionLabel={(option) =>
            option.id + " " + option.nombres + " " + option.apellidos
          }
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              {option.nombres} ({option.apellidos}) RUT: {option.rut}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Seleccione cliente"
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
        <FormControl fullWidth>
          <InputLabel id="simpleLabelTipoServicio">Tipo Servicio</InputLabel>
          <Select
            value={tipoServicio} // ...force the select's value to match the state variable...
            onChange={(e) => setTipoServicio(e.target.value)} // ... and update the state variable on any change!
            labelId="lblTipoServicio"
            id="tipo_servicio"
            label="Tipo Servicio"
          >
            {tipoSrv.map((row) => (
              <MenuItem key={row.id} value={row.id}>
                {row.descripcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Detalle Servicio"
          variant="outlined"
          size="medium"
          onChange={(e) => setDescripcion(e.target.value)}
          value={descripcion}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <MobileDatePicker
              label="Fecha documento"
              inputFormat="YYYY-MM-DD"
              value={fechaDocumento}
              onChange={(e) => setFechaDocumento(e.target.value)}
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
            value={tecnico} // ...force the select's value to match the state variable...
            onChange={(e) => setTecnico(e.target.value)} // ... and update the state variable on any change!
          >
            {personal.map((row) => (
              <MenuItem key={row.id} value={row.id}>
                {row.nombres} {row.apellidos}
              </MenuItem>
            ))}
          </Select>

          <FormControlLabel
            checked={agendarVisita}
            control={<Switch />}
            label="Agendar visita"
            onChange={handleAgendarVisitaChange}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <MobileDatePicker
                label="Fecha visita"
                inputFormat="YYYY-MM-DD"
                value={fechaVisita}
                onChange={(e) => setFechaVisita(e.target.value)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </FormControl>
      </Box>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Obsevacion</TableCell>
            <TableCell align="right">Descripción</TableCell>
            <TableCell align="right">No serie</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Monto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detalleOrdenVenta.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="right" component="th" scope="row">
                {row.observacion_1}
              </TableCell>
              <TableCell align="right">{row.descripcion}</TableCell>
              <TableCell align="right">{row.num_serie}</TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
              <TableCell align="right">{row.monto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div>
        <Button
          id="grabar"
          type="submit"
          variant="contained"
          endIcon={<SaveIcon />}
        >
          Grabar
        </Button>
        &nbsp;
        <Button
          id="refrescar"
          onClick={handleRefrescar}
          variant="contained"
          endIcon={<RefreshIcon />}
        >
          Refrescar
        </Button>
        &nbsp;
        <Button
          variant="contained"
          onClick={handleClickOpen}
          endIcon={<AddIcon />}
        >
          Agregar Item
        </Button>
        <Dialog
          fullScreen="false"
          fullWidth="false"
          open={open}
          onClose={handleClose}
          scroll="body"
        >
          <DialogTitle>Detalle Orden de Venta</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="simpleLabelTipoRequerimiento">
                Tipo Requerimiento
              </InputLabel>
              <Select
                value={tipoRequerimientoId} // ...force the select's value to match the state variable...
                onChange={(e) => setTipoRequerimientoId(e.target.value)} // ... and update the state variable on any change!
                labelId="lblTipoRequerimiento"
                id="tipo_requerimiento"
                label="Tipo Requerimiento"
              >
                {tipoRequerimientos.map((row) => (
                  <MenuItem key={row.id} value={row.id}>
                    {row.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="simpleLabelCentrosCosto">
                Centro de Costo
              </InputLabel>
              <Select
                value={centroCostoId} // ...force the select's value to match the state variable...
                onChange={(e) => setCentroCostoId(e.target.value)} // ... and update the state variable on any change!
                labelId="lblCentroCosto"
                id="centros_costo"
                label="Centro de Costo"
              >
                {centrosCosto.map((row) => (
                  <MenuItem key={row.id} value={row.id}>
                    {row.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText> */}
            <TextField
              autoFocus
              margin="dense"
              id="num_serie"
              label="Número de serie"
              type="string"
              fullWidth
              variant="standard"
              onChange={(e) => setNumSerie(e.target.value)}
              value={numSerie}
            />
{/*             <TextField
              autoFocus
              margin="dense"
              id="descripcion"
              label="Descripción"
              type="string"
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="cantidad"
              label="Cantidad"
              type="integer"
              fullWidth
              variant="outlined"
            /> */}
            <FormControl fullWidth>
              <InputLabel id="simpleLabelUnidadMedida">
                Unidad de Medida
              </InputLabel>
              <Select
                value={unidadMedidaId} // ...force the select's value to match the state variable...
                onChange={(e) => setUnidadMedidaId(e.target.value)} // ... and update the state variable on any change!
                labelId="lblUnidadMedida"
                id="unidad_medida"
                label="Unidad de Medida"
              >
                {unidadMedida.map((row) => (
                  <MenuItem key={row.id} value={row.id}>
                    {row.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="simpleLabelCategoria">Categoria</InputLabel>
              <Select
                value={categoriaId} // ...force the select's value to match the state variable...
                onChange={(e) => setCategoriaId(e.target.value)} // ... and update the state variable on any change!
                labelId="lblCategoria"
                id="categoria"
                label="Categoria"
              >
                {categoria.map((row) => (
                  <MenuItem key={row.id} value={row.id}>
                    {row.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="simpleLabelMarca">Marca</InputLabel>
              <Select
                value={marcaId} // ...force the select's value to match the state variable...
                onChange={(e) => setMarcaId(e.target.value)} // ... and update the state variable on any change!
                labelId="lblMarca"
                id="marca"
                label="Marca"
              >
                {marcas.map((row) => (
                  <MenuItem key={row.id} value={row.id}>
                    {row.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="simpleLabelTipoMaterial">
                Tipo Material
              </InputLabel>
              <Select
                value={tipoMaterialId} // ...force the select's value to match the state variable...
                onChange={(e) => setTipoMaterialId(e.target.value)} // ... and update the state variable on any change!
                labelId="lblTipoMaterial"
                id="tipo_material"
                label="Tipo Material"
              >
                {tipoMaterial.map((row) => (
                  <MenuItem key={row.id} value={row.id}>
                    {row.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <MobileDatePicker
                  label="Fecha alta"
                  inputFormat="YYYY-MM-DD"
                  value={fechaAlta}
                  onChange={(e) => setFechaAlta(e.target.value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>

              <Stack spacing={3}>
                <MobileDatePicker
                  label="Fecha ultima mantencion"
                  inputFormat="YYYY-MM-DD"
                  value={fechaUltimaMantencion}
                  onChange={(e) => setFechaUltimaMantencion(e.target.value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>

              <TextField
                fullWidth
                id="outlined-basic"
                label="Cantidad"
                variant="outlined"
                size="small"
                onChange={(e) => setCantidad(e.target.value)}
                value={cantidad}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="Monto"
                variant="outlined"
                size="small"
                onChange={(e) => setMonto(e.target.value)}
                value={monto}
              />
              <FormControl fullWidth>
                <TextareaAutosize
                  value={observacion1}
                  onChange={(e) => setObservacion1(e.target.value)}
                  aria-label="minimum height"
                  rowsMin={3}
                  placeholder="Observación 1"
                />
                <TextareaAutosize
                  value={observacion2}
                  onChange={(e) => setObservacion2(e.target.value)}
                  aria-label="minimum height"
                  rowsMin={3}
                  placeholder="Observación 2"
                />
                <TextareaAutosize
                  value={observacion3}
                  onChange={(e) => setObservacion3(e.target.value)}
                  aria-label="minimum height"
                  rowsMin={3}
                  placeholder="Observación 3"
                />
              </FormControl>
            </LocalizationProvider>

            <FormControl fullWidth>
              <InputLabel id="simpleLabelStatusOrdenVenta">
                Status Orden Venta
              </InputLabel>
              <Select
                value={statusOrdenVentaId} // ...force the select's value to match the state variable...
                onChange={(e) => setStatusOrdenVentaId(e.target.value)} // ... and update the state variable on any change!
                labelId="lblStatusOrdenVenta"
                id="status_orden_venta"
                label="Status Orden Venta"
              >
                {statusOrdenVenta.map((row) => (
                  <MenuItem key={row.id} value={row.id}>
                    {row.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleAgregarDetalleOrdenVenta}>
              Agregar Item
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Paper>
  );
};
