import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles.css"; // Ensure styles are applied

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="highlight-gold">Marvel API</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="highlight-blue">Home</Nav.Link>
            <Nav.Link as={Link} to="/characters" className="highlight-blue">Characters</Nav.Link>
            <Nav.Link as={Link} to="/add-character" className="highlight-blue">Add Character</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
