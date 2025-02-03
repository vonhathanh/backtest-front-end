import { useNavigate } from "react-router";
import "./Config.css"
import FileSelection from "../components/FileSelection";


export default function Config() {
    const navigate = useNavigate();

    function handleRedirect() {
      navigate("/backtest")
    }
    
    return (
      <main>
        <h2>Trading Strategy Configuration</h2>

        <FileSelection />

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
      </main>
    )
}