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
        onMessage: (event) => {
            const eventData = JSON.parse(event.data)
            
            if (eventData.type === "new_candle") {
                updateChartData(eventData.message)
                sendJsonMessage({
                    "type": "notification",
                    "message": "frontend_updated",
                })
            }
        }
    })

    useEffect(() => {
        if (chartContainerRef.current && !chartInstanceRef.current) {
            chartOptions.title.text = `${params.symbol} - ${params.timeframe}`
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

            <section id="account-info">
                <section>Positions</section>
                <section>Open orders</section>
                <section>Order history</section>
            </section>
        </>
    )
}