import React, { useState, useEffect } from "react";
import Timer from "../components/Timer";
import Navbar2 from "../components/Navbar2";
import backgroundImage from "../assets/colosseum.png";
import blacksmithImage from "../assets/blacksmith.png";
import emperorImage from "../assets/emperor.png";
import gladiatorImage from "../assets/gladiator.png";
import philosopherImage from "../assets/philosopher.png";
import senatorImage from "../assets/senator.png";
import { fetchUserData } from "../../services/fetchUserData";
import "../App.css";

const HomepageLoggedIn = () => {
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const userData = await fetchUserData(token);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateBackgroundImage();
  }, [selectedTheme]);

  const updateBackgroundImage = () => {
    const themeImages = {
      blacksmith: blacksmithImage,
      emperor: emperorImage,
      gladiator: gladiatorImage,
      senator: senatorImage,
      philosopher: philosopherImage,
    };

    const backgroundImageUrl = themeImages[selectedTheme] || backgroundImage;

    document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
    document.body.style.backgroundSize = "100% 100%";
    document.body.style.backgroundRepeat = "no-repeat";
  };

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const handleTimerCompletion = () => {
    setIsTimerCompleted(true);
    playAudio("../assets/sounds/timer-completed.wav");
  };

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.addEventListener("error", (error) => {
      console.error("Error loading audio:", error);
    });
    audio.addEventListener("canplay", () => {
      audio.play();
    });
  };

  const handleAddProject = () => {
    if (!showTextarea) {
      setShowTextarea(true);
      setCustomMessage(false);
    } else {
      saveOrUpdateProject();
    }
  };

  const saveOrUpdateProject = async () => {
    if (newProjectName.trim() === "") {
      setCustomMessage("Please enter a project name.");
      return;
    }

    try {
      const apiUrl = showTextarea
        ? "http://localhost:3000/api/user/projects"
        : `http://localhost:3000/api/user/${userData._id}/projects/${newProjectName}`;

      const method = showTextarea ? "POST" : "PUT";

      const response = await fetch(apiUrl, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProjectName,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${showTextarea ? "create" : "update"} project. Status: ${
            response.status
          }`
        );
      }

      const updatedProjects = response.projects.map((project) => ({
        _id: project._id,
        name: project.name,
      }));

      setUserData((prevUserData) => ({
        ...prevUserData,
        projects: updatedProjects,
      }));

      setCustomMessage(
        `Project "${newProjectName}" ${
          showTextarea ? "created" : "updated"
        } successfully.`
      );

      setNewProjectName("");
      setShowTextarea(false);
    } catch (error) {
      console.error(
        `Error ${showTextarea ? "creating" : "updating"} project:`,
        error
      );
      setCustomMessage(
        `Error ${
          showTextarea ? "creating" : "updating"
        } project. Please try again.`
      );
    }
  };

  const handleViewProjects = () => {
    setShowTextarea(false);
    console.log(userData.projects);
  };

  const handleDeleteProject = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete project. Status: ${response.status}`);
      }

      const updatedUserData = await fetchUserData();
      setUserData(updatedUserData);

      setCustomMessage(`Project deleted successfully.`);
    } catch (error) {
      console.error("Error deleting project:", error);
      setCustomMessage("Error deleting project. Please try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Cinzel, sans-serif" }}>
      <Navbar2 />
      <div
        style={{
          fontFamily: "Cinzel, sans-serif",
          margin: "0",
          padding: "0",
          minHeight: "130vh",
          minWidth: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {userData && (
            <h2 style={{ color: "#fff" }}>Ave, {userData.username}!</h2>
          )}

          <Timer
            style={{ fontSize: "3em" }}
            onTimerCompletion={handleTimerCompletion}
          />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleViewProjects}>View Projects</button>
          <button onClick={handleAddProject}>Add Project</button>
          {showTextarea && (
            <div style={{ marginTop: "20px" }}>
              <textarea
                placeholder="Enter project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                style={{ margin: "5px" }}
              />
              <button onClick={saveOrUpdateProject}>Save</button>
            </div>
          )}
          <button>
            <select
              onChange={handleThemeChange}
              style={{ background: "none", border: "none" }}
            >
              <option value="">Select Theme</option>
              <option value="blacksmith">Blacksmith</option>
              <option value="emperor">Emperor</option>
              <option value="gladiator">Gladiator</option>
              <option value="senator">Senator</option>
              <option value="philosopher">Philosopher</option>
            </select>
          </button>
          {isTimerCompleted && <button>Add completed timer</button>}
        </div>

        <div style={{ marginTop: "20px", color: "#fff" }}>
          {!showTextarea && (
            <>
              {customMessage ? (
                <p>{customMessage}</p>
              ) : userData && userData.projects.length > 0 ? (
                <div>
                  <h3>User Projects</h3>
                  <ul>
                    {userData.projects.map((project) => (
                      <li key={project._id}>
                        {project}
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          Delete Element
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No Projects found. Start by adding a project!</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomepageLoggedIn;
