export default function ChartHeader({ params, socket, pnl }) {
  return (
    <section className="chart-header">
      <span>
        {params.symbol} - {params.timeframe}, PnL: {pnl.toFixed(2)}
      </span>
      <div className="next-btn-div">
        {params.stepByStep ? (
          <button onClick={() => socket.emit("render_finished", {})}>Next</button>
        ) : null}
      </div>
    </section>
  );
}
