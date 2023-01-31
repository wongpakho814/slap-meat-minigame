import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import MobileComments from "../components/MobileComments";
import MobileCommentForm from "../components/MobileCommentForm";

import Auth from "../utils/auth";
import useWindowSize from "../utils/useWindowSize";

const AppNavbar = (props) => {
  // set modal display state
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const size = useWindowSize();

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Pet the Cheems
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/leaderboard">
                Leaderboard
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowLoginModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
              {size.width < 768 && (
                <Nav.Link onClick={() => setShowCommentModal(true)}>
                  Comments
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* set login modal data up */}
      <Modal
        size="lg"
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link eventKey="login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowLoginModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowLoginModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>

      {/* set comment modal data up */}
      <Modal
        size="lg"
        show={showCommentModal}
        onHide={() => setShowCommentModal(false)}
        aria-labelledby="-modal"
      >
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey="comment">
          <Modal.Header closeButton>
            <Modal.Title id="comment-modal">Comment Section</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="comment">
                <MobileComments comments={props.comments} />
                <MobileCommentForm />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
