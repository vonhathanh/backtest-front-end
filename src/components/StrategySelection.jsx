import CheckBox from "./CheckBox";

export default function StrategySelection({ strategies }) {
    const checkboxes = strategies.map(strategyName => {
        return (
            <CheckBox key={strategyName} name={strategyName} />
        )
    })

    return (
        <section>
            <label htmlFor="strategies">Strategy</label>
            <section id="checkboxes-container">
                {checkboxes}
            </section>
        </section>
    )
}