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
        <button onClick={handleButtonClick} className="mail-button"></button>
      </div>
    </>
  );
};
