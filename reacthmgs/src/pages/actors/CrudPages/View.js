import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import './crud.css';

function View(props) {


    const [personel, setPersonel] = useState("");
    const id = props.id;

    useEffect(() => {
        if (id) {
          getSingleUser(id);
        }
    }, [id])

    const getSingleUser = (id) => {
        fetch(`http://localhost:5000/getone/employeesFolder/${id}`,{
            headers: {
              Authentication: 'secret'
            }
          }).then(response => response.json()).then(json => {
            console.log(json);
            setPersonel(json[0]);
          }).catch(e => {
            console.log("erorr", e)
          });
    }
    return (
        <div className="employ-pag">
<table className="employees-table">
                <thead>
                    <tr>
                        <th>_id</th>
                        <th>First Name</th>
                        <th>Last Nmae</th>
                        <th>Email</th>
                        <th>Domain</th>
                        <th>Salary</th>
                        <th>StartDate</th>
                        <th>Actions</th>
                    </tr>
                </thead> 
               <tbody>
                {personel && 
                    <tr>
                        <td>{personel._id}</td>
                        <td>{personel.fname}</td>
                        <td>{personel.lname}</td>
                        <td>{personel.gname}</td>
                        <td>{personel.sex}</td>
                        <td>{personel.age}</td>
                        <td>{personel.email}</td>
                        <td>{personel.phone}</td>
                        <td>{personel.domain}</td>
                        <td>{personel.salary}</td>
                        <td>{personel.date}</td>
                    </tr>
                    
                    }
              
                </tbody>
             </table>  
             <button
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        onClick={() => props.onSubpage(0) }
                    >Cancel</button>        
        </div>
    );
}

export default View