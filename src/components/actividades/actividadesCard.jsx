import React from "react";
import {Link} from "react-router-dom";
import "./style/actividades.css";

const ActividadesCard = ({nombre, dificultad, duracion, temporada, countries, medida, getListaPaisDetallado}) => {

    let X=""
    switch (dificultad) {
        case "1":
            X="Tranquila"
            break;
        case "2":    
            X="Agitada"
            break;
        case "3": 
            X="Agotadra" 
            break 
        case "4":    
            X="Dificil"
            break; 
        case "5":    
            X="Extrema"
            break;        
        default:
            break;
    }
    return (
        <div id="actividadIndividual">         
            <h4 className="hCuatroActividades">{nombre}</h4>
            <h6 className="hSeisActividades">{"Tiempo estimado: "+duracion+" "+medida}</h6>
            <h6 className="hSeisActividades">{"Dificultad: "+X}</h6>
            <h6 className="hSeisActividades">{"Temporada: "+temporada}</h6>
            <div id="paisesActividades">{countries.map(({id, nombre, img}) => {
                return <Link to="/detalles" onClick={()=>getListaPaisDetallado({caso: "add", value: id})}><div key={id}>
                    
                    <div id="imgActividades" style={{backgroundImage: `url("${img}")`}}>
                        <div id="filtroImgActividades"></div>
                        
                    </div>
                </div>
                </Link>
            })}</div>
        </div>
        
    )
}

export default ActividadesCard
