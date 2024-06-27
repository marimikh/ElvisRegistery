import React, { useState } from "react";

// TODO: 

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        className="form-control"
        placeholder="Search variables by name, category, or description..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
