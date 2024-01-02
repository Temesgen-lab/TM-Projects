import React from "react";
import Crud from "../../Crud";
const DeathReport = props => {
    //<button onClick={() => propsetInputs.onPage(5)}>changepage</button>
    const actor = props.detail;//form [{,,,,}] come from service->app->actors->DeathReport
const actions = ["View",  "Edit"];
const search = ["cause", "patient", "date"];
const empid = ["doctor", "deathManagment"];
const tables = {allTable: "deathFolder", someTable: "", retrivedTable: "deathFolder", RpatientTable: "RpatienteesFolder"}
    console.log("DeathReport pages");
    return ( 
        <div className="dashboard">
        <Crud actor = {actor} search = {search} empid = {empid} purpose="registration" tableName={tables} action={actions}/>

        </div>
     );
}

export default DeathReport;