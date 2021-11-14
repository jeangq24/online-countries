/*eslint-disable*/
import React, { useEffect, useState } from "react";
import "./style/detalles.css";
import {Link} from "react-router-dom";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import Map from "./map.jsx";


const DetalladoCard = ({id, nombre, img, continente, capital, subregion, area, poblacion, actividades, setValorInput}) => {

    
    const [position, setPosition]= useState([0, 0])

    useEffect(async ()=>{
        if(nombre.toLowerCase().includes("venezuela") || nombre.toLowerCase().includes("holy see")
        ){
            let resp = await axios.get(`https://api.mymappi.com/v2/geocoding/direct?apikey=84a34520-e568-4555-a492-93d3e38a693f&q=${nombre}&layers=country`)
            setPosition([resp.data.data[0].lat, resp.data.data[0].lon])
        }else{
         let resp = await axios.get(`https://api.mymappi.com/v2/geocoding/direct?apikey=84a34520-e568-4555-a492-93d3e38a693f&q=${nombre}`)
        
        if(!resp.data.data[0]){
            let resp2 = await axios.get(`https://api.mymappi.com/v2/geocoding/direct?apikey=84a34520-e568-4555-a492-93d3e38a693f&q=${id}`)
            setPosition([resp2.data.data[0]?resp2.data.data[0].lat:0, resp2.data.data[0]?resp2.data.data[0].lon:0])
        }else{
            setPosition([resp.data.data[0].lat, resp.data.data[0].lon])
        }
        }


    }, []) 
    


    let actividades2=[]
    
    if(actividades[0]){
        for (let index = 0; index < actividades.length; index++) {
            const {nombre, duracion, temporada, dificultad, medida}=actividades[index]
            
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
          
            actividades2.push({id, nombre, duracion: duracion+" "+medida, dificultad: X, temporada})
            
        }
    }

    const regresarHome= () => {
        setValorInput("")
        window.history.go(-1)
    }
    return (
        <div id="detalladoCard">
            <div id="contenedorBoton">
                <Link to="Home" onClick={()=>{setValorInput("")}}><button id="btnRegresarDetallado">Home</button></Link>
                <button id="btnRegresarDetallado" onClick={() => regresarHome()}>Ir Atras</button>
            </div>
            <div id="contenedorPaisesDetallados">
                <div id="detalles">
                    <h2 id="hDos">{nombre.toUpperCase()}</h2>
                    <div id="imgDetalles" style={{backgroundImage: `url("${img}")`}}></div>
                    <h4 id="hCuatro">Continente {continente?continente:"No registra"}</h4>
                    <h4 id="hCuatro">Capital {capital?capital:"No registra"}</h4>
                    <h5 id="hCinco">Subregion {subregion?subregion:"No registra"}</h5>
                    <h6 id="hSeis">Area de {area?area.toLocaleString()+" km2":"No registra"}</h6>
                    <h6 id="hSeis">Poblacion de {poblacion.toLocaleString()+" habitantes(Apx)"}</h6>
                    {actividades2[0]?<Link to="/actividades"><div id="contenedorActividades">{actividades2.map(({id, nombre, duracion, dificultad, temporada, precio}, index)=>{
                    console.log(precio)
                    return (
                        
                        <div key={id} className="activiades">
                            <p id="pActividades">Actividad N° {index}</p>
                            <p id="pActividades">{nombre}</p>
                            <p id="pActividades">Tiempo estimado: {duracion}</p>
                            <p id="pActividades">Dificultad: {dificultad.toLowerCase()}</p>
                            <p id="pActividades">Temporada: {temporada}</p>
                            <p id="pActividades">Precio:{precio}</p> 
                        </div>    
                    )
                    })}</div></Link>:<h6 id="hSeis">Actividades:  No se han registrado actividades</h6>}
                    
                </div>
                <div id="maps">
                    {position[0]!==0?<Map position={position}/>:<h1>¡Lo siento!, Ubicacion no encontrada.</h1>}
                </div>

            </div>
            
        </div>
    )
}

export default DetalladoCard