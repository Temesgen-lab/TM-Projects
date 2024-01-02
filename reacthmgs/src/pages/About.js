import React from "react";
const About = props => {
    console.log("About page");
    return ( <div className="about">
        <h1>About Page</h1>
        <button onClick={() => props.onPage(3)}>changepage</button>

    </div> );
}

export default About;