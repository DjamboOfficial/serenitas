import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setMode } from "../redux/actions";
import "../styles/modes.css";

const ModesContainer = ({
  mode,
  setMode,
  isLoggedIn,
  username,
  setBackground,
  setSound,
}) => {
  const [activeMode, setActiveMode] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220661/serenitas/Alba%20Fucens/djambo1990_51954_a_majestic_mountain_landscape_with_rugged_peak_a2268e4c-4f25-4fa2-8dd7-a85feef4ff55_jlmcjr.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220659/serenitas/Aqua%20Sulis/djambo1990_51954_an_ancient_Roman_bathhouse_adorned_with_intric_d5d7d1bd-a7e1-4b6d-b8ec-87222016173e_awgs9o.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220687/serenitas/Leptis%20Magna/djambo1990_51954_a_vast_desert_expanse_stretching_to_the_horizo_49aa9dd3-2910-44ae-ba5e-c301862cfff0_jifazw.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220692/serenitas/Nemausus/djambo1990_51954_a_serene_forest_glade_bathed_in_dappled_sunlig_d96e3637-6714-4e01-9622-36128c9afe15_rasxbt.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220683/serenitas/Noviomagus/djambo1990_51954_realistic_image_of_a_Roman_military_encampment_27fc8f26-bc27-44e8-a25d-4453cc81088c_nbklx5.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220685/serenitas/Oplontis/djambo1990_51954_an_opulent_Roman_villa_nestled_amidst_lush_gar_873b32f1-f5f2-4025-ab80-399b68d1fd1a_ixk0ww.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220667/serenitas/Pompeii/djambo1990_51954_a_bustling_Roman_tavern_its_walls_adorned_with_39f2f184-1e5f-4158-8615-c0aa0915df9d_rliknh.png",
  ];

  const backgroundImageStyle = {
    backgroundImage: `url(${images[currentImageIndex]})`,
    backgroundColor: "#f0f0f0", // Fallback background color
  };

  let sound;
  switch (mode) {
    case "aqua-sulis":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220668/serenitas/Aqua%20Sulis/djambo1990_51954_an_ancient_Roman_bathhouse_adorned_with_intric_fb79daa1-82b4-4e33-91fe-2c9e9b371ae0_mefxbb.png"
      );
      setSound = "";
      break;
    case "alba-fucens":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220655/serenitas/Alba%20Fucens/djambo1990_51954_a_majestic_mountain_landscape_with_rugged_peak_e0218f8e-81eb-4cbf-864a-76286f28a1b5_osb6zb.png"
      );
      setSound = "";
      break;
    case "leptis-magna":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220669/serenitas/Leptis%20Magna/djambo1990_51954_a_vast_desert_expanse_stretching_to_the_horizo_f6b29a20-c81f-4d3c-82a1-0180b7269a63_zo2glj.png"
      );
      setSound = "";
      break;
    case "nemausus":
      setBackground(
        "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1712220690/serenitas/Nemausus/djambo1990_51954_a_serene_forest_glade_bathed_in_dappled_sunlig_de838125-7bd6-457d-af97-6e9f9b026483_jzvtc3.png"
      );
      setSound = "";
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
          <button
            className="modes-show-button"
            onClick={toggleModesVisibility}
            style={backgroundImageStyle}
          ></button>
          {isClicked && (
            <div className="modes-list">
              <button
                className="modes-button"
                onClick={() => handleButtonClick("aqua-sulis")}
              >
                Aqua Sulis
              </button>
              <button
                className="modes-button"
                onClick={() => handleButtonClick("alba-fucens")}
              >
                Alba Fucens
              </button>
              <button
                className="modes-button"
                onClick={() => handleButtonClick("leptis-magna")}
              >
                Leptis Magna
              </button>
              <button
                className="modes-button"
                onClick={() => handleButtonClick("nemausus")}
              >
                Nemausus
              </button>
              <button
                className="modes-button"
                onClick={() => handleButtonClick("oplontis")}
              >
                Oplontis
              </button>
              <button
                className="modes-button"
                onClick={() => handleButtonClick("noviomagus")}
                style={{}}
              >
                Noviomagus
              </button>{" "}
              <button
                className="modes-button"
                onClick={() => handleButtonClick("pompeii")}
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
