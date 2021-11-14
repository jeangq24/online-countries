import './App.css';
import React, {useState}from "react";
import { Route } from "react-router-dom";
import Portada from "./components/portada/portada.jsx"
import Home from "./components/home/home.jsx";
import Buscador from './components/buscador/buscador.jsx';
import PaisDetallado from "./components/detallado/detallado.jsx"
import FormularioActividad from "./components/addActividad/formularioActividad.jsx"
import Actividades from "./components/actividades/actividades.jsx"

function App() {
  const [valorInput, setValorInput] = useState("");
  return (
    <>
      <Route exact path="/">
        <Portada/>
      </Route>

      <Route exact path="/home">
        <Buscador valorInput={valorInput} setValorInput={setValorInput}/>
        <Home setValorInput={setValorInput}/>
      </Route>

      <Route exact path="/detalles">
        <PaisDetallado setValorInput={setValorInput}/>
      </Route>

      <Route exact path="/addActividad">
        <FormularioActividad setValorInput={setValorInput}/>
      </Route>

      <Route exact path="/actividades">
        <Actividades valorInput={valorInput} setValorInput={setValorInput}/>
      </Route>
    </>
  );
}

export default App;
