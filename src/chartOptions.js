import dayjs from "dayjs"

const chartOptions = {
    series: [{
        data: []
    }],
    noData: {
        text: 'Loading...'
    },
    chart: {
        type: 'candlestick',
        height: 450
    },
    title: {
        text: '',
        align: 'left',
        style: {
            fontSize: '26px',
            fontWeight: 'bold',
            fontFamily: 'sans-serif'
        }
    },
    xaxis: {
        type: 'category',
        labels: {
            formatter: function (val) {
                return dayjs(val).format("YYYY/MM/DD")
            }
        }
    },
    yaxis: {
        opposite: true,
        decimalsInFloat: 1,
    },
};

export default chartOptions