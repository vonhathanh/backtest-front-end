import Order from "./Order";

export default function OrdersTable({ orders }) {
  const rows = orders.map((order) => {
    return <Order key={order.id} order={order} />;
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
