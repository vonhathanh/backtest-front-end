import { useLocation } from "react-router-dom"

import "./Backtest.css"
import ErrorMessage from "../components/ErrorMessage"
import CandleStickChart from "../components/CandleStickChart"
import config from "../config"
import useWebSocket from "react-use-websocket"
import { backtest } from "../api"

export default function Backtest() {
    const location = useLocation()
    const backtestParams = location.state

    if (!backtestParams) {
        return <ErrorMessage message="Backtest parameters are not valid/null"/>
    }

    const { sendMessage, lastMessage, readyState } = useWebSocket(config.websocketUrl, {
        onOpen: () => backtest(backtestParams).then(console.log),
    })

    return (
        <main className="backtest">
            <section className="chart-container">
                <CandleStickChart symbol={backtestParams.symbol} tf={backtestParams.tf}/>
            </section>

            <section>
                Connection Status: {readyState}
                <br/>
                Last message: {lastMessage?.data}
                <section>Positions</section>
                <section>Open orders</section>
                <section>Order history</section>
            </section>
            
        </main>
    )
}