import React from "react";
import { Col, Container, Grid, Row } from "rsuite";
import Sidebar from "../Components/Sidebar";

const Home = () => {
  return (
    <Container>
      <Grid>
        <Row>
          <Col xs={24} md={8}>
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Home;
