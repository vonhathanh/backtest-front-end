import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

// Convert to functional component with hooks
const CandleStickChart = ({ data, symbol, timeframe }) => {
    const [chartOptions, setChartOptions] = useState({
        chart: {
            height: 350,
            type: 'candlestick',
            events: {
                beforeMount: function (chart) {
                    chart.el.addEventListener('mousewheel', (e) => { }, { passive: true });
                    chart.el.addEventListener('touchstart', (e) => { }, { passive: true });
                }
            }
        },
        title: {
            text: `${symbol} - ${timeframe}`,
            align: "center",
            style: {
                fontWeight: "bold",
                color: '#263238',
                offsetX: 20,
            },
        },
        annotations: {
            xaxis: [
                {
                    borderColor: '#00E396',
                    label: {
                        borderColor: '#00E396',
                        style: {
                            fontSize: '12px',
                            color: '#fff',
                            background: '#00E396'
                        },
                        orientation: 'horizontal',
                        offsetY: 7,
                    }
                }
            ]
        },
        tooltip: {
            enabled: true,
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            opposite: true,
            tooltip: {
                enabled: true
            }
        }
    });

    const [series, setSeries] = useState([{
        name: 'candle',
        data: data
    }]);

    // Update series when data changes
    useEffect(() => {
        setSeries([{
            name: 'candle',
            data: data
        }]);
    }, [data]);

    // Update chart options when symbol or timeframe changes
    useEffect(() => {
        setChartOptions(prev => ({
            ...prev,
            title: {
                ...prev.title,
                text: `${symbol} - ${timeframe}`
            }
        }));
    }, [symbol, timeframe]);

    return (
        <div>
            <div id="candle-stick-chart">
                <Chart 
                    options={chartOptions} 
                    series={series} 
                    type="candlestick" 
                    height={450} 
                />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default CandleStickChart;