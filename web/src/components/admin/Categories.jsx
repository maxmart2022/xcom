import React, { useState } from "react";
import CategoryActions from "./CategoryActions";

const Categories = (props) => {
  const { categories, setCategories } = props;
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    setCategories([...categories, newCategory]);
    setNewCategory("");
  };

  const handleEditCategory = (category) => {
    setCategoryToEdit(category);
  };

  const handleSaveEdit = (index) => {
    const newCategories = [...categories];
    newCategories[index] = categoryToEdit;
    setCategories(newCategories);
    setCategoryToEdit(null);
  };

  const handleDeleteCategory = (index) => {
    const newCategories = [...categories];
    newCategories.splice(index, 1);
    setCategories(newCategories);
  };

  return (
    <div>
      <h2>Category Actions</h2>
      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <div>
        {categories.map((category, index) => (
          <div key={index}>
            {category}
            <button onClick={() => handleEditCategory(category)}>Edit</button>
            {categoryToEdit === category && (
              <>
                <input
                  type="text"
                  value={categoryToEdit}
                  onChange={(e) => setCategoryToEdit(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(index)}>Save</button>
              </>
            )}
            <button onClick={() => handleDeleteCategory(index)}>Delete</button>

            <CategoryActions />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Categories;
