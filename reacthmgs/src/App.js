import React , { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Services';
import Header from "./Header";
import Admin from "./pages/actors/admin";
import Doctor from "./pages/actors/doctor";
import Laboratory from "./pages/actors/laboratory";
import Pharmacy from "./pages/actors/pharmacy";
//import User from "./pages/actors/user";
import Acountant from "./pages/actors/Acountant";
import RecordOficer from "./pages/actors/RecordOficer";
import Patient from "./pages/actors/bedManager";
//app calls all new pages
//header changes among home, service, about in app.js
//service change among actors in app.js
//servics sends username and password of actors to app.js using onpassuser function to send into actors
import './dashboard.css';
function App() {
  var [page, setPage] = useState(0);//store the page numbers
  var [passuser, setPassuser] = useState([]);//store the password and username of actors that send from service in order to send into actors
//form of pass user [{,,,,,}] each actor can access it using props.userproperity.name|any
  var handlePage = pageNo => {//function to handle page
  setPage(pageNo);
};
var handlePassuser = (user) => {//to handle username and password
  setPassuser(user);
};
//to call commponenets based on the given page
let disPage;
if (page === 0) {
  disPage = <Home onPage = { handlePage }/>
} else if (page === 1 ) {
  disPage = <About onPage = { handlePage }/>
}else if (page === 2 ) {
  disPage = <Contact onPage = { handlePage }/>
} else if (page === 3 ) {
  disPage = <Login onSetpassuser = { handlePassuser } onPage = { handlePage }/>
} else if (page === 4 ) {
  disPage = <Admin users={passuser}  onPage = { handlePage }/>
} else if (page === 5 ) {
  disPage = <Doctor users={passuser}  onPage = { handlePage }/>
} else if (page === 6 ) {
  disPage = <Pharmacy users={passuser}  onPage = { handlePage }/>
} else if (page === 7 ) {
  disPage = <Laboratory users={passuser}  onPage = { handlePage }/>
} else if (page === 8 ) {
  disPage = <Patient users={passuser}  onPage = { handlePage }/>
}// else if (page === 9 ) {
  //disPage = <Login onPage = { handlePage }/>}
  else if (page === 10 ) {
  disPage = <Acountant users={passuser}  onPage = { handlePage }/>
} else if (page === 11 ) {
  disPage = <RecordOficer users={passuser} onPage = { handlePage }/>
} else page=404;
  return ( 
    <div>
      <Header onPage={ handlePage } />
      <ToastContainer position="top-center" />
      {disPage}
    </div>
   );
}

export default App;
