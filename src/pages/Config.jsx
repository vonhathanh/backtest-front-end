import { useNavigate } from "react-router";
import { createContext, useCallback, useReducer, useState } from "react";

import FileSelection from "../components/FileSelection";
import GeneralConfig from "../components/GeneralConfig";
import Strategies from "../components/Strategies";

import "./Config.css"
import { strategyReducer } from "../reducers/strategyReducer";

export const StrategyContext = createContext({})

export default function Config() {

  const [metadata, setMetadata] = useState(null)

  const [datetimeConfig, setDatetimeConfig] = useState({ startTime: "", endTime: "" })

  const [strategies, dispatch] = useReducer(strategyReducer, {})

  const navigate = useNavigate();

  const handleFileSelected = useCallback((data) => {
    setMetadata(data)
    setDatetimeConfig({ startTime: "", endTime: "" })
  }, [])

  function onDateTimeChange(label, newValue) {
    if (label.includes("Start")) {
      setDatetimeConfig({ ...datetimeConfig, startTime: newValue })
    } else {
      setDatetimeConfig({ ...datetimeConfig, endTime: newValue })
    }
  }

  function handleSubmit(formData) {
    const backtestParams = {
      symbol: metadata.symbol,
      tf: metadata.tf,
      startTime: formData.get("Start time"),
      endTime: formData.get("End time"),
      initialBalance: formData.get("Initial Balance"),
      strategies: strategies
    }
    console.log(backtestParams)
    navigate("/backtest", { state: backtestParams })
  }

  return (
    <main>
      <form action={handleSubmit}>
        <h1>Trading Strategy Configuration</h1>

        <FileSelection onChange={handleFileSelected} />

        <GeneralConfig metadata={metadata}
          onChange={onDateTimeChange}
          startTime={datetimeConfig.startTime}
          endTime={datetimeConfig.endTime} />

        <StrategyContext.Provider value={dispatch}>
          <Strategies />
        </StrategyContext.Provider>
        
        <button id="start-btn" type="submit" >Start testing</button>
      </form>
    </main>
  )
}