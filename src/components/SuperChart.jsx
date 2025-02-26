import useWebSocket from "react-use-websocket"

import config from "../config"
import chartOptions from "../chartOption"
import { useEffect, useRef, useState } from "react"
import ApexCharts from "apexcharts"

export default function SuperChart({ params }) {

    const [data, setData] = useState([])
    const chartContainerRef = useRef(null)
    const chartInstanceRef = useRef(null)

    const { sendJsonMessage } = useWebSocket(config.websocketUrl, {
        onOpen: () => {
            sendJsonMessage({
                "type": "backtest",
                "params": params,
            })
        },
        onMessage: (messageEvent) => {
            const event = JSON.parse(messageEvent.data)
            
            if (event.type === "new_candle") {
                updateChartData(event.message)
                sendJsonMessage({
                    "type": "notification",
                    "message": "frontend_updated",
                })
            }
        }
    })

    useEffect(() => {
        if (chartContainerRef.current && !chartInstanceRef.current) {
            chartInstanceRef.current = new ApexCharts(
                document.querySelector("#candlestick-chart"),
                chartOptions,
            );
            chartInstanceRef.current.render()
        }
    }, [])

    function updateChartData(message) {
        const candle = {
            x: message.open_time,
            y: [message.open, message.high, message.low, message.close]
        }

        setData((prevCandles) => [...prevCandles.slice(-config.maxCandlesOnPage), candle])

        chartInstanceRef.current.updateSeries([{
            name: "candlestick",
            data: data
        }])
    }


    return (
        <>
            <section id="candlestick-chart" ref={chartContainerRef}></section>

            <section>
                <section>Positions</section>
                <section>Open orders</section>
                <section>Order history</section>
            </section>
        </>
    )
}