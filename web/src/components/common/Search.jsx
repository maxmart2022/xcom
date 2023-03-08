import React, { useState } from "react";
import { MyButton, MyInput } from "./ReusableComponents";
import Styles from "./GeneralStyle";

function Search() {
  // state for the search query
  const [query, setQuery] = useState("");

  // function to handle search input
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // function to handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // perform search with query
    console.log(`Searching for ${query}...`);
  };

  return (
    <form onSubmit={handleSubmit} style={Styles.searchContainer}>
      <MyInput
        placeholder="Search for Products..."
        value={query}
        onChange={handleSearch}
        type="text"
        style={Styles.searchInput}
      />
      <MyButton onClick={() => console.log("Button clicked")}>Search</MyButton>
    </form>
  );
}

export default Search;
