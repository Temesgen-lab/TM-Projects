//servise->app.js->actor->sideheader
import React, { useEffect, useState } from "react";
import './sideheader.css';
const Sideheader = props => {
    const [nav, setNav] = useState([]);
   // const [dbdata, setDbData] = useState([]);
const actor = props.detail//actors information send from servise->app.js->actor->sideheader
//actor form [{ : , : , : , : , }]
const [active1, setActive1] = useState(2);
   // console.log(props);
    useEffect(()=>{
        setNav(props.task);
    }, []);

        return (
            <div> 
                <div className="ver-nav">
                <button onClick={() => {
                    
                    props.changeSide(1)
                    
                    }} ><img width={50} style = {{ borderRadius: "100%" }} height={50} src={actor[0].image} alt = 'Profile'/></button>
            
               
            {nav.map((value, index) => <button key= {index} className = { active1 === index + 2 ?"active1":"" } onClick={() => { setActive1(index + 2); props.onPage(index + 2) }}>{value}</button>  ) }
                  
            <button className = { active1 === 1 ?"active1":"" }  onClick={() => {
                    setActive1(1)
                    props.onPage(1) 
                    
                    }}>Comment</button>
      

            </div>
            <span className="dom">{ actor[0].domain + "              " + actor[0].fname }</span>
            </div>
        );
    }

 
export default Sideheader;