import React from "react";
import { Col, Grid, Row } from "rsuite";
import Sidebar from "../../Components/Sidebar";
import { RoomsProvider } from "../../context/rooms.context";
import { Route, Switch, useRouteMatch } from "react-router";
import Chats from "./Chats";
import { useMediaQuery } from "../../misc/custom-hooks";

const Home = () => {
  const isDesktop = useMediaQuery("(min-width:992px)");
  const { isExact } = useRouteMatch();
  const canRenderSidebar = isDesktop || isExact;

  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}
          <Switch>
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chats />
              </Col>
            </Route>
            <Route>
              {isDesktop && (
                <Col xs={24} md={16} className="h-100">
                  <h5 className="text-center mt-page">Please Select Chat</h5>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
