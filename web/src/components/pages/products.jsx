import React, { useContext } from "react";

import { GlobalStateContext } from "../../contexts/GlobalStateProvider";
import Card from "../common/Card";
import Grid from "../common/Grid";
import { CustomerPageLayout } from "../customer/CustomerPageLayout";

const Products = () => {
  const { products, loading } = useContext(GlobalStateContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CustomerPageLayout>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Grid>
            {products.map((product) => (
              <Card
                key={product.id}
                image={product.image}
                name={product.title}
                description={product.description}
                price={product.price}
                addToCart
              />
            ))}
          </Grid>
        )}
      </CustomerPageLayout>
    </>
  );
};

export default Products;
