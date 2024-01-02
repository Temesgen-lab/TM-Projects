import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "./components/UploadForm";
import UploadsList from "./components/UploadsList";
import { BACKEND_URI } from "./config/constants";
import image from './images.jpeg';

const Home = () => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    //<UploadForm getAllMedias={getAllMedias} />
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/getall/Media`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error hHomeened!");
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "",
              width: "",
              margin: "",
              border: "",
            }}
          >
            <div className="card-body">
              <img height= "100%" src={image} alt= "JINKA GENERAL HOSPITAL"/>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "500px",
              margin: "40px",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
              <UploadsList medias={medias} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
