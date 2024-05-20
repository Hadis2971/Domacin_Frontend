import { useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import Product from "../Product/Product";
import { ProductsCategoryContext } from "../../state/ProductsCategory";
import { useGetProductsBasedOnCategory } from "../../http/useProducts";

import "./ProductCategoryList.scss";

export default function () {
  const value = useContext(ProductsCategoryContext);
  const { isLoading } = useGetProductsBasedOnCategory();

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
        <div id="ProductCategoryList">
          {value?.listOfProducts?.map((product) => (
            <Product {...product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
}
