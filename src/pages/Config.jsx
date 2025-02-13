import { useNavigate } from "react-router";
import { useCallback, useState } from "react";

import FileSelection from "../components/FileSelection";
import GeneralConfig from "../components/GeneralConfig";
import Strategies from "../components/Strategies";

import "./Config.css"

export default function Config() {

  const [configData, setConfigData] = useState(null)

  const handleFileSelected = useCallback((data) => {
    setConfigData(data)
  }, [])


  function onDateTimeChange(label, newValue) {
    const updatedConfig = { ...configData };
    if (label.includes("Start")) {
      updatedConfig.start_time = newValue;
    } else {
      updatedConfig.end_time = newValue;
    }
    setConfigData(updatedConfig);
  }

  const navigate = useNavigate();

  function handleSubmit(formData) {
    const backtestParams = {
      generalConfig: {
        symbol: configData.symbol,
        tf: configData.tf,
        start_time: formData.get("Start time"),
        end_time: formData.get("End time"),
        initial_balance: formData.get("Initial Balance")
      },
      strategies: {

      }
    }

    navigate("/backtest")
  }

  return (
    <main>
      <form action={handleSubmit}>
        <h1>Trading Strategy Configuration</h1>

        <FileSelection onChange={handleFileSelected} />

        <GeneralConfig configData={configData} onChange={onDateTimeChange} />

        <Strategies />

        <button id="start-btn" type="submit" >Start testing</button>
      </form>
    </main>
  )
}