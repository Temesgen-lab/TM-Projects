//service->app->actors->actorspage->crud
import React, {useEffect, useState} from "react";
import Swal from 'sweetalert2';
//import Views from "./CrudPages/View";
import Add from "./CrudPages/Add";
import Edit from "./CrudPages/Edit";
import Profile from "./CrudPages/profile";
import "./CrudPages/crud.css"
const Crud = props => {
    const [data, setData] = useState([]);//to store the database rerived data
    const [empId, setempId] = useState(0);//to collect the user id 
    const [subPage, setSubpage] = useState("");//to collect the value that assigns to action page
   const [value, setValue] = useState("");//to collecct the value to search
    const [searchwith, setSearchWith] = useState("fname");//to store the method to search
    const [userDetail, setUserDetail] = useState({});
    var empPage;//stor the selected pages
    const actor = props.actor;//form [{,,,,}] come from service->app->actors->actorspage->crud
//for in to convert data keys to array
var arrval = [];
for (const key in data[0]) {
    if (Object.hasOwnProperty.call(data[0], key)) {
        if (data[0][key] instanceof Array || key === "image" || key === "profimage" || key === "id" || key === "sex" || key === "gname" || key === "age" || key === "phone") {
        
        } else {
        arrval.push(key.toString());
        }
    }
}
console.log(arrval);

//to convert all js objects of data to array
var keyarr=[];
data.map((items, index) =>{
    var arrval = [];
    for (const key in items) {
        if (Object.hasOwnProperty.call(items, key)) {
            if (items[key] instanceof Array || key === "image" || key === "profimage" || key === "id" || key === "sex" || key === "gname" || key === "age" || key === "phone") {

            } else {
           arrval.push(items[key].toString());
            }
        }
    }
   return keyarr.push(arrval);
})
console.log(keyarr);
//to recive id from each user on clike pressed 
    const handleId = (id) => {
        setempId(id);
    };
    /*
    const handleuserDetail = (value) => {
        setUserDetail(value);
    }*/
    //to change the value of subpage in oreder to invok actions page
    const handlesubPage = (page) => {
        setSubpage(page);
       
    };
    useEffect(() => {
       if(props.purpose === "registration") {
        getUsers();
       } else {
        getSomeUser();
       }
       
    }, [subPage]);
//to retrive all records in specified table
   const getUsers = async () => {
    fetch(`http://localhost:5000/getall/${props.tableName.allTable}`, {
        headers: {
          Authentication: 'secret'
        }
      }).then(response => response.json()).then(json => {
        console.log(json);
        setData(json);
      }).catch(e => {
        console.log("erorr", e)
      })
     
   };
   //to retrive data based on other atriputes/ spesfic domain
   const getSomeUser = () => {
    const value = "select";
    fetch(`http://localhost:5000/getsome/${actor[0].domain+"Folder"}/?value=${actor[0].fname}&searchwith=${value}`,{
        headers: {
          Authentication: 'secret'
        }
      }).then(response => response.json()).then(json => {
        console.log(json);
        setData(json);
      }).catch(e => {
        console.log("erorr", e)
      });
   }
//call on pressed delete button to delete the element
   const onDeleteuser = (id) => {
    Swal.fire( {
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
    }).then(result => {
        if (result.value) {
            
    fetch(`http://localhost:5000/deletedata/${ props.purpose === "registration" ? props.tableName.allTable: actor[0].domain+"Folder"}/${id}`, {
        method: "DELETE"
    }).then(() => {
        props.purpose === "registration" ? getUsers(): getSomeUser();
            
        });
            Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: userDetail._id + `item.fname item.lname's data has been deleted.`,
                showConfirmButton: false,
                timer: 1500,
            });

        }
    });

   }
   //Call on search keyup
   const handleSearch = () => {
    if (value === "") {
        props.purpose === "registration" ? getUsers(): getSomeUser();
        
    } else {
        fetch(`http://localhost:5000/getsome/${props.purpose === "registration" ? props.tableName.allTable: actor[0].domain+"Folder"}/?value=${value}&searchwith=${searchwith}`,{
        headers: {
          Authentication: 'secret'
        }
      }).then(response => response.json()).then(json => {
        console.log(json);
        setData(json);
      }).catch(e => {
        console.log("erorr", e)
      });
    }
   }
    console.log("Employ pages");
    var input = {fname: "", lname: "", gname: "", age: "", phone: "", email: "", domain: "", salary: "", date: ""};
    var patientinput = {fname: "", lname: "",gname: "", age: "", phone: "", email: "", region: "", woreda: "", kebele: ""};
    var deathInput = {cause: "", patient: "", date: ""};
    var birthInput = {birthType: "", patient: "", doctor: "", date: ""};
    var drugInput = {dname: "", size: "", publishDate: "", expireDate: ""};
    var inputt = {fnamet: "", lnamet: ""};
    var tragein = {id: userDetail["_id"], fname: userDetail["fname"], lname: userDetail["lname"],  sex: userDetail["sex"],age:userDetail["age"], phone: userDetail["phone"]};
    var trageta = {description: "write your description..."}
    var trageSend = ["doctor", "laboratory"];
    var responsin = {id: userDetail["_id"], fname: userDetail["fname"], lname: userDetail["lname"],  sex: userDetail["sex"],age:userDetail["age"], phone: userDetail["phone"],};
    var responseta = {description: "write your description..."}

    
    // to call actions page
    if (subPage === "add") {
        empPage =  <Add pur = "registration"  userDetail = {userDetail} actorDetail = {actor} act = "adder" inputs={input} inputst='' tableName = "employeesFolder" callAll = {getUsers} onSubpage = { handlesubPage } />  
       } else if (subPage === "Edit") {
        empPage = <Edit act = "editter" userDetail = {userDetail} actorDetail = {actor} callAll = {getUsers} tableName = {props.tableName} onSubpage = { handlesubPage } id = {empId} />
       } else if (subPage === "View") {
        empPage = <Profile sendto='laboratory' act = "viewer" userDetail = {userDetail} actorDetail = {actor} inputs={input} inputst='' tableName = "doctorsFolder" onSubpage = { handlesubPage } id = {empId} />
       } else if (subPage === "add patient") {
        empPage = <Add pur = "registration" act = "apatient" userDetail = {userDetail} actorDetail = {actor} inputs={patientinput} inputst= {{Tex: ""}} tableName = "patientFolder" onSubpage = { handlesubPage } id = {empId} />
       } else if (subPage === "add death") {
        empPage = <Add pur = "registration" act = "adeath" userDetail = {userDetail} actorDetail = {actor} inputs={deathInput} inputst='' tableName = {props.tableName} onSubpage = { handlesubPage } id = {empId} />
       } else if (subPage === "add drug") {
        empPage = <Add pur = "registration" act = "adrug" userDetail = {userDetail} actorDetail = {actor} inputs={drugInput} inputst= {{Tex: ""}} tableName = {props.tableName} onSubpage = { handlesubPage } id = {empId} />
       } else if (subPage === "add birth") {
        empPage = <Add pur = "registration" act = "abirth" userDetail = {userDetail} actorDetail = {actor} inputs={birthInput} inputst= {{Tex: ""}} tableName = {props.tableName} onSubpage = { handlesubPage } id = {empId} />
       } else if (subPage === "Trage") {
        empPage = <Add sendto={trageSend} pur = "noRegister" act = "Trage" userDetail = {userDetail} actorDetail = {actor} inputs={tragein} inputst= {trageta} onSubpage = { handlesubPage } id = {empId} />
       } else if (subPage === "Response") {
        empPage = <Add sendto={trageSend} pur = "noRegister"  act = "response" userDetail = {userDetail} actorDetail = {actor} inputs={responsin} inputst= {responseta}   onSubpage = { handlesubPage }  isRes = "response" id = {empId} />
       }
    return ( 
        <div id="all" className="dashboard">
            {empPage //to call the action page
            }
            {//<button onClick={() => props.onPage(5)}>to admin</button>
            }
           { props.purpose === "registration"?<button onClick={() => {
            if (actor[0].domain === "admin") {
                handlesubPage("add")
            } else if (actor[0].domain === "recordofficer") {
                handlesubPage("add patient")
            } else if (actor[0].domain === "doctor") {
                handlesubPage("add death")
            } else if (actor[0].domain === "pharmacy") {
                handlesubPage("add drug")
            } else if (props.empId === "doctorBirth") {
                handlesubPage("add birth")
            }
            }} className="btn btn-primary mt-2" >Add </button>:""}
              <select value={searchwith} onChange={e => setSearchWith(e.target.value)}>
              <option selected value="">Search by</option>
             { props.search.map((search)=>{
                return <option value={search}>{search}</option>
             }) } 
            </select>
            <input type="text" name="search" placeholder="search..." onKeyUp={(e) => {
                setValue(e.target.value)
                handleSearch()
            }
            } onChange={e => setValue(e.target.value)}/>
          
            <table className="employees-table">
                <thead>
                    <tr>
                    <th>No.</th>
                    { arrval && arrval.map((key, index) => <th key={index + 100}>{ key !== "_id" && key }</th>  
                    )}
                    <th style={{textAlign: "center" }} colSpan={props.action.length + 1}>Actions</th>

                     </tr>                     
                </thead> 
               <tbody>
                {keyarr && keyarr.map((item, index) => {
                    
                    
                    return (
                        
                    <tr key={index + 200}>
                        <th scope="row">{index + 1 }</th>
                        {item.map((valitem, valin) => {
                            console.log(valitem);
                            return <td key={valin + 300}>{ item[0] !== valitem && valitem}</td>
                        })}
                      
               
                
             {props.action.map((actName, ind)=> {
                return<td key={index + 500 }> <button onClick={() => {  
                    handleId(item[0]) 
                    data.map((value) => {
                        value._id === item[0] && setUserDetail(value);
                    })
                    //setUserDetail(item);//to send the user details
                    handlesubPage(actName)
                    } } className="btn btn-primary mt-2" >{actName}</button></td>

             })}
             <td> <button className="btn btn-primary mt-2" onClick={() => onDeleteuser(item[0]) }>Delete</button></td>
            
        
                    </tr>
                    )
                })}

               </tbody>
            </table>

        </div>
     );
}

export default Crud;