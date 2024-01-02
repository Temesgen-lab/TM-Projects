import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';
import './crud.css';
function Edit(props) { 
    const [formdata, setFormData] = useState([{ image: [], }]);
const [input, setInput] = useState(["fname", "lname", "gname", "age", "phone", "email", "domain", "salary", "date"])
const [inputValue, setinputValue] = useState([]);


//for in to convert data keys to array
var arrval = [];
for (const key in formdata[0]) {
    if (Object.hasOwnProperty.call(formdata[0], key)) {
        if (formdata[0][key] instanceof Array) {
        
        } else {
            arrval.push(key);
        }
    }
}
console.log(arrval);

//to convert all js objects of data to array
var keyarr=[];
var arrval1 = [];

formdata.map((items, index) =>{
    for (const key in items) {
        if (Object.hasOwnProperty.call(items, key)) {
            if (items[key] instanceof Array) {
                keyarr.push(items[key]);
            } else {
                arrval1.push(items[key]);  
            }
        }
    }
    keyarr.push(arrval1);
})
console.log(keyarr);


const [ fname, lname, age, phone, email, domain, salary, date, image ] = arrval1;




const id = props.id;

useEffect(() => {
   
      getSingleUser(id);
      
    
}, [id])


    const handleAdd = e => {
        e.preventDefault();
        if (!fname || !lname || !age || !phone || !email || !domain || !salary || !date) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `${fname}, ${lname}, ${age}, ${phone}, ${email}, ${domain}, ${salary},${date}`,
                showConfirmButton: true
            });
        }
        if (id) {
           fetch(`http://localhost:5000/updatedata/${props.tableName.allTable}/${id}`, {
            method: "PUT",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(formdata[0])
        }).then(response => response.json()).then(data => {
            if (data.acknowledged) {
            Swal.fire({
                icon: 'success',
                title: 'Apdated!',
                text: `${fname}  ${lname}: ${data.insertedId} This is your Id don't forget`,
                showConfirmButton: true,
                timer: 1500
            });
            props.callAll();
            props.onSubpage(0);
            
        
        }});
        } 
    }
const getSingleUser = (id) => {
    fetch(`http://localhost:5000/getone/${props.tableName.allTable}/${id}`,{
        headers: {
          Authentication: 'secret'
        }
      }).then(response => response.json()).then(json => {
       //const jsd = JSON.parse(json);
        console.log(json);
        setFormData(json);
      }).catch(e => {
        console.log("erorr", e)
      });
}
const handleInputChange = (em) => {
    let { name, value } = em.target;
setFormData([{...formdata[0], [name]: value}]);
};
function convertToBase64(e) {
   var reader = new FileReader();
   reader.readAsDataURL(e.target.files[0]);
   reader.onload = () => {
    setFormData([{...formdata[0], image: [reader.result]}]);
   };
   reader.onerror = error => {
    console.log("Error: ", error);
   }
}

    return (
        <div className="employ-page">
            <form onSubmit={handleAdd}>
                <span>Update Employee</span><br/>
               {arrval && arrval.map((nam, index) => {
                return (
                    <div>
                <label key={index} htmlFor="firstName">{nam}</label>
                <input
                key={index + 10 }
                    id="firstName"
                    type="text"
                    name={nam}
                   value={arrval1[index]}
                    onChange={handleInputChange}
                />
                    </div>
                )


               })}
               
            
               <br/>
                <div>
             <label htmlFor="image">Upload Image</label>
                 <input
                 accept='image/*'
                    id="image"
                    type="file"
                    name="domain"
                    onChange={convertToBase64}
                />
                {image ===""|| image===null?"": <img width={50} height={50} src={keyarr[0]} alt = ''/> }
                </div>
                <div style={{ marginTop: '30px' }}>
                    <button onClick={handleAdd}>Update</button>
                    <button
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        onClick={() => props.onSubpage(0) }
                    >Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Edit;