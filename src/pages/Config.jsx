import { useNavigate } from "react-router";

import "./Config.css"

import FileSelection from "../components/FileSelection";
import GeneralConfig from "../components/GeneralConfig";
import Strategies from "../components/Strategies";

export default function Config() {

  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/backtest")
  }


  return (
    <main>
      <h1>Trading Strategy Configuration</h1>

      <FileSelection />

      <GeneralConfig />

      <Strategies />

      <button id="start-btn" onClick={handleRedirect}>Start testing</button>

    </main>
  )
}