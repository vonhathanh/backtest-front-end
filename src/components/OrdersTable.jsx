export default function OrdersTable({orders}) {
    const rows = orders.map((order) => {
        return (
            <tr key={order.id}>
                <td>{order.side}</td>
                <td>{order.quantity.toFixed(2)}</td>
                <td>{order.symbol}</td>
                <td>{order.price.toFixed(2)}</td>
                <td>{order.positionSide}</td>
                <td>Cancel</td>
            </tr>
        )
    })
    
    return (
        <table id="orders-table">
            <thead>
                <tr>
                    <th>Side</th>
                    <th>Quantity</th>
                    <th>Symbol</th>
                    <th>Entry Price</th>
                    <th>Position Side</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}