//service<-app->actor
import React , { useState } from "react";
import Sideheader from './sideheader';
import Dashboard from './actorspage/adminspage/Dashboard';
import Profile from "./actorspage/profile";
import Comment  from "./actorspage/Comment";
import Employ from "./actorspage/adminspage/Employmanagment";
import Report from "./actorspage/adminspage/Reports";
import UploadForms from "./actorspage/adminspage/UploadForm";

const Admin = props => {
    var [page, setPage] = useState(2);//store the pages value of admin like dashboard, comment, employee....
    var [headprof, setHeadprof] = useState(0);//store the pages value of header or profile to exchange them

  var handlePage = pageNo => {//it calls by header to  change b/n dashboard, comment, employee, or ... 
    setPage(pageNo);
  };
  var handleHeadprof = hp => {//it calls to change b/n header and profile on header / profile
    setHeadprof(hp);
  };
  
  let disHeadprof;
  var adminDetail = props.users;//accept actors detail from app.js
  var adminTask = ['DashBoard', 'Employ', 'Report', 'UploadEvents'];//Set the names to call in header for admin
  if (headprof === 0) {
    disHeadprof = <Sideheader onPage = { handlePage } changeSide = { handleHeadprof } task = { adminTask } detail = { adminDetail } />
  }else if (headprof === 1) {
    disHeadprof = <Profile changeSide = { handleHeadprof } detail = { adminDetail } />
  }

  let disPage;
  if (page === 2) {
    disPage = <Dashboard detail = { adminDetail }  onPage = { handlePage }/>
  } else if (page === 1 ) {
    disPage = <Comment detail = { adminDetail }  onPage = { handlePage }/>
  }else if (page === 3 ) {
    disPage = <Employ detail = { adminDetail } onPage = { handlePage }/>
  } else if (page === 4 ) {
    disPage = <Report detail = { adminDetail }  onPage = { handlePage }/>
  } else if (page === 5 ) {
    disPage = <UploadForms detail = { adminDetail }  onPage = { handlePage }/> 
   } else page=404;



    console.log("Admin pages");
    return ( <div className="admin">
        <p>{disHeadprof}</p>
       <p>{disPage}</p>
    </div> 
    );
}

export default Admin;