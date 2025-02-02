import { useNavigate } from "react-router";

export default function Config() {
    const navigate = useNavigate();

    function handleRedirect() {
      navigate("/backtest")
    }
    
    return (
        <button onClick={handleRedirect}>Start</button>
    )
}