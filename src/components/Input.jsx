import { useContext } from "react"
import { StrategyContext } from "../pages/Config"

export default function Input({ label, value, type, parent }) {

    const dispatch = useContext(StrategyContext)

    return (
        <section>
            <label htmlFor={label}>{label}</label><br />
            <input 
            type={type} 
            name={label} 
            value={value} 
            onChange={parent ? (event) => dispatch({ type: "updated", id: parent, name: label, value: event.target.value }) : undefined} />
        </section>
    )
}