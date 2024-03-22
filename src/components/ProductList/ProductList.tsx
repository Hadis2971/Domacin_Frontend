import { useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import Product from "../Product/Product";
import { ProductsContext } from "../../state/Products";
import { useGetProducts } from "../../http/useProducts";

import "./ProductList.scss";

export default function () {
  const value = useContext(ProductsContext);
  const { isLoading } = useGetProducts();

  return (
    <>
      {isLoading ? (
        <div className="product-list-loading-container">
          <ClipLoader
            color={"#e91e63"}
            loading={isLoading}
            size={250}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h2>Ucitavam...</h2>
        </div>
      ) : (
        <div id="ProductList">
          {value?.listOfProducts?.map((product) => (
            <Product {...product} />
          ))}
        </div>
      )}
    </>
  );
}
