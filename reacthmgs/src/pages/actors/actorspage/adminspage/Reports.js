import React from "react";
const Report = props => {
    const actor = props.detail;//form [{,,,,}] come from service->app->actors->report
    console.log("report pages");
    return ( 
        <div className="dashboard">
            <pass>Report page</pass>
            <button onClick={() => props.onPage(5)}>changepage</button>

        </div>
     );
}

export default Report;