import { Routes } from "react-router"
import { Route } from "react-router-dom"
import Config from "./pages/Config"
import Backtest from "./pages/Backtest";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Config />} />
        <Route path="/backtest" element={<Backtest/>} />
      </Routes>
    </>
  )
}

export default App
