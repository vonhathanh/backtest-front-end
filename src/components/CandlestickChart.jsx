import { useEffect, useRef } from "react";

import ApexCharts from "apexcharts";
import chartOptions from "../chartOptions";

export default function CandlestickChart({ params, prices, openOrders }) {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(renderChart, [params]);
  useEffect(drawAnnotations, [openOrders]);

  useEffect(() => {
    chartInstanceRef.current.updateSeries([
      { name: "candlestick", data: prices },
    ]);
  }, [prices]);

  function renderChart() {
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

  function drawAnnotations() {
    if (openOrders.length == 0 || !chartInstanceRef.current) return;

    chartInstanceRef.current.clearAnnotations();

    openOrders.map((order) => {
      chartInstanceRef.current.addYaxisAnnotation({
        y: order.price,
        borderColor: order.side === "BUY" ? "#00E396" : "#F72411",
      });
    });
  }

  return <section id="candlestick-chart" ref={chartContainerRef}></section>;
}
