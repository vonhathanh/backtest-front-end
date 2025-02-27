export default function PositionsTable(props) {
    const positions = props.positions.map((position, index) => {
        let pnl = 0.0
        if (props.price) {
            pnl = Number(position.quantity * (props.price - position.averagePrice)).toFixed(2)
            if (position.side === 'SHORT') pnl *= -1
            console.log(pnl)
        }
        return (
            <tr key={index}>
                <td>{position.side}</td>
                <td>{position.quantity.toFixed(2)}</td>
                <td>{position.averagePrice.toFixed(2)}</td>
                <td>{pnl}</td>
                <td>Close</td>
            </tr>
        )
    })
    
    return (
        <table className="position-container">
            <thead>
                <tr>
                    <th>Side</th>
                    <th>Quantity</th>
                    <th>Average Price</th>
                    <th>PNL</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {positions}
            </tbody>
        </table>
    )
}