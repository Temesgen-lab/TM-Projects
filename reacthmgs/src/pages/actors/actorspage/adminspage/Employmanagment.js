import React from "react";
import Crud from "../../Crud";
const Employ = props => {
    //<button onClick={() => propsetInputs.onPage(5)}>changepage</button>
    const actor = props.detail;//form [{,,,,}] come from service->app->actors->Employ
const actions = ["View",  "Edit"];
const search = ["fname", "sex", "age", "email", "domain", "_id", "lname"];
const empid = ["admin", "employManagment"];
const tables = {allTable: "employeesFolder", }
    console.log("Employ pages");
    return ( 
        <div className="dashboard">
        <Crud actor = {actor} search = {search} empid = {empid} purpose="registration" tableName={tables} action={actions}/>

        </div>
     );
}

export default Employ;