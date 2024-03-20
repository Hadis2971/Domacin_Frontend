import { createContext, useState } from "react";

import {
  Product,
  ProductsContextProps,
  GetFormatedListOfSelectedProductsReturnType,
} from "./types";

const mockProducts = [
  {
    id: 1,
    shortDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in.`,
    longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in. Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.`,
    title: "Cookies",
    stock: 3,
    price: 17.99,
    images: [
      "https://juliemarieeats.com/wp-content/uploads/2023/01/Bakery-Style-Chocolate-Chip-Cookies-14-scaled.jpg",
      "https://images.freeimages.com/images/large-previews/3cb/the-treasure-1203251.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/83f/paris-1213603.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/03e/oxford-architecture-1233371.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bbb/autumn-in-new-york-5-1360120.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bc4/curious-bird-1-1374322.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/56d/peacock-1169961.jpg?fmt=webp&w=500",
    ],
    categories: [1, 2, 3],
  },
  {
    id: 2,
    shortDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in.`,
    longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in. Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.`,
    title: "Cookies 2",
    stock: 5,
    price: 12.99,
    images: [
      "https://juliemarieeats.com/wp-content/uploads/2023/01/Bakery-Style-Chocolate-Chip-Cookies-14-scaled.jpg",
      "https://images.freeimages.com/images/large-previews/3cb/the-treasure-1203251.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/83f/paris-1213603.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/03e/oxford-architecture-1233371.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bbb/autumn-in-new-york-5-1360120.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bc4/curious-bird-1-1374322.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/56d/peacock-1169961.jpg?fmt=webp&w=500",
    ],
    categories: [1, 2, 3],
  },
  {
    id: 3,
    shortDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in.`,
    longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in. Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.`,
    title: "Cookies 3",
    stock: 32,
    price: 27.99,
    images: [
      "https://juliemarieeats.com/wp-content/uploads/2023/01/Bakery-Style-Chocolate-Chip-Cookies-14-scaled.jpg",
      "https://images.freeimages.com/images/large-previews/3cb/the-treasure-1203251.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/83f/paris-1213603.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/03e/oxford-architecture-1233371.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bbb/autumn-in-new-york-5-1360120.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bc4/curious-bird-1-1374322.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/56d/peacock-1169961.jpg?fmt=webp&w=500",
    ],
    categories: [1, 2, 3],
  },
  {
    id: 4,
    shortDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in.`,
    longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in. Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.`,
    title: "Cookies 4",
    stock: 13,
    price: 7.99,
    images: [
      "https://juliemarieeats.com/wp-content/uploads/2023/01/Bakery-Style-Chocolate-Chip-Cookies-14-scaled.jpg",
      "https://images.freeimages.com/images/large-previews/3cb/the-treasure-1203251.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/83f/paris-1213603.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/03e/oxford-architecture-1233371.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bbb/autumn-in-new-york-5-1360120.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bc4/curious-bird-1-1374322.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/56d/peacock-1169961.jpg?fmt=webp&w=500",
    ],
    categories: [1, 2, 3],
  },
  {
    id: 5,
    shortDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in.`,
    longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempor
      urna risus, a placerat mauris venenatis non. Pellentesque dapibus,
      massa vitae semper tincidunt, felis libero eleifend diam, ac rutrum
      tellus enim eget mi. Aenean cursus efficitur eros, quis vestibulum
      ligula suscipit in. Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.Nam laoreet odio mi, nec porta mauris rhoncus eu.
      Proin eget iaculis leo. Nulla mi ligula, vulputate vitae gravida nec,
      placerat sed lorem. Pellentesque cursus ornare nisl, in suscipit mi
      faucibus eu. Duis lacinia nunc ac est placerat, eu posuere sapien
      bibendum. Curabitur rutrum odio et ante pretium lacinia. Suspendisse
      risus ante, ultrices eu ex eu, mattis rutrum leo. Vestibulum rhoncus
      semper est a mattis. Duis eleifend sollicitudin ex, ac euismod est.`,
    title: "Cookies 5",
    stock: 1,
    price: 1.99,
    images: [
      "https://juliemarieeats.com/wp-content/uploads/2023/01/Bakery-Style-Chocolate-Chip-Cookies-14-scaled.jpg",
      "https://images.freeimages.com/images/large-previews/3cb/the-treasure-1203251.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/83f/paris-1213603.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/03e/oxford-architecture-1233371.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bbb/autumn-in-new-york-5-1360120.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/bc4/curious-bird-1-1374322.jpg?fmt=webp&w=500",
      "https://images.freeimages.com/images/large-previews/56d/peacock-1169961.jpg?fmt=webp&w=500",
    ],
    categories: [1, 2, 3],
  },
];

export const ProductsContext = createContext<{
  listOfProducts: Product[];
  //selectedProducts: Record<number, number>;
  selectedProducts: Map<Product | undefined, number>;
  handleSelectProduct: (id: number) => void;
  handleDeselectProduct: (id: number) => void;
  getFormatedListOfSelectedProducts: () => GetFormatedListOfSelectedProductsReturnType[];
} | null>(null);

export default ({ children }: ProductsContextProps) => {
  const [listOfProducts, setListOfProducts] = useState(mockProducts);

  const [selectedProducts, setSelectedProducts] = useState<
    Map<Product | undefined, number>
  >(new Map<Product | undefined, number>());

  const handleSelectProduct = (id: number) => {
    const selectedProductsCopy = new Map(selectedProducts);
    const product = listOfProducts.find((product) => product.id === id);

    console.log(selectedProductsCopy);
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
    const product = listOfProducts.find((product) => product.id === id);

    if (!product) return;

    const productCount = selectedProductsCopy.get(product);

    if (productCount && productCount <= 1) selectedProductsCopy.delete(product);
    else {
      const count = selectedProductsCopy.get(product) || 0;
      selectedProductsCopy.set(product, count - 1);
    }

    setSelectedProducts(selectedProductsCopy);
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
          name: product.title,
          quantity: count,
        });

        nextValue = iterator.next().value;
      }

      return formatedList;
    };

  const value = {
    listOfProducts,
    selectedProducts,
    handleSelectProduct,
    handleDeselectProduct,
    getFormatedListOfSelectedProducts,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
