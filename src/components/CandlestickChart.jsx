import { useEffect, useRef } from "react";
import { CandlestickSeries, createChart, createSeriesMarkers } from "lightweight-charts";
import { chartOptions, tooltipDefaultStyle } from "../chartOptions";
import { createPriceLineFromOrder, createMarkerFromOrder, crosshairMoveHandler } from "../utils";

export default function CandlestickChart({ params, price, openOrders, filledOrders, socket }) {
  const chartContainerRef = useRef();
  const chartInstanceRef = useRef();
  const series = useRef();
  const seriesMarkers = useRef();
  const tooltip = useRef();

  useEffect(() => initChart(), [params.delay, socket]);
  useEffect(drawOpenOrders, [openOrders]);
  useEffect(updateChart, [params.delay, params.stepByStep, price, socket]);
  useEffect(updateMarkers, [filledOrders]);

  function initChart() {
    if (chartInstanceRef.current) return;

    const handleResize = () => {
      if (!chartInstanceRef.current) return;
      chartInstanceRef.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
      });
    };

    // chart only need to render the first time, the rest is update series data
    chartInstanceRef.current = createChart(chartContainerRef.current);

    chartInstanceRef.current.timeScale().fitContent();

    series.current = chartInstanceRef.current.addSeries(CandlestickSeries, chartOptions);
    series.current.setData([]);

    seriesMarkers.current = createSeriesMarkers(series.current, []);

    window.addEventListener("resize", handleResize);

    tooltip.current = document.createElement("div");
    tooltip.current.style = tooltipDefaultStyle;

    chartContainerRef.current.appendChild(tooltip.current);

    chartInstanceRef.current.subscribeCrosshairMove((param) =>
      crosshairMoveHandler(param, tooltip.current, series.current, chartContainerRef.current)
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstanceRef.current?.remove();
      chartInstanceRef.current = null;
    };
  }

  function updateChart() {
    if (!price) return;
    series.current.update(price);
  }

  function drawOpenOrders() {
    if (!chartInstanceRef.current) return;

    const oldLines = series.current.priceLines();
    oldLines.map((line) => series.current.removePriceLine(line));

    openOrders.map((order) => {
      const priceLine = createPriceLineFromOrder(order);
      series.current.createPriceLine(priceLine);
    });
  }

  function updateMarkers() {
    if (!chartInstanceRef.current) return;
    const markers = filledOrders.map((order) => createMarkerFromOrder(order));
    seriesMarkers.current.setMarkers(markers);
  }

  return <section id="candlestick-chart" ref={chartContainerRef}></section>;
}
