import useWebSocket from "react-use-websocket"

import config from "../config"
import chartOptions from "../chartOption"
import { useEffect, useRef, useState } from "react"
import ApexCharts from "apexcharts"
import PositionsTable from "./PositionsTable"
import OrdersTable from "./OrdersTable"
import Tab from "./Tab"

export default function SuperChart({ params }) {

    const [prices, setPrices] = useState([])
    const [currentTab, setcurrentTab] = useState('positions')
    const [positions, setPositions] = useState([])
    const [openOrders, setOpenOrders] = useState([])

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

            if (eventData.type === "update") {
                updateChartData(eventData.message.price)
                updateAccountInfo(eventData.message)
                sendJsonMessage({
                    "type": "notification",
                    "message": "frontend_updated",
                })
            }
        }
    })

    useEffect(function renderChart() {
        // chart only need to render the first time, the rest is update series data
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

        setPrices((prevCandles) => [...prevCandles.slice(-config.maxCandlesOnPage), candle])

        chartInstanceRef.current.updateSeries([{ name: "candlestick", data: prices }])
    }


    function updateAccountInfo(message) {
        setPositions(message.positions)
        setOpenOrders(message.orders)
    }

    return (
        <>
            <section id="candlestick-chart" ref={chartContainerRef}></section>

            <section id="account-info">
                <Tab currentTab={currentTab} name="positions" onClick={setcurrentTab} value="Positions" />
                <Tab currentTab={currentTab} name="openOrders" onClick={setcurrentTab} value="Open Orders" />
            </section>

            {currentTab === 'positions' && <PositionsTable price={prices[prices.length - 1]?.y[0]} positions={positions} />}
            {currentTab === 'openOrders' && <OrdersTable orders={openOrders} />}
        </>
    )
}