const initialState = {
  dataCargada: false,
  paginado: 0,
  paises: [],
  paisesFiltrados: [],
  paisesFormulario: [],
  paisDetallado: [],
  actividades: [],
  paisesConActividades: []
};

function rootReducer(state = initialState, action) {

  switch (action.type) {

    case "dataDB":
      return { ...state, dataCargada: true };

    case "GET_LISTA_PAISES":
    case "GET_LISTA_PAISES_BUSCADOS":
      return { ...state, paises: action.payload };

    case "GET_LISTA_PAIS_DETALLADO":
      if(action.payload.caso==="add") {
        return { ...state, paisDetallado: action.payload.data }
      }else{
         return { ...state, paisDetallado: action.payload.data }
      }
      

    case "PAISES_FILTRADOS":

      switch (action.payload.caso) {

        case "continente":
          let filtroC=state.paises.filter((elemento) => {
            return elemento.continente === action.payload.value;
          })
          if(!filtroC[0]){
            filtroC.push("No se econtraron paises con el continente seleccionado")
          }
          return {
            ...state, paisesFiltrados: filtroC
          }

        case "poblacionMayor":
          return {
            ...state, paisesFiltrados: state.paises.sort((a, b) => {
              if (a.poblacion < b.poblacion) {
                return 1;
              }
              if (a.poblacion > b.poblacion) {
                return -1;
              }
              return 0;
            })
          }
        
        case "poblacionMenor":
          return {
            ...state, paisesFiltrados: state.paises.sort((a, b) => {
              if (a.poblacion > b.poblacion) {                  
                return 1;
              }
              if (a.poblacion < b.poblacion) {
                return -1;
              }
              return 0;
            })
          } 
        
        case "ascendente":
          return {
            ...state, paisesFiltrados: state.paises.sort((a, b) => {
              if (a.nombre > b.nombre) {                  
                return 1;
              }
              if (a.nombre < b.nombre) {
                return -1;
              }
              return 0;
            })
          }  
        
        case "descendente":
          let filtro=state.paises.sort((a, b) => {
            if (a.nombre < b.nombre) {                  
              return 1;
            }
            if (a.nombre > b.nombre) {
              return -1;
            }
            return 0;
          })
          let result = filtro.shift()
          filtro.push(result)

          return {
            ...state, paisesFiltrados: filtro
          }
        
        case "actividades":

          return {...state, paisesFiltrados: state.paises.filter(elemento => {
            return elemento.activities[0]
          })}

        default:
          return {...state, paisesFormulario: []}  
      }

    case "RESET_PAISES_FILTRADOS":
      return {...state, paisesFiltrados: []}      
   
    case "PAGINADO":
      return { ...state, paginado: action.payload }

    case "GET_LISTA_PAISES_FORMULARIO":
      return { ...state, paisesFormulario: action.payload}

    case "RESET_PAISES_FORMULARIO":
      return { ...state, paisesFormulario: []}

    case "GET_LISTA_ACTIVIDADES":
      return {...state, actividades: action.payload}

    case "GET_LISTA_PAIS_DETALLADO_CON_ACTIVIDADES":{

      switch (action.payload.caso) {
        case "agregar":
          
          return {...state, paisesConActividades: [...state.paisesConActividades, action.payload.data[0]]}
        
        case "eliminar":
          
          return {...state, paisesConActividades: state.paisesConActividades.filter(elemento => {
            return elemento.id !== action.payload.id
          })}

        
        case "reset":
          return {
            ...state, paisesConActividades: []
          }
          default:
            return state.paisesConActividades
      }
      
    }

    default:
      return state;

  }
}

export default rootReducer;