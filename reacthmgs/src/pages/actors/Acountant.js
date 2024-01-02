import React , { useState } from "react";
import Sideheader from './sideheader';
import Profile from "./actorspage/profile";
import Comment  from "./actorspage/Comment";
import Apatient from "./actorspage/Acountantpages/PatientDtails";

const Acountant = props => {
    var [page, setPage] = useState(2);
    var [headprof, setHeadprof] = useState(0);

  var handlePage = pageNo => {
    setPage(pageNo);
  };
  var handleHeadprof = hp => {
    setHeadprof(hp);
  };
  let disHeadprof;
  var AccountantDetail = props.users;//accept actors detail from app.js
  var AccountantTask = ['Patients'];
  if (headprof === 0) {
    disHeadprof = <Sideheader onPage = { handlePage } changeSide = { handleHeadprof } task = { AccountantTask } detail = { AccountantDetail } />
  }else if (headprof === 1) {
    disHeadprof = <Profile  detail = { AccountantDetail } changeSide = { handleHeadprof }  />
  }


  let disPage;
  if (page === 2) {
    disPage = <Apatient  detail = { AccountantDetail } onPage = { handlePage }/>
  } else if (page === 1 ) {
    disPage = <Comment detail = { AccountantDetail } onPage = { handlePage }/>
  } else page=404;



    console.log("Accountant pages");
    return ( <div className="Accountant">
        <p>{disHeadprof}</p>
       <p>{disPage}</p>
    </div> 
    );
}

export default Acountant;