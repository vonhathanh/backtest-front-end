export default function ChartHeader({ params, socket }) {
  return (
    <section className="chart-header">
      <span>
        {params.symbol} - {params.timeframe}
      </span>
      <div className="next-btn-div">
        {params.stepByStep ? (
          <button onClick={() => socket.emit("render_finished", {})}>Next</button>
        ) : null}
      </div>
    </section>
  );
}
