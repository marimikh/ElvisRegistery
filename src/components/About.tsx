import { Container, Row, Col } from "react-bootstrap"; // Using Bootstrap for layout

function About() {
  return (
      <Container className="mt-5">
        <h2>MetaELVIS  Data Explorer README</h2>

        <p>
          This application provides a user-friendly interface for browsing, searching,
          and exporting metadata from the Cancer Registry's ELVIS documentation system.
        </p>

        <h3>Features</h3>
        <ul>
          <li>View metadata details for each variable, including name, description, category, technical name and data type.</li>
          <li>Search for variables by name, category, technical name  or description.</li>
          <li>Sort the table by any column (ascending or descending).</li>
          <li>Choose the number of rows to display per page (25, 50, or 100).</li>
          <li>Export the filtered or complete metadata in Excel or JSON format.</li>
        </ul>

        <h3>How to Use</h3>
        <ol>
          <li>Use the search bar to find specific variables.</li>
          <li>Click on the column headers to sort the table.</li>
          <li>Use the pagination controls to navigate through the results.</li>
          <li>Select the desired number of rows per page from the dropdown.</li>
          <li>Click the "Download" button to export the data.</li>
        </ol>

        <h3>Running and Installation</h3>
        <p>
          This project was built using Vite and npm as the package manager. To run and install the project, follow these steps:
        </p>
        <ol>
          <li>Clone the repository to your local machine.</li>
          <li>Navigate to the project directory in your terminal.</li>
          <li>Run `npm install` to install the required dependencies.</li>
          <li>Run `npm run dev` to start the development server.</li>
          <li>Open your browser and visit `http://localhost:5173`.</li>
        </ol>

        
        <Row>
          <Col md={6}>
            <h3>Technology Stack</h3>
            <ul>
              <li>React</li>
              <li>TypeScript</li>
              <li>npm</li>
              <li>Vite</li>
              <li>React Bootstrap</li>
              <li>Bootstrap</li>
              <li>React Router</li>
              <li>FileSaver.js</li>
              <li>xlsx</li>
            </ul>
          </Col>
        </Row>
      </Container>
  );
}

export default About;
