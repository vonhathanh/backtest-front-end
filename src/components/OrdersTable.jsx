export default function OrdersTable({ orders }) {
  const rows = orders.map((order) => {
    return (
      <tr key={order.id}>
        <td>{order.side}</td>
        <td>{order.quantity.toFixed(2)}</td>
        <td>{order.symbol}</td>
        <td>{order.price.toFixed(2)}</td>
        <td>{order.positionSide}</td>
      </tr>
    );
  });

  return (
    <table id="orders-table" className="info-table">
      <thead>
        <tr>
          <th>Side</th>
          <th>Quantity</th>
          <th>Symbol</th>
          <th>Entry Price</th>
          <th>Position Side</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
