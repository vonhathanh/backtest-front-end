import { useEffect, useRef } from "react";

import ApexCharts from "apexcharts";
import chartOptions from "../chartOptions";

export default function CandlestickChart({
  params,
  prices,
  openOrders,
  socket,
}) {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(initChart, [params]);
  useEffect(drawOpenOrders, [openOrders]);
  useEffect(updateChart, [params.delay, prices, socket]);

  function initChart() {
    // chart only need to render the first time, the rest is update series data
    if (chartContainerRef.current && !chartInstanceRef.current) {
      chartOptions.title.text = `${params.symbol} - ${params.timeframe}`;
      chartInstanceRef.current = new ApexCharts(
        document.querySelector("#candlestick-chart"),
        chartOptions
      );
      chartInstanceRef.current.render();
    }
  }

  function drawOpenOrders() {
    if (!chartInstanceRef.current) return;

    chartInstanceRef.current.clearAnnotations();

    openOrders.map((order) => {
      chartInstanceRef.current.addYaxisAnnotation({
        y: order.price,
        borderColor: order.side === "BUY" ? "#00E396" : "#F72411",
      });
    });
  }

  function updateChart() {
    chartInstanceRef.current.updateSeries([
      { name: "candlestick", data: prices },
    ]);
    setTimeout(() => {
      if (socket) socket.emit("render_finished", {});
    }, params.delay * 1000);
  }

  return <section id="candlestick-chart" ref={chartContainerRef}></section>;
}
