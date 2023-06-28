import React from "react";
import { Redirect, Route } from "react-router";
import { useProfile } from "../context/profile.context";

const Privateroute = ({ children, ...routeProps }) => {
  const profile = useProfile();

  if (!profile) {
    return <Redirect to="/signin " />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default Privateroute;
