import React from "react";
import Crud from "../../Crud";
const Drug = props => {
    //<button onClick={() => propsetInputs.onPage(5)}>changepage</button>
    const actor = props.detail;//form [{,,,,}] come from service->app->actors->Drug
const actions = ["View",  "Edit"];
const search = ["dname", "size", "publishDate", "expireDate"];
const empid = ["pharmacy", "drugManagment"];
const tables = {allTable: "drugFolder", someTable: "", retrivedTable: "drugFolder", DrugTable: "DrugFolder"}
    console.log("Drug pages");
    return ( 
        <div className="dashboard">
        <Crud actor = {actor} search = {search} empid = {empid} purpose="registration" tableName={tables} action={actions}/>

        </div>
     );
}

export default Drug;