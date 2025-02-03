import { useNavigate } from "react-router";
import "./Config.css"
import FileSelection from "../components/FileSelection";
import Input from "../components/Input";
import DateTimeInput from "../components/DateTimeInput"
import ToogleSwitch from "../components/ToogleSwitch";

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
          <Input label="Symbol" isEnable={false}/>
          <Input label="Timeframe" isEnable={false}/>
        </section>

        <section id="time-and-balance" className="config-group">
          <DateTimeInput label="Start time" isEnable={false}/>
          <Input label="Initial Balance" isEnable={true}/>
        </section>

        <section id="manual-mode">
          <span>Manual mode</span>
          <ToogleSwitch />
        </section>
        <section id="strategy-selection"></section>

        <button onClick={handleRedirect}>Start testing</button>
      </main>
    )
}