import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles.css";

function NavigationBar() {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="highlight-gold">ChrisR</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "highlight-gold" : "highlight-blue"}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/characters"
              className={location.pathname === "/characters" ? "highlight-gold" : "highlight-blue"}
            >
              Characters
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/add-character"
              className={location.pathname === "/add-character" ? "highlight-gold" : "highlight-blue"}
            >
              Add Character
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
