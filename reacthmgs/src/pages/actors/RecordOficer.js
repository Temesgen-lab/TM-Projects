import React , { useState } from "react";
import Sideheader from './sideheader';
import Profile from "./actorspage/profile";
import Comment  from "./actorspage/Comment";
import Rpatient from "./actorspage/recordOficer/Patientdetails";

const RecordOficer = props => {
    var [page, setPage] = useState(2);
    var [headprof, setHeadprof] = useState(0);

    
  var handlePage = pageNo => {
    setPage(pageNo);
  };
  var handleHeadprof = hp => {
    setHeadprof(hp);
  };

  let disHeadprof;
  var RecordOfficerDetail = props.users;//accept actors detail from app.js
  var RecordOfficerTask = ['Patients'];
  if (headprof === 0) {
    disHeadprof = <Sideheader onPage = { handlePage } changeSide = { handleHeadprof } task = { RecordOfficerTask } detail = { RecordOfficerDetail } />
  }else if (headprof === 1) {
    disHeadprof = <Profile changeSide = { handleHeadprof } detail = { RecordOfficerDetail } />
  }


  let disPage;
  if (page === 2) {
    disPage = <Rpatient detail = { RecordOfficerDetail } onPage = { handlePage }/>
  } else if (page === 1 ) {
    disPage = <Comment detail = { RecordOfficerDetail } onPage = { handlePage }/>
  } else page=404;



    console.log("RecordOfficer pages");
    return ( <div className="RecordOfficer">
        <p>{disHeadprof}</p>
       <p>{disPage}</p>
    </div> 
    );
}

export default RecordOficer;