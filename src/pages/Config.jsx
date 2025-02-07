import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Config.css"
import config from "../config"

import FileSelection from "../components/FileSelection";
import Input from "../components/Input";
import DefaultConfig from "../components/DefaultConfig";
import TimeConfig from "../components/TimeConfig";
import ManualMode from "../components/ManualMode";
import Strategies from "../components/Strategies";

export default function Config() {

  const [strategies, setStrategies] = useState([])

  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/backtest")
  }
  
  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/strategies`, {
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        })
        setStrategies(response.data.strategies)
      } catch (error) {
        console.log(error)
      }
    }

    fetchStrategies()

  }, [])

  return (
    <main>
      <h1>Trading Strategy Configuration</h1>

      <FileSelection />

      <DefaultConfig />

      <TimeConfig />

      <Input label="Initial Balance" isEnable={true} />

      <ManualMode />

      <Strategies strategies={strategies} />

      <button id="start-btn" onClick={handleRedirect}>Start testing</button>
      
    </main>
  )
}