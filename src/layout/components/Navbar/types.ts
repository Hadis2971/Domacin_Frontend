import {
  GetFormatedListOfSelectedProductsReturnType,
  SelectedProduct,
} from "../../../state/Products/types";

export type NavbarOffcanvasProps = {
  show: boolean;
  getFormatedListOfSelectedProducts?: () => GetFormatedListOfSelectedProductsReturnType[];
  handleSelectProduct?: (selectedProduct: SelectedProduct) => void;
  handleDeselectProduct?: (selectedProduct: SelectedProduct) => void;
  handleClose: () => void;
};
