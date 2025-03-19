export default function OrdersTable({ orders }) {
  const rows = orders.map((order) => {
    return (
      <tr key={order.id}>
        <td>{order.type}</td>
        <td>{order.side}</td>
        <td>{order.quantity.toFixed(2)}</td>
        <td>{order.price.toFixed(2)}</td>
        <td>{order.positionSide}</td>
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
