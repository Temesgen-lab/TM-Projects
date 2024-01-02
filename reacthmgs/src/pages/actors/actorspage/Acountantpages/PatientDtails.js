import React from "react";
import Crud from "../../Crud";

const Apatient = props => {
      //<button onClick={() => propsetInputs.onPage(5)}>changepage</button>
      const actor = props.detail;//form [{,,,,}] come from service->app->actors->Dpatient
      const actions = ["View", "Response"];
      const search = ["fname", "_id", "lname"];
      const empid = ["DpatientManagment"];
      //const tables = {allTable: "", someTable: "doctorsFolder", retrivedTable: "doctorsFolder"}
     //const retriveBy = {retrive: "select", value: actor[0].fname}
          console.log("Dpatient pages");
          return ( 
              <div className="dashboard">
       
              <Crud actor = {actor} search = {search} empid = {empid} purpose="noRegistration" action={actions} />
              
      
              </div>
           );
}

export default Apatient;