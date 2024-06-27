import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="py-4">
      <Container>
        <Row>
           <Col md={4}>
            <h5>Kontaktinformasjon</h5>
            <p>
              Telefon sentralbord<br />
              02 05 03 00<br />
              Man-fre. kl. 09.00-14.30
            </p>
          </Col>
          <Col md={4}>
            <h5>Les Mer</h5>
            <ul className="list-unstyled">
              <li><a href="#">Informasjon om MetaELVIS</a></li>
              <li><a href="#">Ansatte</a></li>
              <li><a href="#">Ledige stillinger</a></li>
              <li><a href="#">Kontakt</a></li>
              <li><a href="#">Presse</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
