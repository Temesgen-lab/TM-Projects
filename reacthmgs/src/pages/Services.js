//app -> services, service or login changes among actors
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
//import { toast } from "react-toastify/dist/components";
const Login = props => {
const [user, setUser] = useState({ name: "", id: "" });//data from user form
const [validation, setValidation] = useState("");
const [userdb, setUserdb] = useState([{fname: "", _id: "", domain: ""}]);//to store data from DB

const handleChange = e => {//to handle changing of form value
    const key = e.target.name;
    const value = e.target.value;
        setUser({ ...user, [key]: value });
    };
const gotoActor = () => {//to change b/n actors
 if (user.name === userdb[0].fname && user.id === userdb[0]._id) {
        props.onSetpassuser(userdb);//send user details to app.js
if (userdb[0].domain === "bedManager") {
    
    props.onPage(8);
} else  if (userdb[0].domain === "admin") {
    
    props.onPage(4);
} else if (userdb[0].domain === "laboratory") {
    
    props.onPage(7);
} else if (userdb[0].domain === "pharmacy") {
    
    props.onPage(6);
} else if (userdb[0].domain === "doctor") {

    props.onPage(5);
} else if (userdb[0].domain === "acountant") {

    props.onPage(10);
}else if (userdb[0].domain === "recordofficer") {

    props.onPage(11);
} else props.onPage(3);
    } else {
        setValidation("no such user");
        //toast.error("In valid user name or password");
    }
}
const handleSubmit = e => {

if (!user.name || !user.id || user.name.length < 4 || user.id.length < 3) {
    console.log("Incorrect username or password");
    toast.error("Incorrect username or password");
  setValidation("In coreect username or password " + user.name + user.id + user.name.length + user.id.length);
} else {
        //retrive from db by pass/_id if no data then setValidation incorrect else setdbUser the retrived value     
      // var result = [{fname: "temu", _id: "0914222602", domain: "admin"}];
     getSingleUser(user.id);
    
      gotoActor();
    

         // setUserdb(ans);
           
}

};
const getSingleUser = (id) => {
    fetch(`http://localhost:5000/getone/employeesFolder/${id}`,{
        headers: {
          Authentication: 'secret'
        }
      }).then(response => response.json()).then(json => {
       //const jsd = JSON.parse(json);
        console.log(json);
        setUserdb({...userdb, ...json});
       
      }).catch(e => {
        console.log("erorr", e)
      });
}
    return ( 
        <div className="login" >
        <strong style={{fontSize:"50px", marginLeft: "15%"}}>Login page</strong>
        
        <pass>{ validation }</pass>
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "600px",
              marginLeft: "20%",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
             <div className="form-group">
            <label htmlFor="name">User Name:</label><br></br>
            <input type="text" id="name" name="name" value={user.name } onChange={ handleChange } placeholder="Enter user name" />
            </div>
            <div className="form-group">
            <label htmlFor="pass">Password:</label><br></br>
            <input type="password" name="id" id="pass" value={user.id} onChange={ handleChange } placeholder="Enter user password" />
            </div>
            
            <button className="btn btn-primary mt-2" type="submit" onClick={handleSubmit}>login</button>
           
            <button className="btn btn-primary mt-2" onClick={() => props.onPage(0)}>logout</button>
        
            </div>
          </div>
        </div>
       

    </div>);
}

export default Login;