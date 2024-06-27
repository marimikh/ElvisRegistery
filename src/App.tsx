import { useEffect, useState } from 'react'
import './App.css'
import VariableTable from './components/VariableTable'
import ElvisDataService from './services/ElvisDataService'
import { Variable } from './data/Types';
import SearchBar from './components/SearchBar';
import DownloadElement from './components/DownloadElement';
import { Spinner } from 'react-bootstrap';
import Hero from './components/Hero';

// TODO: 
// - Break yup component and transfer layout to LayoutComponent
// - More consistant styling

function App() {

  const [variableData, setVariableData] = useState<Variable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchString, setsearchString] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ElvisDataService.getVariablesList();
        setVariableData(data);
      } catch (error) {
        setError("Failed to fetch variable data.");
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchString: string) => {
    setsearchString(searchString);
  };

  const filteredVariables = variableData.filter((variable) => {
    const normalizedsearchString = searchString.toLowerCase();
    return (
      variable.name.toLowerCase().includes(normalizedsearchString) ||
      variable.category?.name.toLowerCase().includes(normalizedsearchString) ||
      variable.techName.toLowerCase().includes(normalizedsearchString) ||
      (variable.description && variable.description.toLowerCase().includes(normalizedsearchString))
    );
  });

  return (
    <>
      <main>
        <Hero/>

        {error && <div>Error: {error}</div>}

        {isLoading && 
          <div 
            className="d-flex justify-content-center align-items-center"
            style={{ height: '80vh' }} >
              <Spinner animation="border" role="status" variant="primary" style={{ width: '4rem', height: '4rem' }}/>
          </div>
        }
        {!isLoading && ( 
          <>
            <div className="top-row d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <SearchBar onSearch={handleSearch} />        
                {filteredVariables?.length > 0 && (
                  <span className="ml-4">Results: {filteredVariables.length}</span>
                )}          
              </div>
              <div>
                <DownloadElement data={filteredVariables}/>
              </div>
            </div>
            <div className="table-container">
              <VariableTable variables={filteredVariables} isLoading={isLoading} error={error}/>
            </div> 
          </>)
        }
      </main>
    </>
  )
}

export default App
