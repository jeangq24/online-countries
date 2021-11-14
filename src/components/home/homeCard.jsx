import React from "react"
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import {getListaPaisDetallado} from "../../actions/index.js";
import "./style/homeCard.css"
const HomeCard = ({id, nombre, img, continente, getListaPaisDetallado})=>{
    const paisDetallado = () => {
        getListaPaisDetallado({caso: "reset", value: []})
        getListaPaisDetallado({caso: "add", value: id})
    }
 return (
    
    <Link onClick={() => paisDetallado()} to="/detalles">
        <div id="filtro" style={{backgroundImage: `url("${img}")`, backgroundSize: `cover`,
         backgroundRepeat: `no-repeat`, backgroundPosition: `100% 100% `}}>   
        <div id="homeCard">
             <h2 id="nombrePais">{nombre.toUpperCase()}</h2>
             <h4 id="continente">Continente {continente?continente:"No registrado"}</h4>
        </div>
     </div>
    </Link>
     
 )
}

export default connect(null, {getListaPaisDetallado})(HomeCard);