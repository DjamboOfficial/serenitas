import React, { useState } from "react";
import { connect } from "react-redux";
import { setMode } from "../redux/actions";
import "../styles/modes.css";

const ModesContainer = ({
  mode,
  setMode,
  isLoggedIn,
  username,
  setBackground,
}) => {
  const [activeMode, setActiveMode] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  let sound;

  switch (mode) {
    case "aqua-sulis":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220668/serenitas/Aqua%20Sulis/djambo1990_51954_an_ancient_Roman_bathhouse_adorned_with_intric_fb79daa1-82b4-4e33-91fe-2c9e9b371ae0_mefxbb.png"
      );
      sound = "";
      break;
    case "alba-fucens":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220655/serenitas/Alba%20Fucens/djambo1990_51954_a_majestic_mountain_landscape_with_rugged_peak_e0218f8e-81eb-4cbf-864a-76286f28a1b5_osb6zb.png"
      );
      sound = "";
      break;
    case "leptis-magna":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220669/serenitas/Leptis%20Magna/djambo1990_51954_a_vast_desert_expanse_stretching_to_the_horizo_f6b29a20-c81f-4d3c-82a1-0180b7269a63_zo2glj.png"
      );
      sound = "";
      break;
    case "nemausus":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220690/serenitas/Nemausus/djambo1990_51954_a_serene_forest_glade_bathed_in_dappled_sunlig_de838125-7bd6-457d-af97-6e9f9b026483_jzvtc3.png"
      );
      sound = "";
      break;
    case "oplontis":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220677/serenitas/Oplontis/djambo1990_51954_an_opulent_Roman_villa_nestled_amidst_lush_gar_d90d4af0-57c6-46cd-9c56-c30dbd07da58_nixlry.png"
      );
      sound = "";
      break;
    case "noviomagus":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220688/serenitas/Noviomagus/djambo1990_51954_realistic_image_of_a_Roman_military_encampment_e509cf93-0bb1-48b4-b47d-43046483e1ff_dbymmn.png"
      );
      sound = "";
      break;
    case "pompeii":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220672/serenitas/Pompeii/djambo1990_51954_a_bustling_Roman_tavern_its_walls_adorned_with_f51c5044-5684-47d7-b3bf-53e3868305b8_jtf11t.png"
      );
      sound = "";
      break;
    default:
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1707131136/serenitas/emperor_nflho7.png"
      );
      sound = "";
  }

  const handleButtonClick = (selectedMode) => {
    setMode(selectedMode);
    setActiveMode(selectedMode);
  };

  const toggleModesVisibility = () => {
    setIsClicked(!isClicked); // Toggle isClicked state
  };

  return (
    <div className="modes-container">
      {isLoggedIn && (
        <>
          <audio src={sound} />
          <button onClick={toggleModesVisibility}>
            {isClicked ? "Hide Modes" : "Show Modes"}{" "}
            {/* Toggle button label based on isClicked state */}
          </button>
          {isClicked && (
            <div className="modes-list">
              <button
                onClick={() => handleButtonClick("aqua-sulis")}
                style={{
                  backgroundColor:
                    activeMode === "aventicum" ? "green" : "transparent",
                }}
              >
                Aqua Sulis
              </button>
              <button
                onClick={() => handleButtonClick("alba-fucens")}
                style={{
                  backgroundColor:
                    activeMode === "leptis" ? "green" : "transparent",
                }}
              >
                Alba Fucens
              </button>
              <button
                onClick={() => handleButtonClick("leptis-magna")}
                style={{
                  backgroundColor:
                    activeMode === "leptis" ? "green" : "transparent",
                }}
              >
                Leptis Magna
              </button>
              <button
                onClick={() => handleButtonClick("nemausus")}
                style={{
                  backgroundColor:
                    activeMode === "leptis" ? "green" : "transparent",
                }}
              >
                Nemausus
              </button>
              <button
                onClick={() => handleButtonClick("oplontis")}
                style={{
                  backgroundColor:
                    activeMode === "leptis" ? "green" : "transparent",
                }}
              >
                Oplontis
              </button>
              <button
                onClick={() => handleButtonClick("noviomagus")}
                style={{
                  backgroundColor:
                    activeMode === "leptis" ? "green" : "transparent",
                }}
              >
                Noviomagus
              </button>{" "}
              <button
                onClick={() => handleButtonClick("pompeii")}
                style={{
                  backgroundColor:
                    activeMode === "leptis" ? "green" : "transparent",
                }}
              >
                Pompeii
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mode: state.mode, // Accessing mode state from Redux store
  };
};

const mapDispatchToProps = {
  setMode: setMode, // Mapping setMode action creator to props
};

export default connect(mapStateToProps, mapDispatchToProps)(ModesContainer);
