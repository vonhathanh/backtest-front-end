import { useNavigate } from "react-router";

import "./Config.css"

import FileSelection from "../components/FileSelection";
import GeneralConfig from "../components/GeneralConfig";
import Strategies from "../components/Strategies";
import { useCallback, useState } from "react";

export default function Config() {

  const [configData, setConfigData] = useState(null)

  const handleFileSelected = useCallback((data) => {
    setConfigData(data)
  }, [])

  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/backtest")
  }

  return (
    <main>

      <h1>Trading Strategy Configuration</h1>

      <FileSelection onChange={handleFileSelected}/>

      <GeneralConfig configData={configData}/>

      <Strategies />

      <button id="start-btn" onClick={handleRedirect}>Start testing</button>

    </main>
  )
}