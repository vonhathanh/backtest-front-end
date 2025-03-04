import useWebSocket from "react-use-websocket";
import config from "../config";

export default function useWebsockethandler(params, onMessage) {
  const { sendJsonMessage } = useWebSocket(config.websocketUrl, {
    onOpen: () => {
      sendJsonMessage({
        type: "backtest",
        params: params,
      });
    },
    onMessage: (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type !== "update") return;

      onMessage(eventData.message);
      setTimeout(() => {
        sendJsonMessage({
          type: "notification",
          message: "frontend_updated",
        });
      }, params.delay * 1000);
    },
  });
}
