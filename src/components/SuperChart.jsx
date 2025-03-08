import { useEffect, useState } from "react";

import config from "../config";

import CandlestickChart from "./CandlestickChart";
import AccountInfo from "./AccountInfo";
import useSocketIO from "../hooks/useSocketIO";

export default function SuperChart({ params }) {
  const [prices, setPrices] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openOrders, setOpenOrders] = useState([]);

  const { socket, isConnected } = useSocketIO();

  useEffect(() => {
    if (!isConnected) return;

    socket.on("new_candle", (price) => {
      const candle = {
        x: price.open_time,
        y: [price.open, price.high, price.low, price.close],
      };
      setPrices((prevCandles) => [
        ...prevCandles.slice(-config.maxCandlesOnPage),
        candle,
      ]);
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
    });

    socket.on("positions", (newPositions) => {
      setPositions(newPositions);
    });
  }, [socket, isConnected]);

  useEffect(() => {
    if (socket && isConnected && params) socket.emit("backtest", params);
  }, [socket, isConnected, params]);

  return (
    <>
      <CandlestickChart
        prices={prices}
        openOrders={openOrders}
        params={params}
        socket={socket}
      />
      <AccountInfo
        price={prices.slice(-1)}
        positions={positions}
        openOrders={openOrders}
      />
    </>
  );
}
