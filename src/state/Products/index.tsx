import { createContext, useEffect, useState } from "react";

import { useGetProducts } from "../../http/useProducts";

import {
  Product,
  ProductsContextProps,
  GetFormatedListOfSelectedProductsReturnType,
} from "./types";

export const ProductsContext = createContext<{
  listOfProducts: Product[];
  selectedProducts: Map<Product | undefined, number>;
  displayCheckoutModal: boolean;
  handleToggleDisplayCheckoutModal: () => void;
  handleSelectProduct: (id: number) => void;
  handleDeselectProduct: (id: number) => void;
  handleDeselectAllProducts: () => void;
  handleSetSelectedProductQuantity: (
    id: number,
    quantity: number | undefined
  ) => void;
  getFormatedListOfSelectedProducts: () => GetFormatedListOfSelectedProductsReturnType[];
} | null>(null);

export default ({ children }: ProductsContextProps) => {
  const { data } = useGetProducts();

  const [listOfProducts, setListOfProducts] = useState(data);
  const [displayCheckoutModal, setDisplayCheckoutModal] = useState(false);

  useEffect(() => {
    setListOfProducts(data);
  }, [data]);

  const [selectedProducts, setSelectedProducts] = useState<
    Map<Product | undefined, number>
  >(new Map<Product | undefined, number>());

  const handleToggleDisplayCheckoutModal = () => {
    setDisplayCheckoutModal((displayCheckoutModal) => !displayCheckoutModal);
  };

  const handleSelectProduct = (id: number) => {
    const selectedProductsCopy = new Map(selectedProducts);
    const product = listOfProducts?.find(
      (product: { id: number }) => product.id === id
    );

    if (!product) return;

    const productCount = selectedProductsCopy.get(product);

    if (product && productCount && product.stock! <= productCount) return;

    if (!productCount) selectedProductsCopy.set(product, 1);
    else {
      const count = selectedProductsCopy.get(product) || 0;
      selectedProductsCopy.set(product, count + 1);
    }

    setSelectedProducts(selectedProductsCopy);
  };

  const handleDeselectProduct = (id: number) => {
    const selectedProductsCopy = new Map(selectedProducts);
    const product = listOfProducts?.find(
      (product: { id: number }) => product.id === id
    );

    if (!product) return;

    const productCount = selectedProductsCopy.get(product);

    if (productCount && productCount <= 1) selectedProductsCopy.delete(product);
    else {
      const count = selectedProductsCopy.get(product) || 0;
      selectedProductsCopy.set(product, count - 1);
    }

    setSelectedProducts(selectedProductsCopy);
  };

  const handleDeselectAllProducts = () => {
    setSelectedProducts(new Map<Product | undefined, number>());
  };

  const handleSetSelectedProductQuantity = (
    id: number,
    quanity: number | undefined = 0
  ) => {
    if (!id) return;

    const selectedProductsCopy = new Map(selectedProducts);
    const product = listOfProducts?.find(
      (product: { id: number }) => product.id === id
    );

    if (!product) return;

    const productCount = selectedProductsCopy.get(product);

    if (
      (product.stock && product.stock >= quanity) ||
      !quanity ||
      !productCount
    ) {
      selectedProductsCopy.set(product, quanity);
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
        });

        nextValue = iterator.next().value;
      }

      return formatedList;
    };

  const value = {
    listOfProducts,
    selectedProducts,
    displayCheckoutModal,
    handleSelectProduct,
    handleDeselectProduct,
    handleDeselectAllProducts,
    handleSetSelectedProductQuantity,
    getFormatedListOfSelectedProducts,
    handleToggleDisplayCheckoutModal,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
