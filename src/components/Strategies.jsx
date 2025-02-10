import { useState, useEffect } from "react"
import StrategyConfig from "./StrategyConfig"
import { fetchStrategies } from "../api"
import Loader from "./Loader"
import ErrorMessage from "./ErrorMessage"

export default function Strategies() {

    const [strategies, setStrategies] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchStrategies()
            .then(setStrategies)
            .catch(setError)
            .finally(() => {
                setLoading(false)
            })
    }, [])


    const strategyConfigs = strategies.map(strategy => {
        return (
            <StrategyConfig key={strategy.name} name={strategy.name} params={strategy.params} />
        )
    })

    function render() {
        if (loading) return <Loader />
        if (error != null) return <ErrorMessage message={`Can't load strategies, reason: ${error.message}`} />
        return strategyConfigs
    }

    return (
        <section id="strategies">
            <label htmlFor="strategies">Strategies</label>
            <section id="strategies-container">
                {render()}
            </section>
        </section>
    )
}