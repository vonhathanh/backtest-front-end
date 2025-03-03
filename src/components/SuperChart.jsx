import { useState } from "react";

import useWebsocketHandler from "../hooks/useWebsocketHandler";
import config from "../config";

import CandlestickChart from "./CandlestickChart";
import AccountInfo from "./AccountInfo";

export default function SuperChart({ params }) {
  const [prices, setPrices] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openOrders, setOpenOrders] = useState([]);

  useWebsocketHandler(params, onMessage);

  function onMessage(message) {
    updateChartData(message);
    updateStrategyInfo(message);
  }

  function updateChartData(message) {
    const price = message.price;
    const candle = {
      x: price.open_time,
      y: [price.open, price.high, price.low, price.close],
    };

    setPrices((prevCandles) => [
      ...prevCandles.slice(-config.maxCandlesOnPage),
      candle,
    ]);
  }

  function updateStrategyInfo(message) {
    setPositions(message.positions);
    setOpenOrders(message.orders);
  }

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
