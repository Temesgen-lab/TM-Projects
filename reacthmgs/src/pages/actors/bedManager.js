import React , { useState } from "react";
import Sideheader from './sideheader';
import Profile from "./actorspage/profile";
import Comment  from "./actorspage/Comment";
import Patients from "./actorspage/patientspage/history";

const Patient = props => {
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
  var BedmangerDetail = props.users;//accept actors detail from app.js
  var BedmangerTask = ['Patients'];
  if (headprof === 0) {
    disHeadprof = <Sideheader onPage = { handlePage } changeSide = { handleHeadprof } task = { BedmangerTask } detail = { BedmangerDetail } />
  }else if (headprof === 1) {
    disHeadprof = <Profile changeSide = { handleHeadprof } detail = { BedmangerDetail } />
  }

  let disPage;
  if (page === 2) {
    disPage = <Patients detail = { BedmangerDetail }  onPage = { handlePage }/>
  } else if (page === 1 ) {
    disPage = <Comment detail = { BedmangerDetail } onPage = { handlePage }/>
  } else page=404;



    console.log("bed manage pages");
    return ( <div className="Bedmanger">
        <p>{disHeadprof}</p>
       <p>{disPage}</p>
    </div> 
    );
}

export default Patient;