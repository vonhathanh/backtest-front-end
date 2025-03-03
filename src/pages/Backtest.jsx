import { useLocation } from "react-router-dom";

import "./Backtest.css";
import ErrorMessage from "../components/ErrorMessage";
import SuperChart from "../components/SuperChart";

export default function Backtest() {
  const location = useLocation();
  const backtestParams = location.state;

  if (!backtestParams) {
    return <ErrorMessage message="Backtest parameters are not valid/null" />;
  }

  const charts = backtestParams.strategies.map((strategy) => {
    const [strategyName, strategyParams] = strategy;
    return (
      <SuperChart
        key={strategyName}
        params={{
          ...backtestParams.generalConfig,
          strategy: strategyName,
          ...strategyParams,
        }}
      />
    );
  });

  return <main className="backtest">{charts}</main>;
}
