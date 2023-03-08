import { useState } from "react";
import DropdownActions from "../common/DropdownActions.jsx";
// import DropdownActions from "../common/";

const CategoryActions = () => {
  const items = ["item1", "item2", "item3"];
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <DropdownActions
        items={items}
        selectedItem={selectedItem}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default CategoryActions;
