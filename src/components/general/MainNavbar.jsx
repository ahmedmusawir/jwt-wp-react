import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function MainNavbar({ userName }) {
  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React JWT Demo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!userName && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {userName && (
              <>
                <Nav.Link as={Link} to="/profile">
                  User Home
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Log Out
                </Nav.Link>
                <span className=" alert-primary badge-pill ml-5 pt-2">
                  Logged in as:{' '}
                  <span className="font-weight-bold">{userName}</span>
                </span>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

MainNavbar.propTypes = {};

export default MainNavbar;
