import React from "react";

const Projects = ({ projects }) => {
  return (
    <div>
      <h2>Your Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <strong>{project.name}</strong> - {project.description}
            {/* Display other project details as needed */}
          </li>
        ))}
      </ul>
      {/* Add styling or additional functionality as needed */}
    </div>
  );
};

export default Projects;
