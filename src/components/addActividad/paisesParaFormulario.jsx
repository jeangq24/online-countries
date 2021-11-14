/*eslint-disable*/
import React from "react"
import "./style/formulario.css"
const PaisesParaFormulario = ({id, nombre, img, setValorPaises, valorPaises, getListaPaisDetalladoConActividades,}) => {
    const handlePaises = () => {
        if (valorPaises.paises.length===0){
            setValorPaises({...valorPaises, paises: [{id, img}]})
            getListaPaisDetalladoConActividades({caso: "agregar", id})
        }else{
            for (let index = 0; index < valorPaises.paises.length; index++) {
                if(valorPaises.paises[index].id===id){
                    setValorPaises({...valorPaises, error: `${id} Ya fue seleccionado`})
                    return
                }                 
            }
            setValorPaises({error: null, paises: [...valorPaises.paises, {id, img}]}) 
            getListaPaisDetalladoConActividades({caso: "agregar", id})         
        }
        return
    }
    return (
        <div className="paisesFormulario" onClick={() => handlePaises()} style={{backgroundImage: `url("${img}")`}}>
            <div id="filtroPaisesFormulario">
            <h6 className="h6pais">{nombre.toUpperCase()}</h6>  
            </div>
        </div>
    )
}
export default PaisesParaFormulario;