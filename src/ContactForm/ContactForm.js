import React, { useEffect } from "react";
import { useNormalizedMousePosition } from "../components/normalizedMousePosHook";
import gsap from "gsap";
import { useRef } from "react";
import resume from "../assets/resume/Akshat-Mittal_resume.pdf";

const ContactForm = () => {
  const normalizedMousePos = useNormalizedMousePosition();

  const btn = useRef();

  // function pdfDownloadHandler() {
  //   console.log("this ran");
  //   const myPromise = new Promise((resolve, reject) => {
  //     resolve(resume);
  //   });
  //   myPromise.then((res) => {
  //     const pdfReader = new FileReader();

  //     pdfReader.r;

  //     pdfReader.addEventListener("loadend", (e) => {
  //       console.log(e);
  //     });
  //   });

  // .then((response) => {
  // response.blob().then((blob) => {
  //   // Creating new object of PDF file
  //   const fileURL = window.URL.createObjectURL(blob);
  //   // Setting various property values
  //   let alink = document.createElement("a");
  //   alink.href = fileURL;
  //   alink.download = "SamplePDF.pdf";
  //   alink.click();
  // });
  // });
  // }

  return (
    <div className="mainContainer">
      <div
        style={{
          top: "10vh",
        }}
        className="center mainText"
      >
        I would like to work with you.
      </div>
      <div className="btnContainer">
        <div className="downloadBtn">resume</div>
      </div>
      <div className="horizontalLine"></div>
      <div className="bottomText">Made by Akshat Mittal in React.js</div>
    </div>
  );
};

export default ContactForm;
