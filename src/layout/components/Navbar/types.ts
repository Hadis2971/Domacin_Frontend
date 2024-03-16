import { GetFormatedListOfSelectedProductsReturnType } from "../../../state/Products/types";

export type NavbarOffcanvasProps = {
  show: boolean;
  getFormatedListOfSelectedProducts?: () => GetFormatedListOfSelectedProductsReturnType[];
  handleSelectProduct?: (productId: number) => void;
  handleDeselectProduct?: (productId: number) => void;
  handleClose: () => void;
};
