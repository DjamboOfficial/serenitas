import React from "react";
import "../styles/contact-form.css";

export const ContactForm = () => {
  const handleButtonClick = () => {
    const emailRecipient = "edoardo.giambuzzi@gmail.com";
    const subject = "serenitas | Query";
    const mailToLink = `mailto:${emailRecipient}?subject=${subject}`;
    window.location.href = mailToLink;
  };

  return (
    <>
      <div className="mail-button-container">
        <button onClick={handleButtonClick} id="mail-button">
          <img
            className="mail-button-image"
            src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712126279/serenitas/djambo1990_51954_an_envelope_the_way_Jacques_Louis_David_would__de60a7e5-1a9f-4a5a-8118-7b651d54e0b7_bx6xzl-removebg-preview_fo0iik.png"
            alt="contact-form"
          />
        </button>
      </div>
    </>
  );
};
