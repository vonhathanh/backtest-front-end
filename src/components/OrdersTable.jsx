export default function OrdersTable({ orders }) {
  const rows = orders.map((order) => {
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
      </tr>
    );
  });

  return (
    <div className="table-container">
      <table id="orders-table" className="info-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Side</th>
            <th>Quantity</th>
            <th>Entry Price</th>
            <th>Position Side</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
