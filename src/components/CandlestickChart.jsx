import { useEffect, useRef } from "react";
import {
  CandlestickSeries,
  createChart,
  createSeriesMarkers,
} from "lightweight-charts";
import chartOptions from "../chartOptions";

export default function CandlestickChart({
  params,
  price,
  openOrders,
  filledOrders,
  socket,
}) {
  const chartContainerRef = useRef();
  const chartInstanceRef = useRef();
  const series = useRef();
  const seriesMarkers = useRef();

  useEffect(initChart, [params.delay, socket]);
  useEffect(drawOpenOrders, [openOrders]);
  useEffect(updateChart, [params.delay, price, socket]);
  useEffect(updateMarkers, [filledOrders]);

  function initChart() {
    if (chartInstanceRef.current) return;
    // chart only need to render the first time, the rest is update series data
    chartInstanceRef.current = createChart(chartContainerRef.current, {
      height: 450,
    });
    chartInstanceRef.current.timeScale().fitContent();
    series.current = chartInstanceRef.current.addSeries(
      CandlestickSeries,
      chartOptions
    );
    series.current.setData([]);

    seriesMarkers.current = createSeriesMarkers(series.current, []);

    window.addEventListener("resize", () => {
      chartInstanceRef.current.resize(window.innerWidth, 450);
    });
  }

  function updateChart() {
    if (!price) return;
    series.current.update(price);
    setTimeout(() => socket.emit("render_finished", {}), params.delay * 1000);
  }

  function drawOpenOrders() {
    if (!chartInstanceRef.current) return;

    const oldLines = series.current.priceLines();
    oldLines.map((line) => series.current.removePriceLine(line));

    openOrders.map((order) => {
      const priceLine = {
        price: order.price,
        color: order.side === "BUY" ? "#00E396" : "#F72411",
        lineWidth: 2,
        lineStyle: 2, // LineStyle.Dashed
        axisLabelVisible: true,
        title: "my label",
      };
      series.current.createPriceLine(priceLine);
    });
  }

  function updateMarkers() {
    if (!chartInstanceRef.current) return;
    const markers = filledOrders.map((order) => {
      if (order.side === "BUY") {
        return {
          color: "green",
          position: "aboveBar",
          shape: "arrowDown",
          time: order.createdAt,
        };
      } else {
        return {
          color: "red",
          position: "belowBar",
          shape: "arrowUp",
          time: order.createdAt,
        };
      }
    });
    seriesMarkers.current.setMarkers(markers);
  }

  return <section id="candlestick-chart" ref={chartContainerRef}></section>;
}
