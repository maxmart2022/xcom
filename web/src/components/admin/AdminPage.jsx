import Categories from "./Categories";

const Admin = () => {
  const categories = ["Electronics", "Clothes", "Food"];

  return (
    <div>
      <Categories categories={categories} />
    </div>
  );
};

export default Admin;
