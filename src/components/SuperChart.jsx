import { useEffect, useState } from "react";

import CandlestickChart from "./CandlestickChart";
import AccountInfo from "./AccountInfo";
import useSocketIO from "../hooks/useSocketIO";
import ChartHeader from "./ChartHeader";

export default function SuperChart({ params }) {
  const [prices, setPrices] = useState([]);
  const [positions, setPositions] = useState([]);
  const [openOrders, setOpenOrders] = useState([]);
  const [filledOrders, setFilledOrders] = useState([]);
  const [pnl, setPnL] = useState(0.0);

  const { socket, isConnected } = useSocketIO();

  useEffect(setuphandlers, [isConnected, socket, params.delay, params.stepByStep]);

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
      setOpenOrders((prevOrders) => prevOrders.filter((order) => order.id !== filledOrder.id));
      setFilledOrders((prevOrders) => [...prevOrders, filledOrder]);
    });

    socket.on("positions", (newPositions) => {
      setPositions(newPositions);
    });

    socket.on("pnl", (newPnl) => {
      setPnL(newPnl);
    });

    socket.on("ready", () => {
      if (!params.stepByStep) setTimeout(() => socket.emit("next", {}), params.delay * 1000);
    });
  }

  return (
    <section className="super-chart">
      <ChartHeader params={params} socket={socket} pnl={pnl} />
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
        filledOrders={filledOrders}
      />
    </section>
  );
}
