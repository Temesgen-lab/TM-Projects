import React from "react";
import Crud from "../../Crud";
const BirthReport = props => {
    //<button onClick={() => propsetInputs.onPage(5)}>changepage</button>
    const actor = props.detail;//form [{,,,,}] come from service->app->actors->BirthReport
const actions = ["View",  "Edit"];
const search = ["birthType", "patient", "doctor", "date"];
const empid = ["doctorBirth", "patientManagment"];
const tables = {allTable: "birthFolder", someTable: "", retrivedTable: "birthFolder", BirthReportTable: "BirthReporteesFolder"}
    console.log("BirthReport pages");
    return ( 
        <div className="dashboard">
        <Crud actor = {actor} search = {search} empid = {empid} purpose="registration" tableName={tables} action={actions}/>

        </div>
     );
}

export default BirthReport;