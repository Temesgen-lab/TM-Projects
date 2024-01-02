import React from "react";
const Contact = props => {
    console.log("Contact pages");
    return ( 
        <div className="contact">
            <h1>Contact page</h1>
            <button onClick={() => props.onPage(5)}>changepage</button>

        </div>
     );
}

export default Contact;