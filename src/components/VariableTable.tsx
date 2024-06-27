import React, { useState } from 'react';
import EntryDetailsCard from './EntryDetailsCard';
import { Variable } from '../data/Types';
import { Pagination } from 'react-bootstrap';
import { objectSort } from '../helpers/Helpers';
import TableHeader from './TableHeader';

// TODO: 
// - Clean up in code
// - Fix Pagination
// - Show data unsorted as well

interface VariableListProps {
  variables: Variable[];
  isLoading?: boolean; 
  error?: string | null;
}

function VariableTable({variables, isLoading = false, error = null }: VariableListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({});
  const [sortBy, setSortBy] = useState<string>(''); 
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' >('asc');

  const sortedVariables = [...variables].sort((a, b) => {
    return objectSort(a, b, sortBy, sortOrder);
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = sortedVariables.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(variables.length / rowsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  }

  const toggleRow = (id: number) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (isLoading) {
    return <div className="container">Loading data...</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">Error: {error}</div>
      </div>
    );
  }

  if (variables?.length === 0) {
    return (
      <div className="container">
        <div className="alert alert-info" role="alert">No variables found.</div>
      </div>
    );
  }


  return (
    <div className="container">

{currentItems?.length > 0 && (
        <div>
          <div className="rows-container">
            <label>Rows per page:</label>
            <select id="rows-selector" value={rowsPerPage} onChange={handleRowsPerPageChange}>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="variable-table">
            <table className="table table-striped table-hover">
              <thead>
                  <th></th>
                      <TableHeader
                        label="Name"
                        id="name"
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onClick={() => handleSort("name")}
                      />
                      <TableHeader
                        label="Category"
                        id="category.name"
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onClick={() => handleSort("category.name")}
                      />
                       <TableHeader
                        label="Description"
                        id="description"
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onClick={() => handleSort("description")}
                      />
                      <TableHeader
                        label="Technical name"
                        id="techName"
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        onClick={() => handleSort("techName")}
                      />
                  <th>Details</th>
              </thead>
              <tbody>
                {currentItems.map((variable, index) => (
                  <React.Fragment key={variable.id}>
                      <tr>
                  <td>{variable.id}</td>
                  <td>{variable.name} ({variable.nameEn})</td>
                  <td>{variable.category.name} ({variable.category.nameEn})</td>
                  <td>{variable.description}</td>
                  <td>{variable.techName}</td>
                  <td>
                    <button onClick={() => toggleRow(variable.id)} className="btn btn-link">
                      {expandedRows[variable.id] ? 'Hide' : 'Show'}
                    </button>
                  </td>
                </tr>
                {expandedRows[variable.id] && (
                  <tr>
                    <td colSpan={6}>
                      <EntryDetailsCard variable={variable} />
                    </td>
                  </tr>
                )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            
            {currentPage > 3 && <Pagination.Ellipsis />}
            
            {[...Array(Math.min(totalPages, 5)).keys()]
              .map(pageNumber => pageNumber + Math.max(currentPage - 2, 0))
              .map((pageNumber) => (
                <Pagination.Item
                  key={pageNumber + 1}
                  active={pageNumber + 1 === currentPage}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </Pagination.Item>
              ))}

            {currentPage < totalPages - 2 && <Pagination.Ellipsis />}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default VariableTable;
