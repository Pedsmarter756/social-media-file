import React from "react";
import { Redirect, Route } from "react-router";
import { useProfile } from "../context/profile.context";

const Publicroute = ({ children, ...routeProps }) => {
  const profile = useProfile();
  if (profile) {
    return <Redirect to="/" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default Publicroute;
