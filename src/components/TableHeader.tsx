interface TableHeaderProps {
    label: string;
    sortBy: string;
    id: string;
    sortOrder: "asc" | "desc";
    onClick: () => void;
  }
  
function TableHeader({ label, sortBy, id, sortOrder, onClick }: TableHeaderProps) {

    const isSorted = sortBy === id;
  
    return (
      <th>
        {label}{" "}
        {!isSorted && <button className="sort-button" onClick={onClick}>
            <img
              src={ "src/assets/unsorted.png" }
              alt={'Unsorted'}
            />
          </button>}
        {isSorted && (
          <button className="sort-button" onClick={onClick}>
            <img
              src={
                sortOrder === "asc" ? "src/assets/arrow_up.png" : "src/assets/arrow_down.png"
              }
              alt={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            />
          </button>
        )}
      </th>
    );
  }

  export default TableHeader;
