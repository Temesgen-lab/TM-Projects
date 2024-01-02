import React from "react";
import Crud from "../../Crud";
const Laboratorys = props => {
    //<button onClick={() => propsetInputs.onPage(5)}>changepage</button>
    const actor = props.detail;//form [{,,,,}] come from service->app->actors->Rpatient
const actions = ["View", "Response"];
const search = ["fname", "_id", "lname"];
const empid = ["record", "patientManagment"];
//const tables = {allTable: "laboratoryFolder", someTable: "", retrivedTable: "patientFolder", trageTable: "doctorsFolder"}
    console.log("Rpatient pages");
    return ( 
        <div className="dashboard">
        <Crud actor = {actor} search = {search} empid = {empid} purpose="noRegistration" action={actions}/>

        </div>
     );
}

export default Laboratorys;