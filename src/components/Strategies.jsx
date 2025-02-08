import StrategyConfig from "./StrategyConfig"

export default function Strategies({ strategies }) {

    const strategyConfigs = strategies.map(strategy => {
        return (
            <StrategyConfig key={strategy.name} name={strategy.name} params={strategy.params} />
        )
    })

    return (
        <section>
            <label htmlFor="strategies">Strategies</label>
            <section id="strategies-container">
                {strategyConfigs}
            </section>
        </section>
    )
}