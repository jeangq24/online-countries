import React from "react"
import {Marker} from "react-leaflet";


const Make = ({position, icon}) => {
    return (
        <Marker position={position} icon={icon}/>
    )
}

export default Make;