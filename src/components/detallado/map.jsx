import React from "react";
import {MapContainer, TileLayer, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./style/detalles.css";
import Marker from "./Make.jsx";
import {iconLocation} from "./inconLocation.js";
const Map = ({position}) => {
  return (
    <>
      {position[0]!==0?<MapContainer
        className="Map-Container"
        center={position}
        zoom={5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={iconLocation}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    :<h1>Cargando...</h1>}</>
  );
};

export default Map;