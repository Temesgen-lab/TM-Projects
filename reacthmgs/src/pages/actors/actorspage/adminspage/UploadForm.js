//service->app->actors->upload
import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadForm from "./components/UploadForm";
import UploadsList from "./components/UploadsList";
import { BACKEND_URI } from "./config/constants";

const UploadForms = (props) => {
  const [medias, setMedias] = useState([]);
  const actor = props.detail;//form [{,,,,}] come from service->app->actors->upload form
  useEffect(() => {
    //<UploadsList medias={medias} />
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
        alert("Error hUploadFormened!");
      });
  };

  return (
    <>
      <div className="row dashboard">
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "300px",
              margin: "40px",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
              <UploadForm getAllMedias={getAllMedias} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card"
            style={{
              height: "auto",
              width: "0px",
              margin: "40px",
              border: "1px solid black",
            }}
          >
            <div className="card-body">
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadForms;
