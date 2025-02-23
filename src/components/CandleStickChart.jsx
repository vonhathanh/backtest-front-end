import React, { Component } from "react";
import Chart from "react-apexcharts";

class CandleStickChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'candle',
                data: props.data
            }],
            options: {
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
                    text: `${props.symbol} - ${props.timeframe}`,
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
                            x: 'Oct 06 14:00',
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
                                text: 'Annotation Test'
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
            },
        }
    }

    render() {
        return (
            <div>
                <div id="candle-stick-chart">
                    <Chart options={this.state.options} series={this.state.series} type="candlestick" height={450} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default CandleStickChart