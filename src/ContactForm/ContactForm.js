import React from "react";

const ContactForm = () => {
  function pdfDownloadHandler() {
    console.log("this ran");
    let alink = document.createElement("a");
    alink.href =
      "https://drive.google.com/uc?export=download&id=186HbGY-MI-B2ka4gLVzsu6N2E0ud5d8f";
    alink.download = "SamplePDF.pdf";
    alink.click();
  }

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
        <div className="downloadBtn" onClick={pdfDownloadHandler}>
          resume
        </div>
      </div>
      <div className="horizontalLine"></div>
      <div className="bottomText">Made by Akshat Mittal in React.js</div>
    </div>
  );
};

export default ContactForm;
