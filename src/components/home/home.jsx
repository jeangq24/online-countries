import React from "react";
import { connect } from "react-redux";
import HomeCard from "./homeCard";
import {Link} from "react-router-dom";
import {valorPagina, getPaisesFiltrados, resetPaisesFiltrados, getListaPaises } from "../../actions";
import "./style/home.css"
const Home = ({paises, valorPagina, paginado, getPaisesFiltrados,
     paisesFiltrados, resetPaisesFiltrados, getListaPaises, setValorInput}) => {
    
    let existeActividades=false;
    const PaginaSiguiente=()=>{
        if(!paisesFiltrados[0]?paises.slice(paginado, paginado+9).length > paises.length%9:
        paisesFiltrados.slice(paginado, paginado+9).length > paisesFiltrados.length%9) {
            valorPagina(paginado+9);
        }      
    }

    const PaginaAnterior=()=>{
        if (paginado > 0) {
            valorPagina(paginado-9);
        }
    }
    
    
    const filtradoContinente = (event)=>{
       
        const {value} = event.target;
        valorPagina(0)
        getPaisesFiltrados({caso: "continente", value})
        
    }

    const filtradoPoblacion=(event) => {
        const {value}= event.target;
        valorPagina(0)
        if(value==="Mayor"){
            resetPaisesFiltrados()
            getPaisesFiltrados({caso: "poblacionMayor"})
        }
        if(value==="Menor"){
            resetPaisesFiltrados()
            getPaisesFiltrados({caso: "poblacionMenor"})
        }
    }
        
    const filtradoAlfabetico= (event) => {
        const {value}= event.target;
        valorPagina(0)
        if(value==="Desc"){
            resetPaisesFiltrados()
            getPaisesFiltrados({caso: "descendente"})
        };
        if(value==="Asc"){
            resetPaisesFiltrados()
            getPaisesFiltrados({caso: "ascendente"})            
        }
    }

    const handleActividades = ()=>{
        valorPagina(0) 
        resetPaisesFiltrados()
        getPaisesFiltrados({caso: "actividades"})        
        
    }

    const limpiarFiltro = ()=>{
        valorPagina(0)
        resetPaisesFiltrados()
        getListaPaises()
        setValorInput("")
    
    }

    return (
        <div id="home">
            
            <div id="btnsHomeSuperior">
            { paises.length > 2 ?
            <select className="inputHome">
                <option onClick={()=>limpiarFiltro()} value="dafault" >Filtrar por...</option>
                    <optgroup className="optionFormulario" label="Continente">
                        <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Africa">Africa</option>
                        <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Americas">Americas</option>
                        <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Asia">Asia</option>
                        <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Europe">Europe</option>
                        <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Oceania">Oceania</option>
                        <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Polar">Polar</option>
                    </optgroup>
                    <optgroup className="optionFormulario" label="Poblacion">
                        <option className="optionFormulario" onClick={(e)=>filtradoPoblacion(e)} value="Mayor">Mayor</option>
                        <option className="optionFormulario" onClick={(e)=>filtradoPoblacion(e)} value="Menor">Menor</option>
                    </optgroup> 
                    <optgroup className="optionFormulario" label="Actividades">
                        {paises.forEach(element => {
                            if(element.activities[0]){
                                existeActividades=true;
                            }
                        })}
                        {existeActividades?<option className="optionFormulario" onClick={()=>handleActividades()}>Con actividades</option>:
                        <option className="optionFormulario" disabled>No disponible</option>}
                    </optgroup>                   
                    <optgroup className="optionFormulario" label="Orden Alfabetico">
                        <option className="optionFormulario" onClick={(e)=>filtradoAlfabetico(e)} value="Asc">Ascendente</option>
                        <option className="optionFormulario" onClick={(e)=>filtradoAlfabetico(e)} value="Desc">Descendente</option>
                    </optgroup>

            </select>
            :
            <select className="inputHomeD" disabled>
            <option onClick={()=>limpiarFiltro()} value="dafault" >No Disponible</option>
                <optgroup className="optionFormulario" label="Continente">
                    <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Africa">Africa</option>
                    <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Americas">Americas</option>
                    <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Asia">Asia</option>
                    <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Europe">Europe</option>
                    <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Oceania">Oceania</option>
                    <option className="optionFormulario" onClick={(e)=>filtradoContinente(e)} value="Polar">Polar</option>
                </optgroup>
                <optgroup className="optionFormulario" label="Poblacion">
                    <option className="optionFormulario" onClick={(e)=>filtradoPoblacion(e)} value="Mayor">Mayor</option>
                    <option className="optionFormulario" onClick={(e)=>filtradoPoblacion(e)} value="Menor">Menor</option>
                </optgroup> 
                <optgroup className="optionFormulario" label="Actividades">
                    {paises.forEach(element => {
                        if(element.activities[0]){
                            existeActividades=true;
                        }
                    })}
                    {existeActividades?<option className="optionFormulario" onClick={()=>handleActividades()}>Con actividades</option>:
                    <option className="optionFormulario" disabled>No disponible</option>}
                </optgroup>                   
                <optgroup className="optionFormulario" label="Orden Alfabetico">
                    <option className="optionFormulario" onClick={(e)=>filtradoAlfabetico(e)} value="Asc">Ascendente</option>
                    <option className="optionFormulario" onClick={(e)=>filtradoAlfabetico(e)} value="Desc">Descendente</option>
                </optgroup>

        </select>}
            <button className="btnHome" onClick={() =>limpiarFiltro()}>Quitar Filtro</button>
            <Link to="addActividad"><button className="btnHome">Crear Actividad</button></Link>
            <Link to="/actividades"><button className="btnHome">Ver actividad</button></Link>
            <Link to="/"><button className="btnHome">Cerrar APP</button></Link>
            </div>
            
            
            <div id="paises">
            {!paisesFiltrados[0]?paises[0]?paises.slice(paginado, paginado+9).map(({id,nombre,img,continente}) => {
                return (
                  
                        <HomeCard key={id}
                        id={id}
                        nombre={nombre}
                        img={img}
                        continente={continente}
                        />
                )
            }):<h1>No se encontraron resultados</h1>:typeof paisesFiltrados[0] === "string"?<h1>{paisesFiltrados[0]}</h1>:
                paisesFiltrados.slice(paginado, paginado+9).map(({id,nombre,img,continente}) => {
                return (
                  
                        <HomeCard key={id}
                        id={id}
                        nombre={nombre}
                        img={img}
                        continente={continente}
                        />
                )
            })}
            </div>

            
            <div id="btnsHomeInferior">
                {paisesFiltrados[0]?paisesFiltrados.slice(paginado, paginado+9).length===0 || 
                paisesFiltrados.length<=9?
                <>
                <button className="btnHomeD" >Pagina Anterior</button>
                <button className="btnHomeD">Pagina Siguiente</button>
                </>
                :
                <>{paginado===0?
                <>
                <button className="btnHomeD" >Pagina Anterior</button>
                <button className="btnHome" onClick={() => PaginaSiguiente()}>Pagina Siguiente</button>
                </>
                :
                <>
                {(Math.floor(paisesFiltrados.length/9))*9===paginado?
                <>
                <button className="btnHome" onClick={() => PaginaAnterior()}>Pagina Anterior</button>
                <button className="btnHomeD" >Pagina Siguiente</button>
                </>:
                <>
                <button className="btnHome" onClick={() => PaginaAnterior()}>Pagina Anterior</button>
                <button className="btnHome" onClick={() => PaginaSiguiente()}>Pagina Siguiente</button>
                </>
                }
                </>
                }
                </>
                : paises.slice(paginado, paginado+9).length===0 ||
                 paises.length<=9?
                <>
                <button className="btnHomeD" >Pagina Anterior</button>
                <button className="btnHomeD">Pagina Siguiente</button>
                </>
                :
                <>{paginado===0?
                    <>
                    <button className="btnHomeD" >Pagina Anterior</button>
                    <button className="btnHome" onClick={() => PaginaSiguiente()}>Pagina Siguiente</button>
                    </>
                    :
                    <>
                    {(Math.floor(paises.length/9))*9===paginado?
                    <>
                    <button className="btnHome" onClick={() => PaginaAnterior()}>Pagina Anterior</button>
                    <button className="btnHomeD" >Pagina Siguiente</button>
                    </>:
                    <>
                    <button className="btnHome" onClick={() => PaginaAnterior()}>Pagina Anterior</button>
                    <button className="btnHome" onClick={() => PaginaSiguiente()}>Pagina Siguiente</button>
                    </>
                    }
                    </>
                }</>
                
            }
            </div>
        </div>    
    )
}

const mapStateToProps = (state) => {
    return {
        paises: state.paises,
        paisesFiltrados: state.paisesFiltrados,
        paginado: state.paginado

    }
};

export default connect(mapStateToProps, {valorPagina, getPaisesFiltrados, resetPaisesFiltrados, getListaPaises})(Home);