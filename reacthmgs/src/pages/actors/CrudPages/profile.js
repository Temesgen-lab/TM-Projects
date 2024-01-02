//service->app->actors->actorspage -> crud -> profile
import Swal from 'sweetalert2';
import React, { useState, useRef, useEffect } from "react";
import "./styele.css";

const Profile = (props) => {
  const [image, setImage] = useState(null);
  const [disbtn, setDisbtn] = useState(0);
  const [actorsPro, setActorsPro] = useState(null);
  const hiddenFileInput = useRef(null);
const actor = props.actorDetail;//form [{,,,,}] come from service->app->actors->actorspage->crud
//for in to convert data keys to array
const user = props.userDetail; //form {,,,,,} come from crud -> add/edit... using display all
 //for in to convert data keys to array
 const id = props.id;
const [actorDetail, setActorDetail] = useState({})
useEffect(()=>{
  setActorDetail({fname: user.fname, lname: user.lname, email: user.email, phone: user.phone, id: user._id})
},[actorDetail])

const handleImageChange = (event) => {
    const file = event.target.files[0];
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleUploadButtonClick = (file) => {
    var myHeaders = new Headers();
    const token = "adhgsdaksdhk938742937423";
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        const profileurl = JSON.parse(result);
       setImage(profileurl.img_url);
      })
      .catch((error) => console.log("error", error));
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const updateImage = (file) => {
    const updater ={...file}
    const _id = user._id;
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel!',
  }).then(result => {
      if (result.value) {
        fetch(`http://localhost:5000/updatedata/${props.tableName.retrivedTable}/${id}`, {
         method: "PUT",
         crossDomain: true,
         headers: {
             "Content-Type": "application/json",
             Accept: "application/json",
             "Access-Control-Allow-Origin": "*",
         },
         body: JSON.stringify({ ...updater })
     }).then(response => response.json()).then(data => {
         if (data.acknowledged) {
         Swal.fire({
             icon: 'success',
             title: 'Apdated!',
             text: ` This is your Id don't forget`,
             showConfirmButton: true,
             timer: 1500
         });
        }
      });
     
     }});
     } 
  
  const handelChange = (em)=>{
    let { name, value } = em.target;
    setActorDetail({ ...actorDetail, [name]: value })
  setDisbtn(1);
    
  }

  return (
    <div className="image-upload-container1 nav1">
      <button onClick={() => props.onSubpage(0)}>Hide</button>
      <div className="box-decoration1">
        <div onClick={handleClick} style={{ cursor: "pointer" }}>
        
          {image ? (
            <img src={URL.createObjectURL(image)} alt="upload image" className="img-display-after1" />
          ) : (
            <img width={50} style = {{ borderRadius: "100%" }} height={50} src={user.image} className="img-display-after1" alt = 'Profile'/>
          )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: "none" }}
          />
        </div>

      </div>
      
      <table>
        <tr>
          <th>First Name: </th>
          <td><input name='fname' onChange={handelChange} type="text" value={actorDetail.fname }/></td>
        </tr>
        <tr>
          <th>Last Name: </th>
          <td><input name='lname' onChange={handelChange} type="text" value={actorDetail.lname} /></td>
        </tr>
        <tr>
          <th>Email: </th>
          <td><input name='email' onChange={handelChange} type="email" value={actorDetail.email}/></td>
        </tr>
        <tr>
          <th>Phone: </th>
          <td><input name='phone' type="tel" onChange={handelChange} value={actorDetail.phone }/></td>
        </tr>
        <tr>
          <th>password: </th>
          <td><input name='id' onChange={handelChange} type="password" value={actorDetail.id}/></td>
        </tr>
      {disbtn === 1 && <button onClick={()=> updateImage( actorDetail ) } >Update</button>}  
      </table>
      

    </div>
  );
}




export default Profile;