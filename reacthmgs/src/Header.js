import React, { useState } from "react";
import './header.css';
import './dashboard.css';
const Header = props => {
const [active, setActive] = useState(0);
    console.log(props);
        return (  
          
            <div className="hor-nav">
                <pass className = "title">JINKA GENERAL HOSPITAL MANAGMENT SYSTEM</pass>
                <button style={{ marginLeft: "5%", }} className = { active === 0 ?"active":"" } id="btn-0" onClick={() => {
                    setActive(0)
                    props.onPage(0) 
                    
                    }}>Home</button>
                <button className = { active === 1 ?"active":"" } id="btn-1" onClick={() => {
                   setActive(1)
                   props.onPage(1)
                    
                }}>About</button>

            <button className = { active === 2 ?"active":"" } id="btn-2" onClick={() => {
                setActive(2)
                props.onPage(2)
           
                }}>Contact</button>

                <button className = { active === 3 ?"active":"" } id="btn-3" onClick={() => {
                    setActive(3)
                    props.onPage(3)
                    
                    }}>Services</button>
                

            </div>
            
        );
    }

 
export default Header;