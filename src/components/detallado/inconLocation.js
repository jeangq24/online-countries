import L from "leaflet";
import Icono from "../../assets/01.png";

export const iconLocation=L.icon({
    iconUrl: Icono,
    iconRetinaUrl: Icono,
    iconAnchor: null,
    shadowSize:null,
    shadowAnchor: null,
    iconSize: [35,35],
    className: "leaflet-venue-icon",
})

