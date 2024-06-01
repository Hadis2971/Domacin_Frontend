import { createContext, useEffect, useState } from "react";

import { useGetProducts } from "../../http/useProducts";

import {
  Product,
  ProductsContextProps,
  GetFormatedListOfSelectedProductsReturnType,
  ProductAttributeVariation,
  SelectedProduct,
} from "./types";

export const ProductsCategoryContext = createContext<{
  listOfProducts: Product[];
  selectedProducts: Map<SelectedProduct | undefined, number>;
  displayCheckoutModal: boolean;
  selectedProductAttributeVaration: ProductAttributeVariation | null;
  handleToggleDisplayCheckoutModal: () => void;
  handleSelectProduct: (selectedProduct: SelectedProduct) => void;
  handleDeselectProduct: (selectedProduct: SelectedProduct) => void;
  handleDeselectAllProducts: () => void;
  handleSetSelectedProductQuantity: (
    id: number,
    quantity: number | undefined,
    variationID?: number
  ) => void;
  getFormatedListOfSelectedProducts: () => GetFormatedListOfSelectedProductsReturnType[];
} | null>(null);

export default ({ children }: ProductsContextProps) => {
  const { data } = useGetProducts();

  const [listOfProducts, setListOfProducts] = useState(data);
  const [displayCheckoutModal, setDisplayCheckoutModal] = useState(false);
  const [
    selectedProductAttributeVaration,
    setSelectedProductAttributeVaration,
  ] = useState<ProductAttributeVariation | null>(null);

  useEffect(() => {
    setListOfProducts(data);
  }, [data]);

  const [selectedProducts, setSelectedProducts] = useState<
    Map<SelectedProduct | undefined, number>
  >(new Map<SelectedProduct | undefined, number>());

  const handleToggleDisplayCheckoutModal = () => {
    setDisplayCheckoutModal((displayCheckoutModal) => !displayCheckoutModal);
  };

  const handleSelectProduct = (selectedProduct: SelectedProduct) => {
    const selectedProductsCopy = new Map(selectedProducts);
    const { id, productID, variationID } = selectedProduct;

    //console.log("handleSelectProduct", selectedProduct);

    if (!selectedProduct) return;

    const product = listOfProducts.find(
      (product: Product) => product.id === (productID || id)
    );
    const variation = variationID
      ? product.attribute.variations.find(
          (variation: ProductAttributeVariation) => variation.id === variationID
        )
      : null;

    const productCount = variation
      ? selectedProductsCopy.get(variation)
      : selectedProductsCopy.get(product);

    const productStock = selectedProduct.stock;

    if (productCount && productStock <= productCount) return;
    const productToSet = variation ? variation : product;

    //console.log("productToSetproductToSetproductToSet", productToSet);

    if (!productCount)
      variation
        ? selectedProductsCopy.set(productToSet, 1)
        : selectedProductsCopy.set(productToSet, 1);
    else {
      const count = selectedProductsCopy.get(productToSet) || 0;
      selectedProductsCopy.set(productToSet, count + 1);
    }

    setSelectedProducts(selectedProductsCopy);
  };

  const handleDeselectProduct = (selectedProduct: SelectedProduct) => {
    const selectedProductsCopy = new Map(selectedProducts);
    const { id, variationID } = selectedProduct;

    //console.log("handleDeselectProduct", selectedProduct);

    if (!selectedProduct) return;

    const product = !variationID
      ? listOfProducts.find((product: Product) => product.id === id)
      : listOfProducts.find((product: Product) => {
          return product.attribute?.variations?.find(
            (variation) => variation.variationID === variationID
          );
        });

    const variation = variationID
      ? product.attribute?.variations?.find(
          (variation: ProductAttributeVariation) => variation.id === variationID
        )
      : null;

    // console.log(
    //   "variationvariationvariationvariationvariationvariationvariationvariationvariation",
    //   variation
    // );

    const productCount = variation
      ? selectedProductsCopy.get(variation)
      : selectedProductsCopy.get(product);

    const productToSet = variation ? variation : product;

    if (productCount && productCount <= 1)
      selectedProductsCopy.delete(productToSet);
    else {
      const count = selectedProductsCopy.get(productToSet) || 0;
      selectedProductsCopy.set(productToSet, count - 1);
    }

    setSelectedProducts(selectedProductsCopy);
  };

  const handleDeselectAllProducts = () => {
    setSelectedProducts(new Map<SelectedProduct | undefined, number>());
  };

  const handleSetSelectedProductQuantity = (
    id: number,
    variationID?: number,
    quanity: number | undefined = 0
  ) => {
    if (!id && !variationID) return;

    const selectedProductsCopy = new Map(selectedProducts);
    const product = listOfProducts.find(
      (product: Product) => product.id === id
    );
    const variation = variationID
      ? product.attribute.variations.find(
          (variation: ProductAttributeVariation) => variation.id === variationID
        )
      : null;

    if (!product && !variation) return;

    const productToSet = variation ? variation : product;

    // console.log(
    //   "handleSetSelectedProductQuantityhandleSetSelectedProductQuantity productToSet",
    //   productToSet
    // );

    const productCount = selectedProductsCopy.get(productToSet);
    const productStock = variation ? variation.stock : product.stock;

    if (productStock >= quanity || !quanity || !productCount) {
      selectedProductsCopy.set(productToSet, quanity);
      setSelectedProducts(selectedProductsCopy);
    } else {
      return;
    }
  };

  const getFormatedListOfSelectedProducts =
    (): GetFormatedListOfSelectedProductsReturnType[] => {
      const formatedList: GetFormatedListOfSelectedProductsReturnType[] = [];

      const iterator = selectedProducts.entries();
      let nextValue = iterator.next().value;

      while (nextValue) {
        const [product, count] = nextValue;

        formatedList.push({
          id: product.id,
          name: product.name,
          quantity: count,
          price: product.price,
          stock: product.stock,
          attribute:
            typeof product.attribute === "number"
              ? product.attribute
              : product.attribute?.type,
          variationID: product.variationID,
        });

        nextValue = iterator.next().value;
      }

      // console.log(
      //   "formatedListformatedListformatedListformatedListformatedList",
      //   formatedList
      // );

      return formatedList;
    };

  const value = {
    listOfProducts,
    selectedProducts,
    displayCheckoutModal,
    selectedProductAttributeVaration,
    setSelectedProductAttributeVaration,
    handleSelectProduct,
    handleDeselectProduct,
    handleDeselectAllProducts,
    handleSetSelectedProductQuantity,
    getFormatedListOfSelectedProducts,
    handleToggleDisplayCheckoutModal,
  };

  return (
    <ProductsCategoryContext.Provider value={value}>
      {children}
    </ProductsCategoryContext.Provider>
  );
};
