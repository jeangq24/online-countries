import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { dataDB } from "../../actions/index.js";
import "./styles/portada.css";

const Portada = ({ dataDB }) => {
  useEffect(() => {
    dataDB();  
  }, []);

  return (
    <div id="portada">
      <h1 id="h1Portada">Countries APP</h1>
      <Link to="/home">
        <button id="btnPortada">¡Planear Viaje!</button>
      </Link>
    </div>
  );
};
export default connect(null, { dataDB })(Portada);
