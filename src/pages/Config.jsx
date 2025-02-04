import { useNavigate } from "react-router";
import "./Config.css"
import FileSelection from "../components/FileSelection";
import Input from "../components/Input";
import DateTimeInput from "../components/DateTimeInput"
import ToogleSwitch from "../components/ToogleSwitch";
import CheckBox from "../components/CheckBox";

export default function Config() {

  const strategies = ["Baseline", "Grid"]

  const checkboxes = strategies.map(strategyName => {
    return (
      <CheckBox key={strategyName} name={strategyName} />
    )
  })

  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/backtest")
  }

  return (
    <main>
      <h2>Trading Strategy Configuration</h2>

      <FileSelection />

      <section id="symbol-and-timeframe" className="config-group">
        <Input label="Symbol" isEnable={false} />
        <Input label="Timeframe" isEnable={false} />
      </section>

      <section id="time-and-balance" className="config-group">
        <DateTimeInput label="Start time" isEnable={false} />
        <DateTimeInput label="End time" isEnable={false} />
      </section>

      <Input label="Initial Balance" isEnable={true} />

      <section id="manual-mode">
        <span>Manual mode</span>
        <ToogleSwitch />
      </section>

      <section id="strategy-selection">
        <label htmlFor="strategies">Strategy</label>
        <div id="checkboxes-container">
          {checkboxes}
        </div>
      </section>

      <button id="start-btn" onClick={handleRedirect}>Start testing</button>
      
    </main>
  )
}