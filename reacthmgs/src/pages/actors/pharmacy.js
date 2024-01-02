import React , { useState } from "react";
import Sideheader from './sideheader';
import Profile from "./actorspage/profile";
import Comment  from "./actorspage/Comment";
import Drug from "./actorspage/pharmacistspage/Drug";
import Lpatients from "./actorspage/pharmacistspage/PatientDtails";
import DashBoard from "./actorspage/pharmacistspage/Dashboard";

const Pharmacy = props => {
    var [page, setPage] = useState(2);
    var [headprof, setHeadprof] = useState(0);

    var [passuser, setPassuser] = useState([]);
  var handlePage = pageNo => {
    setPage(pageNo);
  };
  var handleHeadprof = hp => {
    setHeadprof(hp);
  };
  var handlePassuser = (user) => {
    setPassuser(user);
  };
  let disHeadprof; 
  var pharmacistDetail = props.users;//accept actors detail from app.js
  var pharmacistTask = ['Dashboard', 'Drugs', 'Patients'];
  if (headprof === 0) {
    disHeadprof = <Sideheader onPage = { handlePage } changeSide = { handleHeadprof } task = { pharmacistTask } detail = { pharmacistDetail } />
  }else if (headprof === 1) {
    disHeadprof = <Profile changeSide = { handleHeadprof } detail = { pharmacistDetail } />
  }


  let disPage;
  if (page === 2) {
    disPage = <DashBoard detail = { pharmacistDetail } onPage = { handlePage }/>
   } else if (page === 3) {
    disPage = <Drug detail = { pharmacistDetail } onPage = { handlePage }/>
  } else if (page === 1 ) {
    disPage = <Comment detail = { pharmacistDetail } onPage = { handlePage }/>
  }else if (page === 4 ) {
    disPage = <Lpatients detail = { pharmacistDetail } onPage = { handlePage }/>
  } else page=404;



    console.log("pharmacist pages");
    return ( <div className="pharmacist">
        <p>{disHeadprof}</p>
       <p>{disPage}</p>
    </div> 
    );
}

export default Pharmacy;