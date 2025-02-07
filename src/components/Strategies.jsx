import CheckBox from "./CheckBox";

export default function Strategies({ strategies }) {
    const checkboxes = strategies.map(strategy => {
        return (
            <CheckBox key={strategy.name} name={strategy.name} />
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