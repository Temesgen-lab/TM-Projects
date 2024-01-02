import React , { useState } from "react";
import Sideheader from './sideheader';
import Profile from "./actorspage/profile";
import Comment  from "./actorspage/Comment";
import Laboratorys from "./actorspage/laboratorispage/PatientDtails";

const Laboratory = props => {
    var [page, setPage] = useState(2);
    var [headprof, setHeadprof] = useState(0);

   
  var handlePage = pageNo => {
    setPage(pageNo);
  };
  var handleHeadprof = hp => {
    setHeadprof(hp);
  };

  let disHeadprof;
  var laboratoryDetail = props.users;//accept actors detail from app.js
  var laboratoryTask = ['Patients'];
  if (headprof === 0) {
    disHeadprof = <Sideheader onPage = { handlePage } changeSide = { handleHeadprof } task = { laboratoryTask } detail = { laboratoryDetail } />
  }else if (headprof === 1) {
    disHeadprof = <Profile changeSide = { handleHeadprof } detail = { laboratoryDetail } />
  }

  let disPage;
  if (page === 2) {
    disPage = <Laboratorys detail = { laboratoryDetail }  onPage = { handlePage }/>
  } else if (page === 1 ) {
    disPage = <Comment  detail = { laboratoryDetail } onPage = { handlePage }/>
  } else page=404;



    console.log("laboratory pages");
    return ( <div className="laboratory">
        <p>{disHeadprof}</p>
       <p>{disPage}</p>
    </div> 
    );
}

export default Laboratory;