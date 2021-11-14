/*eslint-disable*/
import React, { useEffect} from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { getListaActividades, getListaPaisDetallado } from "../../actions/index.js";
import ActividadesCard from "./actividadesCard.jsx"
import "./style/actividades.css"

const Actividades = ({getListaActividades, actividades, setValorInput , getListaPaisDetallado}) => {

    useEffect(() => { getListaActividades() }, [])
    const handleHome=()=>{
        setValorInput("")
        window.history.go(-1)
    }
return (

    <div id="actividades">
        <div id="contenedorBotonActividades">
            <Link to="Home" onClick={() => {setValorInput("")}}><button id="btnActividades">Home</button></Link>
            <button id="btnActividades" onClick={() => handleHome()}>Ir Atras</button>
        </div>
        
        <div id="contenedorAcitvidades">
        {actividades[0]?actividades.map(({id, nombre, dificultad, duracion, temporada, medida, countries}) => {
            return (
                <ActividadesCard key={id} id={id} nombre={nombre} dificultad={dificultad} duracion={duracion}
                temporada={temporada} medida={medida} countries={countries} getListaPaisDetallado={getListaPaisDetallado}/>
            )
        }):<h1>No se encontraron Actividades Registradas</h1>}

        </div>

    </div>
)
}

const mapStateToProps=(state)=>{
return {
    actividades: state.actividades
}
}

export default connect(mapStateToProps, {getListaActividades, getListaPaisDetallado})(Actividades)