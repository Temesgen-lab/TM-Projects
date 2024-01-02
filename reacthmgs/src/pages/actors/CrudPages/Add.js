import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';
import './crud.css';
function Add(props) { 
const [formdata, setFormData] = useState({});//to store form data from input type
const [formdatat, setFormDatat] = useState({});//to store form data from textarea type
const [formdatas, setFormDatas] = useState({});//to store form data from DB select type
const [formdataso, setFormDataso] = useState({});//to store changing form data of select type
const [value, setValue] = useState({});

const [sumform, setSumForm] = useState({image: []});//alldata + images to send into DB

const [input, setInput] = useState([]);//to store kes array of crud input
const [bgtask, setBgtask] = useState("");
const [textArea, setTextArea] = useState([]);//to store keys array of crud textarea
const [selectOption, setSelectOption] = useState([]);//to store keys array of DB actors
const subkey = [...input, ...textArea];
const [sumkeyfoem, setsumkeyfoem] = useState([])
const [tableName, setTableName] = useState('');
const actor = props.actorDetail;//form [{,,,,}] come from service->app->actors->actorspage->crud
//for in to convert data keys to array
//for select option
const [domain, setDomain] = useState(['doctor', 'pharmacy']);//lists of domains in admin table
const [domainName, setDomainName] = useState({recordofficer: ['te', 'me']});//employ with its domain
const [searchwith, setSearchWith] = useState("recordofficer");//to store the domain selected out of domains
const [searchwith1, setSearchWith1] = useState({});//to store selected domainname
//const ad = {select: searchwith1};

const alldata = {...formdata, ...formdatat, ...searchwith1 };

const user = props.userDetail; //form {,,,,,} come from crud -> add/edit... using display all
 //for in to convert data keys to array
/*
 var users = [];
 for (const key in user) {
     if (Object.hasOwnProperty.call(user, key)) {
         if (user[key] instanceof Array) {
             
         } else{
            users.push(key);
         }
     }
    
 }
 */
 var actors = [];
 for (const key in actor[0]) {
     if (Object.hasOwnProperty.call(actor[0], key)) {
         if (actor[0][key] instanceof Array) {
             
         } else{
            actors.push(key);
         }
     }
    
 }
 var deop;
 
 useEffect(()=>{
    const form = props.inputs;//name of input from crud
    const formt = props.inputst;//name of text area from crud
   // const forms = props.inputss;
    setFormData({...formdata, ...form})
    setFormDatat({...formdatat, ...formt})
   // setFormDatas({...formdatas, ...forms})
    setsumkeyfoem([...sumkeyfoem, ...subkey])
  
    //setFormDatas({...sumform, ...forms, ...form, ...formt})
 }, [])
 
 useEffect(()=>{
    if (props.pur !== "registration" ) {
        getActors();  
        if (props.isRes === "response") {
            var domianame = {};
        setSearchWith1({select: props.userDetail["sendFrom"],sendFrom: actor[0].fname, saenderDomain: actor[0].domain});
        setSearchWith(props.userDetail["saenderDomain"]);	
        domianame = {...domianame,  [props.userDetail["saenderDomain"]]: []};
        domianame[[props.userDetail["saenderDomain"]]].push(props.userDetail["sendFrom"])
        setDomainName(domianame)
    }
    }

 },[])
 useEffect(()=>{
    setSumForm({...sumform, ...alldata})

 }, [formdata, formdatas, formdataso, searchwith, searchwith1])
 //to retrive actors name
 const getActors = () => {
    fetch(`http://localhost:5000/getall/employeesFolder`,{
        headers: {
          Authentication: 'secret'
        }
      }).then(response => response.json()).then(obj => {

    const domains = new Set();
	const arr = [];
	var domianame = {doctor: ['a']};
	obj.map((val)=>{//to collect domains of the employees
		return domains.add(val.domain);
	});
	for (const val of domains) {//to create object for domain eg. {doctor: [abeabe, sbhat]}
		domianame = {...domianame,  [val]: []};
		arr.push(val);
	}
	obj.map((val)=>{// to add employees to domain
		return domianame[[val.domain]].push(val.fname);
	});

    setDomain(arr);
    setDomainName(domianame);



    }).catch(e => {
        console.log("erorr", e)
      });
 }
useEffect(() => {
    //to convert objescts come from crud input into values array and keys array
    var valueformdata= [];
    var formdatakeys = [];
    for (const key in formdata) {
        if (Object.hasOwnProperty.call(formdata, key)) {
            if (formdata[key] instanceof Array) {
                
            } else{
            formdatakeys.push(key);
            valueformdata.push(formdata[key]);
            }
        }
       
    }
    setInput(formdatakeys);
    //to convert objects of textarea from crud to value array and key array
    var valueformdatat = [];
    var formdatakeyst = [];
    for (const key in formdatat) {
        if (Object.hasOwnProperty.call(formdatat, key)) {
            if (formdatat[key] instanceof Array) {
                
            } else{
            formdatakeyst.push(key);
            valueformdatat.push(formdatat[key]);
            }
        }
       
    }
    setTextArea(formdatakeyst);
    //to convert actor obj from DB to array
    var valueformdatas = [];
    var formdatakeyss = [];
    for (const key in formdatas) {
        if (Object.hasOwnProperty.call(formdatas, key)) {
            if (formdatas[key] instanceof Array) {
                
            } else{
            formdatakeyss.push(key);
            valueformdatas.push(formdatas[key]);
            }
        }
       
    }
    setSelectOption(formdatakeyss);
    if (props.pur === "registration") {
        //setTableName(props.tableName.retrivedTable);
    } else {
    if (props.act === "Trage") {
        //setTableName("doctorsFolder");
     // if (value){setValue({fname: props.userDetail.fname, age: props.userDetail.age, sex: props.userDetail.sex});}
    } else if (props.act === "Edit") {
        //call method for edit
    } else if (props.act === "View") {
        //call 
    } else if (props.act === "View") {
        
    }
}

}, [formdata,formdatat, formdatas, searchwith, searchwith1])
const handleInputChange = (em) => {
    let { name, value } = em.target;
    if (name === ""|| ! value==="" || name === null || value === null) {

    } else {
        setFormData({...formdata, [name]: value}); 

    }
         
}; 
const handleInputChanget = (em) => {
    let { name, value } = em.target;
    if (name === ""|| ! value==="" || name === null || value === null) {

    } else {
        setFormDatat({...formdatat, [name]: value}); 

    }
         
}; 
const handleInputChanges = (em) => {
    let { name, value } = em.target;
    if (name === ""|| ! value==="" || name === null || value === null) {

    } else {
        setFormDataso({...formdataso, [name]: value}); 

    }
         
}; 
 
    
var validater = 0;
var validatern = 2;
const handleAdd = e => {
    e.preventDefault();
 if (input) {
    input.map((validatekey, validx)=>{
      
        if (formdata[validatekey] === null || formdata[validatekey] === "") {
validater = 1;
        } 
    }) 
 }       
    if (validater === 1) {
        return Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `All fildes you must fill,${input}`,
            showConfirmButton: true
        }); 
    } else {   
fetch(`http://localhost:5000/insertdata/${props.pur === "registration" ? props.tableName:(props.isRes === "response"?searchwith+"ResponseFolder": searchwith+"Folder")}`, {
method: "PUT",
crossDomain: true,
headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
},
body: JSON.stringify(sumform)
}).then(response => response.json()).then(data => {
if (data.acknowledged) {
Swal.fire({
    icon: 'success',
    title: 'Added!',
    text: ` ${data.insertedId} ${input}This is your Id don't forget`,
    showConfirmButton: true,
    timer: 1500
});}
console.log(formdata);
// props.callAll();
props.onSubpage(0);


});
}
}


function convertToBase64(e) {
var reader = new FileReader();
reader.readAsDataURL(e.target.files[0]);
reader.onload = () => {
if (reader.result) {
    setSumForm({...sumform, image: [reader.result]});  
}

};
reader.onerror = error => {
console.log("Error: ", error);
}
}
//call it during change the value
const geact = (e) => {
setBgtask(` ${e.target.value}`);

}
var formss = ( 
    <div className="employ-page">
    <form name='myForm' onSubmit={handleAdd}>
       
        <table>
            <tr className='headerAdd'>
                <td>ActorName: </td>
                <td>{actor[0].fname}</td>
                <td><img style={{borderRadius: "100%"}} src={actor[0].image} width="10%" height="10%" border-radius="100%" alt='actor' /></td>
                <td><span>Registration Form</span></td>
                
            </tr>
        </table>
        
        <span>{bgtask}</span><br/>
        <div className='formBody'>

       {input && input.map((nam, index) => {
        return (
            <div>
              
        <label className='reg' key={index} htmlFor="firstName">{nam}</label>
        <input className="reg"
        key={index + 10 }
            id={"a"+index}
            type="text"
            name={nam}
            value={formdata[nam]}
            onChange={(e) => {handleInputChange(e); geact(e)}}
            placeholder={`Peleas enter ` + nam }
            
        />
            </div>
        ) 


       })}
       {textArea && textArea.map((nam, index) => {
  return ( <div key={index + 20 }>
    <label  className="reg" htmlFor="firstName">{nam}</label>
        <textarea className="reg" id={"b"+index}
        type="text"
        name={nam}
        value = {formdatat[nam]}
        placeholder={`Peleas Write ` + nam }
        onChange={(e) => {handleInputChanget(e); geact(e)}}></textarea>

</div>)

    })}
   
{props.pur !== "registration" && <select name='domain' value={searchwith} id="domain" onChange={e => setSearchWith(e.target.value)}>
      <option selected value="">SEND TO</option>
     { props.pur !== "registration" && domain.map((search)=>{
            return  <option value={actor[0].domain !== search && search}>{actor[0].domain !== search && search}</option> 
     }) } 
    </select>}
    {props.pur !== "registration" && <select name='domainname' value={searchwith1["select"]} onChange = {e => setSearchWith1({ select: e.target.value, sendFrom: actor[0].fname, saenderDomain: actor[0].domain})}>
      <option value="">{"SEND TO "}</option>
     {props.pur !== "registration" &&  domainName && domainName[[searchwith]].map((search)=>{
        return <option value={search} >{search}</option>
     }) } 
    </select>
}   



       <br/>
        <div>
     <label className='reg' htmlFor="image">Upload Image</label>
         <input className='reg'
         accept='image/*'
            id="image"
            type="file"
            name="domain"
            onChange={convertToBase64}
        />
        </div>
        <div className='buttom'>
        {sumform.image ===""|| sumform.image===null?"": <img width={50} style={{marginRight: "5%"}}  height={50} src={sumform.image} alt = ''/> }
            <button className="btn btn-secondary mt-2" onClick={(e) => {handleInputChange(e); geact(e)}}>Add</button>
            <button
                style={{ marginLeft: '12px' }}
                className="btn btn-secondary mt-2"
                onClick={() => props.onSubpage(0) }
            >Cancel</button>
        </div>
        </div>
    </form>
</div>
);




    return formss;
       
}

export default Add;