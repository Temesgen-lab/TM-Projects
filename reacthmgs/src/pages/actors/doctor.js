import React , { useState } from "react";
import Sideheader from './sideheader';
import Profile from "./actorspage/profile";
import Comment  from "./actorspage/Comment";
import Dpatient from "./actorspage/doctorspage/Patientdetails";
import DeathReport from "./actorspage/doctorspage/deathReport";
import BirthReport from "./actorspage/doctorspage/birthReport";


const Doctor = props => {
    var [page, setPage] = useState(1);
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
  var doctorDetail = props.users;//accept actors detail from app.js
  var doctorTask = ['Patients', "DeathReport", "BirthReport"];
  if (headprof === 0) {
    disHeadprof = <Sideheader onPage = { handlePage } changeSide = { handleHeadprof } task = { doctorTask } detail = { doctorDetail } />
  }else if (headprof === 1) {
    disHeadprof = <Profile changeSide = { handleHeadprof } detail = { doctorDetail } />
  }


  let disPage;
  if (page === 2) {
    disPage = <Dpatient detail = { doctorDetail } onPage = { handlePage }/>
  } else if (page === 1 ) {
    disPage = <Comment detail = { doctorDetail } onPage = { handlePage }/>
  } else if (page === 3) {
    disPage = <DeathReport  detail = { doctorDetail } onPage = { handlePage }/>
  } else if (page === 4) {
    disPage = <BirthReport detail = { doctorDetail } onPage = { handlePage }/>
  } else page=404;

    console.log("doctor pages");
    return ( <div className="doctor">
        <p>{disHeadprof}</p>
       <p>{disPage}</p>
    </div> 
    );
}

export default Doctor;