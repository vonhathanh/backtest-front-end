import { useState } from "react";

import config from "../config";

import CandlestickChart from "./CandlestickChart";
import AccountInfo from "./AccountInfo";
import useSocketIO from "../hooks/useSocketIO";

export default function SuperChart({ params }) {
  const [prices, setPrices] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openOrders, setOpenOrders] = useState([]);

  const socket = useSocketIO();

  socket.on("connect", () => {
    console.log(socket.id);
    socket.emit("backtest", params);
  });

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

  socket.on("positions", (newPositions) => {
    setPositions(newPositions);
  });

  return (
    <>
      <CandlestickChart
        prices={prices}
        openOrders={openOrders}
        params={params}
      />
      <AccountInfo
        price={prices.slice(-1)}
        positions={positions}
        openOrders={openOrders}
      />
    </>
  );
}
