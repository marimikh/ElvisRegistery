import { Container, Row, Col } from "react-bootstrap";

function Hero() {
  return (
    <div className="bg-light py-5 px-5 my-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1>MetaELVIS Data Explorer</h1>
            <p className="lead">
              Browse and explore the Cancer Registry's metadata documentation with ease. Discover details about data variables, allowed value sets, and more.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Hero;