import { useNavigate } from "react-router";
import "./Config.css"


export default function Config() {
    const navigate = useNavigate();

    function handleRedirect() {
      navigate("/backtest")
    }
    
    return (
      <>
        <h3>Trading Strategy Configuration</h3>

        <section id="data-selection">
        </section>

        <section id="symbol-and-timeframe" className="config-group">
          <section className="config-value"></section>
          <section className="config-value"></section>
        </section>

        <section id="time-and-balance" className="config-group">
          <section className="config-value"></section>
          <section className="config-value"></section>
        </section>

        <section id="manual-mode"></section>
        <section id="strategy-selection"></section>

        <button onClick={handleRedirect}>Start testing</button>
      </>
    )
}