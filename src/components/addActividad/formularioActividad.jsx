/*eslint-disable*/
import React, { useState, useEffect} from "react";
import { connect } from "react-redux";
import {getListaPaisesFormulario, resetPaisesFormulario, getListaPaisDetalladoConActividades} from "../../actions/index.js";
import PaisesParaFormulario from "./paisesParaFormulario.jsx";
import "./style/formulario.css";

const FormularioActividad = ({getListaPaisesFormulario, paisesFormulario, resetPaisesFormulario, setValorInput,
     paisesConActividades, getListaPaisDetalladoConActividades}) => {
   
    const [valorInput, setValorInputLocal]= useState("");
    const [valorNombre, setValorNombre]= useState({nombre: null, error: null});
    const [valorDificultad, setValorDificultad]= useState({dificultad: "1", error: null});
    const [valorTemporada, setValorTemporada] = useState({temporada: "Verano", error: null});
    const [valorDuracion, setValorDuracion]= useState({duracion: null, medida: "Hora(s)", error: null});
    const [valorPaises, setValorPaises] = useState({paises:[], error: null})
    const [validacion, setValidacion] = useState({acces: false, error: null})
    useEffect(()=>{
        setTimeout(() => {setValorPaises({...valorPaises, error: null})},2500)
    },[valorPaises.error])

    useEffect(()=>{
        setTimeout(() => {setValidacion({...valorPaises, error: null})},2500)
    },[validacion.error])

    const handleNombre = (event)=>{
        const {value}= event.target;
        if(value===""){
            setValorNombre({nombre: null, error: "Campo requerido"})
        };
        if(value.length>0){
            
            if(value[0].includes(" ")){
                setValorNombre({nombre: value, error: "No debe contener espacions al inicio"})
            }else if(/\W/.test(value.replace(/\s/g, "_"))){
                setValorNombre({nombre: value, error: "No debe contener caracteres especiales"})          
           
            }else if(/\d/.test(value)){
                setValorNombre({nombre: value, error: "No debe contener numeros"})
            }else {
                
                setValorNombre({nombre: value, error: null}) 
            }
        }
    }

    const handleDificultad = (event)=>{
        const {value}= event.target;
        setValorDificultad({dificultad: value, error: null})               
            
    }

    const handleTemporada = (event) => {
        const {value}= event.target;
        setValorTemporada({temporada: value, error: null}) 
    }   

    const handleDuracion = (event) => {
        const {value}= event.target;
        if(value===""){
            setValorDuracion({...valorDuracion, duracion: value, error: "Campo requerido"})
        }
        else {
            if(/^[0-9]*$/.test(value)){
                setValorDuracion({...valorDuracion, duracion: value, error: null})
            }else if(value.length>0){
                if(value[0].includes(" ")){
                    setValorDuracion({...valorDuracion, duracion: value, error: "No se permite espacios al inicio"})    
                }else if(value.includes(" ")){
                    setValorDuracion({...valorDuracion, duracion: value, error: "No se permite espacios"}) 
                }else{
                    setValorDuracion({...valorDuracion, duracion: value, error: "Digite cantidad valida"})

                }
            }           
        }
    }
    const handleMedida = (event) => {
        setValorDuracion({...valorDuracion, medida: event.target.value})
    }

    const handleEliminarPaises = (event) =>{
        const {id} = event.target.parentElement
        setValorPaises({...valorPaises, paises: valorPaises.paises.filter((elemento)=>{
            return elemento.id !== id;
        })})
        getListaPaisDetalladoConActividades({caso: "eliminar", id})
    }
    const regresarHome = () =>{
        resetPaisesFormulario();
        setValorInput("");
        getListaPaisDetalladoConActividades({caso: "reset"})
        window.history.go(-1)
    }

    const handleChange = (event) => {
        const {value}= event.target;
        setValorInputLocal(value);
        if(value===""){
            resetPaisesFormulario()
        }
        if(value.length>0){
            getListaPaisesFormulario(value)
        }    
    }

    const handleValidacion = () => {

        if(!valorNombre.nombre || !valorDificultad.dificultad || !valorTemporada.temporada || !valorDuracion.duracion || !valorPaises.paises[0]){
            setValidacion({...validacion, error: "Diligencie el formulario"})
            return
        } else {
            if (valorNombre.error || valorDificultad.error || valorTemporada.error || valorDuracion.error || valorPaises.error){
                setValidacion({...validacion, error: "Error en alguno de los campos/todos los campos son requeridos"})
                return
            }else{
                setValidacion({acces: true, error: null});
                let arraPaises=[]
                for (let index = 0; index < valorPaises.paises.length; index++) {
                    arraPaises.push(valorPaises.paises[index].id)
                    
                }
                let paquetePost={
                    precio: precio,
                    nombre: valorNombre.nombre.toUpperCase(),
                    dificultad: valorDificultad.dificultad,
                    duracion: parseInt(valorDuracion.duracion),
                    temporada: valorTemporada.temporada.toLowerCase(),
                    pais: arraPaises,
                    medida: valorDuracion.medida.toLowerCase()
                }
                for (let index = 0; index < paquetePost.pais.length; index++) {

                    if(paisesConActividades[index].activities[0]){
                        for (let index2 = 0; index2 < paisesConActividades[index].activities.length; index2++) {
                            if(paisesConActividades[index].activities[index2].nombre.toLowerCase()===paquetePost.nombre.toLowerCase()) {
                                if(paisesConActividades[index].activities[index2].dificultad===paquetePost.dificultad){
                                    if(paisesConActividades[index].activities[index2].duracion===paquetePost.duracion){
                                        if(paisesConActividades[index].activities[index2].temporada===paquetePost.temporada){
                                            setValidacion({...validacion, error: "Edite la actividad", acces: false})
                                            alert(`Ya existe esta actividad en ${paquetePost.pais[index]}`)
                                            return

                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                }
                fetch("https://app-countries-jean.herokuapp.com/actividades",
                {
                    method: "POST",
                    headers: {
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paquetePost),
                  })
                  .then((respuesta)=> respuesta.json)
                  .then((data)=>data)
                  .catch(e=>console.log(e))
                alert("Actividad Agregada")
                return
            }
        }
    }
 
    const handleNuevaActividad = () => {
        setValorInputLocal("")
        setValorNombre({nombre: "", error: null})
        setValorDificultad({dificultad: "1", error: null})
        setValorTemporada({temporada: "Verano", error: null})
        setValorDuracion({duracion: "", medida: "Hora(s)", error: null})
        setValorPaises({paises:[], error: null})
        setValidacion({acces: false, error: null})
        resetPaisesFormulario()
        getListaPaisDetalladoConActividades({caso: "reset"})
        
    }

    return (
        <div id="formularioActividad">
            {!validacion.acces?<>
            <div id="contenedorFormulaio"> 
            <div id="nombre">
                <label >Nombre</label>
                <input className={valorNombre.error?"inputFormularioError":"inputFormulario"} type="text" placeholder="Visita al museo"  value={valorNombre.nombre} onChange={(e)=>{handleNombre(e)}}/>
            </div>
            {valorNombre.error && <p className="pError">{valorNombre.error}</p>}

            <div id="dificultad">
                <label >Dificultad</label>
                <select className="selectFormulario">
                    <optgroup className="optionFormulario" label="Dificultal">
                        <option className="optionFormulario" onClick={(e)=>{handleDificultad(e)}} value={"1"}>Tranquila</option>
                        <option className="optionFormulario" onClick={(e)=>{handleDificultad(e)}} value={"2"}>Agotadora</option>
                        <option className="optionFormulario" onClick={(e)=>{handleDificultad(e)}} value={"3"}>Agitada</option>
                        <option className="optionFormulario" onClick={(e)=>{handleDificultad(e)}} value={"4"}>Dificil</option>
                        <option className="optionFormulario" onClick={(e)=>{handleDificultad(e)}} value={"5"}>Extrema</option>  
                    </optgroup>
                </select>
            </div>
            {valorDificultad.error && <p className="pError">{valorDificultad.error}</p>}

            <div id="temporada">
                <label value="0">Temporada</label>
                <select className="selectFormulario">
                <optgroup className="optionFormulario" label="Temporada">
                    <option className="optionFormulario" value="Verano" onClick={(e) => handleTemporada(e)}>Verano</option>
                    <option className="optionFormulario" value="Invierno" onClick={(e) => handleTemporada(e)}> Invierno</option>
                    <option className="optionFormulario" value="Otoño" onClick={(e) => handleTemporada(e)}>Otoño</option>
                    <option className="optionFormulario" value="Primavera" onClick={(e) => handleTemporada(e)}>Primavera</option>
                </optgroup>
                </select>
            </div>
            {valorTemporada.error && <p className="pError">{valorTemporada.error}</p>}
            
            <div id="duracion">
                <label>Duracion</label>
                <input className={valorDuracion.error?"inputFormularioError":"inputFormulario"} placeholder="10..." value={valorDuracion.duracion} onChange={(e) => {handleDuracion(e)}} />
                <select className="selectFormulario">
                    <option className="optionFormulario" value="Hora(s)" onClick={(e) => handleMedida(e)}>Horas</option>
                    <option className="optionFormulario" value="Minuto(s)" onClick={(e) => handleMedida(e)}>Minutos</option>
                </select>
            </div>
            {valorDuracion.error && <p className="pError">{valorDuracion.error}</p>}

            <div id="agregarPais">
                <label>Busca un pais</label>
                <input className={valorPaises.error?"inputFormularioError":"inputFormulario"} placeholder="Colombia" value={valorInput} onChange={(e)=>{handleChange(e)}}/>
            </div>
            {valorPaises.error && <p className="pError">{valorPaises.error}</p>}
            </div>
            <div id="contenedorPaisesAgregados">

                <div id="paisesAgregados">
                    {paisesFormulario?.map(({id, nombre, img}) => {
                            return (
                                <PaisesParaFormulario
                                key={id} id={id} nombre={nombre} img={img} setValorPaises={setValorPaises} valorPaises={valorPaises}
                                getListaPaisDetalladoConActividades={getListaPaisDetalladoConActividades} />
                            )
                        })}
                </div>
                
                <div id="paisesAgregados">
                    {valorPaises.paises?.map(({id, img})=>{
                        return(
                            <div onClick={(e) => handleEliminarPaises(e)} id={id} key={id} className="paisesFormulario2" style={{backgroundImage: `url("${img}")`}}>
                                <div id="filtroPaisesFormulario2">
                                    <h6>{id}</h6>
                                </div>
                                
                            </div>
                        )    
                    })}
                </div>
            </div>
            <div id="contenedorbtn1formuario">
                <button className="selectFormulario" onClick={() => regresarHome()}>Regresar</button>
                {valorNombre.error!==null || valorDuracion.error!==null  ?
                <button className="selectFormularioD" >Agregar Actividad</button>:
                <button className="selectFormulario" onClick={() => {handleValidacion()}}>Agregar Actividad</button> 
                }
                   
            </div>
            {validacion.error && <h1>{validacion.error}</h1>}</>
            :<>
            <h1>ACTIVIDAD AGREGADA CON EXITO</h1>
            <div id="contenedorbtn2formulario">
                <button className="selectFormulario" type="submit" onClick={() => {handleNuevaActividad()}}>Nueva actividad</button>
                <button className="selectFormulario" onClick={() => regresarHome()}>Regresar</button>
            </div>
            </>}

        </div>
        

    )
}

const mapStateToProps=(state)=>{
    return {
        paisesFormulario: state.paisesFormulario,
        paisesConActividades: state.paisesConActividades,
    }
}
export default connect(mapStateToProps, {getListaPaisesFormulario, resetPaisesFormulario, getListaPaisDetalladoConActividades})(FormularioActividad)