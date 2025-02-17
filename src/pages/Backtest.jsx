import { useLocation } from "react-router-dom"

export default function Backtest() {
    const location = useLocation()
    const backtestParams = location.state
    
    return (
        <main>
            <section className="chart-container">
                <section className="chart-information">Chart Infomation</section>
                <section className="chart">Chart</section>
            </section>

            <section>
                Account Info
                <section>Positions</section>
                <section>Open orders</section>
                <section>Order history</section>
            </section>
            
        </main>
    )
}