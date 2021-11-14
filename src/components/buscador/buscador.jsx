/*eslint-disable*/
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getListaPaises, getListaPaisesBuscador, valorPagina, resetPaisesFiltrados } from "../../actions";
import "./style/buscador.css";

const Buscador = ({getListaPaises, getListaPaisesBuscador, valorPagina,
     resetPaisesFiltrados, valorInput, setValorInput}) => {

    useEffect(()=>{
       
        getListaPaises();
    },[])
        
   
    const handleSubmit = (event) =>{
        const {value}=event.target
        setValorInput(value)
        if(value.length===0){
            valorPagina(0);
            getListaPaises()

        }
        if(value.length>0){
            valorPagina(0);
            resetPaisesFiltrados()
            getListaPaisesBuscador(value)           
            
        }    
    }

    return (
        <div id="buscador">
            <input id="inputBuscador" placeholder="Buscar pais" value={valorInput} onChange={(e)=>handleSubmit(e)}/>
        </div>
    )
}

export default connect (null , {getListaPaises, getListaPaisesBuscador, valorPagina, resetPaisesFiltrados})(Buscador)