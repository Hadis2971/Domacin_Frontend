import ProductCategoryList from "../../components/ProductCategoryList/ProductCategoryList";
import ProductsCategoryContext from "../../state/ProductsCategory";

import "./ShopCategory.scss";

export default function () {
  return (
    <ProductsCategoryContext>
      <ProductCategoryList />
    </ProductsCategoryContext>
  );
}
