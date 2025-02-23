import useWebSocket from "react-use-websocket"

import config from "../config"
import CandleStickChart from "./CandleStickChart"
import { useState } from "react"

export default function SuperChart({ params }) {

    const [data, setData] = useState([])

    const { sendJsonMessage, lastMessage, readyState } = useWebSocket(config.websocketUrl, {
        onOpen: () => {
            sendJsonMessage({
                "type": "backtest",
                "params": params,
            })
        },
        onMessage: (messageEvent) => {
            const data = JSON.parse(messageEvent.data)
            if (data.type === "new_candle") {
                const message = data.message
                const candle = {
                    x: message.open_time,
                    y: [message.open, message.high, message.low, message.close]
                }
                setData((prevCandles) => [...prevCandles, candle])
            }
        }
    })

    return (
        <>
            <section className="chart-container">
                <CandleStickChart data={data} symbol={params.symbol} timeframe={params.timeframe} />
            </section>

            <section>
                <section>Positions</section>
                <section>Open orders</section>
                <section>Order history</section>
            </section>
        </>
    )
}