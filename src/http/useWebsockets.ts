import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { Product } from "../state/Products/types";

type ParsedData = {
  id: number;
  productName: string;
  initialStock: number;
  currentStock: number;
};

export default async () => {
  const queryClient = useQueryClient();
  const oldData = (await queryClient.getQueryData(["products"])) as Product[];
  const socket = new WebSocket("ws://localhost:8080");

  socket.addEventListener("open", () => {
    console.log("WS Connected!!!");
  });

  socket.addEventListener("message", ({ data }) => {
    const parsedDate: ParsedData[] = JSON.parse(data);

    const infoMsg = parsedDate.reduce((acc, curr) => {
      return (
        acc +
        `Prodizvod ${curr.productName} Prosla raspolozivost: ${curr.initialStock} Trenutna raspolozivost: ${curr.currentStock} \n`
      );
    }, "");

    const newData = oldData?.map((product: Product) => {
      const foundProduct = parsedDate.find((d) => d.id === product.id);

      if (foundProduct) return { ...product, stock: foundProduct.currentStock };

      return product;
    });

    queryClient.setQueryData(["products"], newData);
    toast.info(infoMsg);
  });
};
