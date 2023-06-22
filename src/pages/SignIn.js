import React from "react";
import { Button, Col, Container, Grid, Icon, Row } from "rsuite";

const SignIn = () => {
  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <div className="text-center">
              <h1>Welcome to Chat</h1>
              <p>Progessive chat platform For Everyone</p>
            </div>
            <div className="mt-3">
              <Button block color="blue">
                <Icon icon="facebook"> Continue with Facebook</Icon>
              </Button>

              <Button block color="green">
                <Icon icon="google"> Continue with Google</Icon>
              </Button>
            </div>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
