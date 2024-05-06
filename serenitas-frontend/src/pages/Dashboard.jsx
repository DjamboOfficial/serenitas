import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";

export const Dashboard = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <div>Ariciao!</div>
      ) : (
        <div>Please log in to access the dashboard.</div>
      )}
    </>
  );
};
