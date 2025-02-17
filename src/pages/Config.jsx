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

  const [strategies, dispatch] = useReducer(strategyReducer, {})

  const navigate = useNavigate();

  const handleFileSelection = useCallback((data) => {
    setMetadata(data)
  }, [])

  function handleSubmit(formData) {
    const backtestParams = {
      symbol: metadata.symbol,
      tf: metadata.tf,
      startTime: formData.get("Start time"),
      endTime: formData.get("End time"),
      initialBalance: formData.get("Initial Balance"),
      strategies: strategies
    }
    navigate("/backtest", { state: backtestParams })
  }

  return (
    <main className="config">
      <form action={handleSubmit}>
        <h1>Trading Strategy Configuration</h1>

        <div id="form-input">
          <FileSelection onChange={handleFileSelection} />

          <GeneralConfig metadata={metadata} />

          <StrategyContext.Provider value={dispatch}>
            <Strategies />
          </StrategyContext.Provider>
        </div>
        
        <button id="start-btn" type="submit" >Start testing</button>
      </form>
    </main>
  )
}