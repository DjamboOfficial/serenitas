import React, { useState } from "react";

export const ApiCalls = () => {
  const [quoteMarcus, setQuoteMarcus] = useState("");
  const [quotePliny, setQuotePliny] = useState("");
  const [quoteLivy, setQuoteLivy] = useState("");
  const [showContentMarcus, setShowContentMarcus] = useState(false);
  const [buttonMarcusVisible, setButtonMarcusVisible] = useState(true);
  const [showContentPliny, setShowContentPliny] = useState(false);
  const [buttonPlinyVisible, setButtonPlinyVisible] = useState(true);
  const [showContentLivy, setShowContentLivy] = useState(false);
  const [buttonLivyVisible, setButtonLivyVisible] = useState(true);

  const getQuoteMarcus = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuoteMarcus(
        `"${data.content}," said ${data.author}. Be inspired and carry on, my fellow man.`
      );
      setShowContentMarcus(true);
      setButtonMarcusVisible(false);
      setTimeout(() => {
        setShowContentMarcus(false);
        // Show the button after the content disappears
        setTimeout(() => {
          setButtonMarcusVisible(true);
        }, 1); // Show the button after 1 second
      }, 12000);
    } catch (error) {
      console.error("Error fetching Marcus Aurelius quote:", error);
    }
  };

  const getQuotePliny = async () => {
    try {
      const response = await fetch("https://www.boredapi.com/api/activity");
      const data = await response.json();
      if (data.participants === 1 && data.price === 0) {
        setQuotePliny(`${data.activity}. I'm sure it's good use of your time!`);
        setShowContentPliny(true);
        setButtonPlinyVisible(false);
        setTimeout(() => {
          setShowContentPliny(false);
          setTimeout(() => {
            setButtonPlinyVisible(true);
          }, 1);
        }, 12000);
      } else {
        console.log("Pliny API returned unsuitable activity:", data);
      }
    } catch (error) {
      console.error("Error fetching Pliny activity:", error);
    }
  };

  const getQuoteLivy = async () => {
    try {
      const response = await fetch("https://www.boredapi.com/api/activity");
      const data = await response.json();
      if (data.participants === 1 && data.price === 0) {
        setQuoteLivy(`${data.activity}. I'm sure it's good use of your time!`);
        setShowContentLivy(true);
        setButtonLivyVisible(false);
        setTimeout(() => {
          setShowContentLivy(false);
          setTimeout(() => {
            setButtonLivyVisible(true);
          }, 1);
        }, 12000);
      } else {
        console.log("Livy API returned unsuitable activity:", data);
      }
    } catch (error) {
      console.error("Error fetching Livy activity:", error);
    }
  };

  return (
    <>
      <div className="api-buttons">
        {buttonMarcusVisible && (
          <button className="marcus-aurelius-button" onClick={getQuoteMarcus}>
            Are you in need of inspiration? Get a quote from Emperor Marcus
            Aurelius!
          </button>
        )}

        {buttonPlinyVisible && (
          <button onClick={getQuotePliny} className="pliny-button">
            Are you bored? Pliny the Elder can help you!
          </button>
        )}
        {buttonLivyVisible && (
          <button onClick={getQuoteLivy} className="livy-button">
            Livy Button
          </button>
        )}
      </div>
      {showContentMarcus && (
        <>
          <div className="inspiration-container">
            <textarea
              className="quote-textarea"
              value={quoteMarcus}
              readOnly
            ></textarea>
            <img
              className="marcus-aurelius-image"
              src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1708679316/serenitas/Marcus-Aurelius-1-removebg-preview_bve0pj.png"
              alt="marcus-aurelius-image"
            />
          </div>
        </>
      )}
      {showContentPliny && (
        <>
          <div className="bored-container">
            <textarea
              className="bored-textarea"
              value={quotePliny}
              readOnly
            ></textarea>
            <img
              className="pliny-image"
              src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1708953853/serenitas/djambo1990_51954_the_Roman_writer_Pliny_the_Elder_portrayed_in__0d1c295e-f781-4872-94dd-46d8be32974a-removebg-preview_bmjdmd.png"
              alt="Pliny-image"
            />
          </div>
        </>
      )}
      {showContentLivy && (
        <>
          <div className="history-container">
            <textarea
              className="history-textarea"
              value={quoteLivy}
              readOnly
            ></textarea>
            <img
              className="livy-image"
              src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1709060805/serenitas/djambo1990_51954_the_Roman_historian_Livy_portrayed_in_the_styl_1912029b-d576-4c03-aa80-de53ea4f15dd_l08j45-removebg-preview_hy4fwl.png"
              alt="Livy-image"
            />
          </div>
        </>
      )}
    </>
  );
};
