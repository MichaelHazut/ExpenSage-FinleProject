import React from 'react';
import { Navbar, Nav, Card, Button } from 'react-bootstrap';

export function HomePage() {
    return (
        <div>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">My Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Welcome to My Website</Card.Title>
              <Card.Text>
                This is a simple card component for showcasing featured content or
                information.
              </Card.Text>
              <Button variant="primary">Learn more</Button>
            </Card.Body>
          </Card>
        </div>
      );
}