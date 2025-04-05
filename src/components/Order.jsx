export default function Order({ order }) {
  const orderSideStyle = {
    color: order.side == "Buy" ? "green" : "red",
    fontWeight: "bold",
  };
  const positionSideStyle = {
    color: order.positionSide == "Long" ? "green" : "red",
    fontWeight: "bold",
  };

  return (
    <tr key={order.id}>
      <td style={{ fontWeight: "bold" }}>{order.type}</td>
      <td style={orderSideStyle}>{order.side}</td>
      <td>{order.quantity.toFixed(2)}</td>
      <td>{order.price.toFixed(2)}</td>
      <td style={positionSideStyle}>{order.positionSide}</td>
      {order.filledAt !== -1 ? (
        <td>{new Date(order.filledAt * 1000).toJSON().slice(0, -5)}</td>
      ) : null}
    </tr>
  );
}
