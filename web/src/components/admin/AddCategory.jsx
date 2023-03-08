import React, { useState } from "react";

function AddCategory() {
  const [category, setCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Category:", category);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category:
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </label>
      <button type="submit">Add Category</button>
    </form>
  );
}

export default AddCategory;
