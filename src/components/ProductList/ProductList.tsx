import { useContext } from "react";

import Product from "../Product/Product";
import { ProductsContext } from "../../state/Products";

import "./ProductList.scss";

export default function () {
  const value = useContext(ProductsContext);

  return (
    <div id="ProductList">
      {value?.listOfProducts.map((product) => (
        <Product {...product} />
      ))}
    </div>
  );
}
