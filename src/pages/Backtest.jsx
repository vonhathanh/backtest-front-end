import { useLocation } from "react-router-dom"

import "./Backtest.css"
import ErrorMessage from "../components/ErrorMessage"
import CandleStickChart from "../components/CandleStickChart"
import { useEffect } from "react"

export default function Backtest() {
    const location = useLocation()
    const backtestParams = location.state

    if (!backtestParams) {
        return <ErrorMessage message="Backtest parameters are not valid/null"/>
    }

    useEffect(() => {
        
    })
    
    return (
        <main className="backtest">
            <section className="chart-container">
                <CandleStickChart symbol={backtestParams.symbol} tf={backtestParams.tf}/>
            </section>

            {/* <section>
                Account Info
                <section>Positions</section>
                <section>Open orders</section>
                <section>Order history</section>
            </section> */}
            
        </main>
    )
}