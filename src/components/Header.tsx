import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

// TODO: 
// - Improve styling

function Header() {
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="navbar-custom">
      <Container>
        <Navbar>
          <Link to="/">          
            <img src="src/assets/logo_1.png" alt="Logo" className="logo float-start img-fluid" id="logo"/>
          </Link>
        </Navbar>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="https://metadata.kreftregisteret.no/variables/search?selection=cancer_sites" target="_blank" className="nav-link">
              ELVIS
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
