import { useNavigate } from "react-router";
import "./Config.css"
import FileSelection from "../components/FileSelection";
import Input from "../components/Input";
import DefaultConfig from "../components/DefaultConfig";
import TimeConfig from "../components/TimeConfig";
import ManualMode from "../components/ManualMode";
import StrategySelection from "../components/StrategySelection";

export default function Config() {

  const strategies = ["Baseline", "Grid"]

  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/backtest")
  }

  return (
    <main>
      <h1>Trading Strategy Configuration</h1>

      <FileSelection />

      <DefaultConfig />

      <TimeConfig />

      <Input label="Initial Balance" isEnable={true} />

      <ManualMode />

      <StrategySelection strategies={strategies} />

      <button id="start-btn" onClick={handleRedirect}>Start testing</button>
      
    </main>
  )
}