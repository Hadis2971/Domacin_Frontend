import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

import { Product } from "../state/Products/types";

type ParsedData = {
  id: number;
  variationID?: number;
  productName: string;
  initialStock: number;
  currentStock: number;
};

export default () => {
  const queryClient = useQueryClient();
  let socket: WebSocket | null = null;

  return {
    getSocketReadyState: () => {
      console.log(
        "socket instanceof WebSocketsocket instanceof WebSocket",
        socket instanceof WebSocket,
        socket?.readyState
      );

      if (socket instanceof WebSocket)
        return socket.readyState === WebSocket.OPEN;
      else return false;
    },

    connectWebsockets: () => {
      console.log(
        "connectWebsocketsconnectWebsocketsconnectWebsocketsconnectWebsocketsconnectWebsocketsconnectWebsocketsconnectWebsocketsconnectWebsocketsconnectWebsockets"
      );

      socket = new WebSocket("ws://localhost:8080");

      socket.addEventListener("connection", () => {
        console.log("WS CONNECTION!!!");
      });

      socket.addEventListener("open", () => {
        console.log("WS Connected!!!");
      });

      socket.addEventListener("message", ({ data }) => {
        const oldData = queryClient.getQueryData(["products"]) as Product[];
        const parsedDate: ParsedData[] = JSON.parse(data);

        console.log(
          "oldDataoldDataoldDataoldDataoldDataoldDataoldData",
          oldData
        );

        console.log("parsedDateparsedDateparsedDate", parsedDate);

        console.log(
          "WS MESSAGE WS MESSAGE WS MESSAGE WS MESSAGE WS MESSAGE WS MESSAGE WS MESSAGE WS MESSAGE WS MESSAGE "
        );

        const infoMsg = parsedDate.reduce((acc, curr) => {
          return (
            acc +
            `Prodizvod ${curr.productName} Prosla raspolozivost: ${curr.initialStock} Trenutna raspolozivost: ${curr.currentStock} \n`
          );
        }, "");

        const newData = oldData?.map((product: Product) => {
          const foundProduct = parsedDate.find((d) => d.id === product.id);

          if (foundProduct) {
            if (!foundProduct.variationID)
              return { ...product, stock: foundProduct.currentStock };
            else {
              const variations = product.attribute.variations?.map((v) => {
                if (v.id === foundProduct.variationID)
                  return {
                    ...v,
                    stock: foundProduct.currentStock,
                  };
                else return v;
              });

              return {
                ...product,
                attribute: { ...product.attribute, variations },
              };
            }
          }

          return product;
        });

        console.log("newDatanewDatanewDatanewDatanewDatanewData", newData);

        queryClient.setQueryData(["products"], newData);
        toast.info(infoMsg);
      });
    },

    disconnectWebsockets: () => {
      socket?.close();
    },
  };
};
