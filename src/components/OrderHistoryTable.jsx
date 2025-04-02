import { useState, useRef } from "react";
import config from "../config";

export default function OrderHistoryTable({ orders }) {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);
  const ROW_HEIGHT = 28;
  const ROWS_BUFFER = 3;

  function handleScroll() {
    if (!containerRef.current) return;
    const top = containerRef.current.scrollTop;
    const newStartIndex = Math.max(0, Math.floor(top / ROW_HEIGHT));
    setStartIndex(newStartIndex);
  }

  const endIndex = Math.min(startIndex + config.visibleRows + ROWS_BUFFER, orders.length);
  const visibleOrders = orders.slice(startIndex, endIndex);

  const topSpacerHeight = startIndex * ROW_HEIGHT;
  const bottomSpacerHeight = (orders.length - endIndex) * ROW_HEIGHT;

  const rows = visibleOrders.map((order) => {
    const orderSideColor = {
      color: order.side == "Buy" ? "green" : "red",
      fontWeight: "bold",
    };
    const positionSideColor = {
      color: order.positionSide == "Long" ? "green" : "red",
      fontWeight: "bold",
    };
    return (
      <tr key={order.id}>
        <td style={{ fontWeight: "bold" }}>{order.type}</td>
        <td style={orderSideColor}>{order.side}</td>
        <td>{order.quantity.toFixed(2)}</td>
        <td>{order.price.toFixed(2)}</td>
        <td style={positionSideColor}>{order.positionSide}</td>
        <td>{new Date(order.filledAt * 1000).toJSON().slice(0, -5)}</td>
      </tr>
    );
  });

  return (
    <div ref={containerRef} className="table-container" onScroll={handleScroll}>
      <table id="order-history-table" className="info-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Side</th>
            <th>Quantity</th>
            <th>Entry Price</th>
            <th>Position Side</th>
            <th>Filled at</th>
          </tr>
        </thead>
        <tbody>
          {topSpacerHeight > 0 && (
            <tr>
              <td colSpan="3" style={{ height: `${topSpacerHeight}px` }} />
            </tr>
          )}
          {rows}
          {bottomSpacerHeight > 0 && (
            <tr>
              <td colSpan="3" style={{ height: `${bottomSpacerHeight}px` }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
