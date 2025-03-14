export default function PositionsTable({ positions, price }) {
  const rows = positions.map((position, index) => {
    let pnl = 0.0;
    if (price) {
      pnl = Number(position.quantity * (price - position.averagePrice)).toFixed(
        2
      );
      if (position.side === "SHORT") pnl *= -1;
    }
    return (
      <tr key={index}>
        <td>{position.side}</td>
        <td>{position.quantity.toFixed(2)}</td>
        <td>{position.averagePrice.toFixed(2)}</td>
        <td>{pnl}</td>
        <td>Close</td>
      </tr>
    );
  });

  return (
    <table id="positions-table" className="info-table">
      <thead>
        <tr>
          <th>Side</th>
          <th>Quantity</th>
          <th>Average Price</th>
          <th>PNL</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
