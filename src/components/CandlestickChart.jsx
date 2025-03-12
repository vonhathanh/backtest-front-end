import { useEffect, useRef } from "react";
import { CandlestickSeries, createChart } from "lightweight-charts";

// import chartOptions from "../chartOptions";

export default function CandlestickChart({
  params,
  price,
  openOrders,
  socket,
}) {
  const chartContainerRef = useRef();
  const chartInstanceRef = useRef();
  const series = useRef();

  useEffect(initChart, [params.delay, socket]);
  // useEffect(drawOpenOrders, [openOrders]);
  useEffect(updateChart, [params.delay, price, socket]);

  function initChart() {
    if (chartInstanceRef.current) return;
    // chart only need to render the first time, the rest is update series data
    chartInstanceRef.current = createChart(chartContainerRef.current, {
      height: 450,
    });
    chartInstanceRef.current.timeScale().fitContent();
    series.current = chartInstanceRef.current.addSeries(CandlestickSeries, {
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    series.current.setData([]);
  }

  function updateChart() {
    if (!price) return;
    series.current.update(price);
    setTimeout(() => socket.emit("render_finished", {}), params.delay * 1000);
  }

  // function drawOpenOrders() {
  //   if (!chartInstanceRef.current) return;

  //   chartInstanceRef.current.clearAnnotations();

  //   openOrders.map((order) => {
  //     chartInstanceRef.current.addYaxisAnnotation({
  //       y: order.price,
  //       borderColor: order.side === "BUY" ? "#00E396" : "#F72411",
  //     });
  //   });
  // }

  return <div ref={chartContainerRef}></div>;
}
