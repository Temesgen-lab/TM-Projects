import React from "react";

const Patients = props => {
    console.log("Dashboard pages");
    const actor = props.detail;//form [{,,,,}] come from service->app->actors->history
    return ( 
        <div className="dashboard">
            <pass>Patients page</pass>
            <button onClick={() => props.onPage(5)}>changepage</button>

        </div>
     );
}

export default Patients;