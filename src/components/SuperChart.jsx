import { useEffect, useState } from "react";

import CandlestickChart from "./CandlestickChart";
import AccountInfo from "./AccountInfo";
import useSocketIO from "../hooks/useSocketIO";

export default function SuperChart({ params }) {
  const [prices, setPrices] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openOrders, setOpenOrders] = useState([]);
  const [filledOrders, setFilledOrders] = useState([]);

  const { socket, isConnected } = useSocketIO();

  useEffect(setuphandlers, [isConnected, socket]);

  // emit backtest event once socket is connected and params are loaded
  useEffect(() => {
    if (isConnected && params) socket.emit("backtest", params);
  }, [socket, isConnected, params]);

  function setuphandlers() {
    if (!isConnected) return;

    socket.on("new_candle", (price) => {
      setPrices((prevCandles) => [...prevCandles, price]);
    });

    socket.on("new_orders", (newOrders) => {
      setOpenOrders((prevOrders) => [...prevOrders, ...newOrders]);
    });

    socket.on("current_orders", (newOrders) => {
      setOpenOrders(newOrders);
    });

    socket.on("order_filled", (filledOrder) => {
      setOpenOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== filledOrder.id)
      );
      setFilledOrders((prevOrders) => [...prevOrders, filledOrder]);
    });

    socket.on("positions", (newPositions) => {
      setPositions(newPositions);
    });
  }

  return (
    <section className="super-chart">
      <CandlestickChart
        price={prices ? prices[prices.length - 1] : null}
        filledOrders={filledOrders}
        openOrders={openOrders}
        params={params}
        socket={socket}
      />
      <AccountInfo
        price={prices ? prices[prices.length - 1] : null}
        positions={positions}
        openOrders={openOrders}
      />
    </section>
  );
}
