import React from "react";
import { Redirect, Route } from "react-router";
import { useProfile } from "../context/profile.context";
import { Container, Loader } from "rsuite";

const Publicroute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfile();

  if (!profile && isLoading) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }
  if (profile && !isLoading) {
    return <Redirect to="/" />;
  }
  return <Route {...routeProps}>{children}</Route>;
};

export default Publicroute;
