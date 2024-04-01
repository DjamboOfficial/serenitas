import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { fetchProjects } from "../utils/projectAPI";

export const Dashboard = () => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {}, []);

  return <></>;
};
